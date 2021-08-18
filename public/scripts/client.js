/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const $contentContainer = $("#content-container");

  // load tweets from server/data-files/initial-tweets.json database
  const loadTweets = () => {
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

  // generate an avatar for each user post
  const generateRandomAvatar = () => {
    const rndInt = Math.floor(Math.random() * 4) +1
    const avatars = [
    "<i class='fas fa-user-nurse'></i>",
    "<i class='fas fa-user-ninja'></i>",
    "<i class='fas fa-user-md'></i>",
    "<i class='fas fa-user-injured'></i>",
    "<i class='fas fa-user-graduate'></i>" 
  ]
  return avatars[rndInt];
  }

  // escape function to protect server from user input
  const escape = function(str) {
    let div = document.createElement("p");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // function to create each tweet element to be displayed on the page
  const createTweetElement = function (tweetObject) {
    let date = timeago.format(tweetObject.createdAt);
    let $tweet = `<div id="tweets-container">
    <article id="old-tweet-text">
      <header>
        <div class="avatar-location">
          ${generateRandomAvatar()}
          <span>${tweetObject.userName}</span>
        </div>
        <div>
         
          <span>${tweetObject.userHandle}</span>
        </div>
      </header>
      <footer class="article-text">
        <p>${escape(tweetObject.tweetContent)}</p>
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

  // function to display each created tweet element on the page 
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

  // when 'submit' button is clicked or user hits 'enter':
  $('form').on('submit', function(event) {
    //prevent the page from reloading
    event.preventDefault();

    const $tweetInput = $('#tweet-text' );
    const newVal = $tweetInput.val();
    const textLength = newVal.length;

    // test if user input is over 140 chars 
    if (textLength > 140) {
      // show error popup 
      $("#error-popup").slideToggle(function(){
        // clear error popup after 3 seconds
      }).delay(3000).slideToggle(function(){});
      
    } 
    // test if user input is empty string
    else if ($tweetInput.val() === '') {
      // show error popup 
      $("#no-char-error").slideToggle(function(){
        // clear error popup after 3 seconds
      }).delay(3000).slideToggle(function(){});
    } 
    // if no errors, post the tweet.
    else {
      const urlEncoded = $(this).serialize();
      $("#tweet-text").val('')
      $('.char-count').val(140);
      $.post('/tweets',urlEncoded).then(loadTweets);
    }
  });
})
