// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DemoAlertComponent } from 'src/app/theme/shared/components/demo-alert/demo-alert.component';

@Component({
  selector: 'app-basic-demo-alert',
  standalone: true,
  imports: [CommonModule, SharedModule, DemoAlertComponent],
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.scss']
})
export default class BasicAlertComponent {}
