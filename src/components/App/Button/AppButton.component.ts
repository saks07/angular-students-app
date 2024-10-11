import {
  Component,
  computed,
  EventEmitter,
  input,
  output,
  Signal,
} from '@angular/core';
import { AppButton } from '../../../interfaces/app.interface';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './AppButton.component.html',
  styleUrl: './AppButton.component.css',
})
export class AppButtonComponent {
  buttonOptions = input<AppButton>({
    buttonType: 'button',
    buttonText: '',
    buttonClasses: [],
  });

  clickEvent = output<Event>();

  buttonClasses: Signal<string> = computed(
    () => this.buttonOptions().buttonClasses?.join(' ') ?? ''
  );

  onClick(event: Event): void {
    this.clickEvent.emit(event);
  }
}
