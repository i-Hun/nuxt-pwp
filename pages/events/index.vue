<template>
<div class="events">
	<ul>
		<li v-for="event in events">
			<nuxt-link :to="event.id">
				{{event.titleRu}}
			</nuxt-link>
		</li>
	</ul>
</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import events from '@/data/events.js';


	export default {
		name: 'events-index',
		data() {
			return {
				img: "/img/main.jpg",
				events: events
			}
		}
	}
</script>


<style>


</style>