<tweetch-stream>
  <h1 class="text-center">{ opts.channel.displayName } <small><a href="{ opts.channel.url }"><span class="glyphicon glyphicon-link"></span></a></small></h1>
  <h2 class="text-center">{ opts.channel.name } <small>plays <a href="#streams/game/{ opts.game }">{ opts.game }</a> for { opts.viewers } viewer(s)</small></h2>
  <div class="embed-responsive embed-responsive-16by9">
    <iframe
      class="embed-responsive-item"
      allowfullscreen="true"
      src="//player.twitch.tv/?channel={ opts.channel.name }">
    </iframe>
  </div>
</tweetch-stream>
