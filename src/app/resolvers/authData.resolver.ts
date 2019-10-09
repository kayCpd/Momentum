import{ AuthService} from './../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class AuthDataResolver{
	constructor(private authService: AuthService) {}

	resolve(){
		return this.authService.getAuthData();
	}
}

