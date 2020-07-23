import './style.css';
import { header } from './components/header/header';
import { footer } from './components/footer/footer';
import { $footerContainer, $headerContainer } from './utils/const';
import routes from './routes/routes';

window.onload = () => {
    header.render($headerContainer);
    footer.render($footerContainer);

    routes.goTo('home');
};

$(function () {
    // при нажатии на кнопку scrollup
    $('.scrollup').click(function () {
        // переместиться в верхнюю часть страницы
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    })
});
// при прокрутке окна (window)
$(window).scroll(function () {
    // если пользователь прокрутил страницу более чем на 200px
    if ($(this).scrollTop() > 200) {
        // то сделать кнопку scrollup видимой
        $('.scrollup').fadeIn();
    }
    // иначе скрыть кнопку scrollup
    else {
        $('.scrollup').fadeOut();
    }
});
