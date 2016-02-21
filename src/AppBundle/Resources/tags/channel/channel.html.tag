<tweetch-channel>
  <div class="embed-responsive embed-responsive-16by9">
    <iframe
      class="embed-responsive-item"
      src="http://player.twitch.tv/?channel={ channel.name }">
    </iframe>
  </div>

  <script>
    this.channel = this.opts.channel
    console.log(this.channel);
  </script>
</tweetch-channel>
