var randomColor = require('randomcolor');

const events = [
	{
		id: "nkodf5abeqrpa4tm7k31b26n2k@group.calendar.google.com",
		title: "Summer school at Dubna 2018",
		titleRu: "Летняя школа в Дубне 2018 г.",
		lang: "ru",
		img: "/img/dubna.jpg",
		description: "",
		color: randomColor({
			count: 3,
			hue: 'monochrome',
			luminosity: 'dark'
		})
	},
	{
		id: "d97rg6bf60332qahmh9la0ar30@group.calendar.google.com",
		title: "InLiberty summer school in Georgia",
		titleRu: "Лeтняя школа InLiberty",
		lang: "ru",
		img: "/img/inliberty.jpg",
		description: "",
		color: randomColor({
			count: 3,
			hue: 'monochrome',
			luminosity: 'dark'
		})
	},
	{
		id: "2pu36mt6v6mt092pcuqnm1dm9s@group.calendar.google.com",
		title: "Data Analysis with Python",
		titleRu: "Прикладной анализ данных в Python",
		lang: "en",
		img: "/img/data-analysis-with-python.jpg",
		description: "",
		color: randomColor({
			count: 3,
			hue: 'monochrome',
			luminosity: 'dark'
		})
	},
	{
		id: "m884ehsb1ha2qechg17ls6e16c@group.calendar.google.com",
		title: "Practical programming and data analysis in special environments",
		titleRu: "Практическое программирование и анализ данных в специализированных средах",
		lang: "en",
		img: "/img/data-analysis-with-python.jpg",
		description: "",
		color: randomColor({
			count: 3,
			hue: 'monochrome',
			luminosity: 'dark'
		})
	},
]

events.map(event => {
	return event.path = `/events/${event.id}`;
})

export default events;
