import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeService } from '../shared-services/Time/time.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
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
  private subs: Subscription[] = [];
  constructor(
    private timeService: TimeService
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

  checkInToLocation(id, label) {
    this.timeService.checkIn(id, label);
  }
}
