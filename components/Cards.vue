<template>
	<div class='cards'>
		<a v-for="card in cards" :href="card.id" class='card' :data-color="card.color">
			<h2>{{card.title}}</h2>
		</a>
	</div>
</template>

<style scoped lang='scss'>


</style>

<script>
	export default {
		props: ["cards"],
		head: {
			script: [
				{ src: 'https://cdnjs.cloudflare.com/ajax/libs/trianglify/2.0.0/trianglify.min.js', ssr: false, async: true }
			]
		},
		mounted() {
			function addTriangleTo(target) {
				var dimensions = target.getClientRects()[0];
				var color = target.dataset.color;
				var pattern = Trianglify({
					width: dimensions.width + 2, 
					height: dimensions.height + 2,
					x_colors: color ? color.split(',') : ['#333', '#333', '#333']
				});

				var m = new XMLSerializer().serializeToString(pattern.svg());

				// Perform the base64 encoding of the String
				var k = window.btoa(m);
				target.style['background-image'] = 'url("data:image/svg+xml;base64,' + k + '")';
			}

			for (let card of document.getElementsByClassName("card")) {
				addTriangleTo(card)
			}
		}
	}
</script>


<style>


</style>