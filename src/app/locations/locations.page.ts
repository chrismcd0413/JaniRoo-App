import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-locations',
  templateUrl: 'locations.page.html',
  styleUrls: ['locations.page.scss']
})
export class LocationsPage {
  locations = [
    {
      name: 'Republic Waste - Longview',
      id: '1',
      address: '123 Main St. Longview, TX 76132'
    },
    {
      name: 'Republic Waste - Kilgore',
      id: '2',
      address: '123 Main St. Kilgore, TX 76132'
    },
    {
      name: 'Republic Waste - Tyler',
      id: '3',
      address: '123 Main St. Tyler, TX 76132'
    },
  ];
  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) {}

  enterLocation(id) {

    this.navController.navigateForward(['location-dashboard'], {relativeTo: this.activatedRoute, queryParams:{location: id}});
  }
}
