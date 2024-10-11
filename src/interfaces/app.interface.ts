type MessageType = 'success' | 'error' | 'warning' | 'info';

type ButtonType = 'button' | 'submit';

export interface AppMessage {
  messageType: MessageType;
  messageText: string;
}

export interface AppButton {
  buttonId?: string;
  buttonType: ButtonType;
  buttonText: string;
  buttonClasses?: string[];
}

export interface AppLinkButton {
  to: string;
  linkText: string;
}
