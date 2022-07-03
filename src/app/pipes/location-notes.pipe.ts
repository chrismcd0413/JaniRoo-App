import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationNotes'
})
export class LocationNotesPipe implements PipeTransform {

  transform(value: any, accounts: any[], isString: boolean): unknown {
    if (!accounts){
      return null;
    }
    let location;
    if (isString) {
      location = JSON.parse(value);
    } else {
      location = value;
    }
    const acct = accounts.find(x => x.id === location.acct);
    const loc = acct.locations.find(x => x.id === location.loc);
    let formattedString;
    if (loc.address.notes && loc.address.notes !== '') {
      formattedString = loc.address.notes;
    } else {
      formattedString = 'None';
    }
    return formattedString;
  }
}
