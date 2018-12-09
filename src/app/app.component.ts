import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // update = false;
  constructor(private swUpdate: SwUpdate, updates: SwUpdate) {
    updates.available.subscribe(updateEvent => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(evt => {
        console.log('service worker updated');
      });
      this.swUpdate
        .checkForUpdate()
        .then(() => {
          // noop
        })
        .catch(err => {
          console.error('error when checking for update', err);
        });
    }
  }
}
