<template>
	<div class="visits content">
		<h1>{{visits[0].place_title}}</h1>
		<div>Посещения</div>
		<ul>
			<li v-for="visit in visits">
				<p>
					{{visit.start}}—{{visit.end}}
				</p>
				<p>
					<div v-if="visit.post_title">
						<a :href="'/blog/' + visit.post_id">
							{{visit.post_title}}
						</a>
					</div>
				</p>
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

			let visits = undefined;

			if (!process.browser) {
				var SQL = require('sql.js');
				var fs = require('fs');
				var filebuffer = fs.readFileSync('/Users/hun/pwp-v3/data/nagornyy.db');

				// Load the db
				var db = new SQL.Database(filebuffer);
				var contents = db.exec(
`SELECT
	places.name_ru as place_title,
	visits.start,
	visits.end,
	countries.name_ru as country,
	posts.title AS post_title,
	posts.id AS post_id
FROM visits
LEFT JOIN places
	ON visits.place = places.id
LEFT JOIN countries
	ON places.country = countries.id
LEFT JOIN posts_visits
	ON visits.id = posts_visits.visit_id
LEFT JOIN posts
	ON posts_visits.post_id = posts.id
WHERE '${context.params.place}' = visits.place;`
				);

				visits = sql_to_object(contents);
			}
			return {
				visits
			}
		},
	}
</script>
