<featured-list>
  <h1 class="text-center">{ Translator.trans('featured') }</h1>
  <div class="text-center">
    <div each={ this.opts.streams } class="list stream">
        <a class="hidden-xs" href="#streams/{ stream.channel.name }">
          <img
            id="incredible_{ this.stream.id }"
            class="img-thumbnail"
            src="{ this.stream.preview.medium.encrypt() }"
            alt="{ this.stream.id }"
            height="180"
            width="320"
          />
        </a>
        <a class="visible-xs-inline" href="twitch://open?stream={ stream.channel.name }">
          <img
            id="incredible_{ this.stream.id }"
            class="img-thumbnail"
            src="{ this.stream.preview.medium.encrypt() }"
            alt="{ this.stream.id }"
            height="180"
            width="320"
          />
        </a>
        <strong>
          <a class="hidden-xs" href="#streams/{ stream.channel.name }">{ stream.channel.name }</a>
          <a class="visible-xs-inline" href="twitch://open?stream={ stream.channel.name }">{ stream.channel.name }</a>
        </strong>
        <small>{ stream.viewers } { Translator.trans('viewers') } / { stream.videoHeight }p / { stream.channel.language }</small>
    </div>
  </div>
</featured-list>
