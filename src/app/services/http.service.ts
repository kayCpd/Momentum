import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable} from 'rxjs';
import{ Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl;
  
  constructor(private http: HttpClient) {
    this.apiUrl = 'https://momentum-retail-practical-test.firebaseio.com';
  }

  login(data :any){
      const headers = new HttpHeaders();
      const options = { headers : headers, returnSecureToken : true };
      const url = environment.loginUrl;

      return this.http.post(url, JSON.stringify(data), options);
  }

 
  getClientDetails(localId: string, idToken: string ){
    return this.http.get(this.apiUrl+'/clients/'+localId+'.json?auth='+idToken);
  }


  updateClientAccountList(localId: string, idToken: string, account: any){
    return this.http.put(this.apiUrl+'/clients/'+localId+'/accounts.json?auth='+idToken, {accounts: account});
  }

  getClientAccount(accountNumber: string, idToken: string){
    return this.http.get(this.apiUrl+'/accounts/'+accountNumber+'.json?auth='+idToken);
  }


  updateClientAccountTransaction(accountNumber: string, idToken: string, accountData: Account){
    return this.http.put(this.apiUrl+'/accounts/'+accountNumber+'.json?auth='+idToken, {balance: accountData.balance, overdraft: accountData.overdraft});
  }


  newClientAccountCreate(accountNumber: string, idToken: string, accountData: Account){
    return this.http.put(this.apiUrl+'/accounts/'+accountNumber+'.json?auth='+idToken, {balance: accountData.balance, overdraft: accountData.overdraft});
  }

}
