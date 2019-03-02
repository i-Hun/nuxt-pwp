<template>
<div class="events">
	<h1>{{$t("events")}}</h1>
	<Cards :cards="events"></Cards>
</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import events from '@/data/events.js';
	import Cards from "@/components/Cards.vue";


	export default {
		components: {
			Cards
		},
		layout: 'wide',
		data() {
			return {
				events: events
			}
		},
	}
</script>


<style>


</style>