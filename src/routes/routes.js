import { error } from '../utils/const';
import { home } from '../components/main/home-page/home';
import { guide } from '../components/main/guide-page/guide';

export default {
    routes: {
        error,
        home
    },

    //функция получает компонент и путь к нему
    getComponent(route, options) {
        const component = this.routes[route];

        if (component) {
            return component;
        }

        return guide({ model: { route }, ...options });

    },

    //функция проверяет 
    goTo(route, options) {

        try {

            const component = this.getComponent(route, options); //создаем новый компонент

            if (this.currentRout) { //существующий компонент открепляем и приравниваем нулю
                this.currentRout.$el.detach();
                this.currentRout.$el = null;
            }

            //новый компонент рендерим к основному контейнеру
            component.render($('#main-container'));
            this.currentRout = component;

            //ловим ошибку
        } catch (error) {
            alert('routing error');
            console.error(error);
        }
    }
}