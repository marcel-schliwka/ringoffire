import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-player',
  templateUrl: './mobile-player.component.html',
  styleUrls: ['./mobile-player.component.scss']
})
export class MobilePlayerComponent {
  @Input() name;
  @Input() playerActive: boolean = false;
}
