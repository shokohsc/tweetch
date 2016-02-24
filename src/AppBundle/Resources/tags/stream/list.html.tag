<stream-list>
  <h1 class="text-center">{ this.opts.title }</h1>
  <div class="text-center">
    <div each={ this.opts.streams.streams } class="list stream">
        <a class="hidden-xs" href="#streams/{ channel.name }">
          <stream-image stream={ item }></stream-image>
        </a>
        <a class="visible-xs-inline" href="twitch://open?stream={ channel.name }">
          <stream-image stream={ item }></stream-image>
        </a>
        <strong>
          <a class="hidden-xs" href="#streams/{ channel.name }">{ channel.name }</a>
          <a class="visible-xs-inline" href="twitch://open?stream={ channel.name }">{ channel.name }</a>
        </strong>
        <small>{ viewers } viewer(s) / { videoHeight }p / { channel.language }</small>
    </div>
  </div>
  <div id=pagination class="text-center"></div>

  <script>
    $(this.pagination).twbsPagination({
      totalPages: opts.streams.total !== 0 ? Math.ceil(opts.streams.total / 10) : 1,
      href: '#streams/game/'+opts.title+'/{{number}}'
    })
  </script>
</stream-list>
