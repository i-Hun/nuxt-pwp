const dataSciencePosts = [
	{
		id: "good-enough-practices",
		title: "Good Pnough Practices for Scientific Computing",
		titleRu: "Полезные практики для работы с данными",
		lang: "ru",
		img: "/data-science/img/good-enough-practices.jpg",
		description: "",
		author: "Oleg Nagornyy"
	},
	{
		id: "DBs",
		title: "Databases",
		titleRu: "Базы данных",
		lang: "ru",
		img: "/data-science/img/DBs.svg",
		description: "",
		author: "Oleg Nagornyy"
	},
	{
		id: "feature_engineering",
		title: "Feature Engineering",
		titleRu: "Работа с признаками",
		lang: "ru",
		img: "/data-science/img/feature_engineering.jpg",
		description: "",
		author: "Oleg Nagornyy"
	},
	{
		id: "clustering_and_topic_modelling",
		title: "Unsupervised learning",
		titleRu: "Методы обучения без учителя",
		lang: "ru",
		img: "/data-science/img/clustering_and_topic_modelling.png",
		description: "",
		author: "Oleg Nagornyy"
	},
	{
		id: "fair_models",
		title: "Fair Models",
		titleRu: "Честность при работе с моделями",
		lang: "ru",
		img: "/data-science/img/fair_models.png",
		description: "",
		author: "Oleg Nagornyy"
	},
	{
		id: "language_models",
		title: "Language Models",
		titleRu: "Языковые модели",
		lang: "ru",
		img: "/data-science/img/language_models.jpg",
		description: "",
		author: "Oleg Nagornyy"
	},
	{
		id: "ensemble_learning",
		title: "Ensemble Learning",
		titleRu: "Ансамблевые методы",
		lang: "ru",
		img: "/data-science/img/ensemble_learning2.jpg",
		description: "",
		author: "Oleg Nagornyy"
	},
	{
		id: "basics-of-neural-networks",
		title: "Basics of Neural Networks",
		titleRu: "Основы нейронных сетей",
		lang: "ru",
		img: "/img/basics-of-neural-networks.gif",
		description: "In this lesson we review the history of Neural Networks, analyze its inner structue and code simple network in Python.",
		author: "Oleg Nagornyy"
	},
]

const intro2pythonPosts = [
	{
		id: "python-review",
		title: "Python review",
		titleRu: "Обзор языка Python",
		lang: "ru",
		author: "Oleg Nagornyy"
	},
	{
		id: "syntax",
		title: "Syntax",
		titleRu: "Синтаксис языка Python",
		lang: "ru",
		author: "Oleg Nagornyy"
	}
]


const courses = [
	{
		title: "Data Science",
		id: 'data-science',
		lessons: dataSciencePosts
	},
	{
		title: "Intro to Python",
		id: 'intro2python',
		lessons: intro2pythonPosts
	}
]

export default courses;