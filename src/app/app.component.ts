import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // update = false;
  constructor(updates: SwUpdate) {
    updates.available.subscribe(updateEvent => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }
  ngOnInit() {}
}
