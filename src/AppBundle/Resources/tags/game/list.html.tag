<game-list>
  <div class="text-center">
    <div each={ this.opts.games } class="list">
        <a href="#channels/{ game.id }">
          <game-image game={ item }></game-image>
        </a>
        <strong>
          <a href="#channels/{ game.id }">
            { game.name }
          </a>
        </strong>
        <small>
          { viewers } viewers
        </small>
    </div>
  </div>
</game-list>
