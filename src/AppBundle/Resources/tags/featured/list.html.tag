<featured-list>
  <div class="text-center">
    <div each={ this.opts.streams } class="list featured">
        <a class="hidden-xs" href="#streams/{ stream.channel.name }" title="{ stream.channel.status }">
          <stream-image data={ this.stream }></stream-image>
        </a>
        <a class="visible-xs-inline" href="twitch://open?stream={ stream.channel.name }" title="{ stream.channel.status }">
          <stream-image data={ this.stream }></stream-image>
        </a>
        <strong>
          <a class="hidden-xs" href="#streams/{ stream.channel.name }" title="{ stream.channel.name }">{ stream.channel.name }</a>
          <a class="visible-xs-inline" href="twitch://open?stream={ stream.channel.name }" title="{ stream.channel.name }">{ stream.channel.name }</a>
        </strong>
        <strong>
          <a href="#streams/game/{ stream.game }" title="{ stream.game }">{ stream.game }</a>
        </strong>
        <small>{ stream.viewers } { Translator.trans('viewers') } / { stream.videoHeight }p / { stream.channel.language }</small>
    </div>
  </div>
</featured-list>
