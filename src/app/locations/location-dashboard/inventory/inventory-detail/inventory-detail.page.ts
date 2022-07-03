import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { LocationDashboardService } from 'src/app/shared-services/Location Dashboard/location-dashboard.service';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.page.html',
  styleUrls: ['./inventory-detail.page.scss'],
})
export class InventoryDetailPage implements OnInit {
  form: FormGroup;
  item;
  constructor(
    private navController: NavController,
    private locationService: LocationDashboardService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      quantity: new FormControl('', {validators: [Validators.required]})
    });
    this.item = this.locationService.activeInventoryItem;
  }
  async updateInventoryQuantity() {
    const loading = await this.loadingController.create({
      message: 'Saving Inventory'
    });
    loading.present();
    this.locationService.updateInventoryLevel(this.item.id, this.form.value.quantity)
      .then(() => {
        loading.dismiss();
        this.goBack();
      })
      .catch(error => {
        loading.dismiss();
        this.alertController.create({
          message: error.message,
          header: 'Error Saving Inventory'
        }).then(alert => alert.present());
      });
  }
  goBack() {
    this.navController.pop();
  }
}
