import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FeedbackService } from '../feedback.service';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  public currentUser = null;
  buttonText = 'पठाउनु होस्';
  email = new FormControl('', [Validators.email]);
  phone = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '[+]?[0-9०-९]{0,3}?[ ]?[0-9०-९]{3}[-]?[0-9०-९]{3}[-]?[0-9०-९]{4}'
    ),
    Validators.minLength(10),
    Validators.maxLength(15)
  ]);
  name = new FormControl('', [Validators.required]);
  // ,Validators.pattern('[a-zA-Zक- ]*')
  message = new FormControl('', [Validators.required]);

  getPhoneErrorText() {
    return this.phone.hasError('required')
      ? 'यो क्षेत्र अनिवार्य छ !'
      : this.phone.hasError('pattern')
      ? 'यो फोन नम्वर अमान्य छ !'
      : // : this.phone.hasError('maxLength(10)')
      //   ? 'यो फोन नम्वर अमान्य छ !-'
      //   : this.phone.hasError('minLength(10)')
      //     ? 'यो फोन नम्वर अमान्य छ !+'
      this.phone.errors.minlength
      ? 'फोन नम्वर १० अंकको हुनुपर्ने छ ।' // console.log(this.phone.errors.minlength)
      : this.phone.errors.maxlength
      ? 'फोन नम्वर अधिक्तम १३ अंकको हुनुपर्ने छ ।' // console.log(this.phone.errors.maxlength)
      : '';
  }
  getEmailErrorText() {
    return this.email.hasError('email') ? 'यो इमेल अमान्य छ !' : '';
  }
  getNameErrorText() {
    return this.name.hasError('required') ? 'यो क्षेत्र अनिवार्य छ !' : '';
    // : this.name.hasError('pattern')
    // ? 'यो नाम अमान्य छ !'
  }
  getMessageErrorText() {
    return this.message.hasError('required') ? 'यो क्षेत्र अनिवार्य छ !' : '';
  }
  constructor(
    private feedbackService: FeedbackService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.find();
  }
  async find() {
    await this.auth.user.subscribe(value => (this.currentUser = value));
  }
  submitForm() {
    const data = {
      loggedInUser: this.currentUser.displayName || this.currentUser.email,
      fullName: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      message: this.message.value
    };
    this.feedbackService.create(data);
    this.buttonText = '‍‍‍‍‍‍...';
    this.clearForm();
    setTimeout(() => (this.buttonText = 'पठाउनु होस'), 3000);
  }
  clearForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.phone = new FormControl('');
    this.name = new FormControl('', [Validators.required]);
    // ,Validators.pattern('[a-zA-Zक- ]*')
    this.message = new FormControl('', [Validators.required]);
  }
}
