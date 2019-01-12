<template>
<div class="posts">
	<ul>
		<li v-for="post in posts">
			<a :href="'/events/' + post.id">
				{{post.titleRu}}
			</a>
		</li>
	</ul>
</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import {events} from '@/data/data';


	export default {
		name: 'events-index',
		data() {
			return {
				img: "/img/main.jpg",
				posts: events
			}
		}
	}
</script>


<style>


</style>