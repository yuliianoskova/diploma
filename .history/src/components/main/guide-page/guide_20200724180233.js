import "./guide.css";
import template from './guide.html';
import { view } from '../../../core/view';
import routes from '../../../routes/routes';

/**
 * 
 * @param {object} options -set of properties
 */

//создаем страницу гайда
export const guide = (options) => {

    return view({
        template,
        ...options,

        //рендерим к указанному элементу
        render($toElement) {
            this.$parent = $toElement;
            if (this.$el) {
                this.$el.appendTo($toElement);
            } else {

                //создаем шаблон страницы
                this.createTemplate();

                //создаем динамический путь к изображению
                import(/* webpackMode: "eager" */`../../../img/${this.model.data.guideCoverImg}`)
                    .then(options => {

                        this.model.data.guideCoverImg = options.default;
                        this.$el = $(this.template(this.model.data));
                        this.$el.appendTo($toElement);
                        if (_.isFunction(this.showComponents)) {
                            this.showComponents();
                        }
                    });
            }

            this.bindEvents();

            return this;
        }
    });

};



