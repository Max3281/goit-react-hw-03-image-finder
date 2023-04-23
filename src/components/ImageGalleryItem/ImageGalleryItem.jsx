// import * as basicLightbox from 'basiclightbox';
// import { Modal } from 'components/Modal/Modal';

export default function ImageGalleryItem({ data }) {
  const { webformatURL, tags } = data;

  return (
    <li className="photo-card">
      <img className="photo-card-img" src={webformatURL} alt={tags} />
    </li>
  );
}
