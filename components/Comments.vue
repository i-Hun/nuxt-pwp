<template name="comments">
	<div>
	    <div id="disqus_thread"></div>
	    <noscript>Please enable JavaScript to view the comments.</a></noscript>
	</div>
</template>

<script>
	export default {
		name: "comments",
		props: ["pagePath"],
		mounted(){
			var disqus_config = function () {
			  this.page.url = `https://nagornyy.me${this.pagePath}`;
			};

			(function() { // DON'T EDIT BELOW THIS LINE
			  var d = document, s = d.createElement('script');
			  s.src = 'https://nagornyy-me.disqus.com/embed.js';
			  s.setAttribute('data-timestamp', +new Date());
			  (d.head || d.body).appendChild(s);
			})();
		},
	}
</script>

<style scoped>


</style>