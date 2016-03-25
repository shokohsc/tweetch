<stream-list>
  <div class="text-center">
    <div each={ this.opts.streams } class="list stream">
        <a class="hidden-xs" href="#streams/{ channel.name }" title="{ game }">
          <stream-image data={ this }></stream-image>
        </a>
        <a class="visible-xs-inline" href="twitch://open?stream={ channel.name }">
          <stream-image data={ this }></stream-image>
        </a>
        <strong>
          <a class="hidden-xs" href="#streams/{ channel.name }">{ channel.name }</a>
          <a class="visible-xs-inline" href="twitch://open?stream={ channel.name }">{ channel.name }</a>
        </strong>
        <strong class={ hidden: this.parent.opts.hidegamelink }>
          <a href="#streams/game/{ game }">{ game }</a>
        </strong>
        <small>{ viewers } viewer(s) / { videoHeight }p / { channel.language }</small>
    </div>
  </div>
</stream-list>
