import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationAddress'
})
export class LocationAddressPipe implements PipeTransform {

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
    const formattedString = loc.address.formatted_address;
    return formattedString;
  }
}
