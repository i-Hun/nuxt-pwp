const pkg = require('./package')
import courses from './data/courses.js';
import events from './data/events.js';
import axios from 'axios';

const coursesUrls = courses.map((course) => {
	return course.elements.map(lesson => {
		return `/courses/${course.id}/${lesson.id}`;
	}).concat(`/courses/${course.id}`)
}).concat('/courses')

const eventsUrls = events.map((event) => {
	return "/events/" + event.id;
}).concat('/events')

// return axios.get(`https://api.tumblr.com/v2/blog/ihun.tumblr.com/posts?api_key=5YiGBDAB7Jr3YnOMEdOjxr8f8MIguZXJVFFw8ktEAvamvd3srf`)
// .then((res) => {
//	const posts = res.data.response.posts.map(post => {
//		return "/blog/" + post.id
//	})
//	return dataScienceUrls.concat(intro2pythonUrls).concat(eventsUrls).concat("/bookmarks/").concat("/blog/").concat(posts);
// })
// .catch(err => {
//	console.error(err);
// });

const allRoutes = coursesUrls.flat().concat(eventsUrls);


module.exports = {
	mode: 'universal',
	head: {
		title: "Oleg Nagornyy",
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: "Hi! I am Oleg — Social researcher, Data analyst and Web-developer from Saint Petersburg, Russia. I'm working as Research assistant and Lecturer at HSE." },
			{ hid: 'author', name: 'author', content: 'Oleg Nagornyy'},
			{ name: 'yandex-verification', content: '471b8643d6aebb45'},
			{ name: 'google-site-verification', content: 'xH5va-Q3lKPKE-R_6Eum-flGjhXIO4yISWWaqFiOXzI'},
			{ name: 'theme-color', content: '#ffffff'},
			{ hid: 'og:title', property: 'og:title', content: 'Oleg Nagornyy'},
			{ hid: 'og:description', property: 'og:description', content: 'Hi! I am Social researcher, Data analyst and Web-developer from Saint Petersburg, Russia. I\'m working as Research assistant and Lecturer at HSE.'},
			{ hid: 'og:image', property: 'og:image', content: '/img/cover.jpg'},
			{ hid: 'og:type', property: 'og:type', content: 'profile'},
			{ hid: 'profile::first_name', property: 'profile::first_name', content: 'Oleg'},
			{ hid: 'profile::last_name', property: 'profile::last_name', content: 'Nagornyy'}
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
			{ rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png', sizes: '180x180'},
			{ rel: 'alternate', href: '/feed.xml', title: "RSS Feed for nagornyy.me", type: "application/rss+xml" },
			{ rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#5bbad5'},
		],
		script: [
			{ src: 'https://cdnjs.cloudflare.com/ajax/libs/trianglify/2.0.0/trianglify.min.js', ssr: true, async: true },
		]

	},

	/*
	** Customize the progress-bar color
	*/
	loading: {
		color: 'blue',
		height: '2px'
	},

	/*
	** Global CSS
	*/
	css: [
		'@/assets/styles/main.scss'
	],

	/*
	** Plugins to load before mounting the App
	*/
	plugins: [
		{ src: '~plugins/ga.js', ssr: false },
	],

	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/markdownit',
		'@nuxtjs/sitemap',
		'@nuxtjs/feed',
		['@nuxtjs/yandex-metrika',
			{
				id: '51885752',
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true
			}
		],
		['nuxt-i18n', {
			locales: [
				{
					code: 'en',
					name: 'English',
					iso: 'en-US'
				},
				{
					code: 'ru',
					name: 'Русский',
					iso: 'ru-RU'
				},
			],
			defaultLocale: 'ru',
			strategy: 'prefix_except_default',
			baseUrl: 'https://nagornyy.me',
			vueI18n: {
				fallbackLocale: 'ru',
				messages: {
					en: {
						courses: 'Courses',
						events: "Events",
						name: "Oleg Nagornyy",
						greeting: "Hi! I am Oleg — Social researcher, Data analyst and Web-developer from Saint Petersburg, Russia. I'm working as Research assistant and Lecturer at HSE.",
						downloadCV: "Download CV",
						telegram: "Telegram",
						vk: "VK",
						email: "Email",
						skype: "Skype",
						hse: "HSE",
						hseURL: "hse.ru/en/staff/oleg",
						myCourses: "My Courses",
						course: "Course",
						coursesDisclaimer: "At the begining of the 2019 I decided to publish some materials from my lectures and seminars on the website. This section is not complete and messy now, but someday I will put it in order.",
						education: "Education",
						additionalEducation: "Additional education",
						conferences: "Conferences",
						awards: "Awards",
						publications: "Publications",
						googleScholar: "Google Scholar"
					},
					ru: {
						courses: 'Курсы',
						events: "События",
						name: "Нагорный Олег",
						greeting: "Привет! Меня зовут Нагорный Олег. Я живу в Питере, работаю в ВШЭ и занимаюсь анализом данных и преподаванием.",
						downloadCV: "Скачать резюме",
						telegram: "Телеграм",
						vk: "ВК",
						email: "Почта",
						skype: "Скайп",
						hse: "ВШЭ",
						hseURL: "hse.ru/staff/oleg",
						myCourses: "Мои курсы",
						course: "Курс",
						coursesDisclaimer: "В начале 2019 я решил публиковать на сайте материалы своих курсов. Сейчас они находятся в полном беспорядке, но я планирую исправить это.",
						education: "Образование",
						additionalEducation: "Дополнительное образование",
						conferences: "Конференции",
						awards: "Награды",
						publications: "Публикации",
						googleScholar: "Академия Google"
					},
				}
			}
		}]
	],
	sitemap: {
	 path: '/sitemap.xml',
	 hostname: 'https://nagornyy.me',
	 cacheTime: 1000 * 60 * 15,
	 gzip: true,
	 generate: true, // Enable me when using nuxt generate
	 routes: allRoutes
	},
	axios: {

	},
	generate: {
		routes: function () {
			return allRoutes;
		}
	},
	feed: [
	 {
		 path: '/feed.xml', // The route to your feed.
		 async create (feed){
			 feed.options = {
				 title: 'Oleg Nagornyy',
				 link: 'https://nagornyy.me/feed.xml',
				 description: 'Feed!',
			 }

			 courses.forEach(course => {
				 course.elements.forEach(lesson => {
					 feed.addItem({
						 title: lesson.title,
						 id: lesson.url,
						 link: "https://nagornyy.me" + lesson.path,
						 description: lesson.description,
						 category: course.title
					 })	
				 })

			 })

			 feed.addCategory('Course by Oleg Nagornyy');

			 feed.addContributor({
				 name: 'Oleg Nagornyy',
				 email: 'nagornyy.o@gmail.com',
				 link: 'https://nagornyy.me/'
			 })
		 },
		 cacheTime: 1000 * 60 * 15, // How long should the feed be cached
		 type: 'rss2', // Can be: rss2, atom1, json1
	 }
	],
	build: {
		// analyze: true,
		// extend(config, ctx) {
		//	 // Run ESLint on save
		//	 if (ctx.isDev && ctx.isClient) {
		//		 config.module.rules.push({
		//			 enforce: 'pre',
		//			 test: /\.(js|vue)$/,
		//			 loader: 'eslint-loader',
		//			 exclude: /(node_modules)/,
		//			 options: {
		//				fix: true
		//			 }
		//		 })
		//	 }
		// },
	 extend(config, ctx) {
		 config.module.rules.push({
			 test: /\.ipynb$/,
			 exclude: /node_modules/,
			 loader: 'raw-loader'
		 })
	 }
	},
}

