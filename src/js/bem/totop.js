import animateScrollTo from "animated-scroll-to";

window.addEventListener("scroll", function() {
    if (window.pageYOffset > 20) {
        document.querySelector(".totop").classList.add("totop_visible");
    } else {
        document.querySelector(".totop").classList.remove("totop_visible");
    }
});

Array.from(document.getElementsByClassName("totop")).forEach(item => {
    item.addEventListener("click", () => {
        animateScrollTo(0, {
            speed: 300,
            maxDuration: 1500
        });
    });
})
