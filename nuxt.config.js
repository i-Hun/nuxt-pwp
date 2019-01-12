const pkg = require('./package');
import courses from './data/courses.js';
import events from './data/events.js';
import axios from 'axios';

const coursesUrls = courses.map((course) => {
	return course.lessons.map(lesson => {
		return `/courses/${course.id}/${lesson.id}`;
	})
})

const eventsUrls = events.map((event) => {
	return "/events/" + event.id;
})

// return axios.get(`https://api.tumblr.com/v2/blog/ihun.tumblr.com/posts?api_key=5YiGBDAB7Jr3YnOMEdOjxr8f8MIguZXJVFFw8ktEAvamvd3srf`)
// .then((res) => {
// 	const posts = res.data.response.posts.map(post => {
// 		return "/blog/" + post.id
// 	})
// 	return dataScienceUrls.concat(intro2pythonUrls).concat(eventsUrls).concat("/bookmarks/").concat("/blog/").concat(posts);
// })
// .catch(err => {
// 	console.error(err);
// });

const allRoutes = coursesUrls.flat().concat(eventsUrls)


module.exports = {
	mode: 'universal',
	head: {
		title: "Oleg Nagornyy",
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: "Hi! I am Oleg — Social researcher, Data analyst and Web-developer from Saint Petersburg, Russia. I'm working as Research assistant and Lecturer at HSE." },
			{ name: 'author', content: 'Oleg Nagornyy'},
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
			{ rel: 'mask-icon', href: '/favicons/safari-pinned-tab.svg', color: '#5bbad5'},

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
		['@nuxtjs/yandex-metrika',
			{
				id: '51885752',
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true
			}
		],
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
		// See https://github.com/nuxt-community/axios-module#options
	},

	generate: {
		routes: function () {
			return allRoutes;
		}
	},

	/*
	** Build configuration
	*/
	build: {

		/*
		** You can extend webpack config here
		*/
		// extend(config, ctx) {
		//	 // Run ESLint on save
		//	 if (ctx.isDev && ctx.isClient) {
		//		 config.module.rules.push({
		//			 enforce: 'pre',
		//			 test: /\.(js|vue)$/,
		//			 loader: 'eslint-loader',
		//			 exclude: /(node_modules)/,
		//			 options: {
		//			 	fix: true
		//			 }
		//		 })
		//	 }
		// }
		extend(config, ctx) {
			config.module.rules.push({
				test: /\.ipynb$/,
				exclude: /node_modules/,
				loader: 'raw-loader'
			})
		}
	},
}
