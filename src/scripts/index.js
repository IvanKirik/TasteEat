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

    function errorInput(input) {
        if (!input.val()) {
            input.css({
                border: '1px solid red',
            });
            input.addClass('placeholder-red');
            error = true;
        } else {
            input.css({
                border: '1px solid #858585',
            });
            input.remove('placeholder-red');
        }
    }

    errorInput(inputName);
    errorInput(inputEmail);
    errorInput(inputPersons);
    errorInput(inputTiming);
    errorInput(inputDate);

    if (!error) {
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {name: inputName.val()},
        })
            .done(function (message) {
                console.log(message)
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







