<tweetch-channel>
  <h1 class="text-center">{ channel.name }</h1>
  <div class="embed-responsive embed-responsive-16by9">
    <iframe
      class="embed-responsive-item"
      allowfullscreen="true"
      src="https://player.twitch.tv/?channel={ channel.name }">
    </iframe>
  </div>

  <script>
    this.channel = this.opts
  </script>
</tweetch-channel>
