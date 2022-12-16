import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../auth/auth.service';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'blue' })
export class BluePipe implements PipeTransform {
  isAdmin: boolean;

  constructor(private authService: AuthService) {
    this.isAdmin = authService.isLoggedIn;
  }

  transform(value: string): string {
    if (value == null)
      return value;

    // hide deleted values from ordinary visitors/guests
    if (value === "." && !this.isAdmin)
      return "";

    value = value.replace(/{/gi, "<span class=\"main-color\">");
    value = value.replace(/}/gi, "</span>");
    return value;
  }
}
