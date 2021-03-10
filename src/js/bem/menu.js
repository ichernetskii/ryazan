document.querySelector(".menu").addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("menu__active");
    document.querySelector(".menu__active")
        ? document.querySelector(".menu").classList.remove("menu__inactive")
        : document.querySelector(".menu").classList.add("menu__inactive");
});
