<template>
	<section class="section post content">
		<div class="js-toc"></div>
		<div v-for="cell in cells" class="cell">
			<!-- исправить вложенность -->
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
		
		<div class="references">
			<h2 id="references">References</h2>
			<ol>
				<li v-html="reference.data" v-for='reference in references' :id="'ref-'+reference.order"></li>
			</ol>
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
import References from "@/components/References.vue";
import axios from 'axios';
const cheerio = require('cheerio');

var md = require('markdown-it')({
	injected: true,
	html: true,
	linkify: true,
	typographer: false
}).use(require('markdown-it-named-headings'))
// .use(require('markdown-it-mathjax')());

export default {
	name: 'data-science-page',
	components: {
		Comments,
		References
	},
	head: {
		link: [
			{ rel: 'stylesheet', href: '/css/prism.css' },
			{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css' },
			// { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.css' },
		],
		script: [
			// { src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML', ssr: true },
			{ src: '/js/prism.js', ssr: false, async: true },
			{ src: 'https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.4.2/tocbot.js', ssr: false, async: true },
			{ src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js', ssr: false, defer: true },
			{ src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/auto-render.min.js', ssr: false, defer: true },
			{ src: 'https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/copy-tex.min.js', ssr: false, defer: true },
			// { src: 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/components/prism-python.js', ssr: false },
			// { src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js', ssr: false }
		]
	},
	data() {
		return {
			isShowComments: false,
		}
	},
	mounted(){

		// MathJax.Hub.Config({
		// 	extensions: ["tex2jax.js"],
		// 	jax: ["input/TeX", "output/HTML-CSS"],
		// 	tex2jax: {
		// 		inlineMath: [ ['$','$'], ["\\(","\\)"] ],
		// 		displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
		// 		processEscapes: true
		// 	},
		// 	"HTML-CSS": { fonts: ["TeX"] }
		// });

		// MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

        renderMathInElement(document.body, {
			delimiters:[
				{left: "$$", right: "$$", display: true},
				{left: "$", right: "$", display: false}
			]
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
	async asyncData (context) {
		let ipynb = require(`~/assets/notebooks/data-science/${context.params.id}.ipynb`);

		let cells = JSON.parse(ipynb)["cells"]

		let references = {};

		cells =  cells.map(cell => {
			if (cell.cell_type === "markdown") {
				let cell_text = cell.source.join('')
				var regex = /\[.*?\]\(https:\/\/www.zotero.org\/.*?\)/g;
				let regex2 = /\(https:\/\/www.zotero.org\/.*?\)/g;
				var found_refs = cell_text.match(regex2);

				if (found_refs) {
					for (let found_ref of found_refs){
						found_ref = found_ref.slice(1, -1)
						if (!references.hasOwnProperty(found_ref)) {
							references[found_ref] = Object.keys(references).length + 1;
						}	
					}
				}

				for (let reference of Object.keys(references)) {

					cell_text = cell_text.replace(new RegExp(`\\(${reference}\\)`, 'gi'), `<a href='#ref-${references[reference]}' class='intext-ref'>[${references[reference]}]</a>`)
				}

				cell.source = cell_text
				return cell;
			} else return cell
		})


		let promises = Object.entries(references).map(ref => {
			let url = ref[0];
			let order = ref[1];

			let refId = url.split('/')[url.split('/').length-1];


			return axios.get(`https://www.zotero.org/api/users/2770884/items/${refId}?format=bib&style=apa&linkwrap=1`)
			.then(response => {
				const $ = cheerio.load(response.data);

				return {"order": order, "data": $('.csl-entry').html()};
			})
			.catch(e => {
				console.error(e);
			})
		})


    	let refs = await Promise.all(promises);


		return {
			cells: cells,
			references: refs.filter(function (el) {
							return el != null;
						})
		}

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

	.comments {
		margin-top: 5rem;
		margin-bottom: 2rem;
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


		a {
			opacity: 0.2;
			text-decoration: none;
			color: black;

			// &:hover {
			// text-decoration: underline;
			// }
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
