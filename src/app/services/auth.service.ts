import { Injectable } from '@angular/core';
import { AuthConstants } from './../authConfig/authConstants';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData$ = new BehaviorSubject<any>('');

  constructor(private httpService: HttpService,
    private storageService: StorageService,
    private router: Router) { }

    getAuthData(){
//      console.log('auth service');
      this.storageService.get(AuthConstants.AUTH).then(res => {
        this.authData$.next(res);
      });	
    }

    login(loginData: any): Observable<any>{
      return this.httpService.login(loginData);
    }
       
      getClientDetails(localId: string, idToken: string): Observable<any>{
      return this.httpService.getClientDetails(localId, idToken);
      }
       
      
      updateClientAccountList(localId: string, idToken: string, account: any ){
         return this.httpService.updateClientAccountList(localId, idToken, account);
      }
      
      
      getClientAccount(accountNumber: string, idToken: string): Observable<any>{
          return this.httpService.getClientAccount(accountNumber, idToken);
        }
      
      
        updateClientAccountTransaction(accountNumber: string, idToken: string, accountData: any){
          return this.httpService.updateClientAccountTransaction(accountNumber, idToken, accountData);
        }
      
      
        newClientAccountCreate(accountNumber: string, idToken: string, accountData: any){
          return this.httpService.newClientAccountCreate(accountNumber, idToken, accountData);
        }  
            
      logout(){
        this.storageService.removeItem(AuthConstants.AUTH).then(res => {
          this.authData$.next('');
          this.router.navigate(['']);	
          console.log('LoggedOut');
        })
      }

}
