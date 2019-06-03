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
			let posts = undefined;

			if (!process.browser) {
				var SQL = require('sql.js');
				var fs = require('fs');
				var filebuffer = fs.readFileSync('/Users/hun/pwp-v3/data/nagornyy.db');

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
			}
			return {
				posts
			}
		},
	}
</script>
