import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LocationDashboardService } from '../shared-services/Location Dashboard/location-dashboard.service';
import { UserService } from '../shared-services/user.service';

@Component({
  selector: 'app-locations',
  templateUrl: 'locations.page.html',
  styleUrls: ['locations.page.scss'],
})
export class LocationsPage implements OnInit, OnDestroy {
  userLocations;
  accounts;
  private subs: Subscription[] = [];
  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private locationService: LocationDashboardService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.userService.permissions.subscribe(userPermissions => this.userLocations = userPermissions)
    );
    this.subs.push(
      this.userService.companyAccounts.subscribe(_accounts => this.accounts = _accounts)
    );
  }
  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }
  enterLocation(id) {

    this.locationService.setActiveLocation(id);

    this.navController.navigateForward(['location-dashboard'], {
      relativeTo: this.activatedRoute
    });
  }
}
