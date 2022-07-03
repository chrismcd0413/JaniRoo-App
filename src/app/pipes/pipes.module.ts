import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationNamePipe } from './location-name.pipe';
import { ChecklistProgressPipe } from './checklist-progress.pipe';
import { LocationAddressPipe } from './location-address.pipe';
import { LocationNotesPipe } from './location-notes.pipe';



@NgModule({
  declarations: [
    LocationNamePipe, ChecklistProgressPipe, LocationAddressPipe, LocationNotesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocationNamePipe,
    ChecklistProgressPipe,
    LocationAddressPipe,
    LocationNotesPipe
  ]
})
export class PipesModule { }
