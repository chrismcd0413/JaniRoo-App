import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ChecklistService } from 'src/app/shared-services/checklist/checklist.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit, OnDestroy {
  checklist;
  private subs: Subscription[] = [];
  constructor(
    private navController: NavController,
    private route: ActivatedRoute,
    private checklistService: ChecklistService
  ) { }

  ngOnInit() {
    // this.checklist = this.checklistService.activeChecklistObservable;
    this.subs.push(
      this.checklistService.activeChecklistObservable.subscribe(x => this.checklist = x)
    );
  }
  ngOnDestroy(): void {
      this.subs.forEach(x => x.unsubscribe());
  }
  goBack() {
    this.navController.pop();
  }
  enterTaskDetails(id, index) {
    this.checklistService.setActiveTask(id, index);
    this.navController.navigateForward(['task-details'], {relativeTo: this.route});
  }
}
