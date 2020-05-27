<template>
	<section class="ipynb-post">
		<br>
		<h1 class="title">{{lesson.title}}</h1>
		<nav class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li><a href="/courses/">Courses</a></li>
				<li><a :href="'/courses/' + course.id">{{course.title}}</a></li>
				<li>
					<div class="dropdown is-hoverable">
						<div class="dropdown-trigger">
							<div aria-haspopup="true" aria-controls="dropdown-menu4">
								<a>
									{{lesson.title}}
								</a>
							</div>
						</div>
						<div class="dropdown-menu" id="dropdown-menu4" role="menu">
							<div class="dropdown-content">
								<a class="dropdown-item" v-for="lesson in course.elements" :href="lesson.path">
									{{lesson.title}}
								</a>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</nav>
		<IpynbCells :cells="cells" :language="language"></IpynbCells>
		<References :references="references" :language="lesson.lang"></References>
		<Comments :pagePath="$nuxt.$route.path" :language="lesson.lang"></Comments>
	</section>
</template>

<script>
import IpynbCells from "@/components/IpynbCells.vue";
import References from "@/components/References.vue";
import Comments from "@/components/Comments.vue";
import Card from "@/components/Card.vue";
import axios from 'axios';
const cheerio = require('cheerio');

import courses from '@/data/courses.js';


export default {
	components: {
		IpynbCells,
		Comments,
		References,
		Card
	},
	// nuxtI18n: {
	// 	paths: {
	// 		ru: this.lesson.path,
	// 		en: this.lesson.path
	// 	}
	// },
	head () {
		const title = `${this.lesson.title} by ${this.lesson.author}`;
		const description = this.lesson.description ? this.lesson.description : `Lesson “${this.lesson.title}” from the сourse “${this.course.title}” by ${this.lesson.author}.`
		return {
			title: title,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: description
				},
				{
					hid: 'og:title',
					property: 'og:title',
					content: title
				},
				{
					hid: 'og:image',
					property: 'og:image',
					content: this.lesson.img ? this.lesson.img : '/img/cover.jpg'
				},
				{
					hid: 'og:description',
					property: 'og:description',
					content: description
				},
				{ hid: 'author', name: 'author', content: this.lesson.author},
			]
		}
	},
	async asyncData (context) {
		const notebookPath = `static/notebooks/${context.params.courseId}/${context.params.lessonId}.ipynb`
		let notebook = undefined;

		if (!process.browser) {
			notebook = JSON.parse(require('fs').readFileSync(notebookPath, 'utf-8'))
		}
		
		let cells = notebook["cells"];

		let references = {};

		cells =	cells.map(cell => {
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


		let thisLesson = null;
		let thisCourse = null;

		for (let course of courses) {
			if (course.id === context.params.courseId) {
				thisCourse = course;
				for (let lesson of course.elements) {
					if (lesson.id === context.params.lessonId) {
						thisLesson = lesson;
					}
				}
			} 
		}

		return {
			cells: cells,
			references: refs.filter(el => {return el != null}),
			lesson: thisLesson,
			course: thisCourse,
			language: notebook['metadata']['kernelspec']['language']
		}

	},
}
</script>

<style lang="scss">
.meta {
	font-size: 0.75rem;
	color: #666;
}
.breadcrumb {
	margin-top: 30px;
}

</style>
