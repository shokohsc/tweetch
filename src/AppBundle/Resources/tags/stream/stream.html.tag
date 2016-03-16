<tweetch-stream>
  <h1 class="text-center">{ opts.stream.stream.channel.status } <small><a href="{ opts.stream.stream.channel.url }"><span class="glyphicon glyphicon-link"></span></a></small></h1>
  <h2 class="text-center">{ opts.stream.stream.channel.name } <small>{ Translator.trans('plays') } <a href="#streams/game/{ opts.stream.stream.game }">{ opts.stream.stream.game }</a> { Translator.trans('for') } { opts.stream.stream.viewers } { Translator.trans('viewers') }</small></h2>
  <div class="embed-responsive embed-responsive-16by9">
    <div
      id="video">
    </div>
  </div>
  <tweetch-chat if={ opts.loggedIn == true } data={ opts.stream.stream.channel }></tweetch-chat>
  <script>
    this.on('mount', function() {
      var source = opts.stream.source
      // var video = this.video
      var player = new Clappr.Player({source: opts.stream.source.encrypt(), parentId: "#video", hlsjsConfig: {xhrSetup: function(xhr, url) {
        xhr.withCredentials = true // do send cookies
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      }}})
      // opts.streamService.streamStream(source).done(function(fileName) {
      //   $(video).attr('src', location.protocol+'//'+location.host+'/streams/'+fileName)
      // })
      // $(video).attr('src', location.protocol+'//'+location.host+'/streams/'+source+'.mp4')
    })
  </script>
</tweetch-stream>
