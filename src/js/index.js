/*!
 * Website is created in web-studio Smarto: https://smarto.pro
 * Copyright (C) 2020 Smarto
 */
import "normalize.css";
import "@style/style.scss";
import "@js/bem/menu.js";
import "@js/bem/header.js";
import "@js/bem/totop.js";
import "@js/bem/popup.js";
import {jsonPOST, filePOST} from "@js/bem/XMLHttpRequest.js";
import Swiper from "swiper";
import Plyr from "plyr";
// object-fit & object-position polyfill
import objectFitImages from "object-fit-images";
import animateScrollTo from "animated-scroll-to";
// OverlayScrollbars.js
import "overlayscrollbars/js/OverlayScrollbars.min.js";

document.addEventListener("DOMContentLoaded", () => {
    // audio/video player
    new Plyr(".excursion__player", {
        controls: ['play-large', 'progress', 'mute', 'volume', 'captions', 'pip', 'airplay', 'fullscreen'],
        //youtube: {noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1, controls: 0}
    });
    new Plyr(".popup-routes__player_light", {
        controls: ['play', 'progress', 'captions']
    });
    new Plyr(".popup-routes__player_classic", {
        controls: ['play', 'progress', 'captions']
    });
    new Plyr(".popup-routes__player_selfie", {
        controls: ['play', 'progress', 'captions']
    });
    new Plyr(".popup-routes__player_health", {
        controls: ['play', 'progress', 'captions']
    });

    // OverlayScrollbars.js
    OverlayScrollbars(document.querySelectorAll(".popup-routes"), {
        className : "os-theme-round-dark"
    });

    // + object-fit & object-position polyfill
    objectFitImages(".bg");
    // - object-fit & object-position polyfill

    // open modal window on click
    function bindModalWindow(elementSelector, modalWindowSelector) {
            document.querySelector(elementSelector).addEventListener("click", event => {
                document.querySelector(modalWindowSelector).classList.add("popup_visible");
                document.querySelector(modalWindowSelector).classList.remove("popup_hidden");
                event.preventDefault();
            });
        }

    function bindScrollLink(elementSelector, targetSelector) {
            document.querySelector(elementSelector).addEventListener("click", () => {
                animateScrollTo(document.querySelector(targetSelector), {
                    speed: 300,
                    maxDuration: 1100,
                    verticalOffset: targetSelector !== ".main" ? -62 : 0
                });
            });
        }

    // + scroll link button
    bindScrollLink(".menu__item_road", ".road");
    bindScrollLink(".menu__item_excursion", ".excursion");
    bindScrollLink(".menu__item_info", ".info");
    bindScrollLink(".menu__item_routes", ".routes");
    bindScrollLink(".menu__item_recommend", ".recommend");
    bindScrollLink(".menu__item_food", ".food");
    bindScrollLink(".menu__item_see", ".see");
    bindScrollLink(".menu__item_hotels", ".hotels");
    bindScrollLink(".menu__item_gift", ".gift");
    bindScrollLink(".link_road", ".road");
    bindScrollLink(".link_excursion", ".excursion");
    bindScrollLink(".link_info", ".info");
    bindScrollLink(".link_routes", ".routes");
    bindScrollLink(".link_recommend", ".recommend");
    bindScrollLink(".link_food", ".food");
    bindScrollLink(".link_see", ".see");
    bindScrollLink(".link_hotels", ".hotels");
    bindScrollLink(".link_gift", ".gift");
    // - scroll link button

    // + section main
    new Swiper('.main__swiper-container', {
        freeMode: true,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    // - section main

    // + modal windows
    bindModalWindow(".main__button-styled", ".popup_main");
    bindModalWindow(".day-1__button-styled", ".popup_main");
    bindModalWindow(".day-2__button-styled", ".popup_main");
    bindModalWindow(".road__button-classic_car", ".popup_car");
    bindModalWindow(".road__button-classic_bus", ".popup_bus");
    bindModalWindow(".road__button-classic_train", ".popup_train");
    bindModalWindow(".road__button-classic_river", ".popup_river");
    bindModalWindow(".excursion__button-link", ".popup_excursion-details");
    bindModalWindow(".excursion__button-styled", ".popup_signup");
    bindModalWindow(".routes__button-styled_light", ".popup_light");
    bindModalWindow(".routes__button-styled_classic", ".popup_classic");
    bindModalWindow(".routes__button-styled_selfie", ".popup_selfie");
    bindModalWindow(".routes__button-styled_health", ".popup_health");
    bindModalWindow(".recommend__label_1", ".popup_recommend_1");
    bindModalWindow(".recommend__label_2", ".popup_recommend_2");
    bindModalWindow(".recommend__label_3", ".popup_recommend_3");
    bindModalWindow(".recommend__label_4", ".popup_recommend_4");
    bindModalWindow(".recommend__label_5", ".popup_recommend_5");
    bindModalWindow(".see__button-classic_partner", ".popup_partner");
    bindModalWindow(".footer__button-classic_partner", ".popup_partner");
    bindModalWindow(".footer__button-classic_excursion", ".popup_signup");
    bindModalWindow(".gift__button-styled", ".popup_gift");

    // - modal windows

    // + section days
    //      first slide
    document.querySelector(".day-1 .button-arrow").addEventListener("click", event => {
        document.querySelector(".day-1").classList.remove("days__wrapper_active");
        document.querySelector(".day-2").classList.add("days__wrapper_active");
        event.preventDefault();
    });

    //      second slide
        document.querySelector(".day-2 .button-arrow").addEventListener("click", event => {
            document.querySelector(".day-2").classList.remove("days__wrapper_active");
            document.querySelector(".day-1").classList.add("days__wrapper_active");
            event.preventDefault();
        });
    // - section days

    // + section routes
    new Swiper('.routes__swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false,
        breakpoints: {
            720: {
                slidesPerView: 2,
                spaceBetween: 20,
                allowTouchMove: true
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 30,
                allowTouchMove: true
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    // - section routes

    // + section see
    new Swiper(".see__swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            500: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            720: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            1000: {
                slidesPerView: 5,
                spaceBetween: 20
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    // - section see

    // + section recommend
    new Swiper(".recommend__swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        breakpoints: {
            400: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            550: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            720: {
                slidesPerView: 5,
                spaceBetween: 10,
                allowTouchMove: false
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    // - section recommend

    // + section food
    new Swiper(".food__swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        breakpoints: {
            400: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            550: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            720: {
                slidesPerView: 4,
                spaceBetween: 10
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 10,
                allowTouchMove: false
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    // - section recommend

    // + section hotels
    new Swiper(".hotels__swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    // - section hotels

    // + section gift
    let giftSwiper = new Swiper(".gift__swiper-container", {
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: false
    });

    let giftData = {};

    function slideNext(event, stop) {
        let hasErrors = true;

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_1")) {
            document.querySelector(".gift__button-classic-action").innerHTML = "Далее → ";
            hasErrors = false;
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_2")) {
            if (document.querySelector(".gift__file").value !== "") {
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_3")) {
            if (document.querySelector(".gift__text_name").value !== "") {
                giftData.name = document.querySelector(".gift__text_name").value;
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_4")) {
            if (document.querySelector(".gift__radio_sex_male").checked) {
                giftData.sex = "male";
                hasErrors = false;
            }
            if (document.querySelector(".gift__radio_sex_female").checked) {
                giftData.sex = "female";
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_5")) {
            if (document.querySelector(".gift__text_city").value !== "") {
                giftData.city = document.querySelector(".gift__text_city").value;
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_6")) {
            if (document.querySelector(".gift__radio_days_1").checked) {
                giftData.days = 1;
                hasErrors = false;
            }
            if (document.querySelector(".gift__radio_days_2").checked) {
                giftData.days = 2;
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_7")) {
            if (document.querySelector(".gift__text_know").value !== "") {
                giftData.know = document.querySelector(".gift__text_know").value;
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_8")) {
            if (document.querySelector(".gift__text_impress").value !== "") {
                giftData.impress = document.querySelector(".gift__text_impress").value;
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_9")) {
            if (document.querySelector(".gift__text_work").value !== "") {
                giftData.work = document.querySelector(".gift__text_work").value;
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_10")) {
            if (document.querySelector(".gift__text_back").value !== "") {
                giftData.back = document.querySelector(".gift__text_back").value;
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_11")) {
            if (document.querySelector(".gift__text_recommend").value !== "") {
                giftData.recommend = document.querySelector(".gift__text_recommend").value;
                document.querySelector(".gift__button-classic-action").innerHTML = "Получить подарок";
                hasErrors = false;
            }
        }

        if (document.querySelector(".popup_gift .swiper-slide-active").classList.contains("gift__swiper-slide_12")) {
            if (document.querySelector(".gift__text_email").value !== "" &&
                document.querySelector(".gift__checkbox").checked === true) {
                document.querySelector(".gift__button-classic-download").classList.remove("hidden");
                document.querySelector(".gift__button-classic-action").classList.add("hidden");
                giftData.email = document.querySelector(".gift__text_email").value;

                // send mail
                jsonPOST("gift_mail.php", giftData);

                hasErrors = false;
            }
        }

        if (!hasErrors) giftSwiper.slideNext();
        if (stop) event.preventDefault();
    }

    document.querySelectorAll(".gift__text").forEach(item => {
        item.addEventListener("keypress", event => {
            if (event.code === "Enter" || event.key === "Enter") {
                slideNext(event, false);
            }
        })
    });

    document.querySelector(".gift__button-classic-action").addEventListener("click", event => {
        slideNext(event, true);
    });

    document.querySelector(".gift__file").addEventListener("change", event => {
        let file = event.currentTarget;
        if (file.files.length) {
            let img = file.files[0];
            let formData = new FormData();
            formData.append("file", img);
            filePOST("upload.php", formData, data => {
                if (data !== "error") {
                    let relativePath = "img/gift/" + data;
                    //document.querySelector(".gift__preview").setAttribute("src", data);
                    document.querySelector(".gift__result").innerHTML = "<span>Файл успешно загружен</span>";
                    document.querySelector(".gift__result").classList.add("gift__result_success");
                    document.querySelectorAll(".gift__result-img").forEach(item => {
                        item.setAttribute("src", relativePath);
                    });
                    document.querySelectorAll(".gift__result-link").forEach(item => {
                        item.setAttribute("href", relativePath);
                    });
                    document.querySelectorAll(".gift__button-classic-download").forEach(item => {
                        item.setAttribute("href", relativePath);
                    })
                    let encodedURL = encodeURIComponent(window.location.protocol + "//" +
                                     window.location.host +
                                     ((window.location.pathname[window.location.pathname.length-1] === "/") ? window.location.pathname.slice(0, -1) : window.location.pathname)
                                     + "/" + relativePath);
                    let description = encodeURIComponent("Моё фото из Рязани");
                    let title = encodeURIComponent("Рязань+");
                    document.querySelectorAll(".gift__social_vk").forEach(item => {
                        item.setAttribute("href", "http://vk.com/share.php?url=" + encodedURL + "&description=" + description + "&title=" + title + "&image=" + encodedURL);
                    });
                    document.querySelectorAll(".gift__social_fb").forEach(item => {
                        item.setAttribute("href", "http://www.facebook.com/sharer.php?u=" + encodedURL + "&t=" + description);
                    });
                    document.querySelectorAll(".gift__social_ok").forEach(item => {
                        item.setAttribute("href", "https://connect.ok.ru/offer?url=" + encodedURL + "&title=" + title + "&imageUrl=" + encodedURL);
                    });
                } else {
                    document.querySelector(".gift__result").innerHTML = "<span>Ошибка</span>";
                    document.querySelector(".gift__result").classList.add("gift__result_error");
                }
            }, () => {
            });
        }
    });

    // erases all inputed data
    function resetData() {
        giftSwiper.slideTo(0, 0);
        document.querySelector(".gift__button-classic-download").classList.add("hidden");
        document.querySelector(".gift__button-classic-action").classList.remove("hidden");
        document.querySelector(".gift__button-classic-action").innerHTML = "Начать";
        document.querySelector(".gift__file").value = "";
        document.querySelector(".gift__result").innerHTML = "";
        document.querySelectorAll(".gift__text").forEach(item => {
            item.value = "";
        });
        document.querySelectorAll(".gift__radio").forEach(item => {
            item.checked = false;
        });
        document.querySelectorAll(".gift__checkbox").forEach(item => {
            item.checked = false;
        });
    }

    // reset slider when click cross
    document.querySelector(".popup_gift .popup__close").addEventListener("click", event => {
        giftData = {};
        setTimeout(() => {
            resetData();
        }, 500);
    });

    // reset slider when click outside
    document.querySelector(".popup_gift").addEventListener("click", event => {
        if (event.target === event.currentTarget) {
            giftData = {};
            setTimeout(() => {
                resetData();
            }, 500);
        }
    });
    // - section gift

    // + popup signup
    document.querySelector(".popup_signup .feedback__button-styled").addEventListener("click", event => {
        let request = {
            theme: "Заявка с сайта на экскурсию",
            name:  document.querySelector(".popup_signup .feedback__textbox_name").value,
            from:  document.querySelector(".popup_signup .feedback__textbox_from").value,
            phone: document.querySelector(".popup_signup .feedback__textbox_phone").value,
            email: document.querySelector(".popup_signup .feedback__textbox_email").value,
            agree: document.querySelector(".popup_signup .feedback__checkbox").checked
        };

        jsonPOST("mail.php", request, response => {
            document.querySelector(".popup_signup .feedback__response").innerHTML = response.result;
        }, () => {
            document.querySelector(".popup_signup .feedback__response").innerHTML = "Произошла ошибка.";
        });

        event.preventDefault();
    });
    // - popup signup

    // + popup main
    document.querySelector(".popup_main .signup__button-styled_main").addEventListener("click", event => {
        let request = {
            email: document.querySelector(".popup_main .signup__textbox_main").value,
        };

        jsonPOST("guide_mail.php", request, response => {
            document.querySelector(".popup_main .feedback__response").innerHTML = response.result;
        }, () => {
            document.querySelector(".popup_main .feedback__response").innerHTML = "Произошла ошибка.";
        });

        event.preventDefault();
    });
    // - popup main

    // + popup health
    document.querySelector(".health__button-styled").addEventListener("click", event => {
        let request = {
            email: document.querySelector(".popup_health .signup__textbox_health").value,
        };

        jsonPOST("special_mail.php", request, response => {
            document.querySelector(".popup_health .feedback__response").innerHTML = response.result;
        }, () => {
            document.querySelector(".popup_health .feedback__response").innerHTML = "Произошла ошибка.";
        });

        event.preventDefault();
    });
    // - popup health

    // + popup partner
    document.querySelector(".popup_partner .feedback__button-styled").addEventListener("click", event => {
        let request = {
            theme: "Заявка с сайта на партнёрство",
            name:  document.querySelector(".popup_partner .feedback__textbox_name").value,
            company:  document.querySelector(".popup_partner .feedback__textbox_company").value,
            phone: document.querySelector(".popup_partner .feedback__textbox_phone").value,
            agree: document.querySelector(".popup_partner .feedback__checkbox").checked
        };

        jsonPOST("mail.php", request, response => {
            document.querySelector(".popup_partner .feedback__response").innerHTML = response.result;
        }, () => {
            document.querySelector(".popup_partner .feedback__response").innerHTML = "Произошла ошибка.";
        });

        event.preventDefault();
    });
    // - popup partner
});
