import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmpassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ confirmpassword: true });
      return { confirmpassword: true };
    } else {
      control.get('confirmPassword')?.setErrors(null);
      return null;
    }
  };
}
