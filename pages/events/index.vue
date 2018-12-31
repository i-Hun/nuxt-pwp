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
	export default {
		name: 'events-index',
		data() {
			return {
				img: "/img/main.jpg",
				posts: [
					{
						id: "nkodf5abeqrpa4tm7k31b26n2k@group.calendar.google.com",
						title: "Summer school at Dubna 2018",
						titleRu: "Летняя школа в Дубне 2018 г.",
						lang: "ru",
						img: "/img/dubna.jpg",
						description: ""
					},
					{
						id: "d97rg6bf60332qahmh9la0ar30@group.calendar.google.com",
						title: "Databases",
						titleRu: "Лeтняя школа InLiberty",
						lang: "ru",
						img: "/img/inliberty.jpg",
						description: ""
					},
				]
			}
		}
	}
</script>
