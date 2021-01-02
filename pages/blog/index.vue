<template>
	<div class="blog">
		<h1>{{$t("blog.title")}}</h1>
		<h2>Интерактив</h2>
	<div class="cards">
		<div class="tile is-ancestor">
			<div class='tile is-vertical is-12'>
				<div class="tile is-6">
					<Card :card="{path:'/blog/mortgage-calculator', 'thumbnail': 'best-mortgage-calculator-thumbnail.jpg', 'title':'Луший ипотечный калькулятор', 'description': 'Расcчитывает переплату по ипотеке и показывает стоимость альтернативных вариантов.'}" :size="'3'"></Card>
				</div>
			</div>
		</div>
	</div>

		<h2>Записи</h2>
		<Cards :cards="posts" size="3"></Cards>
	</div>
</template>

<script>
	import sql_to_object from "@/plugins/sql_to_object.js";
	import Cards from "@/components/Cards.vue";
	import Card from "@/components/Card.vue";

	export default {
		layout: 'wide',
		components: {
			Cards,
			Card
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
						FROM posts
						ORDER BY created_at DESC;`
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
