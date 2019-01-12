<!-- <template>
	<section class="section post content">
		<h1>{{post.title}}</h1>
		<time :datetime="Date(post.date)">{{post.date}}</time>
		<div v-html="post.body"></div>
	</section>
</template>

<script>
	import axios from 'axios';
	import moment from 'moment';
	import * as _ from 'lodash';

	export default {
		data() {
			return {
				posts: []
			}
		},
		async asyncData (context) {
			let res = await axios.get(`https://api.tumblr.com/v2/blog/ihun.tumblr.com/posts?api_key=5YiGBDAB7Jr3YnOMEdOjxr8f8MIguZXJVFFw8ktEAvamvd3srf&id=${context.params.id}`);

			console.log(Object.keys(res.data.response.posts))


			return {
				post: res.data.response.posts[0]
			}
		}
	}
</script> -->