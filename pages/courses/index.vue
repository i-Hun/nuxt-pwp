<template>
<div class="courses">
	<ul>
		<li class="post" v-for="course in courses">
			<nuxt-link :to="'/courses/' + course.id">
				{{course.title}}
			</nuxt-link>
			<span class="description" v-if="course.description">
				{{course.description}}
			</span>
		</li>
	</ul>
</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import courses from '@/data/courses.js';


	export default {
		name: 'courses',
		data() {
			return {
				courses: courses
			}
		},
	}
</script>
