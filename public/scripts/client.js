/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const $contentContainer = $("#content-container");

  const loadTweets = () => {
    // renderTweets(tweetData);

    $.ajax({
      url: '/tweets',
      method: 'GET',
      datatype: 'json',
      success: (posts) => {
        renderTweets(posts);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  // 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
  const createTweetElement = function (tweetObject) {
    let date = timeago.format(tweetObject.createdAt);
    let $tweet = `<div id="tweets-container">
    <article id="old-tweet-text">
      <header>
        <div class="avatar-location">
          ${tweetObject.userAvatar}
          <span>${tweetObject.userName}</span>
        </div>
        <div>
         
          <span>${tweetObject.userHandle}</span>
        </div>
      </header>
      <footer class="article-text">
        <p>${tweetObject.tweetContent}</p>
      </footer>
    </article>
    <div>
      <div id="engagement-container">
        <span>${date}</span>
      </div>
      <div class="engagement-buttons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
      </div>
    </div>
  </div>
  </div>`;

    return $tweet;
  }

  // const $tweet = $(`<article class="tweet">Hello world</article>`);
  const renderTweets = function (tweets) {
    // loops through tweets
    $contentContainer.empty();
    tweets.reverse();
    for (const object of tweets) {
      // console.log("the tweets[object] is:", tweets[object]);
      const tweetObject = {
        userName: object.user.name,
        userAvatar: object.user.avatars,
        userHandle: object.user.handle,
        tweetContent: object.content.text,
        createdAt: object.created_at
      }
      // calls createTweetElement for each tweet
      const newTweetTemplate = createTweetElement(tweetObject);
      // takes return value and appends it to the tweets container
      $contentContainer.append(newTweetTemplate)
    }
  }

  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();
    const user = "james";
    const urlEncoded = $(this).serialize();
    const $tweetInput = $('#tweet-text' );
    const newVal = $tweetInput.val();
    const textLength = newVal.length;

    if (textLength > 140) {
      $("#error-popup").slideToggle(function(){
      });
    } else if ($tweetInput.val() === '') {
      $("#no-char-error").slideToggle(function(){
      });
    } else {
      const urlEncoded = $(this).serialize();
      $.post('/tweets',urlEncoded).then(loadTweets);
    }

  });
})
