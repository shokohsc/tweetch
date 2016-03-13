<tweetch-stream>
  <h1 class="text-center">{ opts.stream.channel.status } <small><a href="{ opts.stream.channel.url }"><span class="glyphicon glyphicon-link"></span></a></small></h1>
  <h2 class="text-center">{ opts.stream.channel.name } <small>{ Translator.trans('plays') } <a href="#streams/game/{ opts.stream.game }">{ opts.stream.game }</a> { Translator.trans('for') } { opts.stream.viewers } { Translator.trans('viewers') }</small></h2>
  <div class="embed-responsive embed-responsive-16by9">
    <iframe
      class="embed-responsive-item"
      allowfullscreen="true"
      src="//player.twitch.tv/?channel={ opts.stream.channel.name }">
    </iframe>
  </div>
  <tweetch-chat if={ opts.loggedIn == true } data={ opts.stream.channel }></tweetch-chat>
</tweetch-stream>
