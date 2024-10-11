import { Component, Input } from '@angular/core';
import { AppMessage } from '../../../interfaces/app.interface';

@Component({
  selector: 'app-message',
  standalone: true,
  templateUrl: './AppMessage.component.html',
  styleUrl: './AppMessage.component.css',
  inputs: ['messageOptions'],
})
export class AppMessageComponent {
  @Input() messageOptions: AppMessage = {
    messageType: 'info',
    messageText: '',
  };
}
