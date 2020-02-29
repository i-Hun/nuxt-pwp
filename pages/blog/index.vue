<template>
	<div class="blog">
		<h1>{{$t("blog.title")}}</h1>
		<Cards :cards="posts" size="2"></Cards>
	</div>
</template>

<script>
	import sql_to_object from "@/plugins/sql_to_object.js";
	import Cards from "@/components/Cards.vue";

	export default {
		layout: 'wide',
		components: {
			Cards
		},
		async asyncData (context) {
			var posts = null;
			if (process.server) {
				var initSqlJs = require('sql.js');
				var fs = require('fs');
				var filebuffer = fs.readFileSync('data/nagornyy.db');

				var result = await initSqlJs().then(function(SQL){
					var db = new SQL.Database(filebuffer);
					var contents = db.exec(
						`SELECT
							*
						FROM posts;`
					);

					posts = sql_to_object(contents);

					posts.map(post => {
						post.path = '/blog/' + post.id
					})
					return {
						posts: posts
					}
				}).catch(function(err){
					console.error(err.message);
				});

				return result
			}
		},
	}
</script>
