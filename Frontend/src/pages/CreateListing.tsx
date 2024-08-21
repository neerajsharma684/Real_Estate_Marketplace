import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  interface FormData {
    Email: string;
    Name?: string;
    Description: string;
    Address: string;
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
    offer: boolean;
    discountPercent: number;
    discountAmount: string;
    images: File[];
  }

  
  const [formData, setFormData] = useState<FormData>({
    Email: '',
    Description: '',
    Address: '',
    bedrooms: 0,
    halls: 0,
    kitchens: 0,
    bathrooms: 0,
    action: '',
    four_wheeler_parking: 0,
    two_wheeler_parking: 0,
    furnished: '',
    price: '',
    offer: false,
    discountPercent: 0,
    discountAmount: '',
    area: 0,
    property_type: 'Flat',
    images: [],
  });
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);
  if (user || user == '') {
    formData.Email = user.email;
  } else {
    navigate('/signin');
  }
  const [showPopup, setShowPopup] = useState(false);
  const [cnfPopup, setcnfPopup] = useState(false);
  const formatNumberWithCommas = (value: number) => {
    return value.toLocaleString('en-IN');
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;

    if (id === 'price') {
      // Handle price field specifically
      const rawValue = value.replace(/,/g, ''); // Remove commas for internal storage
      setFormData((prevData) => ({
        ...prevData,
        [id]: rawValue, // Store raw value without commas
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
    if (id === 'discountAmount') {
      // Handle price field specifically
      const rawValue = value.replace(/,/g, ''); // Remove commas for internal storage
      setFormData((prevData) => ({
        ...prevData,
        [id]: rawValue, // Store raw value without commas
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }

    console.log(formData);
  };

  const handleOfferChange = (e: any) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      offer: checked,
      discountPercent: 0,
      discountAmount: '0',
    }));
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
        images: filesArray,
      }));
    }
  };

  const handleImageDelete = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  const imageUpload = async (image: File, index: number) => {
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${image.name}`;
    const data = new FormData();
    data.append("image", image);
    data.append("uniqueFileName", uniqueFileName);

  try {
    const res = await fetch('/api/imagesUpload', {
      method: 'POST',
      body: data,
    });

    if (res.status === 200) {
      console.log('Image uploaded successfully');
      setFormData((prevData) => {
        const updatedImages = [...prevData.images];
        updatedImages[index] = new File([image], uniqueFileName, { type: image.type });
        return {
          ...prevData,
          images: updatedImages,
        };
      });
      setcnfPopup(true);
      setShowPopup(true);
    } else {
      console.log('Image upload failed');
      setcnfPopup(false);
      setShowPopup(false);
    }
  } catch (error) {
    console.error('Error during fetch:', error);
    setcnfPopup(false);
    setShowPopup(false);
  }
  }

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
    formData.images.forEach(async (image, index) => {
      try {
        await imageUpload(image, index);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    });
    setTimeout(() => {
      setShowPopup(false);
      setcnfPopup(false);
    }, 5000);
  }

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
          <div className="flex flex-row items-center space-x-2 mt-2">
            <p className="font-semibold">Offer/Discount:</p>
            <input
              type="checkbox"
              className="border p-3 rounded-lg"
              id="offer"
              checked={formData.offer}
              onChange={handleOfferChange}
            />
          </div>
          {formData.offer && (
            <div className="flex flex-col space-y-2 mt-2">
              <div>
                <label className="font-semibold">Discount Percentage:</label>
                <input
                  type="number"
                  min="0"
                  max="100"
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
          )}
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
              id="Name"
              onChange={handleChange}
            />
            <textarea
              placeholder="Description"
              className="border p-3 rounded-lg w-full"
              id="Description"
              onChange={handleChange}
            ></textarea>
            <textarea
              placeholder="Address"
              className="border p-3 rounded-lg w-full"
              name="Address"
              id="Address"
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
                  <select className='border p-3 rounded-lg w-full' id='type' onChange={handleChange}>
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
            <div className="grid w-full max-w-xs items-center gap-1.5">
              <input id="picture" type="file" multiple accept="image/*" className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium" onChange={handleImageChange}/>
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
  );
};

export default CreateListing;
