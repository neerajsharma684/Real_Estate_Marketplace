import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Loader } from '../components';

const CreateListing = () => {
  interface FormData {
    email?: string;
    phone?: string;
    whatsapp?: string;
    telegram?: string;
    name: string;
    description: string;
    address: string;
    action: string;
    bedrooms: number;
    halls: number;
    kitchens: number;
    bathrooms: number;
    furnished: string;
    four_wheeler_parking: number;
    two_wheeler_parking: number;
    area: number;
    property_type?: string;
    price: string;
    discountPercent: number;
    discountAmount: string;
    images: File[];
    imageName: string[];
  }

  const initialFormData: FormData = {
    email: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    name: '',
    description: '',
    address: '',
    action: '',
    bedrooms: 0,
    halls: 0,
    kitchens: 0,
    bathrooms: 0,
    furnished: '',
    four_wheeler_parking: 0,
    two_wheeler_parking: 0,
    area: 0,
    property_type: 'Flat',
    price: '',
    discountPercent: 0,
    discountAmount: '0',
    images: [],
    imageName: [],
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLoading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    if (isLoading) {
      // Show a loading indicator or do nothing
      <Loader />;
    } else if (!user) {
      navigate('/signin');
    } else {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email,
        phone: user.phone,
        whatsapp: user.whatsapp,
        telegram: user.telegram,
      }));
    }
  }, [isLoading, user, navigate]);
  const [showPopup, setShowPopup] = useState(false);
  const [cnfPopup, setcnfPopup] = useState(false);
  const [loading, setloading] = useState(false);
  const formatNumberWithCommas = (value: number) => {
    return value.toLocaleString('en-IN');
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
  
    // Check if the field requires number conversion or special handling
    const isPriceOrDiscount = ['price', 'discountAmount'].includes(id);
    const isNumericField = ['bedrooms', 'halls', 'kitchens', 'bathrooms', 'four_wheeler_parking', 'two_wheeler_parking', 'area', 'discountPercent'].includes(id);
  
    setFormData((prevData) => ({
      ...prevData,
      [id]: isPriceOrDiscount 
              ? value.replace(/,/g, '') // Remove commas for price and discountAmount
              : isNumericField 
              ? Number(value) // Convert numeric fields to numbers
              : id === 'offer' 
              ? value === 'true' // Convert offer to boolean
              : value, // Default case for other fields
    }));
  
    console.log(formData);
  };

  const handleDiscountChange = (e: any) => {
    const { id, value } = e.target;
    const price = parseFloat(formData.price.replace(/,/g, '')); // Convert price to number
  
    if (id === 'discountPercent') {
      const discountPercent = Number(value);
      const discountAmount = (price * discountPercent) / 100;
      setFormData((prevData) => ({
        ...prevData,
        discountPercent: parseFloat(discountPercent.toFixed(2)),
        discountAmount: discountAmount.toString(),
      }));
    } else if (id === 'discountAmount') {
      const discountAmount = Number(value);
      const discountPercent = (discountAmount / price) * 100;
      setFormData((prevData) => ({
        ...prevData,
        discountPercent: parseFloat(discountPercent.toFixed(2)),
        discountAmount: discountAmount.toString(),
      }));
    }
  };
  
  const handleDiscountAmountChange = (e: any) => {
    const { value } = e.target;
    const price = parseFloat(formData.price.replace(/,/g, '')); // Convert price to number
    const discountAmount = parseFloat(value.replace(/,/g, ''));;
    const discountPercent = (discountAmount / price) * 100;
  
    setFormData((prevData) => ({
      ...prevData,
      discountAmount: discountAmount.toString(),
      discountPercent: parseFloat(discountPercent.toFixed(2)),
    }));
  };
  

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      action: e.target.value,
    });
  };

  const handleRadioChange_furnished = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      furnished: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...filesArray],
      }));
    }
  };

  const updateImageNames = (name: string) => {
    setFormData((prevData) => ({
      ...prevData,
      imageName: [...prevData.imageName, name],
    }));
  }

  const handleImageDelete = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const imageUpload = async (images: File[]) => {
    for (const image of images) {
      try {
        const uniqueFileName = `${uuidv4()}${image.name}`;
        const data = new FormData();
        data.append("image", image);
        data.append("uniqueFileName", uniqueFileName);
  
        const response = await fetch('/api/imagesUpload', {
          method: 'POST',
          body: data,
        });
  
        if (response.ok) {
          console.log('Image uploaded successfully');
          updateImageNames(uniqueFileName);
        } else {
          console.log('Image upload failed:');
          throw new Error(`Image upload failed for ${image.name}`);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        throw error; // Stop the process if an error occurs
      }
    }
  };

  function imageUploadSuccess () {
    return(
      <div className="space-y-2 p-4">
              <div
                role="alert"
                className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Images Uploaded Successfully!</span>
              </div>
            </div>
    )
  }
  
  function imageUploadFailure () {
    return (
      <div className="space-y-2 p-4">
              <div
                role="alert"
                className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5 flex-shrink-0 mr-2 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Images Upload Failed!</span>
              </div>
            </div>
    )
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloading(true);
    try {  
      const res = await fetch('http://localhost:3000/api/create-user-listing/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (res.status === 201) {
        console.log('Listing created successfully');
        setTimeout(() => {
          window.location.reload(); // reload the page
        }, 3000);
      } else {
        const errorText = await res.text();
        console.log('Listing creation failed:', errorText);
        alert(`Listing creation failed: ${errorText}`);
      }
    } catch (error) {
      console.error('Error during image upload or listing creation:', error);
      alert(`Error during image upload or listing creation:`);
    } finally {
      setTimeout(() => {
        setShowPopup(false);
        setcnfPopup(false);
      }, 5000);
    }
    setloading(false);
  };

  const handleImageSubmit = async (e: any) => {
    e.preventDefault();
    setloading(true);
    try {
      await imageUpload(formData.images); // Ensure images are uploaded sequentially
      console.log("All images uploaded successfully.");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
    setloading(false);
  };

  function renderPriceAndOfferSection() {
    if (formData.action === 'sell' || formData.action === 'lease') {
      return (
        <div>
          <p className="font-semibold">Price:</p>
          <input
            type="text"
            className="border p-3 rounded-lg w-full"
            id="price"
            onChange={handleChange}
            value={formatNumberWithCommas(parseFloat(formData.price.replace(/,/g, '')) || 0)} // Display formatted value
          />
          
            <div className="flex flex-col space-y-2 mt-2">
              <div>
                <label className="font-semibold">Discount Percentage:</label>
                <input
                  type="number"
                  min="0.0"
                  max="100.0"
                  step={0.01}
                  className="border p-3 rounded-lg w-full"
                  id="discountPercent"
                  value={formData.discountPercent}
                  onChange={handleDiscountChange}
                />
              </div>
              <div>
                <label className="font-semibold">Discount Amount:</label>
                <input
                  type="text"
                  className="border p-3 rounded-lg w-full"
                  id="discountAmount"
                  value={formatNumberWithCommas(parseFloat(formData.discountAmount.replace(/,/g, '')) || 0)}
                  onChange={handleDiscountAmountChange}
                />
              </div>
            </div>
          
        </div>
      );
    }
    else if (formData.action === 'rent') {
      return (
        <div>
          <p className="font-semibold">Rent per Month:</p>
          <input
            type="text"
            className="border p-3 rounded-lg w-full"
            id="price"
            onChange={handleChange}
            value={formatNumberWithCommas(parseFloat(formData.price.replace(/,/g, '')) || 0)} // Display formatted value
          />
          </div>
          )
        }
  }

  return (
    <div>
      {loading ? <Loader /> : null}
    <div className="p-3 max-w-6xl mx-auto my-2">
      {cnfPopup? showPopup? imageUploadSuccess(): imageUploadFailure() : null}
      <h1 className="text-3xl text-center font-semibold">Create a Listing</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-4">
          <div className="flex-1 space-y-2">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg w-full"
              id="name"
              onChange={handleChange}
            />
            <textarea
              placeholder="Description"
              className="border p-3 rounded-lg w-full"
              id="description"
              onChange={handleChange}
            ></textarea>
            <textarea
              placeholder="Address"
              className="border p-3 rounded-lg w-full"
              name="Address"
              id="address"
              onChange={handleChange}
            ></textarea>
            <div>
              <p className="font-semibold">Action:</p>
              <div className="flex space-x-2 border-[3px] border-green-500 rounded-xl select-none max-w-fit p-2">
                {['Sell', 'Rent', 'Lease'].map((option) => (
                  <label
                    key={option}
                    className="font-semibold radio items-center justify-center rounded-lg p-1 cursor-pointer transition-all transform hover:scale-105 duration-300 ease-in-out"
                  >
                    <input
                      type="radio"
                      name="action"
                      value={option.toLowerCase()}
                      className="peer hidden"
                      onChange={handleRadioChange}
                    />
                    <span className="tracking-widest peer-checked:bg-blue-500 peer-checked:text-white text-gray-700 p-2 rounded-lg transition-all duration-300 ease-in-out transform peer-checked:scale-110 hover:shadow-lg hover:bg-blue-400">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <div>
                <p className="font-semibold">Bedrooms:</p>
                <input
                  type="number"
                  min="0"
                  className="border p-3 rounded-lg w-full"
                  id="bedrooms"
                  defaultValue={0}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className="font-semibold">Halls:</p>
                <input
                  type="number"
                  min="0"
                  className="border p-3 rounded-lg w-full"
                  id="halls"
                  defaultValue={0}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className="font-semibold">Kitchens:</p>
                <input
                  type="number"
                  min="0"
                  className="border p-3 rounded-lg w-full"
                  id="kitchens"
                  defaultValue={0}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className="font-semibold">Bathrooms:</p>
                <input
                  type="number"
                  min="0"
                  className="border p-3 rounded-lg w-full"
                  id="bathrooms"
                  defaultValue={0}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <p className="font-semibold">Furnished:</p>
              <div className="flex space-x-2 border-[3px] border-green-500 rounded-xl select-none max-w-fit p-2">
                {['Full-Furnished', 'Semi-Furnished', 'Not-Furnished'].map((option) => (
                  <label
                    key={option}
                    className="font-semibold radio items-center justify-center rounded-lg p-1 cursor-pointer transition-all transform hover:scale-105 duration-300 ease-in-out"
                  >
                    <input
                      type="radio"
                      name="furnished"
                      value={option.toLowerCase()}
                      className="peer hidden"
                      onChange={handleRadioChange_furnished}
                    />
                    <span className="tracking-widest peer-checked:bg-blue-500 peer-checked:text-white text-gray-700 p-2 rounded-lg transition-all duration-300 ease-in-out transform peer-checked:scale-110 hover:shadow-lg hover:bg-blue-400">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div>
                <p className="font-semibold">4 Wheeler Parking:</p>
                <input
                  type="number"
                  min="0"
                  className="border p-3 rounded-lg w-full"
                  id="four_wheeler_parking"
                  defaultValue={0}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p className="font-semibold">2 Wheeler Parking:</p>
                <input
                  type="number"
                  min="0"
                  className="border p-3 rounded-lg w-full"
                  id="two_wheeler_parking"
                  defaultValue={0}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="p-2 shadow-md border-[3px] border-gray-200 rounded-md">
              <p className="text-center text-lg font-semibold mb-2">Property Details:</p>
              <div className="flex flex-row gap-2">
                <div>
                  <p className="font-semibold">Area (Sq. Ft):</p>
                  <input
                    type="number"
                    min="0"
                    className="border p-3 rounded-lg w-full"
                    id="area"
                    defaultValue={0}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p className='font-semibold'>Property Type:</p>
                  <select className='border p-3 rounded-lg w-full' id='property_type' onChange={handleChange}>
                    <option value='Flat' defaultValue={'Flat'}>Flat</option>
                    <option value='House'>House</option>
                    <option value='Apartment'>Apartment</option>
                    <option value='Villa'>Villa</option>
                    <option value='Farmhouse'>Farmhouse</option>
                    <option value='Penthouse'>Penthouse</option>
                    <option value='Studio'>Studio</option>
                    <option value='Duplex'>Duplex</option>
                    <option value='Triplex'>Triplex</option>
                    <option value='Townhouse'>Townhouse</option>
                    <option value='Bungalow'>Bungalow</option>
                    <option value='Cottage'>Cottage</option>
                    <option value='Mansion'>Mansion</option>
                    <option value='Castle'>Castle</option>
                    <option value='Office'>Office</option>
                    <option value='Shop'>Shop</option>
                    <option value='Showroom'>Showroom</option>
                    <option value='Warehouse'>Warehouse</option>
                    <option value='Commercial Land'>Commercial Land</option>
                    <option value='Industrial Land'>Industrial Land</option>
                    <option value='Agricultural Land'>Agricultural Land</option>
                    <option value='Farm Land'>Farm Land</option>
                    <option value='Residential Land'>Residential Land</option>
                    <option value='Commercial Building'>Commercial Building</option>
                    <option value='Industrial Building'>Industrial Building</option>
                    <option value='Agricultural Building'>Agricultural Building</option>
                    <option value='Farm Building'>Farm Building</option>
                    <option value='Residential Building'>Residential Building</option>
                    <option value='Hotel'>Hotel</option>
                    <option value='Resort'>Resort</option>
                    <option value='Guest House'>Guest House</option>
                    <option value='Banquet Hall'>Banquet Hall</option>
                    <option value='Plot'>Plot</option>
                  </select>
                </div>
              </div>
            </div>
            {renderPriceAndOfferSection()}
            <p><span className='font-semibold'>Images: </span>The first image will be the cover image.</p>
            <div className='flex justify-start gap-5'>
            <div className="grid w-full max-w-xs items-center gap-1.5">
              <input id="picture" type="file" multiple accept="image/*" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" onChange={handleImageChange}/>
            </div>
            <button
          className="bg-blue-500 text-white p-2 rounded-lg w-fit"
          onClick={handleImageSubmit}
        >
          Upload
        </button>
            </div>
            <div className="image-preview-container max-w-xl overflow-x-auto pb-2">
            <div className="image-preview flex gap-2">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="image-container relative flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="image-actions absolute top-0 right-0 p-1 flex items-center space-x-2">
                    <span className="image-index text-white bg-blue-500 text-xs px-2 py-1 rounded-full shadow">
                      {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="delete-button text-white bg-red-500 hover:bg-red-600 text-sm p-2 rounded-full shadow focus:outline-none"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
      <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            Create
          </button>
      </div>
    </form>
  </div>
    </div>
  );
};

export default CreateListing;
