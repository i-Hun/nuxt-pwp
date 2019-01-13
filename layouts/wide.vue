<template>
	<section class="wide-layout layout">
		<Navbar/>
		<nuxt />
	</section>
</template>

<script>
	import Navbar from "@/components/Navbar.vue"

	export default {
	  components: {
	    Navbar
	  }
	};
</script>
