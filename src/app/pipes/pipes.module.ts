import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationNamePipe } from './location-name.pipe';
import { ChecklistProgressPipe } from './checklist-progress.pipe';



@NgModule({
  declarations: [
    LocationNamePipe, ChecklistProgressPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocationNamePipe,
    ChecklistProgressPipe
  ]
})
export class PipesModule { }
