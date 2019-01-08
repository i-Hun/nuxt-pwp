<template name="calendar">
	<div class="calendar">
		<div class="schedule">
			<b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="true"></b-loading>
	
			<h2 class="title is-4">
				{{calendarTitle}}
				<a target="_blank" :href="sharngLink" class="button is-info">Subscribe</a>
			</h2>


			<div class="subtitle" v-html="calendarDescription"></div>

			<div class="schedule-blocks">
				<ul class="days">
					<li class="day" v-for="day in days">
						<div class="day-wrapper">
							<h3 class="title is-5">{{day.dayTitle}}</h3>
							<div class="event" v-for="event in day.events">
								<a class="event-title" target="_blank" :href="event.htmlLink">{{event.summary}}</a>
								<div class="event-dates">
									<span class="icon is-small">
										<i class="mdi mdi-alarm"></i>
									</span>
									<span>{{formatEventDate(event.start.dateTime, event.end.dateTime)}}</span>
								</div>
								<div class="event-location" v-if="event.location">
									<span class="icon is-small">
										<i class="mdi mdi-map-marker"></i>
									</span>
									<span>
										{{event.location}}
									</span>
								</div>
								<div v-if="event.attachments && event.attachments.length" class="event-attachments">
									<div class="attachments buttons">
										<a class="button is-small" :href="attachment.fileUrl" target="_blank" v-for="attachment in event.attachments">
											<span class="icon is-small">
												<img :src="attachment.iconLink" alt="">
											</span>
											<span>{{attachment.title}}</span>
										</a>
									</div>
								</div>
								<div class="event-description content" v-if="event.description && event.description.length" v-html="event.description"></div>
							</div>
						</div>
					</li>
					<!-- <li><small><i>Please add this schedule to your Google Calendar to recieve notifications on programme updates and have this programme on mobile devices. All learning materials will be attached to relevant events on this calendar. Use <a :href="sharngLink">this link</a> to share the programme.</i></small></li> -->
				</ul>

			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import * as _ from 'lodash';

	export default {
		name: "calendar",
		props: ["calendarId", "timeMin", "timeMax"],
		data() {
			return {
				calendarTitle: "",
				calendarDescription: "",
				days: [],
				isLoading: true
			}
		},
		created() {
			console.log("calendarId", this.calendarId);

			function compareDates(a, b) {
				var start = moment(a.start.dateTime || a.start.date);
				
				var end = moment(b.start.dateTime || b.start.date);

				return start - end;
			}

			axios.get(`https://clients6.google.com/calendar/v3/calendars/${this.calendarId}/events?timeZone=Europe%2FMoscow&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${this.timeMin}T00%3A00%3A00%2B03%3A00&timeMax=${this.timeMax}T00%3A00%3A00%2B03%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs&supportsAttachments=true`)
			.then(response => {
				this.calendarTitle = response.data.summary;
				this.calendarDescription = response.data.description;

				// создаём объект вида {"день или промежуток": [список событий]}
				var resultDaysObj = [];
				// и наполняем его
				for (const event of response.data.items) {
					console.log(event);

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

				console.log("result", resultDaysArray)
				this.days = _.sortBy(resultDaysArray, day => moment(day.events[0].start.dateTime || day.events[0].start.date));
				this.isLoading = false
			})
			.catch(e => {
				console.error(e);
			})
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
		computed: {
			sharngLink () {
				return `https://calendar.google.com/calendar/r?cid=${this.calendarId}`
			}
		}
	}
</script>

<style scoped>

	ul.days {
		list-style-type: none;
		padding: 0;
	}

	li.day {
		padding: 10px 0;
	}

	.day-wrapper {
		padding: 20px;
	}

	.event {
		padding-bottom: 10px;
		margin-bottom: 10px;
		/*border-bottom: 1px solid #eee;*/
	}

	.event-dates, .event-location {
		font-size: 0.85rem
	}

	.event:last-child {
		margin-bottom: 0;
	}

	.event-description, .event-attachments {
		font-size: 0.75rem
	}
	
	.schedule {
		padding-bottom: 50px;
	}

	@media (max-width: 1280px) {
		.schedule ul {
			columns: 3;
		}
	}

	@media (min-width: 1280px) {
		.schedule ul {
			columns: 4;
		}
	}

	@media (max-width: 1024px) {
		.schedule ul {
			columns: 2;
		}
	}
	
	@media (max-width: 720px) {
		.schedule ul {
			columns: 1;
		}
	}

	.schedule ul li{
		page-break-inside: avoid;
		break-inside: avoid;
	}

</style>