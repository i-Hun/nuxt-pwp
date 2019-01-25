var randomColor = require('randomcolor');

let dataSciencePosts = [
	{
		id: "good-enough-practices",
		title: "Good Enough Practices for Scientific Computing",
		titleRu: "Полезные практики для работы с данными",
		lang: "en",
		img: "/data-science/img/good-enough-practices.jpg",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	// {
	// 	id: "DBs",
	// 	title: "Databases",
	// 	titleRu: "Базы данных",
	// 	lang: "ru",
	// 	img: "/data-science/img/DBs.svg",
	// 	description: "",
	// 	author: "Oleg Nagornyy",
	// 	color: randomColor({
	// 		count: 3,
	// 		hue: 'orange',
	// 		// seed: 12
	// 		luminosity: 'dark'
	// 	})
	// },
	{
		id: "feature_engineering",
		title: "Feature Engineering",
		titleRu: "Работа с признаками",
		lang: "ru",
		img: "/data-science/img/feature_engineering.jpg",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "clustering_and_topic_modelling",
		title: "Unsupervised learning",
		titleRu: "Методы обучения без учителя",
		lang: "ru",
		img: "/data-science/img/clustering_and_topic_modelling.png",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "fair_models",
		title: "Fair Models",
		titleRu: "Честность при работе с моделями",
		lang: "ru",
		img: "/data-science/img/fair_models.png",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			// seed: 12
			luminosity: 'dark'
		})
	},
	// {
	// 	id: "language_models",
	// 	title: "Language Models",
	// 	titleRu: "Языковые модели",
	// 	lang: "ru",
	// 	img: "/data-science/img/language_models.jpg",
	// 	description: "",
	// 	author: "Oleg Nagornyy",
	// color: ['#afe', '#9ae', '#faf']
	// },
	{
		id: "ensemble_learning",
		title: "Ensemble Learning",
		titleRu: "Ансамблевые методы",
		lang: "ru",
		img: "/data-science/img/ensemble_learning2.jpg",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "geoanalysis-rosbank",
		title: "Happy Data Year: competitive geoanalysis from Rosbank",
		titleRu: "Happy Data Year: новогоднее соревнование от Росбанка",
		lang: "en",
		img: "/data-science/img/geoanalysis-rosbank.jpg",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "time-series",
		title: "Time series analysis. Does Russian economy really depends on oli price?",
		titleRu: "Анализ временных рядов. Действительно ли российская экономика зависит от цен на газ?",
		lang: "ru",
		img: "/data-science/img/geoanalysis-rosbank.jpg",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
]


let intro2pythonPosts = [
	{
		id: "python-review",
		title: "Python review",
		titleRu: "Обзор языка Python",
		lang: "en",
		description: "Python has become first-choice language for data-analysist and researchers. Why did this happened?",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'green',
			luminosity: 'dark'
		})
	},
	{
		id: "installation-and-basic-syntax",
		title: "First program in Python: installation and basic syntax",
		titleRu: "Начинаем программировать на Python",
		description: "In this lesson we will start to write simple scripts in Python. To do that we need to install the interpreter, than investigate the ways how to run Python code and, finally, learn basic datatypes and expressions.",
		lang: "en",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'green',
			luminosity: 'dark'
		})
	},
]

let ann = [
	{
		id: "use-cases-of-ann",
		title: "Use cases of Artificial Neural Networks",
		titleRu: "Прмеры использования искусственных нейронных сетей",
		lang: "en",
		description: "Neural networks are very mighty and very fun instrument of data scientists. Here I will show you why.",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'purple',
			luminosity: 'dark'
		})
	},
	{
		id: "history-of-ann",
		title: "Early History of Artificial Neural Networks",
		titleRu: "История искусственных нейронных сетей",
		lang: "ru",
		description: "In this lesson we review the history of Neural Networks and code a simple perceptron in Python.",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'purple',
			luminosity: 'dark'
		})
	},
	{
		id: "how-ann-learn",
		title: "How Artificial Neural Networks Learns",
		titleRu: "Как обучаются нейронные сети",
		lang: "ru",
		img: "/img/basics-of-neural-networks.gif",
		description: "Lets talk about what makes ANN really clever — ability to learn — and investigate Gradient Descent in Backpropogation Algorithms",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'purple',
			luminosity: 'dark'
		})
	},
]

let courses = [
	{
		title: "Introduction to Python programming language",
		id: 'intro2python',
		elements: intro2pythonPosts,
		color: randomColor({
			count: 3,
			hue: 'green',
			luminosity: 'dark'
		}),
		lang: 'en',
		description: "Introduction to Python for those who would like to build his own pipeline of data analysis."
	},
	{
		title: "Introduction to Data Science",
		id: 'data-science',
		elements: dataSciencePosts,
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		}),
		// lang: 'ru',
		description: "This course shed the light on the main topics of data science — web-scrapping, data munging, feature engineering, supervised and unsupervised learning, validation and ensemble methods.",
	},
	{
		title: "Artificial Neural Networks",
		id: 'ann',
		elements: ann,
		color: randomColor({
			count: 3,
			hue: 'purple',
			luminosity: 'dark'
		}),
		description: "Detailed course on Artificial Neural Networks from the very begining to advanced topics.",
	},
]

courses.map(course => {
	course.path = `/courses/${course.id}`
	return course.elements.map(lesson => {
		lesson.path = `${course.path}/${lesson.id}`
		return lesson
	})
})

export default courses;