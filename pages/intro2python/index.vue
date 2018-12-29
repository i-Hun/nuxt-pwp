<template>
	<ul>
		<li v-for="post in posts">
			<a :href="post.id">{{post.titleRu}}</a>
			  {{post.description}}
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'intro2python-index',
		data() {
			return {
				img: "intro2python/img/main.jpg",
				posts: [
					{
						id: "basics-of-neural-networks",
						title: "Basics of Neural Networks",
						titleRu: "Основы нейронных сетей",
						lang: "ru",
						img: "data-science/img/main.jpg",
						description: ""
					}
				]
			}
		}
	}
</script>
