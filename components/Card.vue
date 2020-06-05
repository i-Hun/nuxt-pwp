<template>
	<div class="tile is-parent">	
		<a
			:href="card.path" :class="`card tile is-child ${card.thumbnail ? 'has-thumbnail' : ''}`"
			:data-color="card.color || [100, 100, 100]"
			:style="cssVars"
			:id="card.id"
		>
			<div class="card-content">
				<h2 class="title">{{card.title}}</h2>
				<div class="description" v-if='card.description'>
					{{card.description}}
				</div>
<!-- 			<div class="top-right">
				<div v-if="card.elements" class="counter"><strong>{{card.elements.length}}</strong> items</div>
				<div class="lang" v-if="card.lang === 'ru'">🇷🇺</div>
				<div class="lang" v-if="card.lang === 'en'">🇬🇧</div>
			</div> -->
			</div>
		</a>
	</div>
</template>

<script>
	var randomColor = require('randomcolor');
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
			cssVars() {
				let minheight = null;
				if (this.size === "2") {
					minheight = "300px"
				} else{
					minheight = "0px"
				}

				let bgimg = null;
				if (this.card.thumbnail) {
					bgimg = `url("/img/thumbnails/${this.card.thumbnail}")`
				} else {
					if (this.card.color) {
						bgimg = `linear-gradient(140deg, ${this.card.color[0]} 0%, ${this.card.color[1]} 50%, ${this.card.color[2]} 100%)`;
					} else {
						const color = randomColor({
							count: 3,
							hue: 'monochrome',
							luminosity: 'dark'
						})
						bgimg =`linear-gradient(140deg, ${color[0]} 0%, ${color[1]} 50%, ${color[2]} 100%)`
					}
				}
				return {
					'--bgimg': bgimg,
					'--minheight': minheight,
				}
			}
		},
	}
</script>


<style scoped lang='scss'>
.card {
	box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	transition: .3s ease-out, transform .2s ease-out;
	position: relative;
	text-shadow: 0 0 1px rgba(0,0,0,0.4);
	background-image: var(--bgimg);
	background-size: cover;
	background-position: center center;
	
}
.card-content {
	position: relative;
}

a.card:hover::before {
	filter: grayscale(0%) blur(0px);
}

a.card:hover {
	color: #fff;
	box-shadow: 0 0 1rem rgba(0,0,0,.8);
	transform: scale(1.02);
}

.card:visited {
	color: #fff;
}

.card:link {
	color: #fff;
}

.card::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: filter .2s linear;
	filter: grayscale(20%) blur(8px);
	min-height: var(--minheight);
	background-image: var(--bgimg);
	background-size: cover;
	background-position: center center;
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