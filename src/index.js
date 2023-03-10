import SearchApi from './js/seachmodule';
import createCards from './js/createcards';
import BtnLoadMore from './js/btnloadmore';
import Notiflix from 'notiflix';

const searchApi = new SearchApi();
const btnLoadMore = new BtnLoadMore({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  imgBlock: document.querySelector('.gallery'),
};

async function onClickSubmit(e) {
  refs.imgBlock.innerHTML = '';
  e.preventDefault();
  let inputFindField = e.currentTarget.elements.searchQuery.value.trim();

  if (inputFindField === '') {
    Notiflix.Notify.failure("Fields cann't be empty");
    return;
  }
  btnLoadMore.show();
  searchApi.query = inputFindField;
  searchApi.resetPage();
  addMoreImg();
}

function appendImage(data) {
  refs.imgBlock.insertAdjacentHTML('beforeend', createCards(data));
}

async function addMoreImg() {
  btnLoadMore.disable();
  const resposeData = await searchApi.catchImage();
  const { hits, totalHits, totalPage } = resposeData;
  if (totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  appendImage(hits);
  if (searchApi.page - 1 > totalPage) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    btnLoadMore.hide();
    return;
  }

  btnLoadMore.enable();
}

btnLoadMore.refs.button.addEventListener('click', addMoreImg);
refs.searchForm.addEventListener('submit', onClickSubmit);
