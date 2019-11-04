import axios from 'axios';
import oCurrency from '../currency.js';

const state = {
	list: [], //список всех товаров
	list_response: {}, //ответ сервера
	list_view: {}, //массив для вывода 
	url: '',
	currencyRes: 2, //в какую валюту перевести //список в currency.js
	currencyName: 'руб.', // текущая валюта
	mapping: {category_id:'G',price:'C',quntity:'P',good_id:'T'},
	error: false,
	message: 'Error.',
	rows: 2 // количество столбцов при выводе
};
const getters = {
	LIST: state => {
		return state.list;
	},
	LIST_VIEW: state => {
		return state.list_view;
	},
	URL: state => {
		return state.url;
	},
	CURRENCYRES: state => {
		return state.currencyRes;
	},
	CURRENCY_NAME: state => {
		return state.currencyName;
	},
	MESSAGE: state => {
		return state.message;
	},
	ERROR: state => {
		return state.error;
	},
	ROWS: state => {
		return state.rows;
	}
};
const actions = {
	SET_URL: (context, url) => {
		context.commit('SET_URL', url);
	},
	SET_ROWS: (context, rows) => {
		context.commit('SET_ROWS', rows);
	},
	SET_CURRENCYRES: (context, id_currency) => {
		context.commit('SET_CURRENCYRES', id_currency);
	},
	SET_CURRENCY: (context, id_currency) => {
		context.commit('SET_CURRENCY', id_currency);
	},
	MAKE_REQUEST: (context, goodsall_state) => {
		axios
			.get(state.url)
			.then(response => {
				if(response.data.Success){
					context.dispatch('SET_LIST', response.data.Value.Goods);
				}else{
					context.commit('SET_ERROR', true);
					context.commit('SET_MESSAGE', response.data.Error);
				}
			})
			.catch(error => {
				context.commit('SET_ERROR', true);
				context.commit('SET_MESSAGE', error);
			});
	},
	SET_LIST: ({state, commit, rootState, dispatch}, list) => {
		
		var goodsArray = [];
		//
		list.forEach(function(good){
			var categoryId    = good[state.mapping.category_id];
			var categoryIndex = 0;
			var goodPrice     = good[state.mapping.price];
			var goodPriceOld  = 0;
			var goodQuantity  = good[state.mapping.quntity];
			var goodId        = good[state.mapping.good_id];
			
			//проверяем, есть ли данный товар в списке всех товаров
			if(!rootState.goodsall.list[categoryId][rootState.goodsall.mapping.list_goods][goodId]){
				console.log('Товара с id=' + goodId + ' нет в списке');
				return;
			};
			
			var goodName = rootState.goodsall.list[categoryId][rootState.goodsall.mapping.list_goods][goodId][rootState.goodsall.mapping.name_good];
			
			//теперь определяем старую цену
			if(state.list.length > 0){
				var goodPriceOld = state.list.filter((item,i) => item.id === goodId)[0].price;
			};

			//переводим цену в нужную валюту
			var currency = oCurrency.filter(function(el, i){
				return el[state.currencyRes];
			});
			
			if(currency){
				goodPrice = currency[0][state.currencyRes].converter(goodPrice).toFixed(2);
			};
			
			goodsArray.push({
				id:				goodId,
				category_id: 	categoryId,
				name:			goodName,
				stock:			goodQuantity,
				price:			goodPrice,
				old_price:		goodPriceOld,
				unit:			'шт.'
			});
		});
		
		//формируем массив всех товаров
		commit('SET_LIST', goodsArray);
		
		//формируем массив для вывода 
		dispatch('SET_LIST_VIEW', goodsArray);
	},
	SET_LIST_VIEW: ({commit, rootState}, list) => {
		var goodsListView = [];
			
		//получаем список категорий
		var categories = list.map(function(good_,i) {
			return good_['category_id'];
		});
		
		//убираем одинаковые значени
		categories = categories.filter((item, index) => categories.indexOf(item) === index);
		
		categories.forEach(function(category){
			var categoryName = rootState.goodsall.list[category][rootState.goodsall.mapping.name];
			var ttt =  list.filter(good => good['category_id'] === category);
			goodsListView
				.push(
					{[category]:
						{
							name: categoryName,
							Goods: list.filter(good => good['category_id'] === category)
						}
					}
				);
		});
			
		var rowsArray = [];
		var stap = Math.ceil(goodsListView.length / state.rows);
		
		// Разбиваем вывод на столбцы
		if(state.rows < 1 && stap < 1){
			stap = goodsListView.length;
		};
		for ( var i = 0; i < goodsListView.length; i += stap  ){
			rowsArray.push(goodsListView.slice(i,i + stap));
		};
		
		commit('SET_LIST_VIEW', rowsArray);
	}
};
const mutations = {
	SET_LIST: (state, list) => {
		state.list = list;
	},
	SET_LIST_RESPONSE: (state, list) => {
		state.list_response = list;
	},
	SET_LIST_VIEW: (state, list) => {
		state.list_view = list;
	},
	SET_URL: (state, url) => {
		state.url = url;
	},
	SET_CURRENCYRES: (state, id_currency) => {
		state.currencyRes = id_currency;
	},
	SET_CURRENCY: (state, id_currency) => {
		state.currency = id_currency;
	},
	SET_MESSAGE: (state, message) => {
		state.message = message;
	},
	SET_ERROR: (state, error) => {
		state.error = error;
	},
	SET_ROWS: (state, rows) => {
		state.rows = rows;
	},
	DECREMENT_GOOD_QUANTITY (state, { id }) {
		const good = state.list.find(product => product.id === id)
		good.quantity--
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};