<tweetch-stream>
  <h1 class="text-center">{ opts.channel.displayName } <small><a href="{ opts.channel.url }"><span class="glyphicon glyphicon-link"></span></a></small></h1>
  <h2 class="text-center">{ opts.channel.name } <small>{ Translator.trans('plays') } <a href="#streams/game/{ opts.game }">{ opts.game }</a> { Translator.trans('for') } { opts.viewers } { Translator.trans('viewers') }</small></h2>
  <div class="embed-responsive embed-responsive-16by9">
    <iframe
      class="embed-responsive-item"
      allowfullscreen="true"
      src="//player.twitch.tv/?channel={ opts.channel.name }">
    </iframe>
  </div>
</tweetch-stream>
