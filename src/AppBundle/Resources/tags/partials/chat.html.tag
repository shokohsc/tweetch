<tweetch-chat>
  <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
    <div class="panel panel-default">
      <div class="panel-heading" role="tab" id="headingChat">
        <h4 class="panel-title">
          <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseChat" aria-expanded="true" aria-controls="collapseChat">
            Chat
          </a>
        </h4>
      </div>
      <div id="collapseChat" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingChat">
        <div class="embed-responsive embed-responsive-16by9 auth">
          <iframe
                id="chat_embed"
                src="//www.twitch.tv/{ opts.data.name }/chat"
          </iframe>
        </div>
      </div>
    </div>
  </div>
</tweetch-chat>
