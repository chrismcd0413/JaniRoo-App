/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class MoreDataService {

  constructor(
    private fb: AngularFirestore,
    private user: UserService,
    private toastController: ToastController
  ) { }

  updateProfile(fieldsToUpdate: {
    // eslint-disable-next-line @typescript-eslint/member-delimiter-style
    phone_number: number,
    // eslint-disable-next-line @typescript-eslint/member-delimiter-style
    address: {address1: string, address2: string, city: string, state: string, zip: string}
  }) {
    return this.fb.collection('Users').doc(this.user.details.id).update(fieldsToUpdate);
  }

  fetchTimesheets(start: number, end: number) {
    return this.fb.collection('Timesheets', (ref) =>
    ref
    .where('query_start', '>=', start)
    .where('query_end', '<=', end)
    .where('user', '==', this.user.details.id)).valueChanges({idField: 'id'});
  }

  createToast(_message, _duration) {
    this.toastController.create({
      message: _message,
      duration: _duration
    }).then(x => x.present());
  }
}
