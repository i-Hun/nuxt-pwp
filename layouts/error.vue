<template>
	<div class="container">
		<h1 v-if="error.statusCode === 404">Page not found</h1>
		<h1 v-else>Error</h1>
		<div><nuxt-link to="/">Go to main</nuxt-link> or <button onclick="javascript:window.history.back();">go back</button></div>
	</div>
</template>

<script>
export default {
	props: ['error']
}
</script>