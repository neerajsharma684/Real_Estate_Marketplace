import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaWhatsapp, FaTelegram } from "react-icons/fa";

type PropertyCardProps = {
  id: string;
  email: string;
  image: string;
  name: string;
  address: string;
  price: string;
  action: string;
  currentUser: string;
  agentPhone: string;
  agentWhatsapp: string;
  agentEmail: string;
  agentTelegram: string;
  bedrooms: number;
  bathrooms: number;
  kitchens: number;
  halls: number;
  four_wheeler_parking: number;
  two_wheeler_parking: number;
};

const PropertyCard = ({
  id,
  email,
  image,
  name,
  address,
  price,
  action,
  currentUser,
  agentPhone,
  agentWhatsapp,
  agentEmail,
  agentTelegram,
  bedrooms,
  bathrooms,
  kitchens,
  halls,
  four_wheeler_parking,
  two_wheeler_parking,
}: PropertyCardProps) => {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isAdmin = email === currentUser;

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    // Implement the delete logic here
    try {
      const response = await fetch(`http://localhost:3000/api/delete-listing/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log(`Property with ID: ${id} deleted successfully`);
        setShowDeleteModal(false);
        window.location.reload();
      } else {
        console.error(`Failed to delete property with ID: ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting property with ID: ${id}`, error);
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const adminButtons = () => {
    return (
      <div className="flex flex-row gap-2">
        <Link to={`/property-edit/${id}`} className="rounded-lg w-full">
          <button className="bg-blue-500 text-white p-2 rounded-lg w-full mb-2">
            Edit
          </button>
        </Link>
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 text-white p-2 rounded-lg w-full mb-2"
        >
          Delete
        </button>
      </div>
    );
  };

  // WhatsApp, Telegram, Call, and Gmail links with dynamic property ID
  const whatsappLink = `https://wa.me/${agentWhatsapp}?text=${encodeURIComponent(
    `Hello, I'm interested in the property with ID: ${id}. Please provide more details.`
  )}`;
  const telegramLink = `https://t.me/${agentTelegram}?text=${encodeURIComponent(
    `Hello, I'm interested in the property with ID: ${id}. Please provide more details.`
  )}`;
  const callLink = `tel:${agentPhone}`;
  const emailLink = `mailto:${agentEmail}?subject=Property Inquiry&body=${encodeURIComponent(
    `Hello, I'm interested in the property with ID: ${id}. Please provide more details.`
  )}`;

  const handleContactClick = () => {
    setShowContactOptions(!showContactOptions);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm transition-transform transform hover:scale-105 hover:shadow-xl">
      <Link to={`/property/${id}`} className="rounded-lg w-full">
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
          <p className="text-xl font-semibold">₹{Number(price).toLocaleString('en-IN')}</p>
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-between text-gray-600">
          <p className="flex items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/bedroom.png"
              alt="Bedroom Icon"
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-900 font-bold mr-1">{bedrooms}</span> Bedrooms
          </p>
          <p className="flex items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/shower.png"
              alt="Bathroom Icon"
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-900 font-bold mr-1">{bathrooms}</span> Bathrooms
          </p>
        </div>
        <div className="p-4 border-gray-200 flex justify-between text-gray-600">
          <p className="flex items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/living-room.png"
              alt="Bedroom Icon"
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-900 font-bold mr-1">{halls}</span> Halls
          </p>
          <p className="flex items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/kitchen.png"
              alt="Bathroom Icon"
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-900 font-bold mr-1">{kitchens}</span> Kitchens
          </p>
        </div>
        <div className="p-4 border-gray-200 flex justify-between text-gray-600">
          <p className="flex items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/car.png"
              alt="Bedroom Icon"
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-900 font-bold mr-1">{four_wheeler_parking}</span> Parking
          </p>
          <p className="flex items-center">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/motorcycle.png"
              alt="Bathroom Icon"
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-900 font-bold mr-1">{two_wheeler_parking}</span> Parking
          </p>
        </div>
      </Link>

      {/* Contact Agent Button to Toggle Options */}
      <button
        onClick={handleContactClick}
        className="bg-green-500 text-white p-2 rounded-lg w-full mb-2"
      >
        Contact Agent
      </button>

      {/* Display Contact Options if Button Clicked */}
      {showContactOptions && (
        <div className="flex flex-col gap-2 p-4 w-full items-center">
          <a href={callLink} className="text-blue-500 hover:underline">
            <button
              type="button"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              className="mb-2 flex rounded justify-center bg-black px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            >
              <span className="me-2">
                <FaPhone className="h-4 w-4" />
              </span>
              Call
            </button>
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            <button
              type="button"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              className="mb-2 flex rounded justify-center bg-green-500 px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            >
              <span className="me-2">
                <FaWhatsapp className="h-4 w-4" />
              </span>
              WhatsApp
            </button>
          </a>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            <button
              type="button"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              className="mb-2 flex rounded w-full justify-center bg-blue-500 px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            >
              <span className="me-2">
                <FaTelegram className="h-4 w-4" />
              </span>
              Telegram
            </button>
          </a>
          <a href={emailLink} className="text-red-500 hover:underline">
            <button
              type="button"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              className="mb-2 flex rounded w-full justify-center bg-red-500 px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
            >
              <span className="me-2">
                <FaEnvelope className="h-4 w-4" />
              </span>
              Mail
            </button>
          </a>
        </div>
      )}

      {isAdmin ? adminButtons() : null}
      <div className="absolute top-4 right-4 bg-blue-500 text-white text-sm font-semibold py-1 px-2 rounded-full">
        For {action}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this listing?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 p-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;