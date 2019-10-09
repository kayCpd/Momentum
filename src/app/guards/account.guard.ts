import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import{ CanActivate, Router} from '@angular/router';
import{ AuthConstants } from '../authConfig/authConstants';
import{ StorageService} from './../services/storage.service';



@Injectable({
  providedIn: 'root'
})

  export class accountGuard implements  CanActivate{
  
    constructor(private storageService: StorageService, private router: Router){}

    canActivate():Promise<boolean> {
      return new Promise(resolve => {
      this.storageService.get(AuthConstants.AUTH)
          .then(res => {
            if(res) {
              resolve(true);              
            }
            else {
              this.router.navigate(['']);
              resolve(false);
            }
          })
          .catch(err => {
            resolve(false);
          });
       });
    }

  }
