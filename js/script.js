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

    carousel.removeClass('tranzicija');
    setTimeout (function() {
        carousel.addClass('tranzicija');
    }, 50);
});