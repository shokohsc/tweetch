<tweetch-stream>
  <h1 class="text-center">{ opts.stream.stream.channel.status } <small><a href="{ opts.stream.stream.channel.url }"><span class="glyphicon glyphicon-link"></span></a></small></h1>
  <h2 class="text-center">{ opts.stream.stream.channel.name } <small>{ Translator.trans('plays') } <a href="#streams/game/{ opts.stream.stream.game }">{ opts.stream.stream.game }</a> { Translator.trans('for') } { opts.stream.stream.viewers } { Translator.trans('viewers') }</small></h2>
  <div class="embed-responsive embed-responsive-16by9">
    <video
      id="stream"
      controls
      autoplay="true"
      type="application/vnd.apple.mpegurl"
      src="{ opts.stream.source }">
    </video>
  </div>
  <tweetch-chat if={ opts.loggedIn == true } data={ opts.stream.stream.channel }></tweetch-chat>
</tweetch-stream>
