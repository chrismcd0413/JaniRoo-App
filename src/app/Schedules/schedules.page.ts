/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { Subscription } from 'rxjs';
import { FirestoreService } from '../shared-services/firestore.service';
import { SchedulesService } from '../shared-services/Schedules/schedules.service';
import { TimeService } from '../shared-services/Time/time.service';
import { UserService } from '../shared-services/user.service';
import { Timestamp } from '@firebase/firestore';
import { ChecklistService } from '../shared-services/checklist/checklist.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'schedules.page.html',
  styleUrls: ['schedules.page.scss']
})
export class SchedulesPage implements OnInit, OnDestroy {
  coUsers = [];
  accounts = [];
  todaysSchedules = [];
  upcomingSchedules = [];
  activeTimesheet;
  isCheckedIn;
  view = 'today';
  greetingMessage = 'Hello';
  private subs: Subscription[] = [];
  constructor(
    private timeService: TimeService,
    private router: Router,
    private route: ActivatedRoute,
    private navController: NavController,
    private userService: UserService,
    private schedulesService: SchedulesService,
    private fbService: FirestoreService,
    private checklistService: ChecklistService
  ) {}

  ngOnInit(): void {
      this.subs.push(
        this.timeService.checkInStatus.subscribe(x => this.isCheckedIn = x)
      );
      this.subs.push(
        this.timeService.activeTimesheet.subscribe(x => this.activeTimesheet = x)
      );
      this.subs.push(
        this.userService.companyUsers.subscribe(users => this.coUsers = users)
      );
      this.subs.push(
        this.userService.companyAccounts.subscribe(accts => {
          this.accounts = accts;
        })
      );
      this.subs.push(
        this.schedulesService.fetchTodaysSchedules(this.fbService.generateQueryDateLocal(moment()))
        .subscribe(schedules => this.todaysSchedules = schedules)
      );
      this.subs.push(
        this.schedulesService.fetchUpcomingSchedules(Timestamp.fromMillis(moment().startOf('day').add(1, 'd').valueOf()))
        .subscribe(upcoming => this.upcomingSchedules = upcoming)
      );
  }

  ngOnDestroy(): void {
      this.subs.forEach(x => x.unsubscribe());
  }
  ionViewWillEnter() {
    console.log('Schedules page URL', this.router.url);
    const nowHour = moment().get('hour');
    if (nowHour < 12) {
      this.greetingMessage = 'Good Morning';
    }
    if (nowHour > 12 && nowHour < 17) {
      this.greetingMessage = 'Good Afternoon';
    }
    if (nowHour > 17) {
      this.greetingMessage = 'Good Evening';
    }
  }
  checkInToLocation(location) {
    this.timeService.checkIn(location);
  }
  segmentChanged(e) {
    this.view = e.detail.value;
  }
  navigateToLocation(id) {
    this.checklistService.setWorkLocation({acct: id.acct, loc: id.loc});
    const relativeRoute = this.router.createUrlTree(['work'], {relativeTo: this.route});
    this.navController.navigateForward(relativeRoute);
    // this.navController.navigateForward(['work'], {relativeTo: this.route, queryParams: {account: id.acct, location: id.loc}});
  }
}
