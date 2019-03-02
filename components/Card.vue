<template>
	<div class="tile is-parent">	
		<a :href="card.path" class="card tile is-child notification" :data-color="card.color" :style="`background: ${card.color[0]}; background: linear-gradient(140deg, ${card.color[0]} 0%, ${card.color[1]} 50%, ${card.color[2]} 100%);`">
			<h2 class="title">{{card.title}}</h2>
			<div class="description" v-if='card.description'>
				{{card.description}}
			</div>
			<div class="top-right">
				<div v-if="card.elements" class="counter"><strong>{{card.elements.length}}</strong> items</div>
				<div class="lang" v-if="card.lang === 'ru'">🇷🇺</div>
				<div class="lang" v-if="card.lang === 'en'">🇬🇧</div>
			</div>
		</a>
	</div>
</template>

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

h1, h2 {
	color: #fff;
}
</style>