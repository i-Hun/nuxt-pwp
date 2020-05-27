<template>
	<div class="cards">
		<div class="tile is-ancestor">
			<div class='tile is-vertical is-12'>
				<div :class="`tile is-${12 * cardsTuple.length / inRow}`" v-for="cardsTuple in formatedCards">
					<Card :card="card" :key="card.id" v-for="card in cardsTuple" :size="size"></Card>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang='scss'>

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
			},
			size: {
				default: "1",
				type: String
			}
		},
		computed: {
			formatedCards: function () {
				const inRow = parseInt(this.inRow);
				return this.cards.reduce(function(result, value, index, array) {
					if (index % inRow === 0) {
						const slice = array.slice(index, index + inRow);
						result.push(slice);
					}
					return result;
				}, []);
			}
		},
		mounted() {
			// if (Trianglify) {
			// 	function addTriangleTo(target) {
			// 		var dimensions = target.getClientRects()[0];
			// 		var color = target.dataset.color;
			// 		var pattern = Trianglify({
			// 			width: dimensions.width + 2, 
			// 			height: dimensions.height + 2,
			// 			x_colors: color ? color.split(',') : ['#333', '#333', '#333'],
			// 		});

			// 		var m = new XMLSerializer().serializeToString(pattern.svg());

			// 		// Perform the base64 encoding of the String
			// 		var k = window.btoa(m);
			// 		target.style['background'] = 'url("data:image/svg+xml;base64,' + k + '")';
			// 	}

			// 	for (let card of document.getElementsByClassName("card")) {
			// 		addTriangleTo(card)
			// 	}
			// } else {
			// 	console.error("Trianglify did not load")
			// }
			let cards = document.getElementsByClassName("card");

			Array.from(cards).forEach(function(card) {
				let bg = card.getElementsByClassName("card-background")[0]
				card.addEventListener("mouseenter", function(event) {   
					console.log(event);
					bg.style.filter = "blur(0px) brightness(1)";
				});

				card.addEventListener("mouseleave", function(event) {   
					console.log(event);
					bg.style.filter = "blur(2px) brightness(0.9)";
				});
			});
		}
	}
</script>

