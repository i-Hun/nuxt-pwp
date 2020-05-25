var randomColor = require('randomcolor');

let recommendationSystems = [
	{
		id: "introduction-to-recommendation-systems",
		title: "Постановка задачи и виды рекоммендательных систем",
		lang: "ru",
		thumbnail: "",
		date: "2020-02-08",
		description: "А какие они вообще бывают и для чего нужны?",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'pink',
			luminosity: 'dark'
		})
	},
	{
		id: "linear-regression-pytorch",
		title: "Простая линейная регрессия в PyTorch",
		lang: "ru",
		thumbnail: "",
		date: "2020-02-27",
		description: "Простая для понимания, мощная в применении. Именно с регрессионной модели начнётся построение нашей рекоммендательной системы.",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'pink',
			luminosity: 'dark'
		})
	},
	{
		id: "logistic-regression-pytorch",
		title: "Классификация при помощи логистической регрессии в PyTorch",
		lang: "ru",
		thumbnail: "",
		date: "2020-03-01",
		description: "Легким движением руки линейная регрессия превращается в логистическую...",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'pink',
			luminosity: 'dark'
		})
	},
	{
		id: "factorization-machines-pytorch",
		title: "Факторизационные машины в PyTorch",
		lang: "ru",
		thumbnail: "",
		date: "2020-03-01",
		description: "...а затем в факторизационные машины...",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'pink',
			luminosity: 'dark'
		})
	},
	{
		id: "graphs-segmentation",
		title: "Сегментация при помощи графов",
		lang: "ru",
		thumbnail: "graphs-segmentation.jpg",
		date: "2020-05-26",
		description: "Не рекомендательные системы, но очень близко.",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'pink',
			luminosity: 'dark'
		})
	},
	// {
	// 	id: "field-aware-factorization-machines-pytorch",
	// 	title: "Field-aware факторизационные машины в PyTorch",
	// 	lang: "ru",
	// 	thumbnail: "",
	// 	date: "2020-03-01",
	// 	description: "...а затем в field-aware факторизационные машины...",
	// 	author: "Oleg Nagornyy",
	// 	color: randomColor({
	// 		count: 3,
	// 		hue: 'pink',
	// 		luminosity: 'dark'
	// 	})
	// },
]

let dataSciencePosts = [
	{
		id: "good-enough-practices",
		title: "Good Enough Practices for Scientific Computing",
		titleRu: "Полезные практики для работы с данными",
		lang: "en",
		thumbnail: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "linear-algebra-with-numpy",
		title: "Линейная алгебра с Numpy",
		titleRu: "Линейная алгебра с Numpy",
		lang: "ru",
		thumbnail: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "data-wrangling-pandas",
		title: "Работа с данными в Pandas 🐼",
		titleRu: "Работа с данными в Pandas 🐼",
		lang: "ru",
		thumbnail: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "dates-and-time-in-python-and-pandas",
		title: "Даты и время в Python и Pandas",
		titleRu: "Даты и время в Python и Pandas",
		lang: "ru",
		thumbnail: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "intro-to-matplotlib",
		title: "Введение в визуализацию данных с Matplotlib",
		titleRu: "Введение в визуализацию данных с Matplotlib",
		lang: "ru",
		thumbnail: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "intro-to-seaborn",
		title: "Введение в визуализацию данных с Seaborn",
		titleRu: "Введение в визуализацию данных с Seaborn",
		lang: "ru",
		thumbnail: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "regression",
		title: "Простые регрессионные модели в Python",
		lang: "ru",
		thumbnail: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "classification",
		title: "Простые модели классификации в Python",
		lang: "ru",
		thumbnail: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "exam-wine",
		title: "Промежуточный экзамен",
		lang: "ru",
		thumbnail: "",
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
	// 	thumbnail: "/data-science/img/DBs.svg",
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
		thumbnail: "",
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
		thumbnail: "",
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
		thumbnail: "",
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
	// 	thumbnail: "/data-science/img/language_models.jpg",
	// 	description: "",
	// 	author: "Oleg Nagornyy",
	// color: ['#afe', '#9ae', '#faf']
	// },
	{
		id: "ensemble_learning",
		title: "Ensemble Learning",
		titleRu: "Ансамблевые методы",
		lang: "ru",
		thumbnail: "",
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
		thumbnail: "/img/content/geoanalysis-rosbank.png",
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
		title: "Анализ временных рядов: действительно ли российская экономика зависит от цен на газ?",
		titleRu: "Анализ временных рядов. Действительно ли российская экономика зависит от цен на газ?",
		lang: "ru",
		thumbnail: "/img/content/time-series.svg",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "social-graphs",
		title: "Анализ социальных графов",
		titleRu: "Анализ графов",
		lang: "ru",
		thumbnail: "/img/content/social-graph.svg",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "multilevel-regressions",
		title: "Многоуровневые регрессионные модели",
		titleRu: "Многоуровневые регрессионные модели",
		lang: "ru",
		thumbnail: "/img/content/multilevel-regressions.svg",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "marketing-analysis",
		title: "Анализ данных для маркетологов: расчёт ROI, CPI, LTV и проверка гипотез для мобильного приложения",
		titleRu: "Анализ данных для маркетологов: расчёт ROI, CPI, LTV и проверка гипотез для мобильного приложения",
		lang: "ru",
		thumbnail: "",
		description: "",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'orange',
			luminosity: 'dark'
		})
	},
	{
		id: "bayes",
		title: "Байесовская статистика и вероятностное программирование на Python",
		titleRu: "Байесовская статистика и вероятностное программирование на Python",
		lang: "ru",
		thumbnail: "/img/content/bayes-thumbnail.png",
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
	{
		id: "web",
		title: "Web-scrapping",
		titleRu: "Web-scrapping",
		description: "Умение собирать данных из любых источников кардинально расширяет возможности проведения интересных и исследований. Здесь рассматриваются некоторые примеры персинга web-страниц и API.",
		lang: "ru",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'green',
			luminosity: 'dark'
		})
	},
	{
		id: "functional_programming",
		title: "Функциональное программирование",
		titleRu: "Функциональное программирование",
		description: "Функциональное программирование доминирует в сфере научных вычислений, и я лично предпочитаю эту парадигму всем другим. В этом занятии мы рассматрим нюансы написания кода в функциональном стиле в Python.",
		lang: "ru",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'green',
			luminosity: 'dark'
		})
	},
	{
		id: "oop",
		title: "Объектно-ориентированное программирование",
		titleRu: "Объектно-ориентированное программирование",
		description: "Без ООП сложно представить мир современного программирования. Это мощная парадигма, которая старается моделировать объекты реального мира.",
		lang: "ru",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'green',
			luminosity: 'dark'
		})
	},
	{
		id: "errors_handling",
		title: "Обработка ошибок",
		titleRu: "Обработка ошибок",
		description: "Любая программа содержит ошибки. Дело лишь в том, как с ними обращаться.",
		thumbnail: "/img/content/bos.png",
		lang: "ru",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'green',
			luminosity: 'dark'
		})
	},
	{
		id: "banking-rounding-in-python",
		title: "Банковское округление в Python",
		lang: "ru",
		thumbnail: "",
		date: "2020-02-08",
		description: "Шок! Гвидо скрывает правду о...",
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
		thumbnail: "/img/basics-of-neural-networks.gif",
		description: "Lets talk about what makes ANN really clever — ability to learn — and investigate Gradient Descent in Backpropogation Algorithms",
		author: "Oleg Nagornyy",
		color: randomColor({
			count: 3,
			hue: 'purple',
			luminosity: 'dark'
		})
	},
	{
		id: "focal-loss-for-imbalanced-datasets",
		title: "Focal loss for imbalanced datasets",
		titleRu: "Focal loss как функция потерь для предсказания несбалансированных классов",
		lang: "ru",
		thumbnail: "/img/basics-of-neural-networks.gif",
		description: "Simple yet effective function which down-weights easy examples",
		descriptionRu: "Простая функция потерь, которая штрафует за слишком уверенные ответы алгоритма",
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
	{
		title: "Рекомендательные системы",
		id: 'recommendation-systems',
		elements: recommendationSystems,
		color: randomColor({
			count: 3,
			hue: 'pink',
			luminosity: 'dark'
		}),
		description: "Построение рекомендательной системы от линейной регрессии до современных нейросетевых моделей",
	}
]

courses.map(course => {
	course.path = `/courses/${course.id}`
	return course.elements.map(lesson => {
		lesson.path = `${course.path}/${lesson.id}`
		return lesson
	})
})

export default courses;