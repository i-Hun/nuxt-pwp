<template>
	<ul>
		<li class="post" v-for="lesson in lessons">
			<a :href="lesson.id">{{lesson.title}}</a>.
			<span v-if="lesson.lang == 'ru'">🇷🇺</span>
			<span v-if="lesson.lang == 'en'">🇬🇧</span>
			<span class="description" v-if="lesson.description">
				{{lesson.description}}
			</span>
		</li>
	</ul>
</template>

<style scoped lang='scss'>


</style>

<script>
	import courses from '@/data/courses.js';

	export default {
		async asyncData ({params}) {
			const course = courses.filter(course => {
				return course.id === params.courseId
			})

			return {
				lessons: course[0].lessons,
				courseId: course[0].id
			}
		}
	}
</script>
