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

//пишем для fetch универсальную функцию, куда можно подставлять другие адреса и данные
//+используем операторы async и await, чтобы сделать код синхронным
const postData = async function (url, data) {
    const result = await fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await result.json();
}


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

    // if (!error) {
    //     $.ajax({
    //         method: "POST",
    //         url: "https://testologia.site/checkout",
    //         data: {name: inputName.val()},
    //     })
    //         .done(function (message) {
    //             console.log(message)
    //             if (message.success) {
    //                 alert('Заявка принята');
    //                 inputName.val('');
    //                 inputEmail.val('');
    //                 inputDate.val('');
    //                 inputTiming.val('');
    //                 inputPersons.val('');
    //             } else {
    //                 alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
    //             }
    //         });
    // }



    if (!error) {

        //собираем данные с формы с помощью объекта FormData
        let form = document.getElementById('form');
        const formDate = new FormData(form);
        const values = Object.fromEntries(formDate.entries());

        postData('http://localhost:3000/request', JSON.stringify(values))
        .then(data => {
                console.log(data);
                alert('Заявка принята');
                form.reset();
            })
        .catch(() => {
                alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
            })
        .finally(() => {
                form.reset();
            })

    }


})

//cоздаем карточки с помощью классов
// class Dishes {
//     constructor(images, alt, name, price, description, element) {
//         this.images = images;
//         this.alt = alt;
//         this.name = name;
//         this.price = price;
//         this.description = description;
//         this.element = document.querySelector(element);
//     }
//     render() {
//         const block = document.createElement('div');
//         block.classList.add('popular-menu-item');
//         block.innerHTML = `
//         <div class="item-img">
//             <img src=${this.images} alt="${this.alt}">
//         </div>
//         <div class="name-price">
//             <div class="name">${this.name}</div>
//              <div class="price">${this.price}</div>
//         </div>
//         <div class="item-description">${this.description}</div>
//         `
//         this.element.append(block);
//     }
// }
//
//
// const getResources = async function (url) {
//     const result = await fetch(url);
//
//     //т.к. для fetch ошибки вроде 404 - не ошибки, то делаем проверку
//     if(!result.ok) {
//         throw new Error(`Could not fetch ${url}, status: ${result.status}`);
//     }
//     return await result.json();
// }

//делает get-запрос на сервер и получаем данные для карточек товаров
//перебираем массив(его возвращает запрос), в котором находятся объекты и вызываем конструктор
// getResources('http://localhost:3000/dishes')
//     .then(data => {
//         data.forEach(({images, alt, name, price, description}) => { //деструктурируем объект
//             new Dishes(images, alt, name, price, description, '.popular-menu-items').render();
//         });
//     });



