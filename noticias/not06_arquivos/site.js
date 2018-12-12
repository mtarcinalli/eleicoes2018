jQuery(document).ready(function($) {

    var vw;




    $(document).on('click', '.login-step', function(){
        var step = $(this).attr('data-step');
        $('.modal-login .inner').hide();
        $('.modal-login .inner').eq(step).show();
    });

    function resetLoginForm() {
        setTimeout(function(){
            $('.modal-login .inner').hide();
            $('.modal-login .inner').eq(0).show();
        }, 500);
    }



    $(document).on('click', '.btnvermais', function() {
        var btn = $(this);

        if (!btn.hasClass('is-disabled')) {

            btn.addClass('is-disabled');
            var link = $(this).attr('href');
            var link_parts = link.replace(/\/$/, '').split('/');
            var page = parseInt(link_parts.pop());

            if (isNaN(page))
                page = 1;

            page++;

            link_parts[link_parts.length - 1] = page;

            var newLink = link_parts.join('/');


            $.ajax({
                    method: "POST",
                    url : link,
                    success: function(response) {
                      var urlNext = $(response).find('.btnvermais').attr('href');
                      //console.log(urlNext);
                      /*if($(response).find(".internaPGN > .bloco").length > 0){
                          $('.btnvermais').attr('href', urlNext);
                      }else{
                          $('.btnvermais').remove();
                      }*/
                      if(urlNext != undefined){
                        console.log(urlNext);
                          $('.btnvermais').attr('href', urlNext);
                      }else{
                          $('.btnvermais').remove();
                      }
                      btn.removeClass('is-disabled');
                      $(".internaPGN").append($(response).find(".internaPGN").html());
                    }
                });

            return false;
        }


    });

    $(document).on('click', '.herald', function() {
        var btn = $(this);

        if (!btn.hasClass('is-disabled')) {

            btn.addClass('is-disabled');
            var link = $(this).attr('href');
            var link_parts = link.replace(/\/$/, '').split('/');
            var page = parseInt(link_parts.pop());

            if (isNaN(page))
                page = 1;

            page++;

            link_parts[link_parts.length - 1] = page;

            var newLink = link_parts.join('/');


            $.ajax({
                    method: "POST",
                    url : link,
                    success: function(response) {
                      var urlNext = $(response).find('.herald').attr('href');
                      //console.log(urlNext);
                      /*if($(response).find(".internaPGN > .bloco").length > 0){
                          $('.herald').attr('href', urlNext);
                      }else{
                          $('.herald').remove();
                      }*/
                      if(urlNext != undefined){
                        console.log(urlNext);
                          $('.herald').attr('href', urlNext);
                      }else{
                          $('.herald').remove();
                      }
                      btn.removeClass('is-disabled');
                      $(".HeraldAjax").append($(response).find(".HeraldAjax").html());
                    }
                });

            return false;
        }


    });

    if ($('.tab-container').length > 0) {
        $('.tab-container').each(function(index, el) {
            $('.tab-container').find('.tab:first-of-type').addClass('is-current');
            $('.tab-container').find('.tab-btn:first-of-type').addClass('is-current');
        });
    }
    $(document).on('click', '.tab-btn', function(event) {
        var container = $(this).parents('.tab-container');
        var toShow = $(this).attr('data-tab');

        container.find('.tab.is-current').removeClass('is-current');
        container.find('.tab#' + toShow).addClass('is-current');

        $(this).siblings('.is-current').removeClass('is-current');
        $(this).addClass('is-current');
    });

    // $('.ilust-penguin-container').load('images/ilust-penguin.svg',function(){
    //  sucess: {
    //   $('.ilust-penguin').mouseenter(function(event) {
    //      $(this).find('#olho-esquerdo-aberto').hide();
    //      $(this).find('#olho-direito-aberto').hide();
    //   });
    //   $('.ilust-penguin').mouseleave(function(event) {
    //      $(this).find('#olho-esquerdo-aberto').show();
    //      $(this).find('#olho-direito-aberto').show();
    //   });
    //  }
    // });

    $(document).on('click', '.open-modal', function(event) {
        event.preventDefault();
        var modal = $(this).attr('data-modal');
        $('.el-modal.is-open').removeClass('is-open');
        $('#' + modal).addClass('is-open');
        $(this).addClass('is-current');
        if (modal == "modal-busca") {

            setTimeout(function() { $('#input-busca').focus();  }, 40);
        }
    });
    $(document).on('click', '.close-modal', function() {
        var modal = $(this).parents('.el-modal');
        modal.removeClass('is-open');
        $('body').removeClass('is-modal-open');
        $('.open-modal.is-current').removeClass('is-current');
    });

    $(document).on('click', '.toggle-modal', function(event) {
        event.preventDefault();

        $(this).siblings('.toggle-modal.is-current').removeClass('is-current'); 
        $('body').removeClass('is-modal-open');
        $('body').removeClass('is-loginOpen');resetLoginForm();
        $('.el-modal.is-open').removeClass('is-open');

        if ( $(this).hasClass('is-current') ) {
             $(this).removeClass('is-current');
        } else {
            $(this).addClass('is-current');
            var modal = $(this).attr('data-modal');
            $('#' + modal).toggleClass('is-open');
            $('body').addClass('is-modal-open');

            if ( $(this).hasClass('call-login') ) {
                $('body').toggleClass('is-loginOpen');
            }

            if (modal == "modal-busca") {
                setTimeout(function() { $('#input-busca').focus();  }, 40);
            }
        } 
 
       

        
    }); 



    $('.call-login').click(function(event) {
        $('body').toggleClass('is-loginOpen'); resetLoginForm()
    });
    
    $(document).on('click', '.call-noturno.icon-toggle', function(event) {  
        $(this).toggleClass('is-current'); 
    }); 


    $(document).on('click', '.toggle-modal a, .open-modal a', function(event) {  
        event.stopPropagation();    
    }); 


    var date = new Date;
    var hour = date.getHours();

    if (Cookies.get('noturno') == 'true') { 
        $('body').addClass('modo-noturno');
        console.log('call1');

         $('.modo-noturno-off').css('visibility', 'hidden');
         $('.modo-noturno-on').css('visibility', 'visible');
    }

    $('.call-noturno').click(function(event) {
        if (Cookies.get('noturno') == 'true') {
            Cookies.set('noturno', 'false');
        } else {
            Cookies.set('noturno', 'true');
        }

        console.log(Cookies.get('noturno'));
        $('body').toggleClass('modo-noturno');
        console.log('call2');

    });

    $(document).on('click', '.call-video', function(event) {
        $('body').append('<div class="el-modal modal-video"><div class="inner wrapper"> <div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + $(this).data('video') + '" frameborder="0" allowfullscreen></iframe></div> </div></div>');
        $('.el-modal.modal-video').addClass('is-open');
    });
    $(document).on('click', function(e) {
        var el = e.target;
        if (!$(el).hasClass('call-video')) {
            if ($(el).parents('.call-video').length == 0) {
                $('.el-modal.modal-video').removeClass('is-open');
                setTimeout(function() {
                    $('.el-modal.modal-video').remove();
                }, 500);

            }
        }
    });
    $(document).on('click', '.btn-mais', function(ev) {
        ev.preventDefault();
        var counter = $(this).siblings('.page-counter');
        var current = counter.find('.page-counter-current');
        var total = parseInt(counter.find('.page-counter-total').text());
        var publicacoesLista = $('#tab-ultimas');

        if (parseInt(current.text()) < total) {
            current.text(parseInt(current.text()) + 1);
            publicacoesLista.find('li.to-show').eq(1).removeClass('to-show');
        }
        if (parseInt(current.text()) == total) {
            $(this).addClass('is-disabled');
        }
    });

    $('#cmbEdicoes').on('change', function(e) {
        e.preventDefault();
        window.location.href = $(this).val();

    });

  
    $('.btn-cancelar').click(function(event) {
        $('body').removeClass('is-loginOpen');resetLoginForm()
        $('body').removeClass('is-modal-open');
        $('.site-nav-mobile .call-login').removeClass('is-current');
    });

    $(document).on('click', function(e) {
        var el = e.target;
        if (!$(el).hasClass('call-login')) {
            if ($(el).parents('.inner').length == 0) {
                if ($(el).parents('.call-login').length == 0) {
                    if ($(el).parents('.site-nav-mobile').length == 0) {
                        $('body').removeClass('is-loginOpen');resetLoginForm()
                        $('body').removeClass('is-modal-open');
                        $('.site-nav-mobile .call-login').removeClass('is-current');
                    }
                }

            }
        }
    });

    $('.barrauol, .barra-folha').prependTo('#barra-aux');


  
    vw = window.innerWidth;
    $(window).resize(function() {
        vw = window.innerWidth;
    });

    var headerHeight = $('.site-header').height();

    function paddingTop() {
        vw = window.innerWidth; 
        $('body').css('padding-top', headerHeight + 'px');
    }

    if ( $('.site-header-topo').length > 0 ) {
        var offsetScroll;
        offsetScroll = $('.site-header-topo').offset().top;
          
        $(window).resize(function() {
            offsetScroll = $('.site-header-topo').offset().top;
        });

        $(window).on('scroll', function(e) {

            if ($(window).scrollTop() > offsetScroll) {
                $('body').addClass('is-scrolled');
                    paddingTop();
            } else {
                $('body').removeClass('is-scrolled');
                    $('body').css('padding-top', '0');   
            }
        });    
    }
    


    $('.call-modal-evento').click(function(event) {
        event.preventDefault();
        $(this).parents('.has-evento').find('.evento-modal').addClass('is-open');
        $('body').addClass('is-modal-open');
    });

    // if ($('.post-header').length > 0) {
    //     $(window).on('scroll', function(e) {
    //         if ($(window).scrollTop() > ($('.post-header').offset().top + $('.post-header').height())) {
    //             $('body').addClass('post-scrolled');
    //         } else {
    //             $('body').removeClass('post-scrolled');
    //         }
    //     });
    // }  

    $(window).on('scroll', function(e) {
        if ($(window).scrollTop() > ($('.lupa-header').offset().top + $('.lupa-header').height()) ) {
            $('body').addClass('post-scrolled');
        } else {
            $('body').removeClass('post-scrolled');
        }
    });

    $('.site-nav-mobile .userLogado').click(function(event) {
        $('.usuario-menu').toggleClass('is-visible');
    });

    $(document).on('click', function(e) {
        var el = e.target;
        if (!$(el).hasClass('userLogado')) {
            if ($(el).parents('.usuario-menu').length == 0) {
                $('.usuario-menu').removeClass('is-visible');
            }
        }
    });


    

    $('.titulo-materia').click(function(event) {
        event.preventDefault();
        $('body, html').animate({
            scrollTop: 0
        }, 400);
    });


    $('.valornota span').on('click',function(){
        $('.nota').val($(this).attr('data-value'));
    });
    $('.valorchecagem span').on('click',function(){
        $('.checagem').val($(this).attr('data-value'));
    });

    $(".conteudoutil").on('submit',function(){
        $('.loader').fadeIn();
        var thisbtn = $(this);
        $.post(
            $('.urlprojeto').val() +'/actions/',
            $(this).serialize(),
            function(data){
                location.reload();
            }  
        ); 
        return false;
    });

    // if ($('.main-content iframe').length > 0) {

    //     $('iframe').each(function(index, el) {
    //         var src = $(this).attr('src');
           
    //         if ( src !==  'undefined' ){
    //             console.log('>>>>>' + src + $(this));
    //            if (src.indexOf('youtube') > 0 || src.indexOf('vimeo') > 0) {
    //                 $(this).wrap('<div><div class="iframe-wrapper"></div></div>');
    //             } else {
    //                 return false;
    //             } 
    //         }
            

    //     });
    // }

    $('.playlist-lista-item').eq(0).addClass('is-current');
    $(document).on('click', '.playlist-lista-item' , function(){
        var dataVideo = $(this).attr('data-video');
        var cont = $(this).parents('.playlist-videos');
        cont.find('.playlist-mainVideo .video-container > div').remove();
        cont.find('.playlist-mainVideo .video-container').append('<div> <div class="iframe-wrapper"><iframe width="560" height="315" src="https://www.youtube.com/embed/'+dataVideo+'" frameborder="0" allowfullscreen=""></iframe></div> </div>');

        $(this).siblings('.is-current').removeClass('is-current');
        $(this).addClass('is-current');
    });

    $('.pesquisa-item > *').click(function(event) {
       $(this).siblings('.is-current').removeClass('is-current');
       $(this).toggleClass('is-current');
    });

    $('.social-mais').click(function(event) {
       $('.lupa-header .wrapper nav').toggleClass('is-open');
       $(this).toggleClass('is-active');
    });



});