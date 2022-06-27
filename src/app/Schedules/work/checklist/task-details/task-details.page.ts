/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ChecklistService } from 'src/app/shared-services/checklist/checklist.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit, OnDestroy {
  subtaskForm = new FormGroup({});
  task;
  private subs: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private checklistService: ChecklistService
  ) { }

  ngOnInit() {
    this.task = this.checklistService.activeTask;
    console.log('Active Task: ', JSON.stringify(this.task));
    this.task.subtasks.forEach((sub, i) => this.subtaskForm.addControl(i.toString(), new FormControl(false, {validators: [Validators.requiredTrue]})));
  }
  ngOnDestroy(): void {
      this.subs.forEach(x => x.unsubscribe());
  }
  goBack() {
    this.navController.pop();
  }
  subtaskClicked(i) {
    const controlString = i.toString();
    const control = this.subtaskForm.controls[controlString];
    control.setValue(!control.value);
  }
  completeTask(status) {
    this.checklistService.changeTask(status).then(() => this.goBack());
  }
}
