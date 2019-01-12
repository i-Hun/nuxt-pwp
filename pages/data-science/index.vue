<template>
<div class="posts">
	<ul>
	<li class="post" v-for="post in posts">
		<a :href="'/data-science/' + post.id">
      		{{post.titleRu}}
		</a>
  </li>
  </ul>
</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import {dataSciencePosts} from '@/data/data.js';

	export default {
		name: 'data-science-index',
		data() {
			return {
				img: "data-science/img/main.jpg",
				posts: dataSciencePosts
			}
		}
	}
</script>
