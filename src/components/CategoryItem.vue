<template>
	<div>
		<div class="category-wrap " v-for="(item,index) in category">
			<div class="category-name" :class="{active: show}" v-on:click="show=!show">{{item.name}}</div>
			<table class="category-list" v-show="show">
				<tr class="category-list-item" v-for="(good,index) in item.Goods">
					<td>{{good.name}}</td>
					<td class="category-list-item-price" 
						:class="{ norisen : good.price > good.old_price, risen : good.price < good.old_price }" v-if="good.old_price > 0">
						{{good.price}} {{currency}}
					</td>
					<td class="category-list-item-price" v-else>
						{{good.price}} {{currency}}
					</td>
					<td class="td-add ">
						<button  v-if="!cartGoods.find(i => i.id === good.id)" @click="ADD({good: good, quantity: 1})">в корзину</button>
						<span class="" v-else>В корзине</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>	
	import { mapGetters, mapActions } from 'vuex';
	
	export default {
		props: ['category'],
		data() {
			return {
				show: true
			}
		},
		computed: {
			...mapGetters({
				currency:	'goods/CURRENCY_NAME',
				cartGoods:		'cart/CART_GOODS'
			})
		},
		methods: {
			...mapActions("cart", ["ADD"])
		}
	}
</script>