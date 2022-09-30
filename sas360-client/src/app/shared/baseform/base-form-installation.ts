import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormInstallation {
  public errorMessage = '';

  baseForm: FormGroup = new FormGroup({
    installationname: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
  });

  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      installationname: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
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
