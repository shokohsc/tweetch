<tweetch-follows-games>
    <h1 class="text-center">{ Translator.trans('myGames') }</h1>
    <div class="text-center">
      <div each={ this.opts.games.games } class="list game">
          <a href="#streams/game/{ name }">
            <game-image game={ this }></game-image>
          </a>
          <strong>
            <a href="#streams/game/{ name }">{ name }</a>
          </strong>
      </div>
    </div>
  <div id=pagination class="text-center"></div>

  <script>
    this.on('mount', function() {
      $(this.pagination).twbsPagination({
        totalPages: opts.games.total && opts.games.total !== 0 ? Math.ceil(opts.games.total / 28) : 1,
        href: '#users/[username]/games/{{number}}'
      })
      opts.authService.trigger('logged-in')
    })
  </script>
</tweetch-follows-games>
