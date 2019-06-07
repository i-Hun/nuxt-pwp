<template>
<div class="travel">
	<div class="columns is-gapless">
		<div class="column is-two-thirds">
			<div id="mapid"></div>
		</div>
		<div class="column">
			<div class="sidebar">
				<div class="tours">
					<div v-for="tour in tours" class="tour" @mouseover="hightlightTour(tour)" @mouseout="hightlightTourOff()">
						<h2 class="title">
							{{tour[0].tour_name}}
						</h2>
						<div class="description">
							{{tour[0].tour_description}}
						</div>
						
						<div class="routes">
							<span v-for="(route, index) in tour" class="route">
								<span class="route-from" v-if="index === 0">
									<span class="route-from-place tag is-link">
										{{visits_place_map[route.visit_from]["place_name"]}}
									</span>
<!-- 									<div class="route-from-date">
										{{route.ends}}
									</div> -->
								</span>
								<span class="transport icon is-medium" v-if="route.transport === 'plane'">
									<img src="/img/icons/aeroplane-3.svg">
								</span>
								<span class="transport icon is-medium" v-if="route.transport === 'train'">
									<img src="/img/icons/train.svg">
								</span>
								<span class="transport icon is-medium" v-if="route.transport === 'car'">
									<img src="/img/icons/car.svg">
								</span>
								<span class="transport icon is-medium" v-if="route.transport === 'bus'">
									<img src="/img/icons/bus-3.svg">
								</span>
								<span class="route-to">
									<span class="route-to-place tag is-link" >
										{{visits_place_map[route.visit_to]["place_name"]}}
									</span>
<!-- 									<div class="route-to-date">
										{{route.ends}}
									</div> -->
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<style scoped lang='scss'>

#mapid {
	height: 100vh;
	// width: 75%;
}

.sidebar {
    position: fixed;
    overflow-y: scroll;
    top: 0;
    bottom: 0;
}

.tour{
	.title {
		font-size: 1.2rem;
		margin: 10px 0;
	}
	.description {
		font-size: 1rem;
		font-weight: 300;
		margin-bottom: 10px;
	}

	.transport {
	    top: 13px;
	    position: relative;
	}

	padding: 20px;
	cursor: pointer;

	&:hover {
		background-color: #eee;
	}

}


</style>

<script>
	import moment from 'moment';
	import Cards from "@/components/Cards.vue";
	import {groupBy} from 'lodash';
	import sql_to_object from "@/plugins/sql_to_object.js";
	import arc from 'arc';
	import * as _ from 'lodash';


	export default {
		name: 'travel',
		layout: "full",
		components: {
			Cards,
		},
		head () {
			return {
				title: this.$t('profile.fullName'),
				meta: [
					{
						hid: 'og:title',
						property: 'og:title',
						content: this.$t('profile.fullName')
					},
					{
						hid: 'author',
						name: 'author',
						content: this.$t('profile.fullName')
					},
				],
				link: [
					{ rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.css' },
				],
				script: [
					{ src: 'https://unpkg.com/leaflet@1.4.0/dist/leaflet.js', ssr: false}
				]
			}
		},
		mounted () {
			moment.locale(this.$i18n.locale);

			this.map = L.map('mapid', {
				center: [52, 40],
				zoom: 4,
				zoomControl: false,
				// dragging: false,
				// boxZoom: false,
				// scrollWheelZoom: false,
				// touchZoom: false
			});
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			    maxZoom: 18,
			    id: 'mapbox.light',
			    accessToken: 'pk.eyJ1IjoiaWh1biIsImEiOiJJeUdIWU9VIn0.sRZZ43GwB15Eo2BLj4rJ3A'
			}).addTo(this.map);
			console.log(this.tours)
			for (let tour of Object.keys(this.tours)) {
				for (let route of this.tours[tour]) {
					const place_from = this.visits_place_map[route.visit_from]
					const place_to = this.visits_place_map[route.visit_to]

					var start = { x: place_from.lat, y: place_from.long };
					var end = { x: place_to.lat, y: place_to.long };
					var generator = new arc.GreatCircle(start, end);

					var line = generator.Arc(100,{offset:10});
					console.log(line.geometries[0].coords)
					var polyline = L.polyline(line.geometries[0].coords, {color: 'rgba(255, 150, 0, 0.25)'}).addTo(this.map);

					let marker = L.circle([place_from.lat, place_from.long], {
						color: '#04f',
						fillColor: '#04f',
						opacity: 0.25,
						radius: 50000
					}).addTo(this.map);
				}

				_.uniqBy(this.tours[tour], route => route.e)
			}
				// for (let place of Object.keys(this.points)) {
				// let first_visit = this.points[place][0];
				// let marker = L.circle([first_visit.lat, first_visit.long], {
				// 	color: '#04f',
				// 	fillColor: '#04f',
				// 	fillOpacity: 0.5,
				// 	radius: 50000
				// }).addTo(mymap);

				// const popup_head = `<strong>${first_visit.place}</strong>, ${first_visit.country}`;
				// let popupTexts = [popup_head];
				// for (let visit of this.points[place]) {
				// 	const text = `${visit.datetime ? '</br>Приехал ' + moment(visit.datetime).format("LL") : "" }${visit.post_id ? '</br><a target="_blank" href="/blog/' + visit.post_id + '">' + visit.post_title + '</a>' : "" }`

				// 	popupTexts.push(text)
				// }
				// marker.bindPopup(popupTexts.join("<br>"), {
				// 	// autoClose: false,
				// 	closeButton: false
				// })//.openPopup()
				// marker.on('mouseover', function (e) {
				// 	this.openPopup();
				// });
				// // marker.on('mouseout', function (e) {
				// // 	this.closePopup();
				// // });
				// marker.on('click', function (e) {
				// 	window.location.href = '/travel/places/' + first_visit.place_id;
				// });


		},
		async asyncData (context) {

			if (process.server) {
				var initSqlJs = require('sql.js');
				var fs = require('fs');
				var filebuffer = fs.readFileSync('/Users/hun/pwp-v3/data/nagornyy.db');

				var result = await initSqlJs().then(function(SQL){
					var db = new SQL.Database(filebuffer);
					var contents = db.exec(
						`SELECT
							places.name_ru AS place,
							places.id AS place_id,
							places.lat,
							places.long,
							visits.datetime,
							countries.name_ru AS country,
							posts.id AS post_id,
							posts.title AS post_title
						FROM visits
						LEFT JOIN posts_visits
							ON visits.id = posts_visits.visit_id
						LEFT JOIN places
							ON places.id = visits.place
						LEFT JOIN posts
							ON posts.id = posts_visits.post_id
						LEFT JOIN countries
							ON countries.id = places.country
						UNION ALL
						SELECT
							places.name_ru AS place,
							places.id AS place_id,
							places.lat,
							places.long,
							visits.datetime,
							countries.name_ru AS country,
							posts.id AS post_id,
							posts.title AS post_title
						FROM posts_visits
						LEFT JOIN visits
							ON visits.id = posts_visits.visit_id
						LEFT JOIN places
							ON places.id = visits.place
						LEFT JOIN posts
							ON posts.id = posts_visits.post_id
						LEFT JOIN countries
							ON countries.id = places.country
						WHERE  visits.id IS NULL;`
					);
					let points = sql_to_object(contents);

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


					let visits_places = db.exec(`
					SELECT
						places.name_ru AS place_name,
						countries.name_ru AS country_name,
						visits.id AS visit_id,
						places.lat, places.long
					FROM visits
					INNER JOIN places
						ON places.id = visits.place
					INNER JOIN countries
						ON countries.id = places.country;`);

					visits_places = sql_to_object(visits_places);
					
					let visits_place_map = {};

					for (let visit of visits_places) {
						visits_place_map[visit["visit_id"]] = {
							country_name: visit["country_name"],
							place_name: visit["place_name"],
							lat: visit["lat"],
							long: visit["long"]
						}
					}

					var tours = sql_to_object(tours);

					return {
						points: groupBy(points, "place"),
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
			},
			hightlightTour: function (tour) {
				this.active_layers = []
				for (var route of tour) {
					const place_from = this.visits_place_map[route.visit_from]
					const place_to = this.visits_place_map[route.visit_to]

					var start = { x: place_from.lat, y: place_from.long };
					var end = { x: place_to.lat, y: place_to.long };
					var generator = new arc.GreatCircle(start, end);

					var line = generator.Arc(100,{offset:10});
					console.log(line.geometries[0].coords)

					var layer = L.polyline(line.geometries[0].coords, {color: 'rgba(255, 150, 0, 1)'});
					this.active_layers.push(layer)
				}
				for (let layer of this.active_layers) {
					layer.addTo(this.map)
				}
			},
			hightlightTourOff: function () {
				for (let layer of this.active_layers) {
					layer.remove()
				}
			}
		}
	}
</script>
