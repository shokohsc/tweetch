<stream-list>
  <h1 class="text-center">{ this.opts.title }</h1>
  <div class="text-center">
    <div each={ this.opts.streams.streams } class="list stream">
        <a href="#channels/{ channel.name }">
          <stream-image stream={ item }></stream-image>
        </a>
        <strong>
          <a href="#channels/{ channel.name }">{ channel.name }</a>
        </strong>
        <small>{ viewers } viewers / { videoHeight }p / { channel.language }</small>
    </div>
  </div>
  <div id=pagination class="text-center"></div>

  <script>
    $(this.pagination).twbsPagination({
      totalPages: opts.streams.streams.length !== 0 ? Math.floor(opts.streams.streams.length / 10) : 1,
      href: '#streams/game/'+encodeURIComponent(opts.title)+'/{{number}}'
    })
  </script>
</stream-list>
