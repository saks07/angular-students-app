import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './AppLinkButton.component.html',
  styleUrl: './AppLinkButton.component.css',
})
export class AppLinkButtonComponent {
  to = input<string>('');
  linkText = input<string>('');
  linkClasses = input<string[]>([]);
}
