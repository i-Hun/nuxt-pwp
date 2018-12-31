<template>
	<section class="section">
		<Calendar
		:calendarId="calendarId"
		timeMin="2017-06-25"
		timeMax="2070-08-25">
		</Calendar>
	</section>
</template>


<style scoped>

</style>


<script>
	import Calendar from "@/components/Calendar.vue";

	export default {
		components: {
			Calendar
		},
		data() {
			return {
				calendarId: ""
			}
		},
		asyncData (context) {
			return {
				calendarId: context.params.id
			}
		},
	}
</script>