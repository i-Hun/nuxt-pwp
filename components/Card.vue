<template>
	<div class="tile is-parent">	
		<a
			:href="card.path" :class="`card tile is-child ${card.thumbnail ? 'has-thumbnail' : ''}`"
			:data-color="card.color || [100, 100, 100]"
			:style="`${height}`"
		>
			<div class="card-background" :style="`${background}filter: blur(2px) brightness(0.9);height: 100%;background-position: center;background-repeat: no-repeat;background-size: cover;`">
				
			</div>
			<div class="card-content">
				<h2 class="title">{{card.title}}</h2>
				<div class="description" v-if='card.description'>
					{{card.description}}
				</div>
			</div>
<!-- 			<div class="top-right">
				<div v-if="card.elements" class="counter"><strong>{{card.elements.length}}</strong> items</div>
				<div class="lang" v-if="card.lang === 'ru'">🇷🇺</div>
				<div class="lang" v-if="card.lang === 'en'">🇬🇧</div>
			</div> -->
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
			size: {
				default: "1",
				type: String
			},
		},
		computed: {
			background: function () {
				if (this.card.thumbnail) {
					return `background-image: url(/img/thumbnails/${this.card.thumbnail}); background-size:cover;`
				} else {
					if (this.card.color) {
						return `background: linear-gradient(140deg, ${this.card.color[0]} 0%, ${this.card.color[1]} 50%, ${this.card.color[2]} 100%);`
					} else {
						return "background-color: #111;"
					}
				}
			},

			height: function () {
				if (this.size === "2") {
					return "min-height: 300px;"
				}
			}
		},
	}
</script>


<style scope lang='scss'>
.card {
	box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.4);
	border-radius: 4px;
	transition: .3s ease, transform .2s ease-in-out;
	background-size: cover;
	background-position: center center;
	text-shadow: 0 0 1px rgba(0,0,0,0.4);
}

a.card:hover, a.card:hover {
	color: #fff;
	box-shadow: 0px 0px 1.5rem rgba(0, 0, 0, 0.5);
	transform: scale(1.02);
}

.card:visited {
	color: #fff;
}

.card:link {
	color: #fff;
}

.card-content {
	position: relative;
	top: -100%;
	z-index: 2;
	.title {
		color: white;
	}
}

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

.has-thumbnail .description {
	background-color: rgba(0,0,0,0.3);
	display: inline;
	padding: 3px;
}

.has-thumbnail .description, .has-thumbnail h2 {
	text-shadow: 0px 0px 2px rgba(0,0,0,1);
}

</style>