<tweetch-stream>
  <h1 class="text-center">{ opts.stream.stream.channel.status } <small><a href="{ opts.stream.stream.channel.url }"><span class="glyphicon glyphicon-link"></span></a></small></h1>
  <h2 class="text-center">{ opts.stream.stream.channel.name } <small>{ Translator.trans('plays') } <a href="#streams/game/{ opts.stream.stream.game }">{ opts.stream.stream.game }</a> { Translator.trans('for') } { opts.stream.stream.viewers } { Translator.trans('viewers') }</small></h2>
  <div class="embed-responsive embed-responsive-16by9">
    <video
      id="video"
      >
    </video>
  </div>
  <tweetch-chat if={ opts.loggedIn == true } data={ opts.stream.stream.channel }></tweetch-chat>
  <script>
    var hls = new Hls({debug:true, xhrSetup:function(xhr, url) {
      xhr.setRequestHeader('Access-Control-Allow-Origin', location.protocol+'//'+location.host)
      xhr.withCredentials = true
    }})
    this.on('before-mount', function() {
      var source = opts.stream.source
      var video = this.video
      if(Hls.isSupported()) {
        hls.loadSource(location.protocol+'//'+location.host+'/streams/'+source)
        // hls.loadSource(source)
        hls.attachMedia(video)
        // hls.on(Hls.Events.MANIFEST_PARSED,function() {
        //   video.play()
        // })
      }
    })

    this.on('unmount', function() {
      hls.destroy()
    })
  </script>
</tweetch-stream>
