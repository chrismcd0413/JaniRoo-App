/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ChecklistService } from 'src/app/shared-services/checklist/checklist.service';
import { UserService } from 'src/app/shared-services/user.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit, OnDestroy {
  pageAccount;
  formattedAccountObject;
  accounts;
  activeChecklists;
  userChecklists;
  availableChecklists;
  private todayDOY = new Date().getDay();
  private subs: Subscription[] = [];
  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private checklistService: ChecklistService
  ) {}

  ngOnInit() {
    this.subs.push(
      this.userService.companyAccounts.subscribe((a) => {
        this.accounts = a;
        const workLocation = this.checklistService.workLocation;
        const foundAccount = this.accounts.find((x) => x.id === workLocation.acct);
        const foundLocation = foundAccount.locations.find(
          (x) => x.id === workLocation.loc
        );
        this.pageAccount = foundLocation;
        this.formattedAccountObject = {
          acct: workLocation.acct,
          loc: workLocation.loc,
        };
        this.subs.push(
          this.checklistService
            .getLocationActiveChecklists(workLocation.acct, workLocation.loc)
            .subscribe((cls) => (this.activeChecklists = cls))
        );
        this.subs.push(
          this.checklistService
            .getActiveDailyChecklists(workLocation.acct, workLocation.loc)
            .subscribe((cls) => (this.userChecklists = cls))
        );
        this.subs.push(
          this.checklistService
            .getAvailableChecklists(
              workLocation.acct,
              workLocation.loc,
              this.todayDOY
            )
            .subscribe(
              (cls) =>
                (this.availableChecklists = cls.filter(
                  (x) =>
                    this.activeChecklists.findIndex(
                      (z) => z.templateId === x.id
                    ) === -1
                ))
            )
        );
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
  goBack() {
    this.navController.pop();
  }
  enterChecklist(checklist) {
    this.checklistService.setActiveChecklist(checklist);
    this.navController.navigateForward(['checklist'], {
      relativeTo: this.activatedRoute,
    });
  }
  createChecklistFromTemplate(template){
    this.checklistService.createChecklistFromTemplate(template);
  }
}
