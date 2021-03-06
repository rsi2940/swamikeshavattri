import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
