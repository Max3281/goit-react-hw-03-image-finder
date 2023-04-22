import * as basicLightbox from 'basiclightbox';

export default function ImageGalleryItem({ data }) {
  const { largeImageURL, webformatURL, tags } = data;
  return (
    <li className="photo-card" onClick={() => getModal(largeImageURL, tags)}>
      <img className="photo-card-img" src={webformatURL} alt={tags} />
    </li>
  );
}

function getModal({ largeImageURL, tags }) {
  console.log(tags);

  const instance = basicLightbox.create(`
  <<div class="overlay">
  <div class="modal">
    <img src="${largeImageURL}" alt="" />
  </div>
</div>
`);

  console.log(instance);
  return instance;
}

// getModal().show();
