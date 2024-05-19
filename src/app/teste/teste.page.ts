import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {
  public sanitizedMapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://goo.gl/maps/im2MmQ5jFjzxWBks5');

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    let unsafeUrl = 'https://goo.gl/maps/im2MmQ5jFjzxWBks5';
    this.sanitizedMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }

}
