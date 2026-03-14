document.addEventListener('DOMContentLoaded', () => {


    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            mobileBtn.querySelector('i').classList.toggle('fa-bars');
            mobileBtn.querySelector('i').classList.toggle('fa-times');
        });
    }
});
