<template>
<div class="courses">
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
		data() {
			return {
				courses: courses
			}
		},
	}
</script>
