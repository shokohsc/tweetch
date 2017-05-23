<game-list>
  <div class="text-center">
    <div each={ this.opts.games } class="list game">
        <a href="#streams/game/{ game.name }" title="{ game.name }">
          <game-image data={ this.game }></game-image>
        </a>
        <strong>
          <a href="#streams/game/{ game.name }" title="{ game.name }">{ game.name }</a>
        </strong>
        <small>{ viewers } { Translator.trans('viewers') }</small>
    </div>
  </div>
</game-list>
