import Vue		from 'vue';
import Vuex		from 'vuex';
import cart		from './modules/cart';
import goods	from './modules/goods';
import goodsall	from './modules/goodsall';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const store = new Vuex.Store({
	modules: {
		cart,
		goods,
		goodsall
	},
	strict: debug
});