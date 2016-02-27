<search-streams>
  <div class="text-center">
    <div each={ this.opts.streams } class="list stream search">
        <a class="hidden-xs" href="#streams/{ channel.name }">
          <stream-image stream={ item }></stream-image>
        </a>
        <a class="visible-xs-inline" href="twitch://open?stream={ channel.name }">
          <stream-image stream={ item }></stream-image>
        </a>
        <strong>
          <a class="hidden-xs" href="#streams/{ channel.name }">{ channel.name }</a>
          <a class="visible-xs-inline" href="twitch://open?stream={ channel.name }">{ channel.name }</a>
          <a href="#streams/game/{ game }">{ game }</a>
        </strong>
        <small>{ viewers } { Translator.trans('viewers') } / { videoHeight }p / { channel.language }</small>
    </div>
  </div>
</search-streams>
