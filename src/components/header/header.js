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

    //функция события: при нажатии на ссылку в хедере, переходим на главную страницу
    navigateTo(e) {
        routes.goTo('home');
    }


});
