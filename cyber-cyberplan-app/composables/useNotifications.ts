// منطق إشعارات المتصفح
export function useNotifications() {
  function notify(title: string, options?: NotificationOptions) {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, options);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(title, options);
          }
        });
      }
    }
  }
  return { notify };
}