<template>
	<section class="default-layout layout">
		<div class="container is-fluid">
			<Navbar/>
		</div>
		<div class="container narrow is-fluid">
			<div class="bd-lead">
				<nuxt />
			</div>
		</div>
	</section>
</template>

<style scoped>
.narrow {
	max-width: 850px;
}
</style>

<script>
	import Navbar from "@/components/Navbar.vue"

	export default {
	  components: {
	    Navbar
	  }
	};
</script>
