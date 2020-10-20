import imageItemTpl from '../templates/image-item.hbs';
import refs from './refs';

function updatePicsMarkup(pics){
	const markup = imageItemTpl(pics);
	refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default updatePicsMarkup;