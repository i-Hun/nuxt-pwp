<template name="references">
		<ol class="references">
			<li class="reference" v-for="reference in references">
				{{reference}}
			</li>
		</ol>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import * as _ from 'lodash';
	export default {
		name: "references",
		props: ["referencesUrls"],
		data() {
			return {
				references: [],
				isLoading: true
			}
		},
		created() {
			console.log("referencesUrls", this.referencesUrls)

			//https://www.zotero.org/api/users/2770884/items?format=bib&itemKey=3SC2MMC4%2C6BHIS9Z4&style=apa&linkwrap=1

			//https://www.zotero.org/api/users/2770884/items/3SC2MMC4

			// let promises = Object.entries(this.referencesUrls).map(ref => {
			// 	let url = ref[0];
			// 	let order = ref[1];

			// 	let refId = url.split('/')[url.split('/').length-1];

			// 	console.log(url, refId)

			// 	return axios.get('https://www.zotero.org/api/users/2770884/items/' + refId)
			// 	.then(response => {
			// 		console.log(response.data);
			// 		return {"order": order, "data": response.data};
			// 	})
			// 	.catch(e => {
			// 		console.error(e);
			// 	})
			// })
			// axios.all(promises).then(function(results) {
			// 	console.log("results", results)
			//     this.references = results;
			// });

			this.references = [1, 2, 4]
		},

	}
</script>

<style scoped>


</style>