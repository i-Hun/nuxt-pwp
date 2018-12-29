<template>
	<section class="default-layout">
		<Navbar/>
		<div class="container">
			<div class="content">
				<nuxt />
			</div>
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
