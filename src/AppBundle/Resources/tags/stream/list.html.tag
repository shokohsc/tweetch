<stream-list>
  <div class="text-center">
    <div each={ this.opts.streams } class="list stream">
        <a href="#channels/{ channel.name }">
          <stream-image stream={ item }></stream-image>
        </a>
        <strong>
          <a href="#channels/{ channel.name }">{ channel.name }</a>
        </strong>
        <small>{ viewers } viewers</small>
    </div>
  </div>
</stream-list>
