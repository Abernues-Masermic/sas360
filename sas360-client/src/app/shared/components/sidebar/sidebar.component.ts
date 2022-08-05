import { Component } from '@angular/core';
import { UtilsService } from '@app/shared/services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private utilsSvc: UtilsService) {}

  onExit(): void {
    this.utilsSvc.openSidebar(false);
  }
}
