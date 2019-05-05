<template>
	<section>
		<div class="container is-fluid">
		<Navbar/>
		</div>
		<nuxt />
	</section>
</template>

<style scoped>
nav {
	margin-bottom: -3.25rem;
    z-index: 2000;
}
.navbar {
	background-color: transparent;
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
