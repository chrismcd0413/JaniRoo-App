import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent implements OnInit, OnDestroy {
  checklist = [
    {
      title: 'Clean HR Area',
      complete: true,
      id: '1'
    },
    {
      title: 'Front Bathrooms',
      complete: true,
      id: '2'
    },
    {
      title: 'Back Bathrooms',
      complete: false,
      id: '3'
    },
    {
      title: 'Breakroom',
      complete: false,
      id: '4'
    },
  ];
  private checklistId;
  private subs: Subscription[] = [];
  constructor(
    private navController: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // SET UP QUERY PARAM SUBSCRIPTION
    this.subs.push(
      this.route.queryParams.subscribe(x => {
        this.checklistId = x.id;
      })
    );
  }
  ngOnDestroy(): void {
      this.subs.forEach(x => x.unsubscribe());
  }
  goBack() {
    this.navController.pop();
  }
  enterTaskDetails(id) {
    this.navController.navigateForward(['taskDetail'], {relativeTo: this.route, queryParams: {checklistId: this.checklistId, taskId: id}});
  }
}
