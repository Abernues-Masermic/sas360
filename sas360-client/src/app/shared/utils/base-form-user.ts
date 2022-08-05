import { Injectable } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BaseFormUser {
  private isValidEmail = /\S+@\S+\.\S+/;
  public errorMessage = '';

  constructor(private fb: UntypedFormBuilder) {}

  baseForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.isValidEmail)],
    ],
    password: ['', [Validators.required, Validators.minLength(5)]],
    role: ['', [Validators.required]],
    installation: ['', [Validators.required, Validators.minLength(3)]],
  });

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
        pattern: 'Not a valid email',
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
