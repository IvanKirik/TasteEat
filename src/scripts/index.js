//Слик-слайдер
$('.slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    arrow: false,
    appendArrows: false,
    responsive: [
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 1,
            }
        },
    ]
});

//открываем меню на мобильной версии
let menuMobile = $('#menu-mobile');
let menu = $('.menu-items');

menuMobile.click(function () {
    menu.css({
        display: 'flex',
    })
    menuMobile.hide();
})

$(document).mouseup(function (e) {
    if (!menu.is(e.target)  && menu.has(e.target).length === 0) {
        menu.css({
            display: 'none',
        })
        menuMobile.show();
    }
})



//включаем слик при конкретной ширине экрана

// window.addEventListener("resize", function() {
//     if (window.innerWidth <= 670) {
//         $('.blog-items').slick({
//             slidesToShow: 1,
//             slidesToScroll: 1,
//         });
//
//     } else {
//
//     }
//
// });


//Плавный скролл
$('a').click(function () {
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top + 'px'
    }, {
        duration: 1000,
        easing: 'swing'
    });
    return false;
});

let button = $('#button-book');
let inputName = $('#name');
let inputEmail = $('#email');
let inputPersons = $('#persons');
let inputTiming = $('#timing');
let inputDate = $('#date');

inputTiming.mask('00:00');
inputDate.mask('00/00');

button.click(function () {
     let error = false;

     if (!inputName.val()) {
         inputName.css({
             border: '1px solid red',
         });
         inputName.addClass('placeholder-red');
         error = true;
     } else {
         inputName.css({
             border: '1px solid #858585',
         });
         inputName.remove('placeholder-red');
     }

    if (!inputEmail.val()) {
        inputEmail.css({
            border: '1px solid red',
        });
        inputEmail.addClass('placeholder-red');
        error = true;
    } else {
        inputEmail.css({
            border: '1px solid #858585',
        });
        inputEmail.remove('placeholder-red');
    }

    if (!inputPersons.val()) {
        inputPersons.css({
            border: '1px solid red',
        });
        inputPersons.addClass('placeholder-red');
        error = true;
    } else {
        inputPersons.css({
            border: '1px solid #858585',
        });
        inputPersons.remove('placeholder-red');
    }

    if (!inputPersons.val()) {
        inputTiming.css({
            border: '1px solid red',
        });
        inputTiming.addClass('placeholder-red');
        error = true;
    } else {
        inputTiming.css({
            border: '1px solid #858585',
        });
        inputTiming.remove('placeholder-red');
    }

    if (!inputPersons.val()) {
        inputDate.css({
            border: '1px solid red',
        });
        inputDate.addClass('placeholder-red');
        error = true;
    } else {
        inputDate.css({
            border: '1px solid #858585',
        });
        inputDate.remove('placeholder-red');
    }

    if (!error) {
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {name: inputName.val()},
        })
            .done(function (message) {
                if (message.success) {
                    alert('Заявка принята');
                    inputName.val('');
                    inputEmail.val('');
                    inputDate.val('');
                    inputTiming.val('');
                    inputPersons.val('');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
            });
    }


})