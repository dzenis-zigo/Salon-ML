import { Injectable } from '@angular/core';

declare namespace instgrm {
  namespace Embeds {
    function process(): void;
  }
}

@Injectable()
export class InstagramDOMService {
  public processEmbeddedInstagramPosts(): void {
    if ((window as any)['instgrm']) {
      instgrm.Embeds.process()
    }
  }
}
