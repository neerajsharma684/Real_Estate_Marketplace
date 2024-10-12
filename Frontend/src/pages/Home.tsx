import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { PropertyCard, Loader } from '../components'; // Assuming PropertyCard and Loader are available
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Home = () => {
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
    bedrooms: number;
    bathrooms: number;
    kitchens: number;
    halls: number;
    four_wheeler_parking: number;
    two_wheeler_parking: number;
  }

  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLoading = useSelector((state: RootState) => state.user.loading);
  const [currentPage, setCurrentPage] = useState(1);
  const [listings, setListings] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const listingsPerPage = window.innerWidth >= 1024 ? 20 : window.innerWidth >= 768 ? 15 : 10;

  useEffect(() => {
    if (isLoading) {
      <Loader />;
    } else {
      fetchListings();
    }
  }, [isLoading, currentPage]);

  const fetchListings = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/fetch-all-listings?page=${currentPage}&limit=${listingsPerPage}`);
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
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Neeraj Estate is the best place to find your next perfect place to
          live or invest.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* Listings */}
      <div className="example-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((property: Property) => (
          <div key={property._id}>
            <PropertyCard
              id={String(property._id)}
              email={property.email}
              image={`https://raw.githubusercontent.com/neerajsharma684/Real_Estate_Marketplace/main/images/${property.imageName[0]}`}
              name={property.name}
              address={property.address}
              price={property.price}
              action={property.action}
              currentUser={user?.email ?? ''}
              agentPhone={property.phone}
              agentWhatsapp={property.whatsapp}
              agentEmail={property.email}
              agentTelegram={property.telegram}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              kitchens={property.kitchens}
              halls={property.halls}
              four_wheeler_parking={property.four_wheeler_parking}
              two_wheeler_parking={property.two_wheeler_parking}
            />
          </div>
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
}

export default Home;
