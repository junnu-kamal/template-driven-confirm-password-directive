import { Directive, Input } from '@angular/core';
import {Validator,AbstractControl, NG_VALIDATORS,ValidationErrors} from '@angular/forms';
@Directive({
  selector: '[appConfirmPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true}]

})
export class ConfirmPasswordDirective implements Validator{
  @Input('appConfirmPassword') toCompare ;
  
  validate(c: AbstractControl): (ValidationErrors | null) {
    let  controlToCompare = c.root.get('passwordGroup').get('password');
    controlToCompare.valueChanges.subscribe(()=>{
      c.updateValueAndValidity();
    })
    return this.markError(controlToCompare,c);
  }
  markError(controlToCompare,c){
    if(controlToCompare.value !=  c.value){
      console.log(controlToCompare.value)
      console.log(c.value)
      return {"passmatch":true};
    }
    else{
      return null;
    }
  }
}
