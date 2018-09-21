import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true}]
})
export class MatchPasswordDirective implements Validator{
  @Input('appMatchPassword') matchPassword: string;
  @Input('reverse') reverse: string;

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true: false;
  }

  validate(c: AbstractControl): { [key: string]: any } {
    // self value
    let v = c.value;
    // control value
    let e = c.root.get(this.matchPassword);
    // value not equal
    if (e && v !== e.value && !this.isReverse) return {
      matchPassword: false
    }
    // value equal and reverse
    if (e && v === e.value && this.isReverse) {
      delete e.errors['matchPassword'];
      if (!Object.keys(e.errors).length) e.setErrors(null);
    }
    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({ matchPassword: false })
    }
    return null;
  }

}
