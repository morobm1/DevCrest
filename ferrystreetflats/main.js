document.addEventListener('DOMContentLoaded', function() {
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate');
        const triggerBottom = window.innerHeight * 0.92;
        elements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});