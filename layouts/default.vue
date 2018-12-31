<template>
	<section class="default-layout">
		<div class="container">
			<Navbar/>
			<nuxt />
		</div>
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
