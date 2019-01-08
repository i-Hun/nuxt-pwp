<template>
	<section class="calendar-layout layout">
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
