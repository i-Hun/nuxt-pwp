<template name="comments">
	<div class="comments">
		<h2 id="comments">Comments</h2>
		<div class="comments-shown" v-if="isShowComments">
			<div id="disqus_thread"></div>
			<noscript>Please enable JavaScript to view the comments.</a></noscript>
		</div>
		<div class="comments-hiden" v-else>
			<button v-on:click="showComments">Show Comments</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "comments",
		props: ["pagePath"],
		data() {
			return {
				isShowComments: false,
			}
		},
		methods: {
			showComments: function() {
				this.isShowComments = true;

				var disqus_config = function () {
				  this.page.url = `https://nagornyy.me${this.pagePath}`;
				};

				(function() { // DON'T EDIT BELOW THIS LINE
				  var d = document, s = d.createElement('script');
				  s.src = 'https://nagornyy-me.disqus.com/embed.js';
				  s.setAttribute('data-timestamp', +new Date());
				  (d.head || d.body).appendChild(s);
				})();
			}
		}
	}
</script>

<style scoped>
	.comments {
		margin-top: 3rem;
		margin-bottom: 2rem;
	}
</style>