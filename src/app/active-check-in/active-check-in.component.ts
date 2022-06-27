import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeService } from '../shared-services/Time/time.service';
import { UserService } from '../shared-services/user.service';

@Component({
  selector: 'app-active-check-in',
  templateUrl: './active-check-in.component.html',
  styleUrls: ['./active-check-in.component.scss'],
})
export class ActiveCheckInComponent implements OnInit, OnDestroy {
  activeTimesheet;
  accounts;
  private subs: Subscription[] = [];
  constructor(
    private timeService: TimeService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.timeService.activeTimesheet.subscribe(timesheet => this.activeTimesheet = timesheet)
    );
    this.subs.push(
      this.userService.companyAccounts.subscribe(x => this.accounts = x)
    );
  }
  ngOnDestroy() {
      this.subs.forEach(x => x.unsubscribe());
  }
  checkOutOfLocation(){
    this.timeService.checkOut();
  }
}
