<template>
	<Cards :cards="lessons"></Cards>
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
		layout: 'wide',
		async asyncData ({params}) {
			const course = courses.filter(course => {
				return course.id === params.courseId
			})

			return {
				lessons: course[0].lessons,
				courseId: course[0].id
			}
		},
	}
</script>
