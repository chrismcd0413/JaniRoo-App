import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.page.html',
  styleUrls: ['./inspection-detail.page.scss'],
})
export class InspectionDetailPage implements OnInit {
  selectedState = 0;
  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navController.pop();
  }
  changeState(bool) {
    this.selectedState = bool;
  }
}
