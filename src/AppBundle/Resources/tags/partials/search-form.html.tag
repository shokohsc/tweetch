<tweetch-search-form>
  <form onsubmit={ submit }>
    <div class="row text-center">
      <div class="search-wrapper">
        <div class="input-group search-panel">
          <input type="text" name="q" class="form-control" placeholder="{ Translator.trans('search') }...">
          <input type="hidden" name="search_param" id="search_param" value="games">
          <span class="input-group-btn">
            <button id="concept" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{ Translator.trans('games') } <span class="caret"></span></button>
            <ul class="dropdown-menu dropdown-menu-right">
              <li><a href="#games">{ Translator.trans('games') }</a></li>
              <li><a href="#streams">{ Translator.trans('streams') }</a></li>
            </ul>
          </span>
        </div>
      </div>
    </div>
  </form>

  <script>
    $(document).on('click', '.search-panel .dropdown-menu a', function(e) {
  		e.preventDefault()
  		var param   = $(this).attr("href").replace("#",""),
  		    concept = $(this).text()
  		$('#search_param').val(param)
      $('#concept').text(concept)
    })
    submit(e) {
      location.hash = '#search/'+this.search_param.value+'/'+this.q.value
    }
  </script>
</tweetch-search-form>
