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
            <a href="#users/[username]/games" class="my-games" style="display:none;" title="{ Translator.trans('myGames') }">{ Translator.trans('myGames') }</a>
          </li>
          <li>
            <a href="#login" class="auth-login" title="{ Translator.trans('login') }">{ Translator.trans('login') }</a>
          </li>
          <li>
            <a href="#logout" class="auth-logout" style="display:none;" title="{ Translator.trans('logout') }">{ Translator.trans('logout') }</a>
          </li>
          <li>
            <a href="#about" title="{ Translator.trans('navbar.about') }">{ Translator.trans('navbar.about') }</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</tweetch-navbar>
