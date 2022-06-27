import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.page.html',
  styleUrls: ['./inventory-detail.page.scss'],
})
export class InventoryDetailPage implements OnInit {
  form: FormGroup;
  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      quantity: new FormControl('', {validators: [Validators.required]})
    });
  }

  goBack() {
    this.navController.pop();
  }
}
