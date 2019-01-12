<template>
	<div class="container">
		<h1 v-if="error.statusCode === 404">Page not found</h1>
		<h1 v-else>Error</h1>
		<nuxt-link to="/">Go to main</nuxt-link>
	</div>
</template>

<script>
export default {
	props: ['error']
}
</script>