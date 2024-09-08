import { PropertyCard } from '../components';

const ShowListings = () => {
  const properties = [
    {
      id: 1,
      image: 'https://thumbor.forbes.com/thumbor/660x336/https://www.forbes.com/advisor/wp-content/uploads/2024/08/7.jpg',
      name: 'Beautiful Family House',
      address: '123 Main Street, Anytown, USA',
      price: '$500,000',
      action: 'Sell'
    },
    {
      id: 2,
      image: 'https://prod.rockmedialibrary.com/api/public/content/ff061825fa8e44bf8108de5c786c0062?v=4c4f7c7a',
      name: 'Modern Apartment',
      address: '456 Oak Avenue, Anytown, USA',
      price: '$300,000',
      action: 'Lease'
    },
    // Add more properties as needed
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Show Listings</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          image={property.image}
          name={property.name}
          address={property.address}
          price={property.price}
          action={property.action}
        />
      ))}
    </div>
  </div>
  );
};

export default ShowListings;
