<tweetch-home>
  <div class="well">
    <tweetch-search-form></tweetch-search-form>
  </div>
  <game-list games={ opts.ranks }></game-list>
  <div id=pagination class="text-center"></div>

  <script>
    this.on('mount', function() {
      $(this.pagination).twbsPagination({
        pageVariable: 'page',
        totalPages: opts.total !== 0 ? Math.ceil(opts.total / 28) : 1,
        href: '#home/top/{{number}}'
      })
    })
  </script>
</tweetch-home>
