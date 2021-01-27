import { LightningElement, track } from 'lwc';
import Navigo from 'navigo';
// const router = new Navigo('/', false);
// const CONTACTS_URL = 'api/contacts';

export default class App extends LightningElement {
    contacts = [];
    notifStatus = '';
    roomname = 'publicroom1';
    menuOpen = false;
    router = new Navigo('/', false);

    @track view = {};

    menuItems = [
        {
            title: 'Podcast',
            location: '/podcasts',
            iconName: 'grid'
        },
        {
            title: 'Discover',
            location: '/discover',
            iconName: 'search'
        },
        {
            title: 'Settings',
            location: '/settings',
            iconName: 'settings'
        }
    ];

    constructor() {
        super();
        // fetch(CONTACTS_URL)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((contacts) => {
        //         this.contacts = contacts;
        //     });

        // Notification.requestPermission((status) => {
        //     console.log('status is  ', status);
        //     this.notifStatus = status;
        // });

        this.router.on({
            '/podcasts': async () => {
                console.log('indie');
                const { default: ViewChatWindow } = await import(
                    'views/chatWindow'
                );
                this.setView(ViewChatWindow);
            },
            '/power': async () => {
                console.log('indie');
                const { default: ViewChatWindow } = await import(
                    'views/chatWindow'
                );
                this.setView(ViewChatWindow);
            }
        });

        const navigateToDefault = () => {
            this.router.navigate('/');
        };

        this.router.notFound(navigateToDefault);
        this.router.on(navigateToDefault);

        // this.router.resolve();
    }

    handleMenuItemClick(event) {
        event.preventDefault();
        // const { href, key } = event.target;
        const { location } = event.currentTarget.dataset;
        // console.log('before event', location,  'pod');
        this.toogleMenu();
        this.template.querySelector('.checkBox').checked = false;
        this.router.navigate(location, true);
    }

    setView(component, props = {}) {
        this.view = {
            component,
            props
        };
    }

    toogleMenu() {
        this.menuOpen = !this.menuOpen;
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
