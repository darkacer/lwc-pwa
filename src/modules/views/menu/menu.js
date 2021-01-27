import { LightningElement, api } from 'lwc';

export default class ViewMenu extends LightningElement {
    @api props;

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
}
