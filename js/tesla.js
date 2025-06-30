$(function () {
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5; // 이벤트를 발생시킬 스크롤의 이동 범위
  var navbarHeight = $("header").outerHeight();

  $(window).scroll(function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250); // 스크롤이 멈춘 후 동작이 실행되기 까지의 딜레이

  function hasScrolled() {
    var st = $(this).scrollTop(); // 현재 window의 scrollTop 값

    // delta로 설정한 값보다 많이 스크롤 되어야 실행된다.
    if (Math.abs(lastScrollTop - st) <= delta) return;

    if (st > lastScrollTop && st > navbarHeight) {
      // 스크롤을 내렸을 때
      $("header").slideUp("fast"); // header 숨기기
    } else {
      // 스크롤을 올렸을 때
      if (st + $(window).height() < $(document).height()) {
        $("header").slideDown("fast"); // header 보이기
      }
    }

    lastScrollTop = st; // 현재 멈춘 위치를 기준점으로 재설정
  }
});

$(function () {
  var swiper = new Swiper(".visualSwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
  });
});
$(document).ready(function () {
  var ww = $(window).width();
  var mySwiper = undefined;

  function initSwiper() {
    if (ww < 1700 && mySwiper == undefined) {
      mySwiper = new Swiper(".carSwiper", {
        pagination: {
          el: ".swiper-pagination",
        },
        loop: true,
        breakpoints: {
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
      });
    } else if (ww >= 1700 && mySwiper != undefined) {
      mySwiper.destroy();
      mySwiper = undefined;
    }
  }

  initSwiper();

  $(window).on("resize", function () {
    ww = $(window).width();
    initSwiper();
  });
});

$(function () {
  var ww = $(window).width();
  var mySwiper;

  function initSwiper() {
    ww = $(window).width();
    if (ww < 768 && !mySwiper) {
      mySwiper = new Swiper(".btnSwiper", {
        initialSlide: 0,
        slidesPerView: 2,
        spaceBetween: 50,
        loop: true,
        autoplay: {
          delay: 2500,
        },
      });

      mySwiper.on("slideChange", function () {
        updateImage(mySwiper.slides[mySwiper.activeIndex].id);
      });

      updateImage(mySwiper.slides[mySwiper.activeIndex].id);
    } else if (ww >= 768 && mySwiper) {
      mySwiper.destroy(true, true); // Swiper를 완전히 파괴
      mySwiper = undefined;
    }
  }

  function updateImage(activeId) {
    $(".changing_img").removeClass("active");
    if (activeId === "sun") {
      $(".chsun").addClass("active");
    } else if (activeId === "batt") {
      $(".chbatt").addClass("active");
    } else if (activeId === "eleccar") {
      $(".cheleccar").addClass("active");
    }
  }

  function initHoverEffects() {
    if ($(window).width() >= 768) {
      $("#sun").hover(
        function () {
          updateImage("sun");
          if (mySwiper) {
            mySwiper.slideTo(0);
          }
        },
        function () {
          if (mySwiper) {
            updateImage(mySwiper.slides[mySwiper.activeIndex].id);
          }
        }
      );

      $("#batt").hover(
        function () {
          updateImage("batt");
          if (mySwiper) {
            mySwiper.slideTo(1);
          }
        },
        function () {
          if (mySwiper) {
            updateImage(mySwiper.slides[mySwiper.activeIndex].id);
          }
        }
      );

      $("#eleccar").hover(
        function () {
          updateImage("eleccar");
          if (mySwiper) {
            mySwiper.slideTo(2);
          }
        },
        function () {
          if (mySwiper) {
            updateImage(mySwiper.slides[mySwiper.activeIndex].id);
          }
        }
      );
    } else {
      $("#sun").off("mouseenter mouseleave");
      $("#batt").off("mouseenter mouseleave");
      $("#eleccar").off("mouseenter mouseleave");
    }
  }

  // 새로 고침 시 기본 이미지 설정
  function setInitialImage() {
    if (!mySwiper) {
      updateImage("sun"); // 또는 원하는 기본 이미지 ID
    }
  }

  setInitialImage();
  initHoverEffects();
  initSwiper();

  $(window).on("resize", function () {
    ww = $(window).width();
    initSwiper();
    initHoverEffects();
    if (mySwiper) {
      mySwiper.update(); // Swiper 업데이트
    }
  });
});

$(function () {
  var swiper = new Swiper(".detailSwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    loop: false,
    effect: "fade",
    fadeEffect: { crossFade: true },
    autoplay: {
      delay: 2500,
    },
    allowSlideClick: true,
    touchRatio: 1,
  });

  $(".detail_awrap a").hover(
    function () {
      var slideIndex = $(this).data("slide-index");
      swiper.slideTo(slideIndex);
      $(".detail_awrap a").not(this).css("opacity", 0.5);
    },
    function () {
      $(".detail_awrap a").css("opacity", 1);
    }
  );
});

$(document).ready(function () {
  var mySwiper = undefined;

  function initSwiper() {
    var ww = window.innerWidth;
    if (ww < 768 && mySwiper == undefined) {
      mySwiper = new Swiper(".contentSwiper", {
        pagination: {
          el: ".swiper-pagination",
        },
        loop: false,
      });
    } else if (ww >= 768 && mySwiper != undefined) {
      mySwiper.destroy(true, true);
      mySwiper = undefined;
    }
  }

  initSwiper();

  $(window).on("resize", function () {
    initSwiper();
  });
});

$(function () {
  var navAni = 0;
  $(".m_btn").on("click", function () {
    if (navAni === 0) {
      $("nav").animate(
        {
          right: "0%",
        },
        300
      );
      navAni = 1;
      $("body").css("overflow", "hidden");
    }
  });
  $(".close_btn").on("click", function () {
    if (navAni === 1) {
      $("nav").animate(
        {
          right: "-100%",
        },
        300
      );
      navAni = 0;
      $("body").css("overflow", "");
    }
  });
  $(window).on("resize", function () {
    var windowWidth = $(window).width();

    if (navAni === 1 && windowWidth >= 768) {
      $("nav").animate({ right: "-100%" }, 300);
      $("body").css("overflow", "");

      navAni = 0;
    }
  });
});

$(function () {
  $("header").mouseenter(function () {
    $(this).css({
      background: "#f2f2f2",
    });
    $(".m_btn").attr("class", "m_btn_act");
    $(".m_account").attr("class", "m_account_act");
    $(".gnb > li > a").attr("id", "colwh");
    if ($(window).width() >= 768) {
      $("h1 > a").attr("class", "logoAct");
    }
  });
});
$(function () {
  $("header").mouseleave(function () {
    $(this).css({
      background: "none",
    });
    $(".m_btn_act").attr("class", "m_btn");
    $(".m_account_act").attr("class", "m_account");
    $(".gnb > li > a").attr("id", "");
    if ($(window).width() >= 768) {
      $("h1 > a").attr("class", "");
    }
  });
});

$(function () {
  $(".order_test").hover(
    function () {
      $(this).css({
        background: "#5a6380",
      });
    },
    function () {
      $(this).css({
        background: "#2c2b3a",
      });
    }
  );
});

$(function () {
  $(".order_test>a").hover(
    function () {
      $(this).css({
        color: "#fff",
        transition: " 0.2s",
      });
    },
    function () {
      $(this).css({
        color: "#fff",
        transition: " 0.2s ",
      });
    }
  );
});

$(function () {
  $(".order_order").hover(
    function () {
      $(this).css({
        background: "#2c2b3a",
      });
    },
    function () {
      $(this).css({
        background: "#fff",
      });
    }
  );
});

$(function () {
  $(".order_order>a").hover(
    function () {
      $(this).css({
        color: "#fff",
      });
    },
    function () {
      $(this).css({
        color: "#000",
      });
    }
  );
});

$(function () {
  $(".category_wrap a").hover(
    function () {
      $(this).css({
        background: "#2c2b3a",
        transition: " 0.2s",
      });
    },
    function () {
      $(this).css({
        background: "#fcfcfc",
      });
    }
  );
});

$(function () {
  $(".category_wrap a").hover(
    function () {
      $(this).css({
        color: "#fff",
      });
    },
    function () {
      $(this).css({
        color: "#000",
      });
    }
  );
});

$(function () {
  function initHoverEffects() {
    if ($(window).width() >= 768) {
      $(".text_btn").hover(
        function () {
          $(this).siblings().css("opacity", "0.1");
        },
        function () {
          $(this).siblings().css("opacity", "1");
        }
      );
    } else {
      // 768 이하일 때 이벤트 제거
      $(".text_btn").off("mouseenter mouseleave");
      $(this).siblings().css("opacity", "1"); // 원상복구
    }
  }

  initHoverEffects();

  $(window).on("resize", function () {
    initHoverEffects();
  });
});

function carsBtopClass() {
  if ($(window).width() >= 360) {
    $(".cars_box_wrap").addClass("animateBtop_box");
  }
}
function updateBtopClass() {
  if ($(window).width() >= 768) {
    $(".eco,.elec,.waste")
      .removeClass("animateLR_box animateRL_box")
      .addClass("animateBtop_box");
  } else {
    $(".eco,.elec,.waste").removeClass("animateBtop_Box");
  }
}

// text는 pc전까지 eco,elec는 768이전까지
function updateLRClass() {
  if ($(window).width() < 768) {
    $(".eco,.elec").addClass("animateLR_box");
  } else {
    $(".eco,.elec").removeClass("animateLR_box");
  }
}
function updateRLClass() {
  if ($(window).width() < 768) {
    $(".waste").addClass("animateRL_box");
  } else {
    $(".waste").removeClass("animateRL_box");
  }
}
function textLRClass() {
  const $texts = $(
    ".models_text, .changing_text, .latest_text, .contents_text"
  );
  const isPC = $(window).width() >= 1700;
  const transformDefaultValue = isPC ? "translateX(-60%)" : "translateX(-50px)";
  const transformAfterValue = isPC ? "translateX(-50%)" : "translateX(0px)";

  $texts.addClass("animateLR_box");

  $texts.css({ transform: transformDefaultValue });

  $texts.filter(".visible").css({
    transform: transformAfterValue,
    transition: "all 0s",
  });
}

function scrollAni() {
  $(
    ".animateBtop_box , .animateTopb_box , .animateLR_box,.animateRL_box,.pcAnimateLRBox,.pcAnimateRLBox"
  ).each(function () {
    var boxTop = $(this).offset().top;
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (scrollTop + windowHeight > boxTop + 100) {
      const isPC = $(window).width() >= 1700;

      $(this).addClass("visible");

      // 여기서 this가 animateLR_box일 경우에만 transform 적용
      if ($(this).hasClass("animateLR_box")) {
        const transformAfterValue = isPC
          ? "translateX(-50%)"
          : "translateX(0px)";
        $(this).css({ transform: transformAfterValue });
      }
    }
  });
}
$(document).ready(function () {
  updateBtopClass();
  textLRClass();
  updateRLClass();
  updateLRClass();
  scrollAni();
  carsBtopClass();
});
$(window).on("scroll", scrollAni);
$(window).on("load", scrollAni);
$(window).on("resize", textLRClass);
$(window).on("resize", function () {
  updateBtopClass();
  updateLRClass();
  updateRLClass();
  textLRClass();
  scrollAni();
});
