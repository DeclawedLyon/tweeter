/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// takes a database and a username and returns an object
// const getTweetData = (dataBase, tweetName) => {
//   for (const object of dataBase) {
//     if (object.user.name === tweetName) {
//       const tweetObject = {
//         userName: object.user.name,
//         userAvatar: object.user.avatars,
//         userHandle: object.user.handle,
//         tweetContent: object.content.text,
//         createdAt: object.created_at
//       }
//       return tweetObject;
//     }
//   }
// }

$(document).ready(function () {
  const $button = $('#submit-tweet');
  const $newTweetInput = $('#input-field');
  const $articleText = $('.article-text > p');
  const $contentContainer = $("#content-container");

  // Fake data taken from initial-tweets.json
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": '<i class="fas fa-user-astronaut"></i>',
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": '<i class="fas fa-user-astronaut"></i>',
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  $button.on('click', () => {
    const textVal = $newTweetInput.val();
    console.log("The text val is:", textVal);
  });

  const createTweetElement = function (tweet) {

    let $tweet = `<div id="tweets-container">
    <article id="old-tweet-text">
      <header>
        <div class="avatar-location">
          ${tweet.userAvatar}
          <span>${tweet.userName}</span>
        </div>
        <div>
          <i class="fas fa-at"></i>
          <span>${tweet.userHandle}</span>
        </div>
      </header>
      <footer class="article-text">
        <p>${tweet.tweetContent}</p>
      </footer>
    </article>
    <div>
      <div id="engagement-container">
        <span>${tweet.createdAt}</span>
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
renderTweets(tweetData);
})
