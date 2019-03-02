<template>
<div class="courses">
	<h1>{{$t("myCourses")}}</h1>
	<p>{{$t("coursesDisclaimer")}}</p>
	<Cards :cards="courses"></Cards>
</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import courses from '@/data/courses.js';
	import Cards from "@/components/Cards.vue";


	export default {
		components: {
			Cards
		},
		layout: "wide",
		data() {
			return {
				courses: courses
			}
		},
	}
</script>
