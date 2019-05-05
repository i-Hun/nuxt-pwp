<template>
	<div class="trips">
		<div v-for="trip in trips">
			<h2>
				<a class="navbar-item" :href="'/travel/trips/' + trip.trip_id" active-class="is-active">{{trip.trip_name}}</a>
			</h2>
			<p>Стран: {{trip.country_num}}, городов: {{trip.places_num}}</p>
		</div>
	</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	import Cards from "@/components/Cards.vue";
	import axios from 'axios';
	const cheerio = require('cheerio');
	import {groupBy} from 'lodash';
	import sql_to_object from "@/plugins/sql_to_object.js";


	export default {
		components: {
			Cards
		},
		layout: 'wide',
		async asyncData (context) {
			let trips = undefined;

			if (!process.browser) {
				var SQL = require('sql.js');
				var fs = require('fs');
				var filebuffer = fs.readFileSync('/Users/hun/pwp-v3/data/nagornyy.db');

				var db = new SQL.Database(filebuffer);
				var contents = db.exec(
					`SELECT
						trips.id as trip_id,
						trips.name_ru as trip_name,
						COUNT(visits.place) as places_num,
						COUNT(visits.country) as country_num,
						MIN(DATE(visits.start)) as trip_start,
						MAX(DATE(visits.end)) as trip_end
					FROM trips
					LEFT JOIN visits
					ON visits.trip = trips.id
					GROUP BY trip_id;`
				);

				trips = sql_to_object(contents);
			}
			return {
				trips: trips
			}
		},
	}
</script>
