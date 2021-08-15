$(document).ready(function() {
  // --- our code goes here ---
  // console.log(jQuery)
  const $textInput = $('#tweet-text' );
  const $charCounter = $('.char-count');
  const $submitTweet = $('#submit-tweet')
  // console.log($charCounter)
  let count = 140;
  $textInput.on('keypress', (event) => {
    // console.log(event);
    count--;
    if (count < 0) {
      $charCounter.addClass('danger')
      $charCounter.removeClass('counter')
    }
    // console.log("charcounter is: ", $charCounter.val())
    $charCounter.val(count)
    // console.log($textInput.val())
    
  })
  // $submitTweet.on('click', () => {
  //   const $textInput = $('#tweet-text' );
  //   const newVal = $textInput.val();
  //   console.log(newVal);
  // })
});