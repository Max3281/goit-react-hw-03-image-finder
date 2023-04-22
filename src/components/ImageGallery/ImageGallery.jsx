import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ data }) {
  // console.log(data);
  return (
    <ul className="gallery">
      {data.map(item => {
        return <ImageGalleryItem key={item.id} data={item} />;
      })}
    </ul>
  );
}
