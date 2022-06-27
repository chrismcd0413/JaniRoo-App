import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checklistProgress'
})
export class ChecklistProgressPipe implements PipeTransform {

  transform(value: any[], decimal: boolean): unknown {
    if (value === null || value.length === 0) {
      return;
    }
    const val = value.filter(x => x.completed === true).length / value.length;
    const returnValue = Math.round(val * 100);
    if (decimal) {
      return returnValue / 100;
    } else {
      return returnValue;
    }
  }

}
