import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LocationDashboardService } from 'src/app/shared-services/Location Dashboard/location-dashboard.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit, OnDestroy {
  inventoryItems;
  equipmentItems;
  private subs: Subscription[] = [];
  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationDashboardService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.locationService.locationInventory.subscribe(items => {
        if (items){
          this.inventoryItems = items.filter(x => x.type === 'Supplies');
          this.equipmentItems = items.filter(x => x.type === 'Equipment');
        } else {
          this.inventoryItems = [];
          this.equipmentItems = [];
        }
      })
    );
  }

  ngOnDestroy() {
      this.subs.forEach(x => x.unsubscribe());
  }
  goBack() {
    this.navController.pop();
    this.locationService.unsubscribeFromInventoryUpdates();
  }
  enterInventoryDetails(item) {
    this.locationService.setActiveInventoryItem(item);
    this.navController.navigateForward(['inventory-detail'], { relativeTo: this.activatedRoute });
  }
}
