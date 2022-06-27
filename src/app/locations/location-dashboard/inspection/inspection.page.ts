import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.page.html',
  styleUrls: ['./inspection.page.scss'],
})
export class InspectionPage implements OnInit {

  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  goBack() {
    this.navController.pop();
  }

  enterInspectionTaskDetail() {
    this.navController.navigateForward(['inspection-detail'], { relativeTo: this.activatedRoute });
  }
}
