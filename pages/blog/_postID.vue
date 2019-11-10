<template>
	<div class="post content">
		<h1 v-if="post.title">{{post.title}}</h1>
		<time class='post-created' v-if="post.created_at">{{formatPostDate(post.created_at)}}</time>
		<div class='post-visit' v-if="post.place_name">Эта запись относится к поездке в <a :href="'/travel/places/' + post.place_id">{{post.place_name}}</a></div>
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
				var filebuffer = fs.readFileSync('/Users/hun/pwp-v3/data/nagornyy.db');
				var initSqlJs = require('sql.js');

				var result = await initSqlJs().then(function(SQL){
					var db = new SQL.Database(filebuffer);
					var contents = db.exec(
					`SELECT
							posts.*,
							places.name_ru AS place_name,
							places.id AS place_id
						FROM posts
						LEFT JOIN posts_visits
							ON posts.id = posts_visits.post_id
						LEFT JOIN visits
							ON visits.id = posts_visits.visit_id
						LEFT JOIN places
							ON visits.place = places.id
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
