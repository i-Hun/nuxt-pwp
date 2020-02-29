<template>
	<div class="likes">
		<!-- <h1 class=page-title>{{$t("likes.title")}}</h1> -->
		<div class="likes-list">
			<div class="likes-category-wrapper" v-for="(category, title) in likes">
				<h2 class="category-title">{{$t(`likes.${title}`)}}</h2>
				<div class="likes-category">
					<div class="like" v-for="like in category">
						<img class="like-img" :src="`/img/things/${like.img}`" :alt="like.title">
						<h2 class="like-title">{{like.title}}</h2>
						<div class="like-description">{{like.description}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>
.page-title {
	font-size: 3rem;
}

.category-title {
	font-size: 2rem;
	font-weight: 300;
}

.likes-category {
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	margin-bottom: 50px;
}

.like {
	text-align: center;
	background-size: cover;
	max-width: 600px;
	padding: 20px;
}

.like-img {
	display: inline-block;
	max-height: 300px;
}
.like-title {
	display: block;
	font-weight: 600;
	width: 300px;
	margin: 0 auto;
}
.like-description {
	font-weight: 300;
	color: #555;
	width: 300px;
	display: inline-block;
}
</style>

<script>
	import sql_to_object from "@/plugins/sql_to_object.js";
	import Cards from "@/components/Cards.vue";
	import {groupBy} from 'lodash';


	export default {
		layout: 'wide',
		components: {
			Cards
		},
		async asyncData (context) {
			var likes = null;
			if (process.server) {
				var initSqlJs = require('sql.js');
				var fs = require('fs');
				var filebuffer = fs.readFileSync('data/nagornyy.db');

				var result = await initSqlJs().then(function(SQL){
					var db = new SQL.Database(filebuffer);
					var contents = db.exec(
						`SELECT
							*
						FROM likes
						ORDER BY rate DESC;`
					);

					likes = sql_to_object(contents);

					return {
						likes: groupBy(likes, "category")
					}
				}).catch(function(err){
					console.error(err.message);
				});

				return result
			}
		},
	}
</script>
