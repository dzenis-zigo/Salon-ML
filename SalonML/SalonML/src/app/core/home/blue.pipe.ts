import { Pipe, PipeTransform } from '@angular/core';
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
  transform(value: string): string {
    value = value.replace(/{/gi, "<span class=\"main-color\">");
    value = value.replace(/}/gi, "</span>");
    return value;
  }
}
