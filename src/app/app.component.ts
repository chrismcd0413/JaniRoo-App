import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from './shared-services/auth.service';
import { TimeService } from './shared-services/Time/time.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy{
  activeShiftVisible = false;
  isCheckedIn = false;
  private subs: Subscription[] = [];
  constructor(
    private auth: AuthService,
    private router: Router,
    private timeService: TimeService
  ) {
    // Setup Auth Listener
    this.auth.initAuthListener();

    this.subs.push(
      this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd)
      )
      .subscribe(event => {
        if (event.url === '/login') {
          this.activeShiftVisible = false;
        }
        else {
          this.activeShiftVisible = true;
        }
      })
    );
    this.subs.push(
      this.timeService.checkInStatus.subscribe(x => this.isCheckedIn = x)
    );
  }
  ngOnDestroy(): void {
      this.subs.forEach(x => x.unsubscribe());
  }
}
