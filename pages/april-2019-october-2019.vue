<template>
<div class="main">
	<div class="columns">
		<div class="column is-two-thirds">
			<article class="media intro content block">
				<figure class="media-left is-hidden-touch">
					<p class="image is-128x128 avatar">
						<img class="is-rounded" src="/img/avatar-2019.jpeg">
					</p>
				</figure>
				<div class="media-content">
					<div class="content">
						<h1 class="intro-text is-3 title">
						{{$t("greeting.april_2019_october_2019.title")}}
						</h1>
					</div>
				</div>
			</article>
			<ul class="contacts block content">
				<li><a href="/cv.pdf">{{$t("downloadCV")}}</a></li>
				<li>{{$t("email")}}: <a href="mailto:nagornyy.o@gmail.com" target="_blank">nagornyy.o@gmail.com</a></li>
				<li>{{$t("vk")}}: <a href="https://vk.com/n.oleg" target="_blank">vk.com/n.oleg</a></li>
				<li>{{$t("telegram")}}: <a href="https://t.me/i_Hun" target="_blank">@i_Hun</a></li>
				<li>{{$t("skype")}}: <a href="skype:nagornyy_oleg?add" target="_blank">nagornyy_oleg</a></li>
			</ul>

			<div class="courses">
				<h2 class="title">{{$t("myCourses")}} <span>{{$t("coursesDisclaimer")}}</span></h2>
				<Cards :cards="courses" :prefix="'courses/'" inRow="2"></Cards>
			</div>

			<div class="education block content">
				<h2>{{$t("education.title")}}</h2>
				<ul>
					<li>{{$t("education.phd")}}</li>
					<li>{{$t("education.hse")}}</li>
					<li>{{$t("education.omsu")}}</li>
				</ul>
			</div>
			<div class="block content">
				<h2>{{$t("additional_education.title")}}</h2>
				<ul>
					<li>
						<nuxt-link to="/events/d97rg6bf60332qahmh9la0ar30@group.calendar.google.com" active-class="is-active">{{$t("additional_education.inliberty")}}</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/events/nkodf5abeqrpa4tm7k31b26n2k@group.calendar.google.com" active-class="is-active">{{$t("additional_education.summer_school_2018")}}</nuxt-link>
					</li>
					<li>{{$t("additional_education.orf_school_2018")}}</li>
					<li>{{$t("additional_education.wwsss17")}}</li>
					<li>{{$t("additional_education.summer_school_2017")}}</li>
					<li>{{$t("additional_education.orf_school_2016")}}</li>
					<li>{{$t("additional_education.digital_traces")}}</li>
					<li>{{$t("additional_education.casilli")}}</li>
				</ul>
			</div>
			<div class="publications block content">
				<h2>{{$t("publications")}}</h2>
				<ol>
					<li class="csl-entry">Koltsova, O., Nikolenko, S., Alexeeva, S., Nagornyy, O., &amp; Koltcov, S. (2017). Detecting Interethnic Relations with the Data from Social Media. In <i>Digital Transformation and Global Society</i> (pp. 16–30). Springer, Cham. <a href="https://doi.org/10.1007/978-3-319-69784-0_2">https://doi.org/10.1007/978-3-319-69784-0_2</a></li>
					<li class="csl-entry">Nagornyy, O. (2018). Topics of Ethnic Discussions in Russian Social Media. In D. A. Alexandrov, A. V. Boukhanovsky, A. V. Chugunov, Y. Kabanov, &amp; O. Koltsova (Eds.), <i>Digital Transformation and Global Society</i> (Vol. 859, pp. 83–94). Springer International Publishing. <a href="https://doi.org/10.1007/978-3-030-02846-6_7">https://doi.org/10.1007/978-3-030-02846-6_7</a></li>
					<li class="csl-entry">Nagornyy, O. (2019). (in print) User ethnicity and gender as predictors of attitudes to ethnic groups in social media texts. In <i>Workshop proceedings of Internet Science conference 2018</i>. Saint Petersburg.</li>
					<li class="csl-entry">Nagornyy, O., &amp; Koltsova, O. (2017). <i>Mining Media Topics Perceived as Social Problems by Online Audiences: Use of a Data Mining Approach in Sociology</i> (SSRN Scholarly Paper No. ID 2968359). Rochester, NY: Social Science Research Network. Retrieved from <a href="https://papers.ssrn.com/abstract=2968359">https://papers.ssrn.com/abstract=2968359</a></li>
					<li class="csl-entry">Nagornyy, O., &amp; Koltsova, O. Y. (2019). (under review) Redefining media agendas: topic problematization in online reader comments. <i>Media and Communication</i>.</li>
					<li class="csl-entry">Rykov, Y., Nagornyy, O., &amp; Koltsova, O. (2017). Digital Inequality in Russia Through the Use of a Social Network Site: A Cross-Regional Comparison. In D. A. Alexandrov, A. V. Boukhanovsky, A. V. Chugunov, Y. Kabanov, &amp; O. Koltsova (Eds.), <i>Digital Transformation and Global Society</i> (Vol. 745, pp. 70–83). Springer International Publishing. <a href="https://doi.org/10.1007/978-3-319-69784-0_6">https://doi.org/10.1007/978-3-319-69784-0_6</a></li>
					<li class="csl-entry">Rykov Yuri, Nagornyy Oleg, Koltsova Olessia, Natta Herbert, Kremenets Alexander, Manovich Lev, … Crockett Damon. (2016). Semantic and Geospatial Mapping of Instagram Images in Saint-Petersburg. In <i>Proceedings of the Artificial Intelligence and Natural Language</i> (pp. 110–113). Saint-Petersburg. Retrieved from <a href="http://fruct.org/publications/abstract-AINL-FRUCT-2016/files/Ryk.pdf">http://fruct.org/publications/abstract-AINL-FRUCT-2016/files/Ryk.pdf</a></li>
					<li class="csl-entry">Нагорный, О. С. (2014). Построение тематического профиля омских интернет-СМИ. <i>Вестник Омского Университета</i>, (1/2), 12–16.</li>
					<li class="csl-entry">Нагорный, О. С. (2017). Репрезентация этничностей в русскоязычных социальных медиа. <i>Мониторинг Общественного Мнения: Экономические и&nbsp;Социальные Перемены</i>, (4), 165–184. <a href="https://doi.org/10.14515/monitoring.2017.4.11">https://doi.org/10.14515/monitoring.2017.4.11</a></li>
					<li class="csl-entry">Нагорный, О. С., &amp; Мухетдинова, А. Т. (2016). Исследование дискурса о биопедагогике при помощи тематического моделирования и синтаксического анализа текстов. In <i>Математическое и компьютерное моделирование: материалы IV Международной научной конференции</i> (pp. 154–156). Омск: Издательство Омского государственного университета.</li>
					<li class="csl-entry">Рыков, Ю. Г., &amp; Нагорный, О. С. (2017). Область Интернет-исследований в социальных науках. <i>Социологическое Обозрение</i>, <i>16</i>(3), 366–394. Retrieved from <a href="https://sociologica.hse.ru/2017-16-3/210184656.html">https://sociologica.hse.ru/2017-16-3/210184656.html</a></li>
				</ol>
			</div>
			<div class="conferences block content">
				<h2>{{$t("conferences")}}</h2>
				<ul>
					<li v-for='conference in conferences'>
						{{conference.title}}. {{conference.place.country}} {{conference.place.flag}}, {{conference.place.city}}. {{formatConfDate(conference.date.start, conference.date.end)}}.

					</li>
				</ul>
			</div>

			<div class="awards block content">
				<h2>{{$t("awards.title")}}</h2>

				<ul>
					<li>{{$t("awards.thesis_competition")}}</li>
					<li>{{$t("awards.oxford_scholarship")}}</li>
					<li>{{$t("awards.hse_olympiad")}}</li>
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
	import conferences from "@/data/conferences.js";
	import moment from 'moment';
	import courses from '@/data/courses.js';
	import Cards from "@/components/Cards.vue";
	import Timeline from "@/components/Timeline.vue";


	export default {
		name: 'Main',
		layout: "wide",
		components: {
			Cards,
			Timeline
		},
		head () {
			return {
				title: this.$t('profile.fullName'),
				meta: [
					{
						hid: 'description',
						name: 'description',
						content: this.$t('greeting.april_2019_october_2019.title')
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
						content: this.$t('greeting.april_2019_october_2019.title')
					},
					{ hid: 'author', name: 'author', content: this.$t('profile.fullName')},
					{ hid: 'profile::first_name', property: 'profile::first_name', content: this.$t('profile.firstName')},
					{ hid: 'profile::last_name', property: 'profile::last_name', content: this.$t('profile.lastName')}
				]
			}
		},
		data () {
			return {
				courses: courses,
				conferences: conferences,
			}
		},
		methods: {
			formatConfDate (start, end) {
				const startFormated = moment(start).format("MMM Do");
				const endFormated = moment(end).format("MMM Do");
				if (startFormated === endFormated) {
					return `${startFormated}, ${moment(end).format("YYYY")}`
				}
				return `${startFormated} — ${endFormated}, ${moment(end).format("YYYY")}`;
			},
		}
	}
</script>
