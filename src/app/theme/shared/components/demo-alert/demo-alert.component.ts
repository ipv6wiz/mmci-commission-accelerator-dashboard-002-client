// Angular Import
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demo-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './demo-alert.component.html',
  styleUrls: ['./demo-alert.component.scss']
})
export class DemoAlertComponent {
  // public props
  @Input() type!: string;
  @Input() dismiss!: string;

  // public method
  dismissAlert(element: { remove: () => void }) {
    element.remove();
  }
}
