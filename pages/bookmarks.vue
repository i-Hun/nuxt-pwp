<template>
<div class="content">
	<h1>Latest bookmarks</h1>
	<ul class='bookmarks'>
		<li class='bookmark' v-for='bookmark in bookmarks'>
			<time :datetime="new Date(bookmark.created_at * 1000).toLocaleString()">{{new Date(bookmark.created_at * 1000).toLocaleDateString()}}</time>
			<a target="_blank" :href="bookmark.share_link">{{bookmark.title}}</a>
			<div class="tags" v-if='bookmark.tags'>
				<span class='tag' v-for='tag in bookmark.tags.split(",")'>
					{{tag}}
				</span>
			</div>
		</li>
	</ul>
</div>
</template>

<style scoped lang='scss'>
time {
	font-style: italic;
}

.bookmark {
	margin-bottom: 1rem;
}

.tag {
	font-size: 0.9rem;
	font-weight: 100;
}
</style>

<script>
	import moment from 'moment';

	export default {
		name: 'diigo-bookmarks',
        async asyncData({ app }) {
            const bookmarks = await app.$axios.$get(
                `https://www.diigo.com/interact_api/load_user_profile_items?sort=updated&count=100&username=ihun_marks`
            );
            console.log('bookmarks', bookmarks)
            return {
            	bookmarks: bookmarks['items']
            };
        },
 
	}
</script>
