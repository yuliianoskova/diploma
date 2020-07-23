import "./style.css";
import template from './index.html';
import { view } from '../../../core/view';
import routes from '../../../routes/routes';



const events = [
    { event: 'change', selector: '#country', func: 'onGetCities' },
    { event: 'click', selector: '#searchBtn', func: 'navigateTo' }

];

export const home = view({
    template,
    events,

    onGetCities(e) {
        const self = this;
        const country = $(e.currentTarget).val();

        $.ajax({
            url: `http://localhost:3000/city?country=${country}`,
            method: 'GET',

        }).then(resp => {
            $("#city option").hide();
            resp.forEach((city, index) => {
                const optionTemplate = `<option 
                                                ${index === 0 ? 'selected' : ''} 
                                                data-route="${city.guideTitle}">
                                            ${city.guideTitle}
                                        </option>`;

                $(optionTemplate).appendTo("#city");
            })
        }, error => {
            console.log('Error on GET request!');
            console.error(error);
        });
    },

    navigateTo(e) {
        e.preventDefault();
        const city = $('#city option:selected').attr('data-route');
        $.ajax({
            url: `http://localhost:3000/city?guideTitle=${city}`,
            method: "GET",
            success: (data) => {
                routes.goTo(city, { model: { data: data[0] } })
            }
        });
    },

});




