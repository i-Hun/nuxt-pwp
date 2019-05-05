<template>
<div class="main">
	<div class="columns">
		<div class="column is-two-thirds">
		</div>
		<div class="column">
			<Timeline></Timeline>
		</div>
	</div>
</div>
</template>


<script>
	import conferences from "@/data/conferences.js";
	import moment from 'moment';
	import courses from '@/data/courses.js';
	import Cards from "@/components/Cards.vue";
	import Timeline from "@/components/Timeline.vue";


	export default {
		name: 'future',
		layout: "wide",
		components: {
			Timeline
		},
	}
</script>
