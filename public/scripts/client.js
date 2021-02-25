/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const parser = function (tweet) {
  let parsedTweet = tweet.slice(6);
  parsedTweet = parsedTweet.split('');
  parsedTweet.forEach(val => {
    if (val === '%') {
      let location = parsedTweet.indexOf('%');
      if (parsedTweet[location + 1] === '2' && parsedTweet[location + 2] === '0') {
        parsedTweet.splice(location, 3, " ")
      }
    }
  });
  
  parsedTweet = parsedTweet.join('');
  return parsedTweet;
}

//Creates the markup for the tweet
const createTweetElement = function (tweetData) {
  const tweetLayout = `
  <article class="article-tweet">
  <header>
  <div>
  <img src="${tweetData.user.avatars}">
  <span>${tweetData.user.name}</span>
  </div>
  <a>${tweetData.user.handle}</a>
  </header> 
  <p>${tweetData.content.text}</p>
  <footer>
  <span>${tweetData.created_at}</span>
  <i>🏴  🔄  💙</i>
  </footer>
  </article>`;
  return tweetLayout;
}

//Loops through the database to and passes each to createTweetElement
const renderTweets = function (data) {
  // const $tweetContainer = $('.tweet-container');
  // $tweetContainer.empty();
  for (const user of data) {
    $('.tweet-container').prepend(createTweetElement(user));
  }
};

//loads data from the tweet page and passes them to renderTweets
const loadTweets = function() {
  $.ajax("/tweets", {method: 'GET'})
  .then(function(data) {
    renderTweets(data);
  });
};


$(document).ready(function() {
  loadTweets();
  //error message
  const error = document.getElementById('error')
  error.style.display = "none";
  
  $("#new-tweet-form").submit(function(event) {
    const $userTweet = $("#tweet-text")
    let submission = $('#new-tweet-form').serialize();
    
    event.preventDefault();
    if ($userTweet.val().length > 140) {
      event.preventDefault();
      error.textContent="Your tweet is too long";
      error.style.display = "block";
    }
    if ($userTweet.val().length === 0) {
      event.preventDefault();
      error.textContent="You should type something first";
      error.style.display = "block";
    }
    if ($userTweet.val().length <= 140 && $userTweet.val().length > 0) {
      submission = parser(submission);
      error.style.display = "none";
      $.ajax({
      url: "/tweets",
      method: "POST",
      data: {text: submission}
      }).then(() => {
        loadTweets();
        error.style.display = "none";
      }).catch(err => {
        console.log('ERR caught in AJAX POST: ', err);
      })
    }
});
});  



