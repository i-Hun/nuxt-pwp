<template name="references">
	<div v-if="references && references.length" class="references content">
		<h2 id="references" >References</h2>
		<ol>
			<li class="reference" v-html="reference.data" v-for='reference in references' :id="'ref-'+reference.order"></li>
		</ol>
	</div>
</template>

<script>
	export default {
		name: "references",
		props: ["references"],
	}
</script>

<style scoped>
.references {
	margin-top: 3rem;
}

</style>