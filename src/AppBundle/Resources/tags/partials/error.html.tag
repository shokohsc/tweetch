<tweetch-error>
  <div class="jumbotron row">
    <div class="col-lg-12">
      <h1>{ status }</h1>
      <p><span class="glyphicon glyphicon-exclamation-sign"></span> { message }</p>
      <p>
          <a class="btn btn-primary btn-lg" onclick="window.history.back()" role="button">
              <span class="glyphicon glyphicon-arrow-left"></span> { Translator.trans('error.backward') }
          </a>
          <a class="btn btn-primary btn-lg" href="#home" role="button">
              <span class="glyphicon glyphicon-home"></span> { Translator.trans('home') }
          </a>
      </p>
    </div>
  </div>

  <script>
    this.status = opts.status > 400 ? opts.status : 500
    this.message = opts.status > 400 ? opts.responseJSON : 'Deadpool hit his ultimate, server down !'
    this.on('update', function() {
      document.title = Translator.trans('error.500.title')
    })
  </script>
</tweetch-error>
