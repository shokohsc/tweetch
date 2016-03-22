<tweetch-stream>
  <h1 class="text-center">{ opts.stream.stream.channel.status } <small><a href="{ opts.stream.stream.channel.url }"><span class="glyphicon glyphicon-link"></span></a></small></h1>
  <h2 class="text-center">{ opts.stream.stream.channel.name } <small>{ Translator.trans('plays') } <a href="#streams/game/{ opts.stream.stream.game }">{ opts.stream.stream.game }</a> { Translator.trans('for') } { opts.stream.stream.viewers } { Translator.trans('viewers') }</small></h2>
  <div class="embed-responsive embed-responsive-16by9">
    <div id="player" class="embed-responsive-item"></div>
  </div>
  <tweetch-chat if={ opts.loggedIn == true } data={ opts.stream.stream.channel }></tweetch-chat>
  <script>
    this.on('before-mount', function() {
      var player;
    })
    this.on('mount', function() {
      $("#player").resize({
        aspectRatio: 16 / 9,
        maxHeight: 720,
        maxWidth: 1280,
        minHeight: 180,
        minWidth: 320
      })
      if (undefined !== player) {
        player = new Clappr.Player({
          source: opts.stream.source,
          parentId: "#player",
          height: "100%",
          width: "100%"
        })
      }
    })
    this.on('unmount', function() {
      if (undefined !== player) {
        player.destroy()
      }
    })
  </script>
</tweetch-stream>
