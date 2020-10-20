import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import './sass/styles.scss';
import 'material-design-icons/iconfont/material-icons.css';

import LoadMoreBtn from './js/LoadMoreButton';
import refs from './js/refs';
import updatePicsMarkup from './js/update-pics-markup';
import searchFormTpl from './templates/search-form.hbs';
import apiService from './js/apiService';


function searchFormMarkup(){
	const markup = searchFormTpl();
	refs.containerRef.insertAdjacentHTML('afterbegin', markup);
}
searchFormMarkup();

const loadMoreBtn = new LoadMoreBtn({

	selector: 'button[data-action="load-more"]',
	hidden: true,
}); 



refs.searchFormRef.addEventListener('submit', searchFormSubmitHandler);
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
	apiService.fetchPics().then(pics => {
		if (!pics) return error('Неверный запрос!');
		updatePicsMarkup(pics);
		loadMoreBtn.show();
		loadMoreBtn.enable();

		window.scrollTo({
			top: document.documentElement.offsetHeight,
			behavior: 'smooth',
		});
		// console.log(document.documentElement.offsetHeight);
		// console.log(document.documentElement.scrollHeight);
	}).catch(e=>console.log(e));
};

function clearPicsContainer(){
	refs.galleryRef.innerHTML = "";
};

