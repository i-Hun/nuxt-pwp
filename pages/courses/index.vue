<template>
<div class="courses">
	<h1>My courses</h1>
	<p>At the begining of the 2019 I decided to publish some materials from my lectures and seminars on the website. This section is not complete and messy now, but I will update it frequently.</p>
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
