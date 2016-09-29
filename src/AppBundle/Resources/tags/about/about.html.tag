<tweetch-about>
  <h1>{ Translator.trans('about.what.question') }</h1>
  <p>{ Translator.trans('about.what.answer') }</p>

  <h3>{ Translator.trans('about.who.question') }</h3>
  <p>{ Translator.trans('about.who.answer', {'age': age}) }</p>

  <h3>{ Translator.trans('about.why.question') }</h3>
  <p><raw html={ Translator.trans('about.why.answer') }/></p>

  <h3>{ Translator.trans('about.thanks.main') }</h3>
  <p>{ Translator.trans('about.thanks.iThank') }
    <ul class="list-unstyled">
      <li><strong><a href="//heroku.com">Heroku</a></strong> { Translator.trans('about.thanks.heroku') }</li>
      <li><strong><a href="//twitch.tv">Twitch</a></strong> { Translator.trans('about.thanks.twitch') }</li>
      <li><strong><a href="//sensiolabs.com/">Sensiolabs</a></strong> { Translator.trans('about.thanks.sensiolabs') }</li>
      <li><strong><a href="//riotjs.com/">RiotJs</a></strong> { Translator.trans('about.thanks.riotjs') }</li>
      <li><strong><a href="//getbootstrap.com/">Twitter Bootstrap</a></strong> { Translator.trans('about.thanks.bootstrap') }</li>
      <li><strong><a href="//fontlibrary.org/">Open Font Library</a></strong> { Translator.trans('about.thanks.openfonts') }</li>
    </ul>
  </p>
  
  <script>
    var birthday = +new Date(1986, 2, 27);
    var age = ~~((Date.now() - birthday) / (31557600000));
    this.age = age.toString()
  </script>
</tweetch-about>

<raw>
  var self = this,
      updateHTML = function(){
        self.root.innerHTML = self.opts.html || ""
      }
  updateHTML()
  this.on("updated", updateHTML)
</raw>
