import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { NotificationService, NotificationModel } from './notification.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notify: NotificationService) { }

  notifications: NotificationModel[] = [];

  ngOnInit() {
    this.notify.observableNotification.subscribe(x => {
      this.notifications.splice(0, 0, x);
      setTimeout(() => {
        this.notifications.pop();
      }, 5000);
    });
  }

  removeNotification(n: NotificationModel) {
    var index = this.notifications.indexOf(n);
    this.notifications.splice(index, 1);
  }
}
