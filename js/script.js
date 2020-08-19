$(document).ready(function () {

    $('#forma').submit(function (e) {
        e.preventDefault();

        var pojam = $('#kljucna-rijec').val();
        document.getElementById("clanci").innerHTML = "";

        var danas = new Date();
        var datum = danas.getFullYear() + '-' + (danas.getMonth() + 1) + '-' + danas.getDate();

        var url = 'http://newsapi.org/v2/everything?' +
          'q='+ pojam +'&' +
          'from='+ datum +'&' +
          'sortBy=popularity&' +
          'apiKey=1f3f0b7114fa4017be914ae300d76797';
        var req = new Request(url);
        fetch(req).then(response => 
            response.json().then(data => ({
                data: data
            })
        ).then(res => {
            for (i = 0; i < 5; i++) {
                var clanak = res.data.articles[i];

                if (clanak.title) {
                    var naslov = clanak.title;
                } else {
                    var naslov = "Nema naslova";
                }

                if (clanak.urlToImage) {
                    var slika_clanka = clanak.urlToImage;
                } else {
                    var slika_clanka = "Asseti/Placeholder.jpg";
                }

                if (clanak.author) {
                    var autor = clanak.author;
                } else {
                    var autor = "Nepoznat";
                }

                if (clanak.description) {
                    var opis = clanak.description.replace(/<(.|\n)*?>/g, ''); // u rijetkim slučajevima tekst je bio s html tagovima pa ih pomoću ovoga čistim jer zezne cijeli dizajn
                } else {
                    var opis = "Nema opisa";
                }

                if (i == 4) {
                    var html = '<li class="artikl ref"><div class="vijesti"><div class="slika-clanka"><img width="320px" src="'+ slika_clanka +'"></div><div class="tekst-clanka"><h2>'+ naslov +'</h2><p>Autor: '+ autor +'</p><p>'+ opis +'</p><a target="_blank" href="'+ clanak.url +'">Pročitaj cijeli članak</a></div></div></li>';
                } else {
                    var html = '<li class="artikl"><div class="vijesti"><div class="slika-clanka"><img width="320px" src="'+ slika_clanka +'"></div><div class="tekst-clanka"><h2>'+ naslov +'</h2><p>Autor: '+ autor +'</p><p>'+ opis +'</p><a target="_blank" href="'+ clanak.url +'">Pročitaj cijeli članak</a></div></div></li>';
                }
                
                document.getElementById("clanci").innerHTML += html;
            }
            
            document.getElementById("lijevo").style.visibility = "visible";
            document.getElementById("desno").style.visibility = "visible";
        }));
    });

    $('.strelica').on('click', function (strelica) {
        var carousel = $('#clanci');
        var artikli = $('.artikl');

        function sljedeci (element) {
            if (element.next().length > 0) {
                return element.next();
            } else {
                return artikli.first();
            }
        }
    
        function prethodni (element) {
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

        carousel.removeClass('tranzicija');  // animacija se ovdje događa kada mičem i ponovno dodajem klasu
        setTimeout (function () {
            carousel.addClass('tranzicija');
        }, 50);
    });
});