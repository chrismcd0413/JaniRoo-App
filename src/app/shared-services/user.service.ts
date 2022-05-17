import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user;
  constructor() { }
  get details() {
    return {...this.user};
  }
  setUser(user) {
    this.user = user;
  }
  clearUser() {
    this.user = null;
  }
}
