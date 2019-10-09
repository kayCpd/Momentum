import { Injectable } from '@angular/core';
import{ CanActivate, Router} from '@angular/router';
import{ AuthConstants } from '../authConfig/authConstants';
import{ StorageService} from './../services/storage.service';


@Injectable({
  providedIn: 'root'
})

export class homeGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router){}

  canActivate():Promise<boolean> {
    return new Promise(resolve => {
    this.storageService.get(AuthConstants.AUTH)
        .then(res => {
          if(res) {
            this.router.navigate(['account']);
            resolve(false); 
          }
          else {
            resolve(true);
          }
        })
        .catch(err => {
          resolve(false);
        });
     });
  }
  
}
