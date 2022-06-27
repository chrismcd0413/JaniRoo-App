import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared-services/user.service';

@Component({
  selector: 'app-location-dashboard',
  templateUrl: './location-dashboard.page.html',
  styleUrls: ['./location-dashboard.page.scss'],
})
export class LocationDashboardPage implements OnInit, OnDestroy {
  pageAccount;
  private accounts;
  private subs: Subscription[] = [];
  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.userService.companyAccounts.subscribe(a => {
        this.accounts = a;
        this.subs.push(
          this.activatedRoute.queryParams.subscribe(params => {
            this.accounts.find(x => x.id === params.account);
          })
        );
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }
  goBack() {
    this.navController.pop();
  }
  enterInspection() {
    this.navController.navigateForward(['inspection'], { relativeTo: this.activatedRoute});
  }
  enterInventory() {
    this.navController.navigateForward(['inventory'], { relativeTo: this.activatedRoute});
  }
}
