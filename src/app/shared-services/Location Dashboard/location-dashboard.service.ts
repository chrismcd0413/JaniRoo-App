/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class LocationDashboardService {
  private _activeLocation = new BehaviorSubject<any>(null);
  private _inventorySub: Subscription;
  private _locationInventory = new BehaviorSubject<any[]>(null);
  private _activeInventoryItem;
  constructor(
    private userService: UserService,
    private fb: AngularFirestore
  ) { }

  get activeLocation() {
    return this._activeLocation.asObservable();
  }
  get locationInventory() {
    return this._locationInventory.asObservable();
  }
  get activeInventoryItem() {
    return this._activeInventoryItem;
  }
  setActiveLocation(location) {
    this._activeLocation.next(location);
  }
  setLocationInventory() {
    if (this._inventorySub) {
      this.unsubscribeFromInventoryUpdates();
    }
    this._inventorySub = this.getLocationInventory(this._activeLocation.value)
      .subscribe(inventory => this._locationInventory.next(inventory));
  }
  setActiveInventoryItem(item) {
    this._activeInventoryItem = item;
  }
  unsubscribeFromInventoryUpdates() {
    this._inventorySub.unsubscribe();
  }
  getLocationInventory(location) {
    return this.fb.collection('Inventory Items', (ref) =>
    ref
      .where('companyId', '==', this.userService.details.companyId)
      .where('location.acct', '==', location.acct)
      .where('location.loc', '==', location.loc)
      ).valueChanges({ idField: 'id'});
  }

  updateInventoryLevel(itemId, quantity) {
    return this.fb.collection('Inventory Items').doc(itemId).update({current: quantity});
  }
}
