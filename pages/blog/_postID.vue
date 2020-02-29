<template>
	<div class="post content">
		<h1 v-if="post.title">{{post.title}}</h1>
		<time class='post-created' v-if="post.created_at">{{formatPostDate(post.created_at)}}</time>
		<!-- :href="'/travel/tours/' + post.tour_id">{{post.tour_name}}" -->
		<div class='post-visit' v-if="post.tour_name">Эта запись относится к туру "<a href="/travel/">{{post.tour_name}}"</a></div>
		<div class='post-body' v-html="post.body"></div>
	</div>
</template>

<style scoped lang='scss'>
.post-body {
	margin: 2rem 0;
}

</style>

<script>
	import sql_to_object from "@/plugins/sql_to_object.js";
	import moment from 'moment';
 

	export default {
		layout: 'default',
		async asyncData (context) {

			let post = undefined;

			if (process.server) {
				var fs = require('fs');
				var filebuffer = fs.readFileSync('data/nagornyy.db');
				var initSqlJs = require('sql.js');

				var result = await initSqlJs().then(function(SQL){
					var db = new SQL.Database(filebuffer);
					var contents = db.exec(
					`SELECT
							posts.*,
							tours.name_ru AS tour_name,
							tours.id AS tour_id
						FROM posts
						LEFT JOIN posts_tours
							ON posts.id = posts_tours.post_id
						LEFT JOIN tours
							ON tours.id = posts_tours.tour_id
					WHERE '${context.params.postID}' = posts.id;`
					);

					post = sql_to_object(contents)[0];

					return {
						post
					}
				}).catch(function(err){
					console.error(err.message);
				});

				return result
			}
		},
		methods: {
			formatPostDate(str) {
				moment.locale(this.$i18n.locale);
				return moment(str).format("LL")
			}
		}
	}
</script>
