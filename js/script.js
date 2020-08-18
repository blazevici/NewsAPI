$(document).ready(function() {

    var url = 'http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=1f3f0b7114fa4017be914ae300d76797';
    var req = new Request(url);
    fetch(req).then(response => 
        response.json().then(data => ({
            data: data,
            status: response.status
        })
    ).then(res => {
        console.log(res.status, res.data.articles[0]);

        for (i = 0; i < 5; i++) {
            var clanak = res.data.articles[i];

            if (clanak.urlToImage) {
                var slika_clanka = clanak.urlToImage;
            } else {
                var slika_clanka = "Asseti/Placeholder.jpg";
            }

            if (i == 4) {
                var html = '<li class="artikl ref"><div class="vijesti"><div class="slika-clanka"><img width="320px" src="'+ slika_clanka +'"></div><div class="tekst-clanka"><h2>'+ clanak.title +'</h2><p>Autor: '+ clanak.author +'</p><p>'+ clanak.description +'</p><a target="_blank" href="'+ clanak.url +'">Pročitaj cijeli članak</a></div></div></li>';
            } else {
                var html = '<li class="artikl"><div class="vijesti"><div class="slika-clanka"><img width="320px" src="'+ clanak.urlToImage +'"></div><div class="tekst-clanka"><h2>'+ clanak.title +'</h2><p>Autor: '+ clanak.author +'</p><p>'+ clanak.description +'</p><a target="_blank" href="'+ clanak.url +'">Pročitaj cijeli članak</a></div></div></li>';
            }
            
            document.getElementById("clanci").innerHTML += html;
            console.log(html);
        }
        
    }));
    

    $('.strelica').on('click', function(strelica) {
        var carousel = $('#clanci');
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