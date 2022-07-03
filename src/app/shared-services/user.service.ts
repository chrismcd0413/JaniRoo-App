/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user = new BehaviorSubject<any>(null);
  private _permissions = new BehaviorSubject<any[]>(null);
  private _accounts = new BehaviorSubject<any[]>(null);
  private _users = new BehaviorSubject<any[]>(null);
  constructor() { }
  get details() {
    return this._user.value;
  }
  get userObservable() {
    return this._user.asObservable();
  }
  get permissions() {
    return this._permissions.asObservable();
  }
  get companyAccounts() {
    return this._accounts.asObservable();
  }
  get companyUsers() {
    return this._users.asObservable();
  }
  setUser(user) {
    this._user.next(user);
    const activePermissions = user.locations.filter(x => x.active === true);
    this._permissions.next(activePermissions);
  }
  clearUser() {
    this._user.next(null);
  }
  setAccounts(a) {
    this._accounts.next(a);
  }
  setUsers(u) {
    this._users.next(u);
  }
}
