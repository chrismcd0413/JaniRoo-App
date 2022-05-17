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
  constructor(
    private auth: AngularFireAuth,
    private user: UserService,
    private alertController: AlertController,
    private router: Router,
    private fb: FirestoreService
  ) { }
  login(email: string, password: string) {
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
  }
  initAuthListener() {
    this.subs.push(
      this.auth.authState.subscribe((user) => {
        if (user) {
          this.isAuthenticated = true;
          this.setUserData(user);
        } else {
          this.user.clearUser();
          this.router.navigate(['/login']);
        }
      })
    );
  }
  setUserData(user) {
    this.fb.fetchUserProfile(user.uid).subscribe((profile) => {
      this.user.setUser(profile);
      if (this.firstRun) {
        this.router.navigate(['/']);
        this.firstRun = false;
      }
    });
  }
  isAuth() {
    return this.isAuthenticated;
  }
}
