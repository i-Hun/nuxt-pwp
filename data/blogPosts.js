var randomColor = require('randomcolor');

let blogPosts = [
	{
		id: "fillers-russians-use-in-english",
		title: "Слова-паразиты русскоязычных в английском языке",
		created: "30/01/2019",
		lang: "ru",
		img: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'pink',
			luminosity: 'dark'
		})
	},
	{
		id: "aeroexpress",
		title: "Аэроэкспресс,
		created: "30/01/2019",
		lang: "ru",
		img: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'pink',
			luminosity: 'dark'
		})
	},
]



blogPosts.map(post => {
	post.path = `/blog/${post.id}`
})

export default blogPosts;