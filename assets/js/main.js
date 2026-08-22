(function ($) {
  "use strict";

  // Configuration constants
  const SWIPER_CONFIG = {
    testimonial: {
      slidesPerView: 2,
      spaceBetween: 25,
      loop: true,
      speed: 1000,
      autoplayDelay: 5000,
      paginationEl: ".pagination__dot",
      breakpoints: {
        1601: { slidesPerView: 2 },
        1200: { slidesPerView: 2 },
        768: { slidesPerView: 2 },
        767: { slidesPerView: 1 },
        320: { slidesPerView: 1 }
      }
    },
    project: {
      slidesPerView: 3,
      spaceBetween: 25,
      loop: true,
      speed: 1000,
      autoplayDelay: 5000,
      breakpoints: {
        1601: { slidesPerView: 3 },
        1600: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
        1199: { slidesPerView: 3 },
        700: { slidesPerView: 2.5 },
        650: { slidesPerView: 2 },
        480: { slidesPerView: 2 },
        320: { slidesPerView: 1 }
      }
    }
  };

  const PAGE_TITLES = {
    'index': 'خانه',
    'about': 'درباره ما',
    'blog-details': 'جزییات بلاگ',
    'blog': 'بلاگ',
    'contact': 'تماس با ما',
    'education': 'تحصیلات',
    'portfolio-details': 'جزییات نمونه کار',
    'portfolio': 'نمونه کار',
    'pricing': 'قیمت گذاری',
    'service': 'خدمات'
  };

  const ANIMATION_DURATION = 0.2;
  const PRELOADER_FADE_DURATION = 500;

  /**
   * Initialize Swiper sliders
   */
  function initSwiperSliders() {
    const createSlider = (selector, config) => {
      try {
        new Swiper(selector, {
          slidesPerView: config.slidesPerView,
          spaceBetween: config.spaceBetween,
          loop: config.loop,
          dots: true,
          speed: config.speed,
          autoplay: {
            delay: config.autoplayDelay,
            disableOnInteraction: false
          },
          pagination: {
            el: config.paginationEl || ".swiper-pagination",
            clickable: true
          },
          breakpoints: config.breakpoints
        });
      } catch (error) {
        console.warn(`Swiper slider failed to initialize for ${selector}`);
      }
    };

    createSlider(".cm-testimonial", SWIPER_CONFIG.testimonial);
    createSlider(".project-slider", SWIPER_CONFIG.project);
  }

  /**
   * Initialize offcanvas menu
   */
  function initOffcanvasMenu() {
    try {
      const toggleElements = ".cm-menu-overlay, .cm-close-icon, .light-mode, .dark-mode, .cm-menu ul li a.link";
      const openElements = "#offcanvase, .offcanvase";

      $(toggleElements).on("click", () => {
        $(".cm-offcanvase").removeClass("cm-active");
        $(".cm-menu-inner").removeClass("cm-active");
      });

      $(openElements).on("click", () => {
        $(".cm-menu-inner").addClass("cm-active");
        $(".cm-offcanvase").addClass("cm-active");
      });
    } catch (error) {
      console.warn("Offcanvas menu failed to initialize");
    }
  }

  /**
   * Set active navigation link based on current page
   */
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.link');
    
    links.forEach(link => {
      if (link.href.includes(currentPath)) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Initialize SVG injection
   */
  function initSvgInject() {
    try {
      SVGInject(document.querySelectorAll("img.svg"));
    } catch (error) {
      console.warn("SVG injection failed to initialize");
    }
  }

  /**
   * Initialize theme switcher (dark/light mode)
   */
  function initThemeSwitcher() {
    const themeSwitcher = $('.mode-switcher');
    if (!themeSwitcher.length) return;

    const toggle = $('#theme-mode, #theme-mode-2');
    const storedTheme = localStorage.getItem('axz-portfolio') || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    $('html').attr('data-theme', storedTheme);

    toggle.on("click", function () {
      const currentTheme = $('html').attr('data-theme');
      const targetTheme = currentTheme === "light" ? "dark" : "light";

      gsap.to('body', {
        opacity: 0,
        duration: ANIMATION_DURATION,
        ease: "power1.out",
        onComplete: () => {
          $('html').attr('data-theme', targetTheme);
          localStorage.setItem('axz-portfolio', targetTheme);
          gsap.to('body', {
            opacity: 1,
            duration: ANIMATION_DURATION,
            ease: "power1.out"
          });
        }
      });
    });
  }

  /**
   * Initialize preloader
   */
  function initPreloader() {
    $(window).on("load", () => {
      $("#preloader").fadeOut(PRELOADER_FADE_DURATION);
    });
  }

  /**
   * Main initialization function for other JS components
   */
  function initOtherComponents() {
    initPreloader();
    initSwiperSliders();
    initOffcanvasMenu();
    setActiveNavLink();
    initSvgInject();
    initThemeSwitcher();
  }

  /**
   * Delay utility function
   */
  function delay(ms = 2000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get page title translation
   */
  function getPageTitle(namespace) {
    return PAGE_TITLES[namespace] || namespace;
  }

  /**
   * GSAP animation for page transitions
   */
  function runPageAnimation() {
    const timeline = gsap.timeline();
    
    timeline.to(".animation__screen", {
      duration: 1,
      width: "100%",
      left: "0%",
      ease: "Expo.easeInOut",
      onComplete: () => {
        const path = window.location.pathname;
        const namespace = path.split('/').pop().replace(/\.html$/, '');
        const title = getPageTitle(namespace);
        document.querySelector('.animation__screen').innerText = title;
      }
    });

    timeline.to(".animation__screen", {
      duration: 1,
      width: "100%",
      left: "100%",
      ease: "Expo.easeInOut",
      delay: 0.5
    });

    timeline.set(".animation__screen", {
      left: "-100%"
    });
  }

  /**
   * Animate main title text
   */
  function animateMainTitle() {
    gsap.from("h1.main-title", {
      duration: 1.3,
      y: 30,
      opacity: 0,
      stagger: 0.4,
      delay: 0.2
    });
  }

  /**
   * Initialize Barba.js for page transitions
   */
  function initBarba() {
    barba.init({
      sync: true,
      transitions: [{
        async leave(data) {
          const done = this.async();
          runPageAnimation();
          await delay(1000);
          done();
        },
        async enter(data) {
          animateMainTitle();
        },
        async once(data) {
          animateMainTitle();
        }
      }]
    });

    barba.hooks.after(() => {
      initOtherComponents();
    });
  }

  // Initialize application
  initBarba();
  initOtherComponents();

})(jQuery);
