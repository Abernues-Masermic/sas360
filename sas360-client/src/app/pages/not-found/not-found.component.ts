import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div id="container">
      <img src="{{ imageSrc }}" style="cursor: pointer" alt="{{ imageAlt }}" />
    </div>
  `,
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  imageAlt: string = '404 Not found';
  imageSrc: string = 'assets/images/pagenotfound.png';
}
