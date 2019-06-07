<template>
	<div class="tours">
		<div v-for="(tour, index) in tours" class="tour">
			<h2 class="title">
				{{tour[0].tour_name}}
			</h2>
			<div class="subtitle">
				{{tour[0].tour_description}}
			</div>
			
			<span v-for="(visit, index) in tour">
				<span class="visit-from" v-if="index === 0">{{visits_place_map[visit.visit_from]["place_name"]}}</span>
				<span class="transport">
					<i :class="transport(visit.transport)"></i>
				</span>
				<span class="visit-to">{{visits_place_map[visit.visit_to]["place_name"]}}</span>
			</span>

		</div>
	</div>
</template>

<style scoped lang='scss'>
.tour {
	margin: 50px 0;
}

.transport {
	margin: 0 10px;
}

</style>

<script>
	import Cards from "@/components/Cards.vue";
	import axios from 'axios';
	import {groupBy} from 'lodash';
	import sql_to_object from "@/plugins/sql_to_object.js";


	export default {
		components: {
			Cards
		},
		layout: 'wide',
		async asyncData (context) {

			if (process.server) {
				var initSqlJs = require('sql.js');
				var fs = require('fs');
				var filebuffer = fs.readFileSync('/Users/hun/pwp-v3/data/nagornyy.db');
				var result = await initSqlJs().then(function(SQL){
					var db = new SQL.Database(filebuffer);
					var tours = db.exec(`
					SELECT
						tours.name_ru AS tour_name,
						tours.description AS tour_description,
						tours.thumbnail AS tour_thumbnail,
						routes.visit_from,
						routes.visit_to,
						routes.transport,
						FIRST_VALUE(visits.datetime) OVER (
					        ORDER BY DATETIME(visits.datetime)
					        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
					    ) starts,
						visits.datetime AS ends
					FROM tours
					INNER JOIN routes
						ON tours.id = routes.tour
					INNER JOIN visits
						ON routes.visit_to = visits.id
					ORDER BY DATETIME(visits.datetime) ASC;`);


					let visits = db.exec(`
					SELECT
						places.name_ru AS place_name,
						countries.name_ru AS country_name,
						visits.id AS visit_id
					FROM visits
					INNER JOIN places
						ON places.id = visits.place
					INNER JOIN countries
						ON countries.id = places.country;`);

					visits = sql_to_object(visits);
					
					let visits_place_map = {};

					for (let visit of visits) {
						visits_place_map[visit["visit_id"]] = {
							country_name: visit["country_name"],
							place_name: visit["place_name"]
						}
					}

					var tours = sql_to_object(tours);

					return {
						tours: groupBy(tours, "tour_name"),
						visits_place_map: visits_place_map
					}
				}).catch(function(err){
					console.error(err.message);
				});

				return result;
			}

		},
		methods: {
			transport: function (transport) {
				const transport_map = {
					"plane": "fas fa-plane",
					"car": "fas fa-car-side",
					"rented-car": "fas fa-car-side",
					"train": "fas fa-subway",
					"bus": "fas fa-bus",
				}
				return transport_map[transport]
			}
		}
	}
</script>
