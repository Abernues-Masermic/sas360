import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormDevice {
  public errorMessage = '';

  baseForm: FormGroup = new FormGroup({
    devicename: new FormControl('', { nonNullable: true }),
    type: new FormControl('', { nonNullable: true }),
    installation: new FormControl('', { nonNullable: true }),
    warningrange: new FormControl(0, { nonNullable: true }),
    cautionrange: new FormControl(0, { nonNullable: true }),
    alarmrange: new FormControl(0, { nonNullable: true }),
  });

  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      devicename: ['', [Validators.required, Validators.minLength(5)]],
      type: ['', [Validators.required]],
      installation: ['', [Validators.required]],
      warningrange: [0, [Validators.required]],
      cautionrange: [0, [Validators.required]],
      alarmrange: [0, [Validators.required]],
    });
  }

  isValidField(field: string): boolean | undefined {
    this.getErrorMessage(field);
    const control = this.baseForm.get(field);
    return (control?.touched || control?.dirty) && control.valid;
  }

  private getErrorMessage(field: string): void {
    let control = this.baseForm.get(field);
    let errors = control?.errors;
    if (errors) {
      const minlength = errors['minlength']?.requiredLength;
      const messages: any = {
        required: 'You must enter a value',
        minlength: `This field must be longer than ${minlength} character`,
      };

      const errorKey = Object.keys?.(errors).find(Boolean);
      if (errorKey) {
        this.errorMessage = messages[errorKey];
        console.log('Error message -> ', this.errorMessage);
      }
    }
  }
}
