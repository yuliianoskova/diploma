import './header.css';
import template from './header.html';
import { view } from '../../core/view';
import routes from '../../routes/routes';

const events = [
    { event: 'click', selector: 'a.navLink', func: 'navigateTo' }

];

export const header = view({
    template,
    events,

    navigateTo(e) {
        e.preventDefault();
        const currentTarget = $(e.currentTarget);
        routes.goTo(currentTarget.attr('data-route'));
    }


});
