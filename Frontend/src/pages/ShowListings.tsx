import { PropertyCard, Loader } from '../components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ShowListings = () => {

  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLoading = useSelector((state: RootState) => state.user.loading);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isLoading) {
  //     <Loader />;
  //   } else if (!user) {
  //     navigate("/signin");
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       oldEmail: user.email,
  //       email: user.email,
  //     }));
  //   }
  // }, [isLoading, navigate]);

  const properties = [
    {
      id: 1,
      email: 'test@email.com',
      image: 'https://thumbor.forbes.com/thumbor/660x336/https://www.forbes.com/advisor/wp-content/uploads/2024/08/7.jpg',
      name: 'Beautiful Family House',
      address: '123 Main Street, Anytown, USA',
      price: '500,000',
      action: 'Sell',
      currentUser: 'test@email.com',
      phone: '1234567890',
      telegram: '123',
    },
    {
      id: 2,
      email: 'test@email.com',
      image: 'https://prod.rockmedialibrary.com/api/public/content/ff061825fa8e44bf8108de5c786c0062?v=4c4f7c7a',
      name: 'Modern Apartment',
      address: '456 Oak Avenue, Anytown, USA',
      price: '300,000',
      action: 'Lease',
      currentUser: 'test@email.com',
      phone: '1234567890',
      telegram: '123',
    },
    {
      id: 3,
      email: 'test123@email.com',
      image: 'https://www.usnews.com/object/image/00000159-993d-d405-a9d9-dbbdb1000000/170113-luxuryhome-stock.jpg?update-time=1484334727719&size=responsive640',
      name: 'Modern Apartment',
      address: '456 Oak Avenue, Anytown, USA',
      price: '900,000',
      action: 'Lease',
      currentUser: 'test@email.com',
      phone: '1234567890',
      telegram: '123',
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
          id={String(property.id)}
          email={property.email}
          image={property.image}
          name={property.name}
          address={property.address}
          price={property.price}
          action={property.action}
          currentUser={property.currentUser}
          agentPhone={property.phone}
          agentEmail={property.email}
          agentTelegram={property.telegram}

          />
      ))}
    </div>
  </div>
  );
};

export default ShowListings;
