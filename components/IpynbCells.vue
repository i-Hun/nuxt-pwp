<template>
	<div class="ipynb-cells">
		<div class="js-toc"></div>
		<div v-for="cell in cells" class="cell">
			<div v-if="cell.cell_type === 'code'" class="code-cell">
				<pre><code class="language-python" v-html="cell.source.join('')"></code></pre>
			</div>
			<div v-if="cell.hasOwnProperty('outputs') && cell.outputs.length" class="code-outputs">
				<div v-for="output in cell.outputs" class="output">
					<div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('image/svg+xml')"
						v-html="output.data['image/svg+xml'].join('')" class="output-svg"></div>
					<div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('text/html')"
						v-html="output.data['text/html'].join('')" class="output-text-html"></div>
				</div>
			</div>
			<div class='text-cell' v-if="(cell.cell_type === 'markdown')" v-html="markdowned(cell.source)">
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
const cheerio = require('cheerio');

var md = require('markdown-it')({
	injected: true,
	html: true,
	linkify: true,
	typographer: false
}).use(require('markdown-it-named-headings'))

export default {
	name: 'ipynb-cells',
	props: ["cells"],
	head: {
		link: [
			{ rel: 'stylesheet', href: '/css/prism.css' },
			{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css' },
		],
		script: [
			{ src: '/js/prism.js', ssr: false, async: true },
			{ src: 'https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.js', ssr: false, async: true },
			{ src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js', ssr: false, defer: true },
			{ src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/auto-render.min.js', ssr: false, defer: true },
			{ src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/copy-tex.min.js', ssr: false, defer: true },
		]
	},
	mounted(){
        renderMathInElement(document.body, {
			delimiters:[
				{left: "$$", right: "$$", display: true},
				{left: "$", right: "$", display: false}
			],
			strict: "ignore"
		});

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
	methods: {
		markdowned: function (text) {
			text = text.replace(/\\\\/g, "\\\\\\\\");
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

	@media screen and (min-width: 1280px) {
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
	}

	@media screen and (max-width: 1280px) {
		.note {
			font-style: italic;
		}
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
		width: 300px;
		font-size: 0.8rem;
		color: #bbb;
		overflow-y: scroll;
		top: 0;
		bottom: 0;
		a {
			opacity: 0.2;
			text-decoration: none;
			color: black;
		}

		&:hover {
			opacity: 1;
			a {
				opacity: 1;
			}
		}
	}

	@media screen and (max-width: 1024px) {
		.js-toc {
			position: inherit;
			top: 0;
			right: 0px;
			width: 100%;
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
