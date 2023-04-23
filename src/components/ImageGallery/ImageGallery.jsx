import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ data, onClick }) {
  return (
    <ul className="gallery" onClick={e => onClick(e)}>
      {data.map(item => {
        return <ImageGalleryItem key={item.id} data={item} />;
      })}
    </ul>
  );
}
