Array.from(document.querySelectorAll(".popup__close")).forEach(item => {
    if (item.classList.contains("popup-routes__close")) {
        item.addEventListener("click", event => {
            item.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove("popup_visible");
            item.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("popup_hidden");
            event.preventDefault();
        });
    } else {
        item.addEventListener("click", event => {
            item.parentElement.parentElement.classList.remove("popup_visible");
            item.parentElement.parentElement.classList.add("popup_hidden");
            event.preventDefault();
        });
    }
});

Array.from(document.querySelectorAll(".popup")).forEach(item => {
    item.addEventListener("click", event => {
        if (event.target === item) {
            item.classList.remove("popup_visible");
            item.classList.add("popup_hidden");
            event.preventDefault();
        }
    });

    // item.addEventListener("wheel", event => {
    //     let delta = event.deltaY || event.detail;
    //     let wnd = document.querySelector(".popup_visible .popup__window");
    //     if (wnd) {
    //         document.querySelector(".popup_visible .popup__window").scrollBy(0, Math.sign(delta) * 40);
    //         event.preventDefault();
    //     }
    // })
});
