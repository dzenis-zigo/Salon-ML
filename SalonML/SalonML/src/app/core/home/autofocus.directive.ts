import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Directive, ElementRef, Inject, OnInit } from "@angular/core";

@Directive({
  selector: "[autoFocus]"
})
export class AutoFocusDirective implements OnInit {
  private inputElement: HTMLElement;

  constructor(private elementRef: ElementRef) {
    this.inputElement = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.inputElement.focus();
  }
}
