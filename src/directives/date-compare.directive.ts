import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[appDateCompare]',
  providers: [{provide: NG_VALIDATORS, useExisting: DateCompareDirective, multi: true}]
})
export class DateCompareDirective implements Validator{
  @Input('appDateCompare') dateCompare: string;
  @Input('compare') compare: string;

  compareDates(selectedDate: string, controlDate: string) {
    let sd: number = Number(selectedDate);
    let cd: number = new Date(`${controlDate}T00:00:00`).setHours(0,0,0,0);

    let returnValue: any = null;
    if(this.compare === 'equal')
      returnValue = (sd === cd)
        ? null : {compareError: "Las fechas no son iguales"};
    if(this.compare === 'before')
      returnValue = (cd <= sd)
        ? null : {compareError: "La fecha de entrada debe ser menor o igual a " + this.formatDate(sd)};
    if(this.compare === 'after')
      returnValue = (cd >= sd)
        ? null : {compareError: "La fecha de entrada debe ser mayor igual a " + this.formatDate(sd)};
    return returnValue;
  }

  formatDate(date: number): string {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
  }

  validate(c: AbstractControl): { [key: string]: any } | null {

    let s = this.dateCompare;
    let v = c.value;

    if(!v || !s) {
      return null;
    }

    return this.compareDates(s, v);
  }
}
