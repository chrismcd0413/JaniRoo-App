import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
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
}
