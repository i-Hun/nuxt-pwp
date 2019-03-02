<template>
	<div class="lessons">
		<h1>Course “{{course.title}}”</h1>
		<Cards :cards="lessons" inRow="3"></Cards>
	</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import Cards from "@/components/Cards.vue";
	import axios from 'axios';
	const cheerio = require('cheerio');
	import courses from '@/data/courses.js';


	export default {
		components: {
			Cards
		},
		head () {
			const title = this.course.title;
			const description = `Course “${this.course.title}” by ${this.course.author} consists of ${this.lessons.length} lessons: ${this.lessons.map(lesson => `“${lesson.title}”`).join(", ")}`;
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
					{ hid: 'author', name: 'author', content: this.course.author},
				]
			}
		},
		layout: 'wide',
		async asyncData ({params}) {
			const course = courses.filter(course => {
				return course.id === params.courseId
			})

			return {
				lessons: course[0].elements,
				course: course[0]
			}
		},
	}
</script>
