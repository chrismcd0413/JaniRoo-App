import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private subs: Subscription[] = [];
  private firstRun = true;
  private fetchUserProfileSub: Subscription;
  constructor(
    private auth: AngularFireAuth,
    private user: UserService,
    private alertController: AlertController,
    private router: Router,
    private fb: FirestoreService
  ) { }
  login(email: string, password: string) {
    console.log('FR STATUS: ', this.firstRun);
    this.auth.signInWithEmailAndPassword(email, password)
    .catch((error) => {
      this.alertController.create({
        header: 'Error',
        message: error.message
      }).then((x) => x.present());
    });
  }
  logout() {
    this.auth.signOut();
    this.firstRun = true;
    this.fetchUserProfileSub.unsubscribe();
  }
  initAuthListener() {
    this.subs.push(
      this.auth.authState.subscribe((user) => {
        if (user) {
          console.log('AUTH STATE YES');
          this.isAuthenticated = true;
          this.setUserData(user);
        } else {
          console.log('AUTH STATE NO FRSTATUS: ', this.firstRun);
          this.isAuthenticated = false;
          this.user.clearUser();
          this.router.navigate(['/login']);
        }
      })
    );
  }
  setUserData(user) {
    this.fetchUserProfileSub = this.fb.fetchUserProfile(user.uid).subscribe((profile) => {
      this.user.setUser(profile);
      console.log('PROFILE CHANGED: ', JSON.stringify(profile));
      this.fb.fetchLocations().subscribe((accounts) => this.user.setAccounts(accounts));
      this.fb.fetchCompanyUsers().subscribe(users => this.user.setUsers(users));
      if (this.firstRun) {
        console.log('NAVIGATING TO MAIN SCREEN');
        this.router.navigate(['/'], {replaceUrl: true});
        this.firstRun = false;
      }
    });
  }
  isAuth() {
    return this.isAuthenticated;
  }

}
