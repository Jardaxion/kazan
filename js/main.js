//Добавление продуктов - 123 строчка
//Для отправки ajax запрос на модальном окне "Оставить заявку" нужно перейти на 184 строка
//Квиз - 264 строчка
$(document).ready(function () {
    //Скрытие загрузки и открытие всего каталога
    $('.catalog__loader').hide();
    $('.catalog__content').show();
    //Немного адаптации
    adaptive();
    $('.old-Price__line').css('width', Number($('.old-Price__item').width())+Number(4));
    $(window).resize(function(){
        adaptive();
    });
    setInterval(function(){
        if($('.header__basket-circle').text() != 0){
            $('.header__basket-circle').css('padding', '2px 5px 3px 5px');
        } else{
            $('.header__basket-circle').css('padding', '2px 4px 3px 4px');
        }
    }, 300)
    //Открытие-закритие меню
    $('.header__buttons-item._home').click(() => {
        $('.header__menu').addClass('_active');
        $('body').addClass('offScroll');
    });

    $('.menu__buttons-item._close').click(()=>{
        $('.header__menu').removeClass('_active');
        $('body').removeClass('offScroll');
    });

    //Изменение расположения кнопки со звонком при скорлле
    headerEdit();
    $(window).scroll(()=>{
        headerEdit();
    });

    //Слайдеры
    //Слайдер на главном экарне
    $('.slider__right-content').slick({
        dots: true,
        autoplay: true,
        autoplayspeed: 2000,
        arrows: false,
        variableWidth: true,
        customPaging : function(slider, i) {
            return '<div class="slider__dots"></div>';
        },
    });
    //Большой слайдер в "Популярные товары"
    $('.popular__content').slick({
        dots: false,
        arrows: false,
        autoplay: false,
        infinite: false,
        slidesToShow: 5,
        draggable: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    });
    //Сам ставлю стрелки, что бы они не убирались, когда слайдов недостаточно
    $('.arrowPopularNext').on('click', function(){
        $('.popular__content').slick('slickNext');
    });
    $('.arrowPopularPrev').on('click', function(){
       $('.popular__content').slick('slickPrev');
    });

    //Слайдер внутри карточек
    $('.popular__content-images').slick({
        arrows: false,
        dots: true,
        fade: true,
        customPaging : function(slider, i) {
            return '<div class="slider__dots-cards"></div>';
        },
    });

    //Слайдер отзывов
    $('.reviews__imgs').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.reviews__reviews',
        draggable: false,
    });
    $('.reviews__reviews').slick({
        asNavFor: '.reviews__imgs',
        fade: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
    });
    $('.arrowReviewsNext').on('click', function(){
        $('.reviews__reviews').slick('slickNext');
    });
    $('.arrowReviewsPrev').on('click', function(){
        $('.reviews__reviews').slick('slickPrev');
    });

    //Слайдер на страничке продукты
    $('.card__imgs').slick({
        dots: true,
        customPaging : function(slider, i) {
            return '<div class="card__dot"></div>';
        },
        prevArrow: $('.arrowCardPrev'),
        nextArrow: $('.arrowCardNext'),
    })
    
    
    //Карточка с продуктами
    $('.product').each(function(){
        //Переменная с найденой карточкой
        let search = ".product[data-id="+$(this).data(`id`)+"]";
        
        //Добавить в корзину
        $(search+' .popular__buttons-button').click(()=>{
            $(search+' .popular__input').val(1);
            showAdding(search);
        });
        //-1
        $(search+' .minus').click(()=>{
            $(search+' .popular__input').val(Number($(search+' .popular__input').val())-Number(1));
            showAdding(search);
        });
        //+1
        $(search+' .plus').click(()=>{
            $(search+' .popular__input').val(Number($(search+' .popular__input').val())+Number(1));
        });
        //Изменение инпута вручную пользователем
        $(search+' .popular__input').change(()=>{
            showAdding(search);
        })
        //Убарть из казины
        $(search+' .popular__buttons-button.reset').click(()=>{
            $(search+' .popular__input').val(0);
            showAdding(search);
        });
        //Вызов функции при загрузке страницы
        showAdding(search);
        
        //Автоматический подбор ширины кол-ва картинок в карточке
        $(search+' .slider__dots-cards').css('width', $('.popular__content-item--images').width() / $(search+' .slider__dots-cards').length - 4);
        
        //При наведении включается автопроигровании
        $(search+' .popular__content-item--images').mouseover(function() {
            $(search+' .popular__content-images').slick('slickPlay');
        });
        //Отключение автопроигрования
        $(search+' .popular__content-item--images').mouseout(function() {
            $(search+' .popular__content-images').slick('slickPause');
        });
    });

    //Отктытие пунков о казанах
    $('.js-open-about').click(()=>{
        $('.aboutCauldron__hide').slideDown();
    })
    
    //Модальное окно
    //Открытие 
    $('.js-open-modal').click(function(e){
        e.preventDefault();
        openModal($(this).data('openmodal'));
    });
    //Закрытие на кнопку
    $('.js-close-modal').click(function(e)
    {
        e.preventDefault();
        closeModal($(this).data('closemodal'));
    });
    //Закрытие одного модального окна и открытие другого
    $('.js-open-close-modal').click(function(e){
        e.preventDefault();
        closeOpenModal($(this).data('closemodal'), $(this).data('openmodal'));
    })
    //Если это форма
    $('.modal__form').submit(function(e){
        e.preventDefault();

        closeOpenModal($(this).data('closemodal'), $(this).data('openmodal'));
    })
    //Закрытие по клику по заднему фону
    $(document).click(function(e){
        if($(e.target).is($('.modal._active'))){
            closeAllModal();
        }
    });

    //Показ элементов каталога
    $('.catalog__catalog-item').click(function(){
        showCatalog($(this).data('select'));
    })

    //Центровка элемента характеристики
    let maxWidth = 0;
    $('.card__char-char').each(function(){
        if(maxWidth <= $(this).width()){
            maxWidth = $(this).width();
        }
    });
    $('.card__char-char').width(maxWidth);

    //+ - элемент в корзине
    $('.basket__minus').click(function(){
        $($(this).siblings('input')).val(Number($(this).siblings('input').val()) - Number(1));

        deleteProduct($($($(this)).parentsUntil('.basket__products')[4]).data('product'), $(this).siblings('input').val());
    })

    $('.basket__plus').click(function(){
        $($(this).siblings('input')).val(Number($(this).siblings('input').val()) + Number(1));
    })

    $('.basket__price').change(function(){
        deleteProduct($($($(this)).parentsUntil('.basket__products')[4]).data('product'), $(this).val());
    })

    $('.js-clear-basketItem').click(function(){
        $('.basket__product[data-product="'+$($($(this)).parentsUntil('.basket__products')[2]).data('product') + '"] input').val(0);

        deleteProduct($($($(this)).parentsUntil('.basket__products')[2]).data('product'), $('.basket__product[data-product="'+$($($(this)).parentsUntil('.basket__products')[2]).data('product') + '"] input').val());
    });

    //Скрытие самописного placeholder
    $('.buy__input-input').each(function(){
        $($(this)).children('input').focus(function(){
            $(this).siblings('label').hide();
        })
        $($(this)).children('input').blur(function(){
            if($(this).val() === ''){
                $(this).siblings('label').show();
            }
        })
    })

    if($(window).width() <= 1440 && $(window).width() > 960){
        $('.footer__social-content--item svg').each(function(){
            $(this).width($(this).width()-10)
        })
    } else if($(window).width() <= 960 && $(window).width() > 720){
        $('.footer__social-content--item svg').each(function(){
            $(this).width($(this).width()-15)
        })
    }

    if($(window).width() <= 1280){
        $('.advantages__advantage img').each(function(){
            $(this).width($(this).width()-10)
        })
    }
    

    //Квиз, функция с логикой на строчке 353
    let allPages = $('.js-quiz-page').length;
    //Включение логики при загрузке странице
    quiz($('.questions__buttons').data('number'), allPages);
    //Вперед
    $('.js-question-next').click(function(){
        $(this).parent().data('number', $(this).parent().data('number')+1);
        quiz($('.questions__buttons').data('number'), allPages);
    });
    //Назад
    $('.js-question-back').click(function(){
        $(this).parent().data('number', $(this).parent().data('number')-1);
        quiz($('.questions__buttons').data('number'), allPages);
    });
});

//Функции

function adaptive(){
    if(!$('main').hasClass('js-noPadding')){
        $('main').css('padding-top', $('header').height());
    }
    $('.menu__bottom-buttons').css('width', $('.menu__content-list').width());
    $('.questions__line').css('width', Number($('.container').width()-Number(32)));
}

function headerEdit(){
    if($(window).scrollTop()>0){
        $('.header__buttons-item._phone').addClass('-scroll');
        $('.header__buttons-item._phone').removeClass('-scrollOff');
        if($('.header').hasClass('js-darkness')){
            $('.header').removeClass('_dark');
        }
    } else{
        $('.header__buttons-item._phone').removeClass('-scroll');
        $('.header__buttons-item._phone').addClass('-scrollOff');
        if($('.header').hasClass('js-darkness')){
            $('.header').addClass('_dark');
        }
    }
}

function showAdding(search){
    if($(search+' .popular__input').val() > 0){
        $(search+' .popular__buttons-button:not(.reset)').hide();
        $(search+' .popular__buttons-buy').show();
    } else {
        $(search+' .popular__buttons-button:not(.reset)').show();
        $(search+' .popular__buttons-buy').hide();
    }
}

//Открыть модальное окно
function openModal(modal){
    $('*[data-modal="'+modal+'"]').addClass('_active');
    $('.modal__background').fadeIn('slow');
    $('body').addClass('offScroll');
    $('.header__menu').removeClass('_active');
}
//Закрыть
function closeModal(modal){
    $('*[data-modal="'+modal+'"]').removeClass('_active');
    $('.modal__background').fadeOut('slow');
    $('body').removeClass('offScroll');
}
//Открыть и закрыть
function closeOpenModal(closeModal, openModal){
    //Закрытие предущего
    $('*[data-modal="'+closeModal+'"]').removeClass('_active');
    //Открытие нынешнего
    $('*[data-modal="'+openModal+'"]').addClass('_active');
}
//Закрыть все модальные окна
function closeAllModal(){
    $('.modal').removeClass('_active');
    $('.modal__background').fadeOut('slow');
    $('body').removeClass('offScroll');
}

//Показать товаров в каталоге
function showCatalog(catalog){
    $('.catalog__content-item').hide();

    $('.catalog__content-item[data-option="'+catalog+'"]').css("display", "flex").hide().fadeIn('slow');

    $('.catalog__content-item[data-option="'+catalog+'"] .popular__content-images').slick('refresh');
    $('.catalog__content-item[data-option="'+catalog+'"] .product').each(function(){
        //Автоматический подбор ширины кол-ва картинок в карточке
        $('.product[data-id='+$(this).data(`id`)+'] .slider__dots-cards').css('width', $('.catalog__content-item[data-option="'+catalog+'"] .popular__content-item--images').width() / $('.product[data-id='+$(this).data(`id`)+'] .slider__dots-cards').length - 4);
    });
}

//Удаление элемента
function deleteProduct(productId, productQuantity){
    if(productQuantity <= 0){
        $('.basket__product[data-product="'+productId+'"').remove();
    }
}

//Следующая страница квиза
function quiz(number, allPages){
    $('.questions__top-title').hide();
    $('.questions__top-title[data-question-text='+number+']').show();

    if(number>1){
        $('.js-question-back').show();
    } else if(number === 1){
        $('.js-question-back').hide();
    }

    if(number<=allPages){
        $('.js-quiz-page').parent().show();
        $('.js-quiz-page').hide();
        $('.js-quiz-page[data-question='+number+']').fadeIn();
        $('.js-question-next').show();
        $('.js-quiz-end').hide();

    } else{
        $('.js-question-next').hide();
        $('.js-quiz-page').parent().hide();
        $('.js-quiz-end').fadeIn();
    }
}