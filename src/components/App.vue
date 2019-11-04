<template>
	<div>
		<div class="error" v-if="error">
			{{message}}
		</div>
		<div class="row" v-else>
			<div class="col-6" v-for="row in goods">
				<categoryItem :category="category" v-for="(category,index) in row" :key="index"></categoryItem>
			</div>
		</div>
		<cart></cart>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapActions, vuex } from 'vuex';
	
	export default {
		data() {
			return {
				goodsDataURL:	"/store/data.json", //url запроса
			}
		},
		computed: {
			...mapGetters({
				goods:		'goods/LIST_VIEW',
				error:		'goods/ERROR',
				message:	'goods/MESSAGE'
			})
		},
		created: function(){
			this.SET_URL(this.goodsDataURL);
		},
		mounted: function(){
			this.MAKE_REQUEST();
			setInterval(
				this.MAKE_REQUEST, 
				15000
			);
		},
		methods: {
			...mapActions("goodsall",	["SET_LIST"]), 
			...mapActions("goods",		["SET_URL"]), 
			...mapActions("goods",		["MAKE_REQUEST"])
		}
	}
</script>