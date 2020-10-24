import { alert, notice, info, success, error } from '@pnotify/core';
const apiKey = '18705092-a3d0db19a14bd823df17dac7b';

export default {
	searchQuery: '',
	page: 1,
	fetchPics(){
		 const url = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12`;

		return fetch(url)
		.then(res => res.json())
		.then(({hits, total}) => {
			const loadCount = Math.ceil(total/12);
		
			if(!hits){
				error('Сделайте более специфичный запрос!');
				return;
			}

			if(total>0 && loadCount < this.page){
				error('Это все результаты по вашему запросу!');
				return;
			}

			this.incrementPage();
			return hits;
		})
		.catch(console.log);
	},
	resetPage() {
		this.page = 1;
	},
	incrementPage() {
		this.page += 1;
	},
	get query() {
		return this.searchQuery;
	},
	set query(value) {
		this.searchQuery = value;
	},
}