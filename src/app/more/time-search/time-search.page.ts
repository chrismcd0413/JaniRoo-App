/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/shared-services/firestore.service';
import { MoreDataService } from 'src/app/shared-services/more/more-data.service';
import { UserService } from 'src/app/shared-services/user.service';

@Component({
  selector: 'app-time-search',
  templateUrl: './time-search.page.html',
  styleUrls: ['./time-search.page.scss'],
})
export class TimeSearchPage implements OnInit, OnDestroy {
  locations;
  timesheets = [];
  startDate: Date;
  endDate: Date;
  forwardDisabled = true;
  private subs: Subscription[] = [];
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
    console.log('Start Date: ', this.startDate);
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  loadTimesheets(start, end) {
    const query_start = this.fb.generateQueryDateLocal(start);
    const query_end = this.fb.generateQueryDateLocal(end);

    this.loadingController.create({
      message: 'Loading history'
    }).then(loadingIndicator => {
      loadingIndicator.present();
      this.moreDataService.fetchTimesheets(query_start, query_end)
      .subscribe(loadedTimesheets => {
        this.timesheets = loadedTimesheets;
        loadingIndicator.dismiss();
      }, () => {
        this.moreDataService.createToast('Error: Please try again', 5000);
        loadingIndicator.dismiss();
      });
    });
  }

  changeWeek(forward: boolean) {
    let start;
    let end;
    if (forward) {
      start = moment(this.startDate.toISOString()).add(1, 'week');
      end = moment(this.endDate.toISOString()).add(1, 'week');
    } else {
      start = moment(this.startDate.toISOString()).subtract(1, 'week');
      end = moment(this.endDate.toISOString()).subtract(1, 'week');
    }
    this.startDate = start;
    this.endDate = end;

    if (moment() > start && moment() < end) {
      this.forwardDisabled = true;
    } else {
      this.forwardDisabled = false;
    }
    // this.loadTimesheets(start, end);
  }
}
