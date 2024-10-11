import { Component, computed, input, output, Signal } from '@angular/core';
import { AppButton, AppMessage } from '../../../interfaces/app.interface';
import { AppButtonComponent } from '../Button/AppButton.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [AppButtonComponent],
  templateUrl: './AppMessage.component.html',
  styleUrl: './AppMessage.component.css',
})
export class AppMessageComponent {
  messageOptions = input<AppMessage>({
    messageType: 'info',
    messageText: '',
    messageActions: 'YesNo',
  });

  buttonYesOptions: AppButton = {
    buttonType: 'button',
    buttonText: 'Yes',
    buttonClasses: [],
    buttonDataAction: 'yes',
  };
  buttonNoOptions: AppButton = {
    buttonType: 'button',
    buttonText: 'No',
    buttonClasses: [],
    buttonDataAction: 'no',
  };

  messageButtonClickEvent = output<Event>();

  handleMessageActionYesNo: Signal<boolean> = computed(
    () => this.messageOptions().messageActions === 'YesNo'
  );

  onMessageButtonClick(event: Event): void {
    this.messageButtonClickEvent.emit(event);
  }
}
