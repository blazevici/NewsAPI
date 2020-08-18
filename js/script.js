$(document).ready(function() {

    var url = 'http://newsapi.org/v2/top-headlines?' +
          'sources=bbc-news&' +
          'apiKey=1f3f0b7114fa4017be914ae300d76797';
    var req = new Request(url);
    fetch(req).then(function (response) {
        console.log(response.json());
    })

    var carousel = $('.carousel');
    var artikli = $('.artikl');

    function sljedeci(element) {
        if (element.next().length > 0) {
            return element.next();
        } else {
            return artikli.first();
        }
    }

    function prethodni(element) {
        if (element.prev().length > 0) {
            return element.prev();
        } else {
            return artikli.last();
        }
    }

    $('.strelica').on('click', function(strelica) {
        var el = $('.ref').removeClass('ref');

        if ($(strelica.currentTarget).data('toggle') == 'sljedeca') {
            nova_vijest = sljedeci(el);
            carousel.removeClass('tranzicija-unatrag');
        } else {
            nova_vijest = prethodni(el);
            carousel.addClass('tranzicija-unatrag');
        }

        nova_vijest.addClass('ref').css('order', 1);
        for (i = 2; i <= artikli.length; i++) {
            nova_vijest = sljedeci(nova_vijest).css('order', i);
        }

        carousel.removeClass('tranzicija');  // ANIMACIJA SE OVDJE DOGAĐA
        setTimeout (function() {
            carousel.addClass('tranzicija');
        }, 50);
    });

});