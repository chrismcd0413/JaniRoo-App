/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LocationDashboardService } from 'src/app/shared-services/Location Dashboard/location-dashboard.service';
import { TimeService } from 'src/app/shared-services/Time/time.service';
import { UserService } from 'src/app/shared-services/user.service';

@Component({
  selector: 'app-location-dashboard',
  templateUrl: './location-dashboard.page.html',
  styleUrls: ['./location-dashboard.page.scss'],
})
export class LocationDashboardPage implements OnInit, OnDestroy {
  pageAccount;
  accounts;
  activeTimesheet;
  permission;
  private permissionSub: Subscription;
  private subs: Subscription[] = [];
  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private locationService: LocationDashboardService,
    private timeService: TimeService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.locationService.activeLocation.subscribe(account => {
        this.pageAccount = account;
        if (this.permissionSub) {
          this.permissionSub.unsubscribe();
        }
        this.permissionSub = this.userService.permissions
        .subscribe(permissions => {
          this.permission = permissions.find(x => x.location.acct === account.acct && x.location.loc === account.loc);
        });
      })
    );
    this.subs.push(
      this.userService.companyAccounts.subscribe(coAccounts => this.accounts = coAccounts)
    );
    this.subs.push(
      this.timeService.activeTimesheet.subscribe(timesheet => this.activeTimesheet = timesheet)
    );
  }
  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
    if (this.permissionSub) {
      this.permissionSub.unsubscribe();
    }
  }
  goBack() {
    this.navController.pop();
  }
  enterInspection() {
    this.navController.navigateForward(['inspection'], { relativeTo: this.activatedRoute});
  }
  enterInventory() {
    this.locationService.setLocationInventory();
    this.navController.navigateForward(['inventory'], { relativeTo: this.activatedRoute});
  }
  checkin() {
    this.timeService.checkIn(this.pageAccount);
  }
}
