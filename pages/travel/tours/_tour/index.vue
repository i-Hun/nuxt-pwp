<template>
	<div class="tours">
		<div v-for="place in places">
			<h2>{{place.title}}</h2>
		</div>
	</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import Cards from "@/components/Cards.vue";
	import sql_to_object from "@/plugins/sql_to_object.js";


	export default {
		components: {
			Cards
		},
		layout: 'wide',
		async asyncData (context) {

			let places = undefined;

			if (!process.browser) {
				var SQL = require('sql.js');
				var fs = require('fs');
				var filebuffer = fs.readFileSync('data/nagornyy.db');

				// Load the db
				var db = new SQL.Database(filebuffer);
				var contents = db.exec(
					`SELECT
						places.name_ru as title,
						visits.start,
						visits.end
					FROM visits
					LEFT JOIN places
					ON visits.place = places.id
					WHERE '${context.params.tour}' = visits.tour;`
				);

				places = sql_to_object(contents);
			}
			return {
				places: places
			}
		},
	}
</script>
