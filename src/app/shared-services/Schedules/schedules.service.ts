import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(
    private userService: UserService,
    private fb: AngularFirestore
  ) { }

  fetchTodaysSchedules(date) {
    return this.fb.collection('Schedules', (ref) =>
    ref
      .where('cleaner', '==', this.userService.details.id)
      .where('query', 'array-contains', date)
    ).valueChanges({ idField: 'id'});
  }
  fetchUpcomingSchedules(today) {
    return this.fb.collection('Schedules', (ref) =>
    ref
      .where('cleaner', '==', this.userService.details.id)
      .where('start_date', '>', today)
      .limit(25)
    )
    .valueChanges({ idField: 'id'});
  }
}
