import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import * as moment from 'moment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private fb: AngularFirestore,
    private functions: AngularFireFunctions,
    private user: UserService
  ) { }
  get companyId() {
    return this.user.details.companyId;
  }
  fetchUserProfile(id: string) {
    return this.fb.collection('Users').doc(id).valueChanges({idField: 'id'});
  }
  fetchLocations() {
    return this.fb.collection('Accounts', (ref) =>
    ref.where('companyId', '==', this.companyId))
    .valueChanges({ idField: 'id'});
  }
  fetchCompanyUsers() {
    return this.fb.collection('Users', (ref) =>
    ref.where('companyId', '==', this.companyId)
    )
    .valueChanges({ idField: 'id'});
  }

  // General functions
  generateQueryDateFirestore(m, tz) {
    const initial = moment(m).tz(tz);
    const year = initial.format('YY');
    const month = +initial.format('MM') + 10;
    const day = +initial.format('DD') + 10;
    const formattedString = year + month.toString() + day.toString();
    return +formattedString;
  }
  generateQueryDateLocal(m) {
    const initial = moment(m);
    const year = initial.format('YY');
    const month = +initial.format('MM') + 10;
    const day = +initial.format('DD') + 10;
    const formattedString = year + month.toString() + day.toString();
    return +formattedString;
  }
  generateRandomId(l: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < l; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log('ID GENERATED: ', result);
    return result;
  }
}
