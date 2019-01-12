<!-- <template>
	<section class="section posts content">
		<ul>
			<li v-for="post in posts">
				<a :href="post.id">{{post.title}}</a>
			</li>
		</ul>	
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
			let res = await axios.get(`https://api.tumblr.com/v2/blog/ihun.tumblr.com/posts?api_key=5YiGBDAB7Jr3YnOMEdOjxr8f8MIguZXJVFFw8ktEAvamvd3srf`);


			return {
				posts: res.data.response.posts
			}
		}
	}
</script> -->