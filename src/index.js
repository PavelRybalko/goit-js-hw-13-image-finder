import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import './sass/styles.scss';
import 'material-design-icons/iconfont/material-icons.css';

import LoadMoreBtn from './js/LoadMoreButton';
import refs from './js/refs';
import updatePicsMarkup from './js/update-pics-markup';
import createSearchFormMarkup from './js/createSearchFormMarkup';
import apiService from './js/apiService';

createSearchFormMarkup();
const loadMoreBtn = new LoadMoreBtn({
	selector: 'button[data-action="load-more"]',
	hidden: true,
}); 

const searchFormRef = document.querySelector('form#search-form');
searchFormRef.addEventListener('submit', searchFormSubmitHandler);
loadMoreBtn.refs.button.addEventListener('click', fetchPics);

function searchFormSubmitHandler(event) {
	event.preventDefault();

	const form = event.currentTarget;
	apiService.query = form.elements.query.value;


	clearPicsContainer();
	apiService.resetPage();
	fetchPics();
	form.reset();
};

function fetchPics(){
	loadMoreBtn.disable();
	apiService.fetchPics().then((hits) => {

		if(!hits){
			loadMoreBtn.show();
			loadMoreBtn.noMore()
			return;
		}

		success('Запрос успешно выполнен!');
		updatePicsMarkup(hits);	
		loadMoreBtn.show();
		loadMoreBtn.enable();

		window.scrollTo({
			top: document.documentElement.offsetHeight,
			behavior: 'smooth',
		});

	}).catch(e=>{
		console.log(e)
	});
};

function clearPicsContainer(){
	refs.galleryRef.innerHTML = "";
};

