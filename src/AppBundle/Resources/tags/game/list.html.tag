<game-list>
  <div class="text-center">
    <div each={ this.opts.games } class="list game">
        <a href="#streams?game={ game.name }">
          <game-image game={ item }></game-image>
        </a>
        <strong>
          <a href="#streams?game={ game.name }">{ game.name }</a>
        </strong>
        <small>{ viewers } viewers</small>
    </div>
  </div>
</game-list>
