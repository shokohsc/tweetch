<game-image>
  <img
    id="incredible_{ game.id }"
    class="img-thumbnail"
    src="{ game.box.medium.encrypt() }"
    alt="{ game.name }"
    height="190"
    width="136"
  />

  <script>
    this.game = this.opts.game
  </script>
</game-image>
