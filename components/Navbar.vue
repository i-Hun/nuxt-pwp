<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<nuxt-link class="navbar-item" to="/" active-class="is-active">Oleg Nagornyy</nuxt-link>
		<nuxt-link class="navbar-item" to="/data-science/" active-class="is-active">Data Science</nuxt-link>
		<nuxt-link class="navbar-item" to="/intro2python/" active-class="is-active">Introduction to Python</nuxt-link>
		<nuxt-link class="navbar-item" to="/events/" active-class="is-active">Events</nuxt-link>
	</nav>
</template>

<style>
	.navbar-item {
		margin-right: 20px;
	}
	.is-active {
		font-weight: 700;
	}
</style>