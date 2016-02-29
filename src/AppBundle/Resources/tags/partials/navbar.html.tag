<tweetch-navbar>
  <nav class="navbar navbar-default navbar-inverse" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">{ Translator.trans('navbar.navigation') }</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#home" title="Tweet">Tweetch</a>
      </div>

      <div id="navbar" class="navbar-collapse collapse" role="navigation">
        <ul class="nav navbar-nav">
          <li>
            <a href="#streams/featured" title="{ Translator.trans('featured') }">{ Translator.trans('featured') }</a>
          </li>
          <li>
            <a href="#users/shokohsc/games" title="{ Translator.trans('myGames') }">{ Translator.trans('myGames') }</a>
          </li>
          <li>
            <a href="#" class="twitch-login" title="{ Translator.trans('login') }">{ Translator.trans('login') }</a>
            <a href="#" class="twitch-logout hidden" title="{ Translator.trans('logout') }">{ Translator.trans('logout') }</a>
          </li>
          <li>
            <a href="#about" title="{ Translator.trans('navbar.about') }">{ Translator.trans('navbar.about') }</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <script>
    this.on('mount', function() {
      // Login
      $('.twitch-login').click(function(e) {
        e.preventDefault()
        Twitch.login({
          redirect_uri: 'http://localhost:8000/#login',
          scope: ['user_read', 'channel_read']
        })
      })
      // Logout
      $('.twitch-logout').click(function(e) {
        e.preventDefault()
        Twitch.logout()
      })
    })
  </script>
</tweetch-navbar>
