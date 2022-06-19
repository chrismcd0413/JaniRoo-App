import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {

  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {}
  goBack() {
    this.navController.navigateBack('/tabs/schedule');
  }
  enterChecklist(checklistId) {
    this.navController.navigateForward('/tabs/schedule/work/checklist', {queryParams: {id: checklistId}});
  }
}
