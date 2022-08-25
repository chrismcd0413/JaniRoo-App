/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { Geolocation } from '@capacitor/geolocation';
// import * as turf from '@turf/helpers';
import { booleanPointInPolygon, point } from '@turf/turf';
import circle from '@turf/circle';
import { Timestamp } from '@firebase/firestore';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private subs: Subscription[] = [];
  private isCheckedIn = new BehaviorSubject(false);
  private _activeTimesheet = new BehaviorSubject(null);
  private accounts;
  constructor(
    private loadingController: LoadingController,
    private userService: UserService,
    private fb: AngularFirestore,
    private alertController: AlertController,
    private router: Router,
    private firestoreService: FirestoreService
  ) { this.initTimeService(); }
  get checkInStatus() {
    return this.isCheckedIn.asObservable();
  }
  get activeTimesheet() {
    return this._activeTimesheet.asObservable();
  }
  get activeTimesheetSnapshot() {
    return this._activeTimesheet.value;
  }
  initTimeService() {
    console.log('SET UP TIME SERVICE SUBS');
    this.userService.userObservable.subscribe((userObject) => {
      console.log('Changed User Object: ', JSON.stringify(userObject));
      if (userObject && userObject.onDuty) {
        this.fb
          .collection('Timesheets')
          .doc(userObject.activeTimesheet)
          .valueChanges({ idField: 'id' })
          .subscribe((activeTS) => this._activeTimesheet.next(activeTS));
        this.isCheckedIn.next(true);
      } else {
        this._activeTimesheet.next(null);
        this.isCheckedIn.next(false);
      }
    });


    this.userService.companyAccounts.subscribe((x) => (this.accounts = x));
  }
  async checkIn(account, query?) {
    // PRESENT LOADING INDICATOR

    this.createLoadingIndicator('Checking you in...')
    .then(loadingIndicator => {
      loadingIndicator.present();
       // CHECK IF GEO IS ENABLED ON LOCATION
    // IF YES, CHECK IF USER IS IN RADIUS
    // ENABLE BACKGROUND TRACKING IF USER IS IN RADIUS
    // CREATE TIMESHEET
    // UPDATE CHECKED IN STATUS
    const acct = this.accounts.find((x) => x.id === account.acct);
    const location = acct.locations.find((x) => x.id === account.loc);
    console.log('Found Location: ', JSON.stringify(location));
    console.log('Geo Enabled: ', location.geo_enabled);
    if (location.geo_enabled) {
      console.log('Starting location check');
      const locationGeo = [
        location.address.geo.lng,
        location.address.geo.lat
      ];
      const radius = location.geo_radius / 1000;

      console.log('about to check circle ');
      console.log('Radius (km): ', radius);
      const polyToCheck = circle(locationGeo, radius);
      console.log('Location Geo: ', locationGeo);
      Geolocation.checkPermissions().then(permissions => {
        console.log('Permissions: ', JSON.stringify(permissions));
        if (permissions.location !== 'granted') {
          loadingIndicator.dismiss();
          Geolocation.requestPermissions();
        }
      });
      Geolocation.getCurrentPosition({
        enableHighAccuracy: false,
        maximumAge: 10000,
        timeout: 5000
      })
      .then(coordinates => {
        console.log('Current Location:', JSON.stringify(coordinates.coords));
        console.log('about to check circle 2');
        console.log('Made it past circle ');
        const isInPoly = booleanPointInPolygon(
          [coordinates.coords.longitude, coordinates.coords.latitude],
          polyToCheck
        );
        console.log('Poly result: ', isInPoly);
        if (isInPoly) {
          this.createTimesheet(account.acct, account.loc, query);
          loadingIndicator.dismiss();
        } else {
          loadingIndicator.dismiss();
          this.createAlert('Error', 'Not at facility');
        }
      }, (err) => {
        console.log('LOCATION ERROR: ', JSON.stringify(err));
      })
      .catch((error) => {
        console.log('Error getting location ');
        loadingIndicator.dismiss();
        this.createAlert('Error', 'Unable to get location. Please check settings and try again');
      });
    } else {
      this.createTimesheet(account.acct, account.loc, query);
      loadingIndicator.dismiss();

    }

    // DISMISS LOADING INDICATOR
    // loadingIndicator.dismiss();
    });
  }
  async checkOut() {
    // CAN DELETE LATER, SIMULATING LOADING TIME


    // PRESENT LOADING INDICATOR

    const loadingIndicator = this.createLoadingIndicator('Checking you out...');
    (await loadingIndicator).present();

    // CLOSE TIMESHEET

    this.fb.collection('Timesheets').doc(this._activeTimesheet.value.id).update({clock_out_time: Timestamp.fromDate(new Date())})
    .then(() => {
      this.fb.collection('Users').doc(this.userService.details.id).update({onDuty: false, activeTimesheet: ''});
      this.router.navigate(['/tabs', 'schedule']);
    })
    .catch((error) => this.createAlert('Error', error.message));

    this._activeTimesheet.next(null);

    // DISABLE GEO TRACKING IF ENABLED
    // UPDATE CHECKED IN STATUS

    this.isCheckedIn.next(false);


    // DISMISS LOADING INDICATOR ONCE FINISHED

    (await loadingIndicator).dismiss();

    // NAVIGATE BACK TO SCHEDULES
  }

  createTimesheet(account, location, query?) {
    const newTimesheet = {
      clock_in_time: Timestamp.fromDate(new Date()),
      companyId: this.userService.details.companyId,
      location: {acct: account, loc: location},
      user: this.userService.details.id,
      query_start: this.firestoreService.generateQueryDateLocal(moment()),
      scheduleQuery: this.firestoreService.generateQueryDateLocal(moment())
    };
    if (query) {
      newTimesheet.scheduleQuery = query;
    }
    this.fb.collection('Timesheets').add(newTimesheet)
    .then(timesheet => {
      this.fb.collection('Users').doc(this.userService.details.id).update({onDuty: true, activeTimesheet: timesheet.id});
    });
  }
  createAlert(_header, _message) {
    this.alertController
      .create({
        header: _header,
        message: _message,
      })
      .then((x) => x.present());
  }
  createLoadingIndicator(message) {
    return this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'loading-indicator',
      // eslint-disable-next-line object-shorthand
      message: message,
    });
  }
}
