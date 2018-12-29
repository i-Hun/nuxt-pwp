<template>
	<ul>
		<li v-for="post in posts">
			<a :href="post.id">{{post.titleRu}}</a>
			  {{post.description}}
		</li>
	</ul>
</template>

<script>
	export default {
		name: 'data-science-index',
		data() {
			return {
				img: "data-science/img/main.jpg",
				posts: [
					{
						id: "basics-of-neural-networks",
						title: "Basics of Neural Networks",
						titleRu: "Основы нейронных сетей",
						lang: "ru",
						img: "data-science/img/main.jpg",
						description: ""
					},
					{
						id: "ensemble_learning",
						title: "Ensemble Learning",
						titleRu: "Анамблевые методы",
						lang: "ru",
						img: "data-science/img/main.jpg",
						description: ""
					},
					{
						id: "DBs",
						title: "Data Bases",
						titleRu: "Базы данных",
						lang: "ru",
						img: "data-science/img/main.jpg",
						description: ""
					},
					{
						id: "fair_models",
						title: "Fair Models",
						titleRu: "Честность при работе с моделями",
						lang: "ru",
						img: "data-science/img/main.jpg",
						description: ""
					},
					{
						id: "feature_engineering",
						title: "Feature Engineering",
						titleRu: "Работа с признаками",
						lang: "ru",
						img: "data-science/img/main.jpg",
						description: ""
					},
					{
						id: "good-enough-practices",
						title: "Good Pnough Practices for Scientific Computing",
						titleRu: "Полезные практики для работы с данными",
						lang: "ru",
						img: "data-science/img/main.jpg",
						description: ""
					},
					{
						id: "language_models",
						title: "Language Models",
						titleRu: "Языковые модели",
						lang: "ru",
						img: "data-science/img/main.jpg",
						description: ""
					},
					{
						id: "clustering_and_topic_modelling",
						title: "Unsupervised learning",
						titleRu: "Методы обучения без учителя",
						lang: "ru",
						img: "data-science/img/main.jpg",
						description: ""
					},
				]
			}
		}
	}
</script>
