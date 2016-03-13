<tweetch-stream>
  <h1 class="text-center">{ opts.stream.stream.channel.status } <small><a href="{ opts.stream.stream.channel.url }"><span class="glyphicon glyphicon-link"></span></a></small></h1>
  <h2 class="text-center">{ opts.stream.stream.channel.name } <small>{ Translator.trans('plays') } <a href="#streams/game/{ opts.stream.stream.game }">{ opts.stream.stream.game }</a> { Translator.trans('for') } { opts.stream.stream.viewers } { Translator.trans('viewers') }</small></h2>
  <div class="embed-responsive embed-responsive-16by9">
    <video
      id="video"
      controls
      autoplay="true"
      type="application/vnd.apple.mpegurl">
    </video>
  </div>
  <tweetch-chat if={ opts.loggedIn == true } data={ opts.stream.stream.channel }></tweetch-chat>
  <script>
    this.on('before-mount', function() {
      var source = opts.stream.source.encrypt()
      var video = this.video
      if(Hls.isSupported()) {
        var hls = new Hls()
        hls.loadSource(source)
        hls.attachMedia(video)
        // hls.on(Hls.Events.MANIFEST_PARSED,function() {
        //   video.play()
        // })
      } else {
        $(video).attr('src', source)
      }
    })
  </script>
</tweetch-stream>
