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

					<div v-if="output.hasOwnProperty('data')
						&& output.data.hasOwnProperty('text/plain')
						&&!output.data.hasOwnProperty('text/html')
						&&!output.data.hasOwnProperty('image/svg+xml')
						// &&output.data['text/plain'].textContent
						"
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
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import "~/assets/prism/prism.css";
import "~/assets/prism/prism.js";
const katex = require('katex');

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
			// { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css' },
		],
		script: [
			{ src: 'https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.js', ssr: false, async: true },
			// { src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js', ssr: false, defer: true },
			// { src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/auto-render.min.js', ssr: false, defer: true },
			// { src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/copy-tex.min.js', ssr: false, defer: true },
		]
	},
	mounted(){
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

		tippy('i', {
			arrow: false,
			content(reference) {
				const title = reference.getAttribute('title');
				reference.removeAttribute('title');
				return title;
			},
		});
    	
	},
	methods: {
		markdowned: function (text) {
			text = text.replace(/\\\\/g, "\\\\\\\\");
			let result = md.render(text);
			result = result.replace(/img\//g, "/img/content/");

			result = result.replace(/\$\$(.*?)\$\$/g, function(outer, inner) {
			    return katex.renderToString(inner, { displayMode: true });
			})
			result = result.replace(/\$(.*?)\$/g, function(outer, inner) {
			    return katex.renderToString(inner, { displayMode: false });
			})

			result = result.replace(/\\begin\{align\*\}(.*?)\\end\{align\*\}/g, function(outer, inner) {
			    return katex.renderToString("\\begin{aligned}" + inner + "\\end{aligned}", { displayMode: true });
			})
			return result
		}
	}
}
</script>

<style lang="scss">
	img {
		margin: 10px;
	}

	.ipynb-cells i {
		position: relative;
		padding: 0 4px;
		cursor: help;
		white-space: pre-wrap;
		border-radius: 4px;
		background: #f8f8f8;
		box-shadow: inset 1px 0 #b3b3b3, inset 0 1px #b3b3b3, inset -1px 0 #b3b3b3, inset 0 -1px #b3b3b3;
	}

	.text-cell {
		background-color: #fff;
		margin: 2em 0em 0em 0em;
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
