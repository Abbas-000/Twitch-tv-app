$(document).ready(function() {
  //Array of Channels to show
  var allChannels = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck"
  ];
  //for getting list each channels we use while loop
  var i = 0;
  while (i < allChannels.length) {
    //pass each channel to the getJSON method
    $.getJSON(
      "https://wind-bow.gomix.me/twitch-api/streams/" +
        allChannels[i] +
        "?callback=?",
      function(streamData) {

        /*the offlineCHName var is only to get the channels name to paas it with an argument in the request url if the channel's stream is null*/
        var offlineCHName = streamData._links.channel.substring(38);

        if (streamData.stream != null) {
          //the Vars starting from here is to pass there value in the <li> to the HTML

          var { logo, display_name:name, url:link, game:status } = streamData.stream.channel;

          //creating the <li> begins from here
          var media =
            "<li class='media my-4'><img class='mr-3' src=" +
            logo +
            " alt="+name+"><div class='media-body text-center'><a href=" +
            link +
            " target='_blank'><h5 class='mt-0 mb-1'>" +
            name +
            " <sup><span class='badge badge-pill badge-success'>Live</span></sup></h5></a><p class='text-center text-info'>" +
            status +
            "</p></div></li>";
          /*Now pass the created <li> in media var we append it in All and Online tabs since this contains live channels*/
          $("#allTabDrop").append(media);
          $("#onlineTabDrop").append(media);

        } else if (streamData.stream === null) {
          //Here we pass the channels name to the url
          var requestUrl =
            "https://wind-bow.gomix.me/twitch-api/channels/" +
            offlineCHName +
            "?callback=?";//Note: this url is different from the previous one
          //calling the function
          isOffline(requestUrl);
        }
      }
    );
    i++;
  }
});

function isOffline(requestUrl) {
  $.getJSON(requestUrl, function(channelData) {
    /*Here all remains the same except that this time we don't show summary of the channel since its offline and we put Offline badge infront of Channel name*/
    var { logo, display_name:name, url:link } = channelData;

    var media = "<li class='media my-4'><img class='mr-3' src=" + logo + " alt="+name+"><div class='media-body text-center'><a href=" + link + " target='_blank'><h5 class='mt-0 mb-1'>" + name + " <sup><span class='badge badge-pill badge-warning'>Offline</span></sup></h5></a></div></li>";
    //Appending the created <li> in the All and offline tab since these are all offline channels list
    $("#allTabDrop").append(media);
    $("#offlineTabDrop").append(media);
  });
}
