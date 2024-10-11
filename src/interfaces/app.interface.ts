export type AppMessageType = 'success' | 'error' | 'warning' | 'info';

export type AppMessageActions = 'YesNo';

type AppButtonType = 'button' | 'submit';

export interface AppMessage {
  messageType: AppMessageType;
  messageText: string;
  messageActions?: AppMessageActions;
}

export interface AppButton {
  buttonId?: string;
  buttonType: AppButtonType;
  buttonText: string;
  buttonClasses?: string[];
  buttonDataAction?: string;
}

export interface AppLinkButton {
  to: string;
  linkText: string;
}
