<tweetch-streams>
  <h1 class="text-center">{ this.opts.title }</h1>
  <stream-list streams={ opts.streams.streams } title={ opts.title } hidegamelink={ true }></stream-list>
  <div id=pagination class="text-center"></div>

  <script>
    this.on('mount', function() {
      $(this.pagination).twbsPagination({
        totalPages: opts.streams.total !== 0 ? Math.ceil(opts.streams.total / 9) : 1,
        href: '#streams/game/'+opts.title+'/{{number}}'
      })
    })
  </script>
</tweetch-streams>
