import "./guide-style.css";
import template from './guide.html';
import { view } from '../../../core/view';
import routes from '../../../routes/routes';

/**
 * 
 * @param {object} options -set of properties
 */

export const guide = (options) => {

    return view({
        template,
        ...options,

        render($toElement) {
            this.$parent = $toElement;
            if (this.$el) {
                this.$el.appendTo($toElement);
            } else {
                this.createTemplate();

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

// $(document).ready(function send() {
//     let input = document.getElementById('email');
//     email = input.value;

//     window.location.href = "mailto:" + email + "?subject=" + "This feature is going to be ready soon... Stay tuned!";
// });


