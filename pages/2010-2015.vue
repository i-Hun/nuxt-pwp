<template>
<div class="main">
	<div class="columns">
		<div class="column is-two-thirds">
			<article class="media intro content block">
				<figure class="media-left is-hidden-touch">
					<p class="image is-128x128">
						<img class="is-rounded" src="/img/avatar-2010-2015.jpeg">
					</p>
				</figure>
				<div class="media-content">
					<div class="content">
						<h1 class="intro-text is-3 title">
						{{$t("greeting.2010_2015.title")}}
						</h1>
					</div>
				</div>
			</article>
			<ul class="contacts block content">
				<li>{{$t("email")}}: <a href="mailto:nagornyy.o@gmail.com" target="_blank">nagornyy.o@gmail.com</a></li>
				<li>{{$t("vk")}}: <a href="https://vk.com/n.oleg" target="_blank">vk.com/n.oleg</a></li>
				<li>{{$t("skype")}}: <a href="skype:nagornyy_oleg?add" target="_blank">nagornyy_oleg</a></li>
			</ul>

			<div class="education block content">
				<h2>{{$t("education.title")}}</h2>
				<ul>
					<li>{{$t("education.omsu")}}</li>
				</ul>
			</div>

			<div class="awards block content">
				<h2>{{$t("awards.title")}}</h2>

				<ul>
					<li>{{$t("awards.omsu_scholarship")}}</li>
					<li>{{$t("awards.school_olympiad")}}</li>

				</ul>
			</div>
		</div>
		<div class="column">
			<Timeline></Timeline>
		</div>
	</div>
</div>
</template>

<script>
	import moment from 'moment';
	import Timeline from "@/components/Timeline.vue";

	export default {
		name: 'main2010',
		layout: "wide",
		components: {
			Timeline
		},
		head () {
			return {
				title: this.$t('profile.fullName') + " 2010—2015",
				meta: [
					{
						hid: 'description',
						name: 'description',
						content: this.$t('greeting.2010_2015.title')
					},
					{
						hid: 'og:title',
						property: 'og:title',
						content: this.$t('profile.fullName')
					},
					{
						hid: 'og:image',
						property: 'og:image',
						content: '/img/cover.jpg'
					},
					{
						hid: 'og:description',
						property: 'og:description',
						content: this.$t('greeting.2010_2015.title')
					},
					{ hid: 'author', name: 'author', content: this.$t('profile.fullName')},
					{ hid: 'profile::first_name', property: 'profile::first_name', content: this.$t('profile.firstName')},
					{ hid: 'profile::last_name', property: 'profile::last_name', content: this.$t('profile.lastName')}
				]
			}
		},
	}


</script>
