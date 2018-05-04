/* globals $ */

let grid

// sama mis window.onload
$(function () {
  getTweets()

  grid = $('#content').isotope({
    itemSelector: '.item' // üks kast
  })
})

function getTweets () {
  $.ajax({
    url: 'getfeed.php', // vajadusel saab urliga kaasa saata parameetreid
    success: function (data) {
      const array = JSON.parse(data).statuses // stringi teeb massiiviks

      console.log(array)
      printTweets(array)
    },
    error: function (error) {
      console.log(error)
    }
  })
}

function printTweets (newTweets) {
  let html = ''

  $(newTweets).each(function (i, tweet) {
    html += '<div class="item">' +
                '<div class="profile-image" style="background-image:url(' + tweet.user.profile_image_url.replace('_normal', '') + ')"></div>' +
                '<p>' + tweet.user.name + '</p>' +
                '<p>' + tweet.text + '</p>' +
            '</div>'
  })

  // laeb sisu allapoole otsa
  // $("#content").append($(html));

  // $(html) teeb tavalise stringi html elementideks, see on vajalik isotope'i jaoks
  const tweetsHTML = $(html)

  // laeb ettepoole otsa ja aktiveerib isotope'i
  grid.prepend(tweetsHTML)
    .isotope('prepended', tweetsHTML)
    .isotope('layout')

    // oota 10s ja siis küsi uuesti
  window.setTimeout(function () {
    getTweets()
  }, 10000)
}
