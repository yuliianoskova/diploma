export const $headerContainer = $('#header-container');
export const $footerContainer = $('#footer-container');
export const $mainContainer = $('#main-container');
export const error = {
    template: `<h1 class="text-danger">Some thing went wrong. Try to refresh the page. And relogin!</h1>`,
    render() {
        $('body').html(this.template);
    }
};

const baseUrl = 'http://localhost:3000';

const Model = (options) => {

    return {
        async fetch(params) {

            const resp = await $.ajax({
                url: this.getUrl(params),
                method: 'GET',
            });
            this.data = this.parse(resp)
            return this.data;
        },
        parse(data) {
            return data;
        },
        getUrl(params) {
            let url = this.baseUrl;
            if (this.url) {
                url = `${url}${this.url}`;
            }
            if (params) {
                url = `${url}?${$.param(params)}`
            }
            return url;
        },
        baseUrl,
        ...options
    }
};

export default Model;
