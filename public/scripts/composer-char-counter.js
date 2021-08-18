$(document).ready(function() {
  const $textInput = $('#tweet-text' );
  // when the user inputs a value:
  $textInput.on("input", function() {
    const maxLength = 140;
    const inputLength = $(this).val().length;
    let $counter = $('.char-count');
    $counter.html(maxLength - inputLength);
    // check that the users input does not exceed 140 characters
    if ($counter.val() < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "");
    }
  });

});