<template>
	<div class="places">
		<ul>
			<li v-for="place in places">
				{{place.place_title}}
			</li>
		</ul>
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
			if (process.server) {
				var initSqlJs = require('sql.js');
				var fs = require('fs');
				var filebuffer = fs.readFileSync('data/nagornyy.db');

				var result = await initSqlJs().then(function(SQL){
					var db = new SQL.Database(filebuffer);
					var contents = db.exec(
						`SELECT
							places.id as place_id,
							places.name_ru as place_title,
							COUNT(*) as visits_num
						FROM places
						LEFT JOIN visits
						ON visits.place = places.id
						GROUP BY places.id
						ORDER BY places.name_ru;`
					);

					const places = sql_to_object(contents);
					return {
						places: places	
					}
				}).catch(function(err){
					console.error(err.message);
				});

				return result;
			}
		},
	}
</script>
