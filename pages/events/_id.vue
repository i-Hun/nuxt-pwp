<template>
	<section class="section">
	<div class="calendar">
		<div class="schedule">

			<div class="schedule-blocks">
				<ul class="days">
					<li class="day" v-for="day in days">
						<div class="day-wrapper">
							<h2 class="day-title">{{day.dayTitle}}</h2>
							<div class="event" v-for="event in day.events">
								<h3 class="event-title" target="_blank" :href="event.htmlLink">{{event.summary}}</h3>
								<div class="event-dates">
									<time>{{formatEventDate(event.start.dateTime, event.end.dateTime)}}</time>
								</div>
								<div class="event-location" v-if="event.location">
									<span>
										{{event.location}}
									</span>
								</div>
								<ul class="attachments" v-if="event.attachments && event.attachments.length">
									<li class="attachments" target="_blank" v-for="attachment in event.attachments">
										<a :href="attachment.fileUrl">
											<img :src="attachment.iconLink" alt="">
											<span>{{attachment.title}}</span>
										</a>
									</li>
								</ul>
								<div class="event-description" v-if="event.description && event.description.length" v-html="event.description"></div>
							</div>
						</div>
					</li>
				</ul>

			</div>
		</div>
	</div>
	</section>
</template>


<style scoped lang='scss'>
	ul.days {
		list-style-type: none;
		padding: 0;
	}

	li.day {
		padding: 10px 0;
	}

	.event ul, .event-description ul {
		padding-left: 1rem !important;
	}

	.day-wrapper {
		padding: 0 20px;
	}

	.event {
		padding-bottom: 10px;
		margin-bottom: 10px;
		
	}

	.event-dates, .event-location {
		font-size: 0.85rem
	}

	.event:last-child {
		margin-bottom: 0;
	}

	.event-description, .attachments {
		font-size: 0.75rem
	}
	
	.schedule {
		padding-bottom: 50px;
	}

	@media (max-width: 1280px) {
		.schedule ul.days {
			columns: 3;
		}
	}

	@media (min-width: 1280px) {
		.schedule ul.days {
			columns: 3;
		}
	}

	@media (max-width: 1024px) {
		.schedule ul.days {
			columns: 2;
		}
	}

	@media (max-width: 720px) {
		.schedule ul.days {
			columns: 1;
		}
	}

	.schedule ul.days li{
		page-break-inside: avoid;
		break-inside: avoid;
	}

	.event-title {
		margin-bottom: 0;
	}


</style>


<script>
	import axios from 'axios';
	import moment from 'moment';
	import * as _ from 'lodash';

	export default {
		data() {
			return {
				days: []
			}
		},
		layout: 'calendar',
		async asyncData (context) {
			function compareDates(a, b) {
				var start = moment(a.start.dateTime || a.start.date);
				var end = moment(b.start.dateTime || b.start.date);
				return start - end;
			}

			console.log('context.params.id', context.params.id)
			let response = await axios.get(`https://clients6.google.com/calendar/v3/calendars/${context.params.id}/events?timeZone=Europe%2FMoscow&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2017-06-25T00%3A00%3A00%2B03%3A00&timeMax=2019-06-25T00%3A00%3A00%2B03%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs&supportsAttachments=true`);

			// создаём объект вида {"день или промежуток": [список событий]}
			var resultDaysObj = [];
			// и наполняем его
			for (const event of response.data.items) {
				const startSameDay = moment(event.start.dateTime || event.start.date).format("D") ===
									 moment(event.end.dateTime   || event.end.date).format("D");

				if (startSameDay) {
					var day = moment(event.start.dateTime || event.start.date).format("MMMM D");
				}
				else {
					var day = `${moment(event.start.dateTime || event.start.date).format("MMMM D")} -
							   ${moment(event.end.dateTime || event.end.date).format("MMMM D")}`
				}

				if (day in resultDaysObj) {
					resultDaysObj[day].push(event);
				} else {
					resultDaysObj[day] = []
					resultDaysObj[day].push(event);
				}
			}

			// переделываем объект в список объектов, чтобы можно было отсортировать. 
			var resultDaysArray = [];

			for (const [day, events] of Object.entries(resultDaysObj)) {

				const evt = events.sort(compareDates)
				const dayObj = {
					events: evt,
					dayTitle: day
				}
				resultDaysArray.push(dayObj);
			}

			return {
				days: _.sortBy(resultDaysArray, day => moment(day.events[0].start.dateTime || day.events[0].start.date))
			}
		},
		methods: {
			formatEventDate (start, end) {
				const startFormated = moment(start).format("H:mm");
				const endFormated = moment(end).format("H:mm");
				if (startFormated === endFormated) {
					return `${startFormated}, ${moment(end).format("MMM Do")}`
				}
				const diff = moment(end).diff(moment(start))
				return `${startFormated} — ${endFormated}, ${moment(end).format("MMM Do")} (${moment.utc(diff).format("H:mm")})`;
			},
		},
	}
</script>