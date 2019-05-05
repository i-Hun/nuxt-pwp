<template>
<div class="travel">
	<div id="mapid"></div>
</div>
</template>

<style scoped lang='scss'>

#mapid { height: 100vh; }

</style>

<script>
	import moment from 'moment';
	import Cards from "@/components/Cards.vue";
	import {groupBy} from 'lodash';
	import sql_to_object from "@/plugins/sql_to_object.js";


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

			var mymap = L.map('mapid', {
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
			}).addTo(mymap);

			for (let place of Object.keys(this.visits)) {
				let first_visit = this.visits[place][0];
				let marker = L.circle([first_visit.lat, first_visit.long], {
					color: '#04f',
					fillColor: '#04f',
					fillOpacity: 0.5,
					radius: 50000
				}).addTo(mymap);

				const popup_head = `<strong>${first_visit.place}</strong>, ${first_visit.country}`;
				let popupTexts = [popup_head];
				for (let visit of this.visits[place]) {
					const text = `${visit.start ? '</br>Приехал ' + moment(visit.start).format("LL") : "" }${visit.end ? '</br>Уехал ' + moment(visit.end).format("LL") : "" }${visit.post_id ? '</br><a target="_blank" href="/blog/' + visit.post_id + '">' + visit.post_title + '</a>' : "" }`

					popupTexts.push(text)
				}
				marker.bindPopup(popupTexts.join("<br>"), {
					// autoClose: false,
					closeButton: false
				})//.openPopup()
				marker.on('mouseover', function (e) {
					this.openPopup();
				});
				// marker.on('mouseout', function (e) {
				// 	this.closePopup();
				// });
				marker.on('click', function (e) {
					window.location.href = '/travel/places/' + first_visit.place_id;
				});

			};

		},
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
						places.name_ru AS place,
						places.id AS place_id,
						places.lat,
						places.long,
						visits.start,
						visits.end,
						visits.report_url,
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
						visits.start,
						visits.end,
						visits.report_url,
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
				visits = sql_to_object(contents);
			}
			console.log("travel", groupBy(visits, "place"))
			return {
				visits: groupBy(visits, "place")
			}
		},
	}
</script>
