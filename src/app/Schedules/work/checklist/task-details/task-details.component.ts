/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  subtaskForm = new FormGroup({});
  subtasks = [
    'Dust all desks and computers',
    'Empty all trash',
    'Disinfect doorhandles, keyboards, mice and phones'
  ];
  private subs: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.subs.push(
      this.route.queryParams.subscribe(x => {
        console.log(JSON.stringify(x));
        this.subtasks.forEach((sub, i) => this.subtaskForm.addControl(i.toString(), new FormControl(false, {validators: [Validators.requiredTrue]})));
      })
    );
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
}
