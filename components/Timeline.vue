<template>
<div class="timeline">
	<ul>
		<li>
			<nuxt-link class="navbar-item" :to="localePath('index')" active-class="is-active">2019-{{$t("now")}}</nuxt-link>
		</li>
		<div class="timeline-arrow">↑</div>
		<li>
			<nuxt-link class="navbar-item" :to="localePath('2015-2019')" active-class="is-active">2015-2019</nuxt-link>
		</li>
		<div class="timeline-arrow">↑</div>
		<li>
			<nuxt-link class="navbar-item" :to="localePath('2010-2015')" active-class="is-active">2010-2015</nuxt-link>
		</li>
	</ul>
</div>
</template>

<script>

	export default {
		name: "Timeline",
	}
</script>

<style lang='scss'>

.timeline {
	display: flex;
	justify-content: center;
	margin-top: 2rem;
	font-weight: 900;
	a {
		color: rgba(0,0,0,0.3);
	}

	.timeline-arrow {
		text-align: center;
		font-weight: 300;
	}
	
}
</style>