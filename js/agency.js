(function() {
    "use strict";

    var SCROLL_OFFSET = 51;
    var AFFIX_OFFSET = 100;
    var PAGE_SCROLL_OFFSET = 50;

    function initPageScroll() {
        document.querySelectorAll("a.page-scroll").forEach(function(link) {
            link.addEventListener("click", function(event) {
                var href = link.getAttribute("href");
                if (!href || href.charAt(0) !== "#") {
                    return;
                }

                var target = document.querySelector(href);
                if (!target) {
                    return;
                }

                event.preventDefault();
                var top = target.getBoundingClientRect().top + window.pageYOffset - PAGE_SCROLL_OFFSET;
                window.scrollTo({ top: top, behavior: "smooth" });
            });
        });
    }

    function initNavbarAffix() {
        var nav = document.getElementById("mainNav");
        if (!nav) {
            return;
        }

        function updateAffix() {
            nav.classList.toggle("affix", window.scrollY >= AFFIX_OFFSET);
        }

        window.addEventListener("scroll", updateAffix, { passive: true });
        updateAffix();
    }

    function initScrollSpy() {
        var nav = document.getElementById("mainNav");
        if (!nav) {
            return;
        }

        var entries = [];
        nav.querySelectorAll(".navbar-nav .nav-item").forEach(function(li) {
            var link = li.querySelector('a[href^="#"]');
            if (!link) {
                return;
            }

            var id = link.getAttribute("href").slice(1);
            var section = id === "page-top" ? document.body : document.getElementById(id);
            if (section) {
                entries.push({ li: li, section: section });
            }
        });

        entries.sort(function(a, b) {
            return a.section.offsetTop - b.section.offsetTop;
        });

        function setActiveItem(activeLi) {
            nav.querySelectorAll(".navbar-nav .nav-item").forEach(function(li) {
                li.classList.toggle("active", li === activeLi);
            });
        }

        function updateActiveSection() {
            var scrollPosition = window.scrollY + SCROLL_OFFSET;
            var activeEntry = entries[0];

            entries.forEach(function(entry) {
                if (entry.section.offsetTop <= scrollPosition) {
                    activeEntry = entry;
                }
            });

            if (activeEntry) {
                setActiveItem(activeEntry.li);
            }
        }

        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection);
        updateActiveSection();
    }

    function initMobileNavCollapse() {
        document.querySelectorAll(".navbar-collapse ul li a:not(.dropdown-toggle)").forEach(function(link) {
            link.addEventListener("click", function() {
                var toggle = document.querySelector(".navbar-toggler");
                var collapse = document.querySelector(".navbar-collapse");
                if (!toggle || !collapse) {
                    return;
                }

                if (window.getComputedStyle(toggle).display === "none") {
                    return;
                }

                if (collapse.classList.contains("show")) {
                    toggle.click();
                }
            });
        });
    }

    initPageScroll();
    initNavbarAffix();
    initScrollSpy();
    initMobileNavCollapse();
})();
