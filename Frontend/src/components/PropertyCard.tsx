type PropertyCardProps = {
  image: string;
  name: string;
  address: string;
  price: string;
  action: string;
};

const PropertyCard = ({
  image,
  name,
  address,
  price,
  action,
}: PropertyCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50"></div>
        <div className="absolute top-4 right-4">
          <svg
            className="h-6 w-6 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z" />
          </svg>
        </div>
      </div>
      <div className="p-4 text-gray-800">
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-lg mb-1">{address}</p>
        <p className="text-xl font-semibold">{price}</p>
      </div>
      <div className="p-4 border-t border-gray-200 flex justify-between text-gray-600">
        <p className="flex items-center">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/bedroom.png"
            alt="Bedroom Icon"
            className="w-6 h-6 mr-2"
          />
          <span className="text-gray-900 font-bold mr-1">3</span> Bedrooms
        </p>
        <p className="flex items-center">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/shower.png"
            alt="Bathroom Icon"
            className="w-6 h-6 mr-2"
          />
          <span className="text-gray-900 font-bold mr-1">2</span> Bathrooms
        </p>
      </div>
      {/* Add buttons here */}
      <div className="absolute top-4 right-4 bg-blue-500 text-white text-sm font-semibold py-1 px-2 rounded-full">
        For {action}
      </div>
    </div>
  );
};

export default PropertyCard;
