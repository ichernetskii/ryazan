window.addEventListener('scroll', function() {
    if (window.pageYOffset > 20) {
        document.getElementsByClassName("header")[0].classList.add("header_scrolled");
    } else {
        document.getElementsByClassName("header")[0].classList.remove("header_scrolled");
    }
});
