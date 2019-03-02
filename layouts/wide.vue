<template>
	<section class="wide-layout layout">
		<div class="container is-fluid">
			<Navbar/>
			<div class="bd-lead">
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
