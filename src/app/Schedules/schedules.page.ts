import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { Subscription } from 'rxjs';
import { TimeService } from '../shared-services/Time/time.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'schedules.page.html',
  styleUrls: ['schedules.page.scss']
})
export class SchedulesPage implements OnInit, OnDestroy {
  items = [
    {
      location: 'Republic Waste - Longview',
      locId: '1',
      start: '4/21/22 6:00pm',
      end: '4/23/22 4:00pm',
    },
    {
      location: 'Republic Waste - Kilgore',
      locId: '2',
      start: '4/21/22 6:00pm',
      end: '4/23/22 4:00pm',
    },
    {
      location: 'Republic Waste - Tyler',
      locId: '3',
      start: '4/21/22 6:00pm',
      end: '4/23/22 4:00pm',
    },
    {
      location: 'Republic Waste - Jacksonville',
      locId: '4',
      start: '4/21/22 6:00pm',
      end: '4/23/22 4:00pm',
    },
  ];
  activeTimesheet;
  isCheckedIn;
  view = 'today';
  greetingMessage = 'Hello';
  private subs: Subscription[] = [];
  constructor(
    private timeService: TimeService,
    private router: Router,
    private route: ActivatedRoute,
    private navController: NavController
  ) {}

  ngOnInit(): void {
      this.subs.push(
        this.timeService.checkInStatus.subscribe(x => this.isCheckedIn = x)
      );
      this.subs.push(
        this.timeService.activeTimesheet.subscribe(x => this.activeTimesheet = x)
      );
  }

  ngOnDestroy(): void {
      this.subs.forEach(x => x.unsubscribe());
  }
  ionViewWillEnter() {
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
  checkInToLocation(id, label) {
    this.timeService.checkIn(id, label);
  }
  segmentChanged(e) {
    this.view = e.detail.value;
  }
  navigateToLocation(id) {
    // this.navController.navigateRoot(['work']);
    this.navController.navigateForward(['work'], {relativeTo: this.route, queryParams: {location: id}});
  }
}
