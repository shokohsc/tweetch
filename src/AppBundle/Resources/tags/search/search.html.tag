<tweetch-search>
  <div class="well">
    <tweetch-search-form></tweetch-search-form>
  </div>

  <search-games if={ opts.entity == 'games' } games={ opts.results.games }></search-games>
  <search-streams if={ opts.entity == 'streams' } streams={ opts.results.streams }></search-streams>
  <div id=pagination class="text-center"></div>

  <script>
    this.on('mount', function() {
      $(this.pagination).twbsPagination({
        totalPages: opts.results.total && opts.results.total !== 0 ? Math.ceil(opts.results.total / 9) : 1,
        href: '#search/'+opts.entity+'/'+opts.q+'/{{number}}'
      })
    })
  </script>
</tweetch-search>
