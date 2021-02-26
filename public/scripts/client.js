/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
const escape = function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Creates the markup for the tweet
const createTweetElement = function(tweetData) {
  const safeHTML = `<p class='tweet-text'>${escape(tweetData.content.text)}</p>`;

  const tweetLayout = `
  <article class="article-tweet">
  <header>
  <div>
  <img src="${tweetData.user.avatars}">
  <span>${tweetData.user.name}</span>
  </div>
  <a>${tweetData.user.handle}</a>
  </header> 
  ${safeHTML}
  <footer>
  <span>${moment(tweetData.created_at).fromNow()}</span>
  <div>
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>
  </div>
  </footer>
  </article>`;
  return tweetLayout;
};

//Loops through the database to and passes each to createTweetElement
const renderTweets = function(data) {
  const $tweetContainer = $('.tweet-container');
  $tweetContainer.empty();
  for (const user of data) {
    $tweetContainer.prepend(createTweetElement(user));
  }
};

//loads data from the tweet page and passes them to renderTweets
const loadTweets = function() {
  $.ajax("/tweets", { method: 'GET' })
    .then(function(data) {
      renderTweets(data);
    });
};

//Submits the tweet if it meets the character count criteria
const submitTweet = function() {
  $("#new-tweet-form").submit(function(event) {
    const $userTweet = $("#tweet-text");
    let submission = $('#new-tweet-form').find('textarea').val();
    //prevents page refresh when new tweet is posted
    event.preventDefault();
    if ($userTweet.val().length > 140) {
      error.textContent = "Your tweet is too long";
      error.style.display = "block";
    }
    if ($userTweet.val().length === 0) {
      error.textContent = "You should type something first";
      error.style.display = "block";
    }
    if ($userTweet.val().length <= 140 && $userTweet.val().length > 0) {
      error.style.display = "none";
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: { text: submission },
        dataType: "text"
      }).then(() => {
        //resets tweet form and loads new tweets without refreshing entire page
        $('#new-tweet-form').trigger("reset");
        loadTweets();
        error.style.display = "none";
      }).catch(err => {
        console.log('ERR caught in AJAX POST: ', err);
      });
    }
  });
};


$(document).ready(function() {
  loadTweets();
  //error message
  const error = document.getElementById('error');
  error.style.display = "none";
  submitTweet();
});