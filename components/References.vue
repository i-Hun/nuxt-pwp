<template name="references">
	<div class="references">
		<h2 id="references">References</h2>
		<ol>
			<li class="reference" v-html="reference.data" v-for='reference in references' :id="'ref-'+reference.order"></li>
		</ol>
	</div>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import * as _ from 'lodash';
	export default {
		name: "references",
		props: ["references"],
	}
</script>

<style scoped>


</style>