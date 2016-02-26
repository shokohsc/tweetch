<tweetch-search>
  <search-channels if={ opts.entity == 'channels' } channels={ opts.results.channels } total=></search-channels>
  <search-games if={ opts.entity == 'games' } games={ opts.results.games } total=></search-games>
  <search-streams if={ opts.entity == 'streams' } streams={ opts.results.streams } total=></search-streams>
  <div id=pagination class="text-center"></div>

  <script>
    $(this.pagination).twbsPagination({
      totalPages: opts.results.total !== 0 ? Math.ceil(opts.results.total / 10) : 1,
      href: '#search/'+opts.entity+'/'+opts.q+'/{{number}}'
    })
  </script>
</tweetch-search>
