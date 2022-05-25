import { useEffect, useState } from 'react';
import { Toast as BSToast, ToastContainer } from 'react-bootstrap';
import EventManager from 'services/eventManager';
import toastService, { Toast } from 'services/toastService';

export function Notificaition() {
  const [toasts, setNotifications] = useState<Toast[]>([]);

  useEffect(() => {
    function onAlertsUpdate(newNotifications: Toast[]) {
      setNotifications(newNotifications.slice());
    }

    const unsubscribes = [
      EventManager.subscribe(toastService.EVENTS.update, onAlertsUpdate),
    ];

    return () => {
      unsubscribes.map((fn) => fn());
    };
  }, []);

  function removeNotification(notification: Toast) {
    toastService.remove(notification);
  }

  return (
    <ToastContainer className="p-3 position-fixed" position="top-end">
      { toasts.map((notification: Toast, i: number) => (
        <BSToast onClose={removeNotification.bind(null, notification)} key={i}>
          <BSToast.Header>
            <div className={`toast-indicator bg-${notification.variant}`} />
            <strong className="ms-2 me-auto">
              { notification.title || ' ' }
            </strong>
          </BSToast.Header>
          <BSToast.Body>{ notification.body }</BSToast.Body>
        </BSToast>
      )) }
    </ToastContainer>
  );
}
