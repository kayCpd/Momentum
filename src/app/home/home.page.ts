import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { AuthConstants } from './../authConfig/authConstants';

import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService,
    private router: Router,
    private storageService: StorageService, 
    private alertService: AlertService,
    private httpService: HttpService
    ) {}

    private UserData = {
      email: '',
      password: ''
    };
    
    validate() {
      let email = this.UserData.email.trim();
      let password = this.UserData.password.trim();
      
      return ( this.UserData.email && 
          this.UserData.password &&
        email.length > 0 &&
        password.length > 0 );
    }
        

    login(form: NgForm) {
      //Test*
      // this.UserData.email = form.value.email;
      // this.UserData.password = form.value.password;
      // if(this.validate()){
      //   console.log('Validated');
      //   this.httpService.lg().subscribe((res: any) => {
      //   if(res.localId && res.idToken){
      //     // this.storageService.store(AuthConstants.AUTH, res);
      //     this.httpService.gCD(res.localId, res.idToken);
      //     this.router.navigate(['account']);
      //   }
      //   else{
      //     this.alertService.presentToast('Incorrect Username or Password.');
      //   }
      // },
      // (error: any) => {
      //   this.alertService.presentToast('Network connection Error.');
      // }
      // );
      // }else{
      //   this.alertService.presentToast('Username or Password Missing.');
      // }

      
      this.UserData.email = form.value.email;
      this.UserData.password = form.value.password;
      if(this.validate()){
        this.authService.login(this.UserData).subscribe((res: any) => {
        if(res.localId && res.idToken){
          this.storageService.store(AuthConstants.AUTH, res);
          this.router.navigate(['account']);
        }
        else{
          this.alertService.presentToast('Incorrect Username or Password.');
        }
      },
      (error: any) => {
        this.alertService.presentToast('Network connection Error.');
      }
      );
      }else{
        this.alertService.presentToast('Username or Password Missing.');
      }


      // console.log(this.validate());
    }
}
