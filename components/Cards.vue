<template>
	<div class='cards'>
		<a :href="card.path" v-for="card in cards" :style="`width:${100/inRow}%;`">
			<Card :card="card"></Card>
		</a>
	</div>
</template>

<style scoped lang='scss'>
.cards {
	& > a {
		width: 33%;
	}
}

</style>

<script>
	import Card from "@/components/Card.vue";
	export default {
		components: {
			Card
		},
		props: {
			cards: {
				default: () => [],
				type: Array
			},
			inRow: {
				default: "3",
				type: String
			}
		},
		mounted() {
			if (Trianglify) {
				function addTriangleTo(target) {
					var dimensions = target.getClientRects()[0];
					var color = target.dataset.color;
					var pattern = Trianglify({
						width: dimensions.width + 2, 
						height: dimensions.height + 2,
						x_colors: color ? color.split(',') : ['#333', '#333', '#333'],
					});

					var m = new XMLSerializer().serializeToString(pattern.svg());

					// Perform the base64 encoding of the String
					var k = window.btoa(m);
					target.style['background'] = 'url("data:image/svg+xml;base64,' + k + '")';
				}

				for (let card of document.getElementsByClassName("card")) {
					addTriangleTo(card)
				}
			} else {
				console.error("Trianglify did not load")
			}
		}
	}
</script>


<style scoped lang='scss'>

</style>