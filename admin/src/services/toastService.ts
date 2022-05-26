import { ReactNode } from 'react';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';
import EventManager from './eventManager';

export type Toast = {
    title: ReactNode,
    body: ReactNode,
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark',
    position: ToastPosition,
};

export class ToastService {
  notifications: Toast[] = [];

  defaultDuation: number = 4500;

  defaultPosition: ToastPosition = 'top-end';

  EVENTS = {
    update: 'ToastService.update',
  };

  notify(notification: Toast, timeout: number | null = null) {
    this.notifications.push(notification);
    const tmo = timeout || this.defaultDuation;
    EventManager.notify(this.EVENTS.update, this.notifications);

    if (tmo) {
      window.setTimeout(() => {
        this.remove(notification);
      }, tmo);
    }
  }

  remove(notification: Toast) {
    const index = this.notifications.indexOf(notification);
    this.notifications.splice(index, 1);
    EventManager.notify(this.EVENTS.update, this.notifications);
  }

  success(body: ReactNode, title?: ReactNode, timeout?: number, position?: ToastPosition) {
    this.notify({
      title,
      body,
      position: position || this.defaultPosition,
      variant: 'success',
    }, timeout);
  }

  danger(body: ReactNode, title?: ReactNode, timeout?: number, position?: ToastPosition) {
    this.notify({
      title,
      body,
      position: position || this.defaultPosition,
      variant: 'danger',
    }, timeout);
  }

  warning(body: ReactNode, title?: ReactNode, timeout?: number, position?: ToastPosition) {
    this.notify({
      title,
      body,
      position: position || this.defaultPosition,
      variant: 'warning',
    }, timeout);
  }

  info(body: ReactNode, title?: ReactNode, timeout?: number, position?: ToastPosition) {
    this.notify({
      title,
      body,
      position: position || this.defaultPosition,
      variant: 'info',
    }, timeout);
  }
}

export default new ToastService();
