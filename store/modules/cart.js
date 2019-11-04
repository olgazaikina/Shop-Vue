const state = {
  items: []
};

const getters = {
	CART_GOODS: (state, getters, rootState) => {
		return state.items.map(({ id, quantity }) => {
			const good = rootState.goods.list.find(good => good.id === id)
				return {
					id: id,
					name: good.name,
					price: good.price,
					stock: good.stock,
					quantity
			}
		});
	},
	TOTAL_PRICE: (state, getters) => {
		return getters.CART_GOODS.reduce((total, good) => {
			return total + good.price * good.quantity
		}, 0).toFixed(2)
	}
};

const actions = {
	ADD: (context, data) => {
		if (data.good.stock > 0) {
			if(getters.CART_GOODS.length == 0){
				context.commit('PUSH_GOOD_TO_CART', { id: data.good.id, quantity: data.quantity });
			}else{
				const cartItem = state.items.find(item => item.id === data.good.id);
				if (!cartItem) {
					context.commit('PUSH_GOOD_TO_CART', { id: data.good.id, quantity: data.quantity });
				} else {
					context.commit('INCREMENT_ITEM_QUANTITY', {id:cartItem.id, quantity: data.quantity, stock: data.good.stock});
				}
			};
		};
	},
	REMOVE: (context, good) => {
		const cartItem = state.items.find(item => item.id === good.id);
		context.commit("REMOVE", cartItem);
	}
};

const mutations = {
	PUSH_GOOD_TO_CART (state, data) {
		state.items.push({
			id: data.id,
			quantity: data.quantity,
		});
	},
	REMOVE (state, item) {
		let index = state.items.indexOf(item);
		if (index > -1) {
			let product = state.items[index];
			state.items.splice(index, 1);
		}
	},
	INCREMENT_ITEM_QUANTITY (state, data) {
		const cartItem = state.items.find(item => item.id === data.id);

		if(data.stock < data.quantity){
			cartItem.quantity = data.stock;
		}else{
			cartItem.quantity = data.quantity;
		};
	},
	SET_CART_ITEMS (state, { items }) {
		state.items = items
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};