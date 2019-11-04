import store from '../names.js';

const state = {
  list: store,
  mapping: {name:'G',list_goods:'B',name_good:'N'}
};

const getters = {
	LIST: state => {
		return state.list;
	},
	MAPPING: state => {
		return state.mapping;
	}
};

const actions = {
	SET_LIST: (context, list) => {
		context.commit('SET_LIST', list);
	}
};

const mutations = {
	SET_LIST: (state, list) => {
		state.list = list;
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}