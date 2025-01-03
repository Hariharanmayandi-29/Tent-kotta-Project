import { AuthService } from 'src/app/authservice/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take } from 'rxjs';


export const profileguardGuard: CanActivateFn = (route, state) => {
  const authservice=inject(AuthService)
  const router = inject(Router)

  authservice.getAuthenticationStatus().pipe(
      // Take only the first emitted value
  ).subscribe((isAuthenticated:any) => {
    if (isAuthenticated) {
      return true;  // Allow navigation if authenticated
    } else {
      router.navigate(['/login']);  // Navigate to login if not authenticated
      return false;  // Block navigation
    }
  });

  // Return false by default as navigation is handled inside the subscription
 return true
};

