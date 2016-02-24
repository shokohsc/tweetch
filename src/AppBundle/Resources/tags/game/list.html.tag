<game-list>
  <div class="text-center">
    <div each={ this.opts.games } class="list game">
        <a href="#streams/game/{ game.name }">
          <game-image game={ item }></game-image>
        </a>
        <strong>
          <a href="#streams/game/{ game.name }">{ game.name }</a>
        </strong>
        <small>{ viewers } viewer(s)</small>
    </div>
  </div>
  <div id=pagination class="text-center"></div>

  <script>
    $(this.pagination).twbsPagination({
      totalPages: opts.total !== 0 ? Math.ceil(opts.total / 28) : 1,
      href: '#home/top/{{number}}'
    })
  </script>
</game-list>
