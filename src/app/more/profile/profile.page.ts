/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/shared-services/firestore.service';
import { MoreDataService } from 'src/app/shared-services/more/more-data.service';
import { UserService } from 'src/app/shared-services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  user;
  form: FormGroup;
  private subs: Subscription[] = [];
  constructor(
    private userService: UserService,
    private moreDataService: MoreDataService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: []
      }),
      phone: new FormControl('', {
        validators: [Validators.required]
      }),
      address1: new FormControl('', {
        validators: [Validators.required]
      }),
      address2: new FormControl('', {
        validators: []
      }),
      city: new FormControl('', {
        validators: [Validators.required]
      }),
      state: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(2), Validators.minLength(2)]
      }),
      zip: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(5)]
      }),
    });
    this.form.get('email').disable({emitEvent: false});
    this.subs.push(
      this.userService.userObservable.subscribe(returnedUser => {
        this.user = returnedUser;
        this.form.get('email').patchValue(returnedUser.email);
        this.form.get('phone').patchValue(returnedUser.phone_number);
        this.form.get('address1').patchValue(returnedUser.address.address1);
        this.form.get('address2').patchValue(returnedUser.address.address2);
        this.form.get('city').patchValue(returnedUser.address.city);
        this.form.get('state').patchValue(returnedUser.address.state);
        this.form.get('zip').patchValue(returnedUser.address.zip);
      })
    );
  }
  saveProfile() {
    this.loadingController.create({
      message: 'Saving Profile',
      spinner: 'circular'
    }).then(loadingIndicator => {
      loadingIndicator.present();
      const formValue = this.form.value;
      const updatedProfile = {
        phone_number: formValue.phone,
        address: {
          address1: formValue.address1,
          address2: formValue.address2,
          city: formValue.city,
          state: formValue.state.toUpperCase(),
          zip: formValue.zip
        }
      };
      this.moreDataService.updateProfile(updatedProfile).then(() => loadingIndicator.dismiss())
      .catch((reason) => {
        this.moreDataService.createToast('Unknown Error: Please try again', 5000);
        loadingIndicator.dismiss();
      });
    });

  }
  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }
}
