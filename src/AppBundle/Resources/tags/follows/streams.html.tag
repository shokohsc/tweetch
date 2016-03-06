<tweetch-followed-streams>
  <h1 class="text-center">{ Translator.trans('myFollowedStreams') }</h1>
  <stream-list streams={ this.opts.streams }></stream-list>
  <div id=pagination class="text-center"></div>

  <script>
    $(this.pagination).twbsPagination({
      totalPages: opts.total !== 0 ? Math.ceil(opts.total / 9) : 1,
      href: '#streams/followed/{{number}}'
    })
  </script>
</tweetch-followed-streams>
