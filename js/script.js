(function ($) {
  "use strict";
  // preloader
  $(window).on("load", function () {
    // makes sure the whole site is loaded
    $("#status").fadeOut(); // will first fade out the loading animation
    $("#preloader").delay(150).fadeOut("slow"); // will fade out the white DIV that covers the website.
    $("body").delay(150).css({ overflow: "visible" });
  });

  $("#carousel").carousel({
    interval: 3000,
  });
  $(".carousel").carousel({
    interval: false,
  });

  $("select").niceSelect();

  // owl
  $(".loop").owlCarousel({
    items: 3,
    loop: true,
    margin: 6,
    responsive: {
      600: {
        items: 6,
      },
    },
  });

  // active page menu when click
  var url = window.location.href;
  $(".nav li a").each(function () {
    // checks if its the same on the address bar
    if (url === this.href) {
      $(this).closest("li").addClass("active");
    }
  });

  // top contact active
  var con = $(".contact");
  con.hide().eq(0).show();
  $(".list li").on("click", function () {
    var value = "#" + $(this).data("value");
    con.fadeOut(100);
    $(value).delay(150).fadeIn(250);
  });

  // google map initialize
  var map = new GMaps({
    div: "#map",
    lat: -12.043333,
    lng: -77.028333,
  });
  var mapId = $("#map"),
    mapholder = $(".map-holder");
  mapholder.on("click", function () {
    mapId.css("pointer-events", "auto");
  });

  mapholder.on("mouseleave", function () {
    mapId.css("pointer-events", "none");
  });

  // FORM @v 1.0.3
  var contactForm = $("#contact-us"),
    quoteForm = $("#quote-request"),
    subscribeForm = $("#subscribe-me");
  if (
    quoteForm.length > 0 ||
    contactForm.length > 0 ||
    subscribeForm.length > 0
  ) {
    if (!$().validate || !$().ajaxSubmit) {
      console.log("quoteForm: jQuery Form or Form Validate not Defined.");
      return true;
    }
    // Quote Form - home page
    if (quoteForm.length > 0) {
      var selectRec = quoteForm.find("select.required"),
        qf_results = quoteForm.find(".form-results");
      quoteForm.validate({
        ignore: [],
        errorPlacement: function (error, elm) {
          if (elm.is("select.required")) {
            error.insertAfter(elm.next(".nice-select"));
          } else {
            error.insertAfter(elm);
          }
        },
        invalidHandler: function () {
          qf_results.slideUp(400);
        },
        submitHandler: function (form) {
          qf_results.slideUp(400);
          $(form).ajaxSubmit({
            target: qf_results,
            dataType: "json",
            success: function (data) {
              var type =
                data.result === "error" ? "alert-danger" : "alert-success";
              qf_results
                .removeClass("alert-danger alert-success")
                .addClass("alert " + type)
                .html(data.message)
                .slideDown(400);
              if (data.result !== "error") {
                $(form).clearForm();
              }
            },
          });
        },
      });
      selectRec.on("change", function () {
        $(this).valid();
      });
    }
    // Contact Form - contact page
    if (contactForm.length > 0) {
      var cf_results = contactForm.find(".form-results");
      contactForm.validate({
        invalidHandler: function () {
          cf_results.slideUp(400);
        },
        submitHandler: function (form) {
          cf_results.slideUp(400);
          $(form).ajaxSubmit({
            target: cf_results,
            dataType: "json",
            success: function (data) {
              var type =
                data.result === "error" ? "alert-danger" : "alert-success";
              cf_results
                .removeClass("alert-danger alert-success")
                .addClass("alert " + type)
                .html(data.message)
                .slideDown(400);
              if (data.result !== "error") {
                $(form).clearForm();
              }
            },
          });
        },
      });
    }
    // Subsribe - footer form
    if (subscribeForm.length > 0) {
      var sf_results = subscribeForm.find(".form-results");
      subscribeForm.validate({
        invalidHandler: function () {
          sf_results.slideUp(400);
        },
        submitHandler: function (form) {
          sf_results.slideUp(400);
          $(form).ajaxSubmit({
            target: sf_results,
            dataType: "json",
            success: function (data) {
              var type =
                data.result === "error" ? "alert-danger" : "alert-success";
              sf_results
                .removeClass("alert-danger alert-success")
                .addClass("alert " + type)
                .html(data.message)
                .slideDown(400);
              if (data.result !== "error") {
                $(form).clearForm();
              }
            },
          });
        },
      });
    }
  }
})(jQuery);

/* ========================================================================== 
Contact Form Submission
========================================================================== */
window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above
  var form = document.getElementById("contact-form");
  var status = document.getElementById("status2");

  // Success and Error functions for after the form is submitted
  function success() {
    form.reset();
    status.classList.add("success");
    status.innerHTML = "Thanks!";
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

/* ========================================================================== 
Footer Contact Form Submission
========================================================================== */
window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above
  var form = document.getElementById("footer-contact-form");
  var status = document.getElementById("status1");

  // Success and Error functions for after the form is submitted
  function success() {
    form.reset();
    status.classList.add("success");
    status.innerHTML = "Thank You !";
  }

  function error() {
    status.classList.add("error");
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
