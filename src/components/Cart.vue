<template>
	<div class="clearfix pd-hr-15" v-if="goods.length > 0">
		<table class="cart">
			<tr>
				<th>Наименование товара и описание</th>
				<th class="cart-item-price">Цена</th>
				<th class="quantity">Количество</th>
				<th class="events"></th>
			</tr>
			<tr class="cart-item" v-for="good in goods">
				<td>{{good.name}}</td>
				<td>{{good.price}} {{currency}}</td>
				<td class="cart-item-quantity">
					<input 
						type="number" 
						name="quantity" 
						:value="good.quantity"
						:max="good.stock"
						@change="ADD({good:good, quantity:$event.target.value})"
					>
					<span class="quantity-info">Количество ограничено!</span>
				</td>
				<td class="right-text cart-item-btn">
					<button class="remove" @click="REMOVE(good)">Удалить</button>
				</td>
			</tr>
			<tr>
				<td colspan="4" class="right-text">
					Общая стоимость: <span class="total">{{total}} руб.</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';	
	
	export default {
		data() {
			return {
				quantity: 1
			}
		},
		computed: {
			...mapGetters({
				goods:	'cart/CART_GOODS',
				total:	'cart/TOTAL_PRICE',
				currency: 'goods/CURRENCY_NAME'
			})
		},
		methods: {
			...mapActions("cart", ["REMOVE"]),
			...mapActions("cart", ["ADD"])
		}
	}
</script>