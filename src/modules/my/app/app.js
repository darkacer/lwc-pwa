import { LightningElement } from 'lwc';

const CONTACTS_URL = 'api/contacts';

export default class App extends LightningElement {
    contacts = [];
    notifStatus = '';

    connectedCallback() {
        fetch(CONTACTS_URL)
            .then((response) => {
                return response.json();
            })
            .then((contacts) => {
                this.contacts = contacts;
            });

        Notification.requestPermission((status) => {
            console.log('status is  ', status);
            this.notifStatus = status;
        });
    }

    showNotification() {
        let options = {
            body: 'Notif Body',
            vibrate: [100, 50, 100],
            data: { primaryKey: 1 }
        };
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration().then((reg) => {
                reg.showNotification('Hello Notification', options);
            });
        }
    }

    subscribeNotifcation() {
        Notification.requestPermission((status) => {
            console.log('status is  ', status);
        });
    }
}
