<template>
  <section class="section post">
    <div v-for="cell in cells" class="cell">
      <!-- исправить вложенность -->
      <div v-if="cell.cell_type === 'code'" class="code-cell">
        <pre><code class="python" v-html="cell.source.join('')"></code></pre>
      </div>
      <div v-if="cell.hasOwnProperty('outputs') && cell.outputs.length">
        <div v-for="output in cell.outputs">
          <div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('image/svg+xml')"
            v-html="output.data['image/svg+xml'].join('')"></div>
          <div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('text/html')"
            v-html="output.data['text/html'].join('')"></div>
        </div>
      </div>
      <div class='text-cell' v-if="cell.cell_type === 'markdown'" v-html="markdowned(cell.source.join(''))">
      </div>
    </div>
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-python.min.js"></script> -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML' async></script>
  </section>
</template>

<script>

var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
}).use(require('markdown-it-mathjax')());




export default {
  name: 'data-science-page',
  data() {
      return {
        cells: []
      }
  },
  asyncData (context) {
    console.log("asyncData", context.params)
    let notebook = require(`~/assets/notebooks/data-science/${context.params.id}.json`)
    return {
      cells: notebook["cells"]
    }
  },
  methods: {
    markdowned: function (text) {
      var result = md.render(text);
      return result
    }
  }
}
</script>
