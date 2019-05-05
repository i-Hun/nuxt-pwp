const pkg = require('./package')
import courses from './data/courses.js';
import events from './data/events.js';
import axios from 'axios';
import sql_to_object from "./plugins/sql_to_object.js";



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


let allRoutes = coursesUrls.flat().concat(eventsUrls);

if (!process.browser) {
	const SQL = require('sql.js');
	const fs = require('fs');
	const filebuffer = fs.readFileSync('/Users/hun/pwp-v3/data/nagornyy.db');

	// Load the db
	const db = new SQL.Database(filebuffer);
	const places_sql = db.exec(
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

	const places = sql_to_object(places_sql);
	const placesUrl = places.map(place => '/travel/places/' + place.place_id);

	allRoutes = allRoutes.concat(placesUrl)


	const posts_sql = db.exec(
		`SELECT
			*
		FROM posts`
	);

	const posts = sql_to_object(posts_sql);
	const postsUrl = posts.map(post => '/blog/' + post.id);
	allRoutes = allRoutes.concat(postsUrl)

}

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
		'nuxt-leaflet',
		['@nuxtjs/yandex-metrika',
			{
				id: '51885752',
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true
			}
		],
		['nuxt-i18n', {
			baseUrl: 'https://nagornyy.me',
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
			//parsePages: false,	 // Disable acorn parsing
			// pages: {
			// 	"courses/_courseId/_lessonId": {
			// 		ru: '/courses/:courseId/:lessonId?',
			// 		en: '/fdfd/courses/:courseId/:lessonId?', // -> accessible at /fr/a-propos
			// 	}
			// },
			vueI18n: {
				fallbackLocale: 'ru',
				messages: {
					en: require('./data/locales/en.json'),
					ru: require('./data/locales/ru.json'),
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
	},
}

