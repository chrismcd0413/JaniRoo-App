/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private isCheckedIn = new BehaviorSubject(false);
  private _activeTimesheet = new BehaviorSubject(null);
  constructor(
    private loadingController: LoadingController
  ) { }
  get checkInStatus() {
    return this.isCheckedIn.asObservable();
  }
  get activeTimesheet() {
    return this._activeTimesheet.asObservable();
  }
  async checkIn(id, label) {
    // CAN DELETE LATER, SIMULATING LOADING TIME

    const delay = ms => new Promise(res => setTimeout(res, ms));

    // PRESENT LOADING INDICATOR

    const loadingIndicator = this.createLoadingIndicator('Checking you in...');
    (await loadingIndicator).present();
    await delay(5000);

    // CHECK IF GEO IS ENABLED ON LOCATION
    // IF YES, CHECK IF USER IS IN RADIUS
    // ENABLE BACKGROUND TRACKING IF USER IS IN RADIUS
    // CREATE TIMESHEET
    // UPDATE CHECKED IN STATUS

    this.isCheckedIn.next(true);
    this._activeTimesheet.next({locId: id, locationLabel: label, start: new Date(), end: null});

    // DISMISS LOADING INDICATOR

    (await loadingIndicator).dismiss();

    // NAVIGATE TO WORK PAGE AUTOMAGICALLY
  }
  async checkOut() {
    // CAN DELETE LATER, SIMULATING LOADING TIME

    const delay = ms => new Promise(res => setTimeout(res, ms));

    // PRESENT LOADING INDICATOR

    const loadingIndicator = this.createLoadingIndicator('Checking you out...');
    (await loadingIndicator).present();
    await delay(5000);

    // CLOSE TIMESHEET

    const newTS = {...this._activeTimesheet.value};
    newTS.end = new Date();
    console.log('FINAL TS: ', JSON.stringify(newTS));
    this._activeTimesheet.next(null);

    // DISABLE GEO TRACKING IF ENABLED
    // UPDATE CHECKED IN STATUS

    this.isCheckedIn.next(false);

    // DISMISS LOADING INDICATOR ONCE FINISHED

    (await loadingIndicator).dismiss();

    // NAVIGATE BACK TO SCHEDULES
  }
  createLoadingIndicator(message) {
    return this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'loading-indicator',
      // eslint-disable-next-line object-shorthand
      message: message
    });
  }
}
