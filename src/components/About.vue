<template>
  <section class="section hero is-black">
    <div class="hero-body is-flex-direction-column">
      <p class="title">What ?</p>
      <p class="subtitle">Tweetch is an alternative of <a href="//twitch.tv" target="_blank" class="has-text-link">twitch.tv</a> website.</p>
      <br/>
      <p class="title">Who ?</p>
      <p class="subtitle">{{ whoami }}</p>
      <br/>
      <p class="title">Why ?</p>
      <p class="subtitle">This is VueJS practice, check out my <a href="//shokohsc.github.io" target="_blank" class="has-text-link">resume</a>.</p>
      <br/>
      <p class="title">Thanks</p>
      <p class="subtitle">
        <ul>
          <li><strong><a href="//twitch.tv">Twitch</a></strong> for providing an API that I can enjoy while coding.</li>
          <li><strong><a href="//github.com/redpanda">Redpanda</a></strong> for his numerous tips and advices.</li>
          <li><strong><a href="//vuejs.org/">VueJs</a></strong> for their tiny framework.</li>
          <li><strong><a href="//bulma.io/">Bulma CSS</a></strong> for their framework.</li>
          <li><strong><a href="//fontlibrary.org/">Open Font Library</a></strong> for this font.</li>
        </ul>
      </p>
    </div>
  </section>
</template>

<script>
  export default {
    created: function() {
      document.title = 'Tweetch - About'
    },
    computed: {
      whoami: function() {
        var birthday = +new Date(1986, 1, 27);
        var age = ~~((Date.now() - birthday) / (31557600000));
        return `I am a ${age.toString()} years old web developer who lives in France near Paris.`
      }
    }
  }
</script>

<style>
  section.hero {
    background-color: #23232e !important;
  }
</style>
