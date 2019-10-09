import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

import { AuthConstants } from './../authConfig/authConstants';
import { accountGuard } from '../guards/account.guard';

import {Account} from '../models/account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  allData: any;


  private clientData = {
    accounts: [],
    age: '',
    name: ''
  };
  private account = {
    balance: '',
    overdraft: ''
  };

  localId: string;
  idToken: string;
  accountNumber: string;
  balance: number;
  overdraft: number;
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService, 
    private alertService: AlertService
    ) { }
  
  ngOnInit() {
    this.authService.authData$.subscribe((res:any) => {
      this.allData = res;
      this.localId = this.allData.localId;
      this.idToken = this.allData.idToken;
      this.getClientDetails(this.localId, this.idToken);
    })
  }

  getClientDetails(Lid: string, Tid: string){
    this.authService.getClientDetails(Lid, Tid).subscribe((res: any) => {

      this.clientData.accounts.push(res.accounts);
      this.clientData.age = res.age;
      this.clientData.name = res.name;     
    })
  }

  updateClientAccountList(){
    this.authService.updateClientAccountList(this.localId, this.idToken, this.accountNumber).subscribe((res) => {
      //map to toaster: account list updated
      this.alertService.presentToast('Account list updated');
    });
        
  }

  getClientAccount(){
    return this.authService.getClientAccount(this.accountNumber, this.idToken).subscribe((res) => {
        this.account.balance = res.balance;
        this.account.overdraft = res.overdraft;
    })
  }

  updateClientAccountTransaction(){
    let accountData: Account;
    accountData.balance = this.balance;
    accountData.overdraft = this.overdraft;
    
    return this.authService.updateClientAccountTransaction(this.accountNumber, this.idToken, accountData).subscribe((res) => {
         console.log("Success"),
       error => alert(error)
    });
  }

  newClientAccountCreate(){

    let aN = "";
    while (aN.length < 9) {
        
        let id = (Math.floor(Math.random() * 10)); 
        aN += id;
    }
    let accNum=aN;
    let accountData: Account;
    accountData.balance = this.balance;
    accountData.overdraft = this.overdraft;
    console.log("Account Created");
    return this.authService.newClientAccountCreate(accNum, this.idToken, accountData).subscribe((res) => {
      console.log("Success"),
      error => alert(error)
    });
  }
  
  logout() {    
    this.authService.logout();   
    ////Testing LogOut: Comment Below and Uncomment Above 
    // this.router.navigate(['home']);
  }
}
