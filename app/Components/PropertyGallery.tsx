type PropertyGalleryProps = {
  images: string[];
};

export default function PropertyGallery({
  images,
}: PropertyGalleryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Property image ${index + 1}`}
          className={`h-64 w-full rounded-xl object-cover ${
            index === 0 ? "md:col-span-2 md:row-span-2 h-full" : ""
          }`}
        />
      ))}

    </div>
  );
}