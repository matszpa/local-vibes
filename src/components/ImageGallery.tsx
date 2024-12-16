import React, {useState} from "react";

interface ImageGalleryProps {
    images: Array<{ url: string }>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleChange = (direction: "prev" | "next") => {
        setCurrentIndex((prevIndex) => {
                if (direction === 'prev') {
                    return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
                } else {
                    return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
                }
            }
        );
    }
    if (images.length === 0) {
        return (
            <div className="h-96 w-full flex items-center justify-center bg-gray-200">
                <span>No photos to display</span>
            </div>
        );
    }

    return (
        <div className="relative h-96 w-full overflow-hidden bg-black">
            <img
                src={images[currentIndex].url || "/placeholder-image.jpg"}
                alt={`photo ${currentIndex + 1}`}
                className="h-full w-full object-cover"
            />

            <button
                onClick={() => handleChange('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75"
            >
                ◀
            </button>

            <button
                onClick={() => handleChange('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75"
            >
                ▶
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                            index === currentIndex ? "bg-green-400" : "bg-gray-400"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
