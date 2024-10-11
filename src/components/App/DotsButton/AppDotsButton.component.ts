import { Component, output } from '@angular/core';

@Component({
  selector: 'app-dots-button',
  standalone: true,
  templateUrl: './AppDotsButton.component.html',
  styleUrl: './AppDotsButton.component.css',
})
export class AppDotsButtonComponent {
  clickEvent = output<Event>();

  onDotButtonClick(event: Event): void {
    this.clickEvent.emit(event);
  }
}
