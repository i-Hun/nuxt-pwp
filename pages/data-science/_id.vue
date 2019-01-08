<template>
	<section class="section post content">
		<div class="js-toc"></div>
		<div v-for="cell in cells" class="cell">
			<!-- исправить вложенность -->
			<div v-if="cell.cell_type === 'code'" class="code-cell">
				<pre class="line-numbers"><code class="language-python" v-html="cell.source.join('')"></code></pre>
			</div>
			<div v-if="cell.hasOwnProperty('outputs') && cell.outputs.length" class="code-outputs">
				<div v-for="output in cell.outputs" class="output">
					<div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('image/svg+xml')"
						v-html="output.data['image/svg+xml'].join('')" class="output-svg"></div>
					<div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('text/html')"
						v-html="output.data['text/html'].join('')" class="output-text-html"></div>
<!-- 					<div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('text/plain')" class="output-text-plain">
						{{output.data['text/plain'].join('')}}
					</div> -->
				</div>
			</div>
			<div class='text-cell' v-if="(cell.cell_type === 'markdown')" v-html="markdowned(cell.source.join(''))">
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
}).use(require('markdown-it-named-headings'))
.use(require('markdown-it-mathjax')());

export default {
	name: 'data-science-page',
	components: {
		Comments
	},
	head: {
		link: [
			{ rel: 'stylesheet', href: '/css/prism.css' },
			// { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.css' },
		],
		script: [
			{ src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML', ssr: false },
			{ src: '/js/prism.js', ssr: false },
			{ src: 'https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.js', ssr: false },
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

		MathJax.Hub.Config({
			extensions: ["tex2jax.js"],
			jax: ["input/TeX", "output/HTML-CSS"],
			tex2jax: {
				inlineMath: [ ['$','$'], ["\\(","\\)"] ],
				displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
				processEscapes: true
			},
			"HTML-CSS": { fonts: ["TeX"] }
		});

		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);


		tocbot.init({
			// Where to render the table of contents.
			tocSelector: '.js-toc',
			// Where to grab the headings to build the table of contents.
			contentSelector: '.content',
			// Which headings to grab inside of the contentSelector element.
			headingSelector: 'h2, h3',
		});

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
			result = result.replace(/img\//g, "/img/content/");
			return result;
		}
	}
}
</script>

<style lang="scss">
	img {
		margin: 10px;
	}

	.comments {
		margin-top: 5rem;
		margin-bottom: 2rem;
	}

	.note {
		font-size: .8em;
		float: right;
		margin: -6rem -15rem 0 0rem;
		max-width: 40%;
		width: 14rem;
		line-height: normal;
		font-style: italic;
		font-weight: 100;
	}


	summary {
		margin: -.5em -.5em 0;
		padding: .5em;
		cursor: pointer;
		& > * {
			border-bottom: 1px dashed #999;
			display: inline;
		}
	}

	details[open] {
		border: 1px solid #aaa;
		border-radius: 4px;
		padding: .5em .5em 0;
	}

	.js-toc {
		position: fixed;
			top: 10px;
			right: 10px;
			width: 20%;
			font-size: 0.8rem;
			color: #bbb;


			a {
				opacity: 0.2;
				text-decoration: none;
				color: black;

				&:hover {
				text-decoration: underline;
				}
			}

			&:hover {
				opacity: 1;
				a {
					opacity: 1;
				}
			}
	}

	@media screen and (max-width: 1280px) {
		.js-toc {
			display: none;
		}
	}


	.is-active-li {
		font-weight: 900;
		color: #000;

			a {
				opacity: 1;
			}
	}


</style>
