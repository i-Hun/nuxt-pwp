<template>
	<section class="ipynb-post content">
		<h1 id="lesson-title">{{lesson.title}}</h1>
		<div class="meta">
			Part of the course "<a :href="'/courses/' + course.id">{{course.title}}</a>". Author {{lesson.author}}<span v-if='references && references.length'> and <a href="#references">many others</a></span>.
		</div>
		<IpynbCells :cells="cells"></IpynbCells>
		<References :references="references"></References>
		<Comments :pagePath="$nuxt.$route.path"></Comments>
	</section>
</template>

<script>
import IpynbCells from "@/components/IpynbCells.vue";
import References from "@/components/References.vue";
import Comments from "@/components/Comments.vue";
import axios from 'axios';
const cheerio = require('cheerio');

import courses from '@/data/courses.js';


export default {
	components: {
		IpynbCells,
		Comments,
		References
	},
	head () {
		const title = `${this.lesson.title} from the course "${this.course.title}" by ${this.lesson.author}`;
		const description = this.lesson.description ? this.lesson.description : `${this.lesson.title} from the сourse "${this.course.title}" by ${this.lesson.author}`
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
					hid: 'og:description',
					property: 'og:description',
					content: description
				},
				{ hid: 'author', name: 'author', content: this.lesson.author},
			]
		}
	},
	async asyncData ({params}) {		
		let ipynb = require(`~/assets/notebooks/${params.courseId}/${params.lessonId}.ipynb`);

		let cells = JSON.parse(ipynb)["cells"]

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
			if (course.id === params.courseId) {
				thisCourse = course;
				for (let lesson of course.lessons) {
					if (lesson.id === params.lessonId) {
						thisLesson = lesson;
					}
				}
			} 
		}

		return {
			cells: cells,
			references: refs.filter(el => {return el != null}),
			lesson: thisLesson,
			course: thisCourse
		}

	},
}
</script>

<style lang="scss">
.meta {
	font-size: 0.75rem;
	color: #666;
}

</style>
