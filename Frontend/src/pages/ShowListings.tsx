import { PropertyCard, Loader } from '../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Define the Property type
interface Property {
    _id: string;
    email: string;
    imageName: string[];
    name: string;
    address: string;
    price: string;
    action: string;
    phone: string;
    whatsapp: string;
    telegram: string;
}

const ShowListings = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLoading = useSelector((state: RootState) => state.user.loading);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [listings, setListings] = useState([]); // State for fetched listings
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const listingsPerPage = window.innerWidth >= 1024 ? 20 : window.innerWidth >= 768 ? 15 : 10; // Maximum listings per page

  useEffect(() => {
    if (isLoading) {
      <Loader />;
    } else if (!user) {
      navigate('/signin');
    } else {
      fetchListings();
    }
  }, [isLoading, user, navigate, currentPage]);

  const fetchListings = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/fetch-listings?page=${currentPage}&limit=${listingsPerPage}&email=${user?.email}`);
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings);
        console.log(data.listings);
        setTotalPages(Math.ceil(data.totalListings / listingsPerPage));
      } else {
        console.error('Error:', res.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Show Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((property: Property) => (
          <PropertyCard
            key={property._id}
            id={String(property._id)}
            email={property.email}
            image={`https://raw.githubusercontent.com/neerajsharma684/Real_Estate_Marketplace/main/images/${property.imageName[0]}`} // fetch image from github
            name={property.name}
            address={property.address}
            price={property.price}
            action={property.action}
            currentUser={user?.email ?? ''} // Provide a default empty string if user email is undefined
            agentPhone={property.phone}
            agentWhatsapp={property.whatsapp}
            agentEmail={property.email}
            agentTelegram={property.telegram}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleClick(pageNumber)}
            className={`mx-1 px-4 py-2 border rounded ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowListings;
