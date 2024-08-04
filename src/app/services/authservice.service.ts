import { Injectable } from '@angular/core';
import { Login } from '../models/loginuser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private generateDummyJwtToken(): string {
    return 'sdhcbbcsahd9873472742398';
  }
  constructor() { }
  login(email: string, password: string): Login {
    if (email.toLowerCase() === "email@gmail.com" && password.toLowerCase() === "password") {
      return {
        Email: email,
        password: password,
        token: this.generateDummyJwtToken()
      };
    }
    return { Email: email, password: password, token: '' };  // Return the input email and password
  }
}
