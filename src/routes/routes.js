import { error, $mainContainer } from '../utils/const';
import { home } from '../components/main/home-page/index';
import { guide } from '../components/main/guide-page/guide';

export default {
    routes: {
        error,
        home
    },

    getComponent(route, options) {
        const component = this.routes[route];

        if (component) {
            return component;
        }

        return guide({ model: { route }, ...options });

    },

    /*
        @params {string} - route name of component to render
        @result - change main section.
    */

    goTo(route, options) {
        try {
            const component = this.getComponent(route, options);
            if (this.currentRout) {
                this.currentRout.$el.detach();
                this.currentRout.$el = null;
            }
            component.render($mainContainer);
            this.currentRout = component;
        } catch (error) {
            alert('routing error');
            console.error(error);
        }
    }
}