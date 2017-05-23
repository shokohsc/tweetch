<search-games>
  <div class="text-center">
    <div each={ this.opts.games } class="list game">
        <a href="#streams/game/{ name }" title="{ name }">
          <game-image data={ this }></game-image>
        </a>
        <strong>
          <a href="#streams/game/{ name }" title="{ name }">{ name }</a>
        </strong>
    </div>
  </div>
</search-games>
