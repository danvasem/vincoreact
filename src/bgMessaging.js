import firebase from 'react-native-firebase';

export default async (remoteMessage) => {

    const payload = JSON.parse(remoteMessage.data.default);
    const data = JSON.parse(payload.GCM);

    const notification = new firebase.notifications.Notification()
        .setNotificationId('NotificationId')
        .setTitle(data.data.NC.N)
        .android.setChannelId('1')
        .setData({
            ID: data.data.NC.ID
        });
    notification.android.setAutoCancel(true); //Para cerrar automáticamente la notificación cuando se dio clic en ella.
    notification.android.setBigText(data.notification.text);

    firebase.notifications().displayNotification(notification);

    return Promise.resolve();
}