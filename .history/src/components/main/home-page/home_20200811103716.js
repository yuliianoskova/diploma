import "./home.css";
import template from './home.html';
import { view } from '../../../core/view';
import routes from '../../../routes/routes';


//события
const events = [
    { event: 'change', selector: '#country', func: 'onGetCities' },
    { event: 'click', selector: '#searchBtn', func: 'navigateTo' }

];

export const home = view({
    template,
    events,

    //функция события на выбор страны в поиске
    onGetCities(e) {

        //берем значение - выбраную страну
        const country = $(e.currentTarget).val();

        //отправляем запрос на сервер
        $.ajax({
            url: `http://localhost:3000/city?country=${country}`,
            method: 'GET',

        }).then(resp => {
            $("#city option").hide();

            //в полученном массиве перебираем все объекты
            resp.forEach((city, index) => {

                //создаем перечень городов для селекта
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

    //функция перехода к гайду выбранного города
    navigateTo(e) {
        e.preventDefault();

        //берем аттрибуты выбранног города
        const city = $('#city option:selected').attr('data-route');

        //отправляем запрос на сервер
        $.ajax({
            url: `http://localhost:3000/city?guideTitle=${city}`,
            method: "GET",

            //из полученных данных переходим на гайд указанного города
            success: (data) => {
                routes.goTo(city, { model: { data: data[0] } })
            }
        });
    },

});

$('#country').dropdown();



