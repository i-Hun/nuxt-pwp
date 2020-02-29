<template>
	<div class="ipynb-cells">
		<aside class="menu js-toc"></aside>
		<div v-for="cell in cells" class="cell content">
			<div v-if="cell.cell_type === 'code'" class="code-cell">
				<pre><code :class="`language-${language}`" v-html="cell.source.join('')"></code></pre>
			</div>

			<div v-if="cell.hasOwnProperty('outputs') && cell.outputs.length" class="code-outputs">
				<div v-for="output in cell.outputs" class="output">
					<div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('image/svg+xml')"
						v-html="output.data['image/svg+xml'].join('')" class="output-svg"></div>

					<div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('image/png')"
						class="output-png">
						<img :src="`data:image/jpeg;base64,${output.data['image/png']}`"/>
					</div>


					<div v-if="output.hasOwnProperty('data') && output.data.hasOwnProperty('text/html')"
						v-html="output.data['text/html'].join('')" class="output-text-html"></div>

					<div v-if="output.hasOwnProperty('data') &&
						output.data.hasOwnProperty('text/plain') &&
						!output.data.hasOwnProperty('text/html') &&
						!output.data.hasOwnProperty('image/svg+xml') &&
						output.data['text/plain'].textContent"
						v-html="output.data['text/plain'].join('<br>')" class="output-text-plain"></div>

					<div v-if="output.hasOwnProperty('text')"
						v-html="output['text'].join('<br>')" class="output-text"></div>

					<div v-if="output.output_type === 'error'" class="output-error">
						<div class="traceback">
							<div class="error-body">{{output.ename}}: {{output.evalue}}</div>
						</div>
					</div>

				</div>
			</div>
			<div class='text-cell' v-if="(cell.cell_type === 'markdown')" v-html="markdowned(cell.source)" :class="cell.metadata.task ? 'task' : ''">
			</div>
		</div>
	</div>
</template>

<script>
const cheerio = require('cheerio');

var md = require('markdown-it')({
	injected: true,
	html: true,
	linkify: true,
	typographer: false
}).use(require('markdown-it-named-headings'))

export default {
	name: 'ipynb-cells',
	props: ["cells", "language"],
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
			// { src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/copy-tex.min.js', ssr: false, defer: true },
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
			contentSelector: '.ipynb-cells',
			// Which headings to grab inside of the contentSelector element.
			headingSelector: 'h2, h3',
			listClass: 'menu-list',
			activeLinkClass: 'is-active',
			orderedList: false,
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

	.text-cell {
		background-color: #fff;
		margin: 2em 0em 0em 0em;
	}

	.note {
		blockquote {
			margin: 0;
		}
		
		p {
			margin: 3px 0;
		}
	}

	@media screen and (min-width: 1280px) {
		.note {
			font-size: .8em;
			float: right;
			margin: -6rem -14rem 0 0rem;
			max-width: 400px;
			width: 14rem;
			line-height: normal;
			font-style: italic;
			font-weight: 400;

			figure {
				margin: 0;
				img {
					margin: 0;
				}
			}
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
		top: 3.25rem;
		right: 10px;
		width: 250px;
		font-size: 0.8rem;
		color: #bbb;
		overflow-y: scroll;
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

	.task {
		border-color: #3273dc;
		border-radius: 4px;
		border-style: solid;
		border-width: 0 0 0 4px;
		color: #22509a;
		padding: 1.25em 1.5em;
		background-color: #f6f9fe;
		box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.18)


	}

	.task::before {
		content: "Exercise";
		font-size: 0.7rem;
		float: right;
		text-shadow: 0 0 2px #fff;
		font-weight: 700;
		position: relative;
		top: -20px;
		margin-bottom: -30px;
		right: -20px;
		color: #b0bfd8;
	}

.output-text-plain, .output-text {
	border: 1px dashed #aaa;
	padding: 10px;
	margin-top: -.5em;
	font-family: monospace;
	background-color: #fff;
	border-top: none;
	max-height: 400px;
	overflow-y: scroll;
}

.output-text-plain::before, .output-text::before {
	content: "Code output";
	font-size: 0.7rem;
	float: right;
	text-shadow: 0 0 2px #fff;
	font-weight: 700;
	position: relative;
	top: -9px;
	margin-bottom: -30px;
	right: -5px;
	color: #aaa;
}

.output-error {
	padding: 10px;
	margin-top: -.5em;
	background-color: #faa;
	color: #600;
}

.output-error::before {
	content: "Error";
	font-size: 0.7rem;
	float: right;
	text-shadow: 0 0 1px #fff;
	font-weight: 700;
	position: relative;
	top: -9px;
	margin-bottom: -30px;
	right: -5px;
	color: #a66;
}

.output-text-html {
	overflow-x: scroll;
}

</style>
