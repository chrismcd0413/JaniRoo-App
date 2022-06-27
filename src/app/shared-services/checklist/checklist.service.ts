/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private _activeChecklistSubject = new BehaviorSubject<any>(null);
  private _activeChecklist;
  private _workLocation;
  private _activeTask;
  private activeTaskIndex;
  private activeChecklistSub: Subscription;
  private loadedActiveChecklist = false;
  constructor(private fb: AngularFirestore, private userService: UserService
    , private alertController: AlertController, private firebaseService: FirestoreService,
    private loadingController: LoadingController) {}

  get activeChecklistObservable() {
    return this._activeChecklistSubject.asObservable();
  }
  get activeChecklist() {
    return this._activeChecklist;
  }
  get workLocation() {
    return this._workLocation;
  }
  get activeTask() {
    return this._activeTask;
  }
  getLocationActiveChecklists(acct, loc) {
    return this.fb
      .collection('Active Checklists', (ref) =>
        ref
          .where('companyId', '==', this.userService.details.companyId)
          .where('location.acct', '==', acct)
          .where('location.loc', '==', loc)
          .where('complete', '==', false)
          .where('type', '!=', 'Daily')
      )
      .valueChanges({ idField: 'id' });
  }
  getActiveDailyChecklists(acct, loc) {
    return this.fb
      .collection('Active Checklists', (ref) =>
        ref
          .where('companyId', '==', this.userService.details.companyId)
          .where('location.acct', '==', acct)
          .where('location.loc', '==', loc)
          .where('complete', '==', false)
          .where('type', '==', 'Daily')
          .where('user', '==', this.userService.details.id)
      )
      .valueChanges({ idField: 'id' });
  }
  getAvailableChecklists(acct, loc, doy) {
    return this.fb
      .collection('Checklist Templates', (ref) =>
        ref
          .where('companyId', '==', this.userService.details.companyId)
          .where('location.acct', '==', acct)
          .where('location.loc', '==', loc)
          .where('type', '==', 'Daily')
          .where('weekdays', 'array-contains', doy)
      )
      .valueChanges({ idField: 'id' });
  }

  setActiveChecklist(checklist) {
    this._activeChecklist = checklist;
    if (this.loadedActiveChecklist) {
      this.unsubscribeFromChecklistUpdates();
      // this.loadedActiveChecklist = true;
    }
    this.fb.collection('Active Checklists').doc(checklist.id).valueChanges({ idField: 'id'})
      .subscribe(CL => {
        console.log('FOUND CHECKLIST :', JSON.stringify(CL));
        this._activeChecklistSubject.next(CL);
        this._activeChecklist = CL;
      });
  }
  unsubscribeFromChecklistUpdates() {
    this.activeChecklistSub.unsubscribe();
  }
  setWorkLocation(object) {
    this._workLocation = object;
  }
  setActiveTask(task, index) {
    this._activeTask = task;
    this.activeTaskIndex = index;
  }

  changeTask(status) {
    this._activeChecklist.tasks[this.activeTaskIndex].completed = status;
    const completed = this._activeChecklist.tasks.filter(
      (x) => x.completed === true
    );
    let clComplete = false;
    if (this._activeChecklist.tasks.length === completed.length && this._activeChecklist.type === 'Daily') {
      clComplete = true;
    }
    return this.fb
      .collection('Active Checklists')
      .doc(this._activeChecklist.id)
      .update({ tasks: this._activeChecklist.tasks, complete: clComplete })
      .catch((error) => this.displayAlert('Error Saving Task', error.message));
  }

  async createChecklistFromTemplate(template) {
    console.log('CREATING FROM TEMPLATE: ', JSON.stringify(template));
    const loadingIndicator = await this.loadingController.create({message: 'Creating checklist'});
    loadingIndicator.present();
    const taskHolder = [];
    template.tasks.forEach(task => {
      const newTask = {
        completed: false,
        description: task.description,
        id: this.firebaseService.generateRandomId(15),
        photo_required: task.photo_required,
        subtasks: task.subtasks,
        templateId: task.id,
        title: task.title
      };
      taskHolder.push(newTask);
    });
    const active = {
      companyId: template.companyId,
      complete: false,
      location: template.location,
      query: this.firebaseService.generateQueryDateLocal(moment()),
      tasks: taskHolder,
      templateId: template.id,
      title: template.title,
      type: template.type,
      tzId: template.tzId,
      user: this.userService.details.id
    };
    console.log('CREATING ACTIVE: ', JSON.stringify(active));
    this.fb.collection('Active Checklists').doc().set(active)
    .then(() => loadingIndicator.dismiss())
    .catch(error => {
      loadingIndicator.dismiss();
      this.displayAlert('Error creating checklist', error.message);
    });
  }
  displayAlert(_header, _message) {
    this.alertController
      .create({
        header: _header,
        message: _message,
      })
      .then((x) => x.present());
  }
}
