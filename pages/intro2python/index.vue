<template>
	<ul>
		<li v-for="post in posts">
			<a :href="post.id">{{post.titleRu}}</a>
			  {{post.description}}
		</li>
	</ul>
</template>

<script>
	import {intro2pythonPosts} from '@/data/data';
	
	export default {
		name: 'intro2python-index',
		data() {
			return {
				img: "intro2python/img/main.jpg",
				posts: intro2pythonPosts
			}
		}
	}
</script>
