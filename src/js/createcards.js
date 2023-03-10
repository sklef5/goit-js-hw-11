export default function createCards(data) {
  const newCards = data
    .map(item => {
      return `
        <div class="photo-card">
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b><br>${item.likes}
                </p>
                <p class="info-item">
                    <b>Views</b><br>${item.views}
                </p>
                <p class="info-item">
                    <b>Comments</b><br>${item.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b><br>${item.downloads}
                </p>
            </div>
        </div>
    `;
    })
    .join('');
  return newCards;
}
