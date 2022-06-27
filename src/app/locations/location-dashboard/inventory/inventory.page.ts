import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navController.pop();
  }
  enterInventoryDetails() {
    this.navController.navigateForward(['inventory-detail'], { relativeTo: this.activatedRoute });
  }
}
