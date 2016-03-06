<tweetch-follows-games>
  <h1 class="text-center">{ Translator.trans('myFollowedGames') }</h1>
  <game-list games={ this.opts.games.follows.games }></game-list>
  <div id=pagination class="text-center"></div>

  <script>
    this.on('mount', function() {
      $(this.pagination).twbsPagination({
        totalPages: opts.games.follows.total !== 0 ? Math.ceil(opts.games.follows.total / 28) : 1,
        href: '#users/'+opts.games.username+'/games/{{number}}'
      })
    })
  </script>
</tweetch-follows-games>
