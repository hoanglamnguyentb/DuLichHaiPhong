$('.header-mobile__togglemenu').click(function () {
  $('.mobile-left-full').animate({ left: '0px' });
});

$('.header-mobile-title__loginicon').click(function () {
  $('.mobile-right-full').animate({ right: '0px' });
});

$('.header-mobile__leftcolse').click(function () {
  console.log('hello');
  $('.mobile-left-full').animate({ left: '-100%' });
  $('.mobile-right-full').animate({ right: '-100%' });
});

$('.showPassword').click(function (e) {
  e.preventDefault();
  $(this).toggleClass('bi-eye bi-eye-slash');
  var passwordField = $('.input-password');
  var passwordFieldType = passwordField.attr('type');
  if (passwordFieldType === 'password') {
    passwordField.attr('type', 'text');
  } else {
    passwordField.attr('type', 'password');
  }
});
