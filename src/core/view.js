import Model from '../utils/const';

/**
 * Функция создание объекта компонента
 * @param {object} options -set of properties
 * @return {object} - instance of component;* 
 */

export const view = (options) => {
    return {
        template: `<div></div>`,
        model: Model(),
        beforeRender() { },

        /**
         * Функция отображения компонента на странице.
         * @param {jquery object} $toElement - jquery элемент в который вставляем текущий компонент.
         */

        render($toElement) {
            this.beforeRender();
            this.$parent = $toElement;
            this.template = _.template(this.template || `<div></div>`);
            const html = this.template(this.model.data);
            this.$el = $(html);
            this.$el.appendTo(this.$parent);
            this.bindEvents();
            this.afterRender();

            return this;
        },

        afterRender() { },

        createTemplate() {
            if (!_.isFunction(this.template)) {
                this.template = _.template(this.template);
            }
        },

        bindEvents() {
            if (Array.isArray(this.events)) {
                this.events.forEach(e => {
                    const { event, selector, func } = e;
                    this.$el.find(selector).on(event, (jqueryEvent) => {
                        return this[func](jqueryEvent);
                    });
                });
            }
        },

        getElement(selector) {
            return this.$el.find(selector)
        },
        ...options
    }
};

export default view;