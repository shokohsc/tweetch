<tweetch-follows-games>
    <div class="text-center">
      <div each={ this.opts.games } class="list game">
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
    $(this.pagination).twbsPagination({
      totalPages: opts.total && opts.total !== 0 ? Math.ceil(opts.total / 28) : 1,
      href: '#users/shokohsc/games/{{number}}'
    })
  </script>
</tweetch-follows-games>
