<template>
	<div class="blog">
		<ul>
			<li v-for="post in posts">
				<a :href="'/blog/' + post.id">{{post.title}}</a>
			</li>
		</ul>
	</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import sql_to_object from "@/plugins/sql_to_object.js";

	export default {
		layout: 'wide',
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
			}
			return {
				posts
			}
		},
	}
</script>
