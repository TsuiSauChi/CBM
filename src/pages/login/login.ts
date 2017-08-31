import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {
  private login : FormGroup;

  checked : boolean = true;
  public userinput: string = '';
  public passinput: string = '';
  
    constructor( 
      private formBuilder: FormBuilder, 
      public navCtrl: NavController, 
      private alertCtrl: AlertController,
      private nativeStorage: NativeStorage
    ) {
      this.login = this.formBuilder.group({
        user: ['', Validators.required],
        password: [''],
        checked: []
      });
    }

    ngOnInit(){
      //get nativeStorage
      this.nativeStorage.getItem('login')
      .then(
        data => console.log(data),
        error => console.error(error),
      )
    }

    logForm(){
      if (this.login.value.user == "admin" && this.login.value.password == "123"){
        if(this.login.value.checked == true){
          this.nativeStorage.setItem('login', {user: 'admin', password: '123'})
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );
        }
        this.login.reset();
        this.navCtrl.push(HomePage);
      } else {
          this.login.reset();
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Wrong username or password, please try again!',
            buttons: ['Dismiss']
          });
          alert.present();
      }
    }
}
