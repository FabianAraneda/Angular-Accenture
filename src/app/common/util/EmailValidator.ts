import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export const emailValidator = (): ValidatorFn  =>{
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
  
      // Replace this with your actual email validation logic using an API call or regular expression
      return new Promise((resolve) => {
        setTimeout(() => {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            resolve(null); // Email is valid
          } else {
            resolve({ email: 'Invalid email format' }); // Email is invalid
          }
        }, 1000); // Simulate an asynchronous delay (replace with your actual API call)
      });
    };
  }