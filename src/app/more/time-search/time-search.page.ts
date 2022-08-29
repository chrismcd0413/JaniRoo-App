/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/shared-services/firestore.service';
import { MoreDataService } from 'src/app/shared-services/more/more-data.service';
import { UserService } from 'src/app/shared-services/user.service';
import { Timestamp } from '@firebase/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-time-search',
  templateUrl: './time-search.page.html',
  styleUrls: ['./time-search.page.scss'],
})
export class TimeSearchPage implements OnInit, OnDestroy {
  locations = [];
  timesheets = [];
  startDate: Date;
  endDate: Date;
  forwardDisabled = true;
  accounts = [];
  private subs: Subscription[] = [];
  private indicatorFallback;
  private timesheetSub: Subscription;
  constructor(
    private moreDataService: MoreDataService,
    private userService: UserService,
    private fb: FirestoreService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.subs.push(
      this.userService.companyAccounts.subscribe(returnedLocations => this.locations = returnedLocations)
    );
    this.startDate = moment().startOf('W').toDate();
    this.endDate = moment().endOf('W').toDate();
    this.loadTimesheets(moment(this.startDate.toISOString()), moment(this.endDate.toISOString()));
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
    this.timesheetSub.unsubscribe();
  }

  loadTimesheets(start, end) {
    const query_start = this.fb.generateQueryDateLocal(start);
    const query_end = this.fb.generateQueryDateLocal(end);
    let loading;
    this.loadingController.create({
      message: 'Loading history'
    }).then(loadingIndicator => {
      loadingIndicator.present();
      loading = loadingIndicator;
      if (this.timesheetSub) {
        this.timesheetSub.unsubscribe();
      }
      this.timesheetSub = this.moreDataService.fetchTimesheets(query_start, query_end)
      .subscribe((loadedTimesheets: any[]) => {
        this.timesheets = loadedTimesheets;
        loadingIndicator.dismiss();
        console.log('TS: ', JSON.stringify(loadedTimesheets));
      });
    }).catch(() => {
      this.moreDataService.createToast('Error: Please try again', 5000);
      loading.dismiss();
    });
  }

  changeWeek(forward: boolean) {
    let start = moment();
    let end = moment();
    if (forward) {
      start = moment(this.startDate.toISOString()).add(1, 'week');
      end = moment(this.endDate.toISOString()).add(1, 'week');
    } else {
      start = moment(this.startDate.toISOString()).subtract(1, 'week');
      end = moment(this.endDate.toISOString()).subtract(1, 'week');
    }
    this.startDate = start.toDate();
    this.endDate = end.toDate();

    if (moment() > start && moment() < end) {
      this.forwardDisabled = true;
    } else {
      this.forwardDisabled = false;
    }
    this.loadTimesheets(start, end);
  }
}
