import { NotificationService, NotificationModel } from './notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { faCommentDots, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notify: NotificationService) { }


  types: string[] = ["success", "error", "info", "default"]

  formGroup: FormGroup;
  fb: FormBuilder = new FormBuilder();

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: ["",Validators.required],
      message: ["",Validators.required],
      type: []
    });
  }

  onSubmit(){
    console.log(this.formGroup.value);
    let not=new NotificationModel();
    not.title=this.formGroup.get('title').value;
    not.message=this.formGroup.get('message').value;
    not.icon= this.notify.getNotIcon(this.formGroup.get('type').value);
    not.color=this.notify.getColor(this.formGroup.get('type').value);
    console.log(not);
    this.notify.customNotification(not);
  }



  onSuccess() {
    this.notify.showNotification("success");
  }
  onError() {
    this.notify.showNotification("error");
  }
  onInfo() {
    this.notify.showNotification("info");
  }
  onNone() {
    this.notify.showNotification();
  }
}
