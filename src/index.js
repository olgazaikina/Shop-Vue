import Vue 			from 'vue';
import {store} 		from '../store';
import App 			from './components/App.vue';
import CategoryItem from './components/CategoryItem.vue';
import Cart 		from './components/Cart.vue';
import css 			from './style/style.css';

Vue.component('app', 			App);
Vue.component('categoryItem',	CategoryItem);
Vue.component('cart',			Cart);

var app = new Vue({ el: '#app', store});