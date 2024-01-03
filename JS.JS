document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById('navbar');
    var navItems = document.querySelectorAll('.nav-item');
    var sections = document.querySelectorAll('.content-section');
    var backToTopButton = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopButton.style.display = 'block';
        } else {
            navbar.classList.remove('scrolled');
            backToTopButton.style.display = 'none';
        }

        sections.forEach(function (section, index) {
            if (isElementInViewport(section)) {
                setActiveNavItem(index);
                updateBodyBackgroundColor(section.id);
            }
        });
    });

    navItems.forEach(function (item, index) {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            var targetSectionId = this.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetSectionId);

            window.scrollTo({
                top: targetSection.offsetTop - navbar.offsetHeight + 1,
                behavior: 'smooth'
            });
        });

        item.addEventListener('mouseover', function () {
            this.style.backgroundColor = '#555';
            this.style.color = '#ffcc00';
        });

        item.addEventListener('mouseout', function () {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
                this.style.color = 'white';
            }
        });
    });

    backToTopButton.addEventListener('click', function () {
        scrollToTop();
    });

    function isElementInViewport(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function setActiveNavItem(index) {
        navItems.forEach(function (item, i) {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
                item.style.backgroundColor = '';
                item.style.color = 'white';
            }
        });
    }

    function updateBodyBackgroundColor(sectionId) {
        document.body.style.backgroundColor = getSectionBackgroundColor(sectionId);
    }

    function getSectionBackgroundColor(sectionId) {
        var section = document.getElementById(sectionId);
        return window.getComputedStyle(section).backgroundColor;
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});
