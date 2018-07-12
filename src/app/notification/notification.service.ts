import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { faThumbsUp, faThumbsDown, faInfoCircle, IconDefinition, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  iconSuccess=faThumbsUp;
  iconError=faThumbsDown;
  iconInfo=faInfoCircle;

  constructor() { }

  private notification= new BehaviorSubject<NotificationModel>(new NotificationModel());

observableNotification=this.notification.asObservable();


    showNotification(type?:string){
      let not=new NotificationModel();
      if(type==="success"){
          not.icon=this.iconSuccess;
          not.message="Operation done";
          not.title="Success";
          not.color="green";
        this.notification.next(not);
      }
      if(type==="error"){
          not.icon=this.iconError;
          not.message="Operation not done, we had a server error!";
          not.title="Error"
          not.color="red";
        this.notification.next(not);
      }
      if(type==="info"){
          not.icon=this.iconInfo;
          not.message="Operation was completed successfuly";
          not.title="Info"
          not.color="blue";
        this.notification.next(not);
      }
      if(!type){
        this.notification.next(not);
      }
    }

    customNotification(not:NotificationModel){
      this.notification.next(not);
    }

    getNotIcon(type:string):IconDefinition{
      if(type=="success"){
        return this.iconSuccess
      }
      if(type=="error"){
        return this.iconError
      }
      if(type=="info"){
        return this.iconInfo
      }
      if(type=="default"){
        return faQuestionCircle;
      }
    }
    getColor(type:string):string{
      if(type=="success"){
        return "green";
      }
      if(type=="error"){
        return "red"
      }
      if(type=="info"){
        return "blue"
      }
      if(type=="default"){
        return "#ccc"
      }
    }
}


export class NotificationModel{
  title:string="Welcome friend!";
  message:string="This is a welcome pop-up notification.";
  icon:IconDefinition=faQuestionCircle;
  color:string="white";
  second:number=5;

  constructor(){
    this.startCountdown(4);
  }
  startCountdown(seconds:number){
    let counter = seconds;
    var interval = setInterval(() => {
      this.second=counter;
      counter--;
      if(counter < 0 ){
        clearInterval(interval);
      };
    }, 1000);
  };
}
