$(document).ready(function () {
  const link = encodeURI(window.location.href);
  const title = encodeURIComponent(document.querySelector('title').text);
  const fb = document.querySelector('.facebook');
  const email = document.querySelector('.email-share');
  fb.href = `https://www.facebook.com/share.php?u=${link};title=${title}`;
  email.href = `mailto:?subject=${link}`;
  //email.href = `mailto:?subject=${link};body=${title}`

  $('.copy-link').click(function () {
    // Copy the text inside the text field
    navigator.clipboard.writeText(link);
    NotiSuccess('Copy link thành công!');
  });
});
