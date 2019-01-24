<template>
	<div class='card' :data-color="card.color" :style="`background: ${card.color[0]}; background: linear-gradient(140deg, ${card.color[0]} 0%, ${card.color[1]} 35%, ${card.color[2]} 100%);`">
		<h1 v-if="$nuxt.$route.path === card.path" class="title">{{card.title}}</h1>
		<h2 v-else class="title">{{card.title}}</h2>
		<div class="description" v-if='card.description'>
			{{card.description}}
		</div>
		<div class="top-right">
			<div v-if="card.elements" class="counter"><strong>{{card.elements.length}}</strong> items</div>
			<div class="lang" v-if="card.lang === 'ru'">🇷🇺</div>
			<div class="lang" v-if="card.lang === 'en'">🇬🇧</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	export default {
		props: {
			card: {
				default: () => {},
				type: Object
			},
			level: {
				default: 2,
				type: Number
			}
		},
	}
</script>


<style scoped lang='scss'>
.top-right {
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 0.75rem;

	& > div {
		float: right;
		margin-right: 7px;
	}
}

.lang {
	font-size: 1.5rem;
	margin-top: -8px;
}
</style>