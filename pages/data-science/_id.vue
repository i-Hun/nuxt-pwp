<template>
	<section class="section post content">
		<div v-for="cell in cells" class="cell">
			<!-- исправить вложенность -->
			<div v-if="cell.cell_type === 'code'" class="code-cell">
				<pre class="line-numbers"><code class="language-python" v-html="cell.source.join('')"></code></pre>
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
		<div class="comments" v-if="isShowComments">
			<Comments :pagePath="$nuxt.$route.path">
			</Comments>
		</div>
		<div class="comments" v-else="isShowComments">
			<button v-on:click="isShowComments = true">Show Comments</button>
		</div>

			
		
	</section>
</template>

<script>

import Comments from "@/components/Comments.vue";

var md = require('markdown-it')({
	injected: true,
	html: true,
	linkify: true,
	typographer: true
}).use(require('markdown-it-mathjax')());

export default {
	name: 'data-science-page',
	components: {
		Comments
	},
	head: {
		link: [
			{ rel: 'stylesheet', href: '/css/prism.css' },
		],
		script: [
			{ src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML', ssr: false },
			{ src: '/js/prism.js', ssr: false },
			// { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-python.js', ssr: false },
			// { src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js', ssr: false }
		]
	},
	data() {
		return {
			isShowComments: false
		}
	},
	mounted(){
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

		// hljs.initHighlightingOnLoad();

		Prism.highlightAll();
	},
	asyncData (context) {
		let ipynb = require(`~/assets/notebooks/data-science/${context.params.id}.ipynb`);
		return {
			cells: JSON.parse(ipynb)["cells"]
		}
	},
	methods: {
		markdowned: function (text) {
			var result = md.render(text);
			result = result.replace("img/", "/img/content/")
			return result
		}
	}
}
</script>

<style>
	img {
		margin: 10px;
	}

	.comments {
		margin-top: 5rem;
		margin-bottom: 5rem;
	}
</style>
