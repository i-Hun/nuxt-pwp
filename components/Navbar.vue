<template>
<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item logo" href="/" active-class="is-active" v-if="$nuxt.$route.path !== '/'">{{$t("profile.fullName")}}</a>
		<span class="navbar-item logo" v-else>{{$t("profile.fullName")}}</span>

		<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
			<span aria-hidden="true"></span>
		</a>
	</div>

	<div id="navbarBasicExample" class="navbar-menu">
		<div class="navbar-start">
			<nuxt-link class="navbar-item" :to="localePath('courses')" active-class="is-active">{{$t("courses")}}</nuxt-link>
			<a class="navbar-item" :href="localePath('travel')" active-class="is-active">{{$t("travel")}}</a>
			<nuxt-link class="navbar-item" :to="localePath('events')" active-class="is-active">{{$t("events")}}</nuxt-link>
			<a class="navbar-item" :href="localePath('blog')" active-class="is-active">{{$t("blog.title")}}</a>
			<a class="navbar-item" :href="localePath('likes')" active-class="is-active">{{$t("likes.title")}}</a>			
		</div>
		<div class="navbar-end">
			<nuxt-link class="navbar-item language"
				v-for="locale in availableLocales"
				:key="locale.code"
				:to="switchLocalePath(locale.code)">{{ locale.name }}
			</nuxt-link>
		</div>
	</div>
</nav>
</template>

<style scoped>
	.language {
		/*font-size: 1.6rem;*/
	}
	.is-active {
		font-weight: 700;
	}
	.logo {
		font-weight: 700;
	}
</style>

<script>
	export default {
		mounted () {
			// Get all "navbar-burger" elements
			const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

			// Check if there are any navbar burgers
			if ($navbarBurgers.length > 0) {

				// Add a click event on each of them
				$navbarBurgers.forEach( el => {
					el.addEventListener('click', () => {

						// Get the target from the "data-target" attribute
						const target = el.dataset.target;
						const $target = document.getElementById(target);

						// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
						el.classList.toggle('is-active');
						$target.classList.toggle('is-active');

					});
				});
			}
		},
		computed: {
			availableLocales () {
				return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
			}
		}
	}
</script>