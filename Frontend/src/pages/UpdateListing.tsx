import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowUp, faArrowDown, faMapMarkerAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Loader } from '../components';
import { useNavigate } from 'react-router-dom';

const UpdateListing = () => {
	interface Property {
		email: string;
		imageName: string[];
		name: string;
		address: string;
		description: string;
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
		property_type: string;
		discountPercent: number;
		discountAmount: number;
	}
	const { id } = useParams<{ id: string }>(); // Extract the id from the URL
	const [property, setProperty] = useState<Property | null>(null);
	const [mainImage, setMainImage] = useState<string>('');
	const [newImages, setNewImages] = useState<File[]>([]);
	const user = useSelector((state: RootState) => state.user.currentUser);
	const isLoading = useSelector((state: RootState) => state.user.loading);
	const navigate = useNavigate();
	const [editField, setEditField] = useState<string | null>(null);
	const [editableProperty, setEditableProperty] = useState<Property | null>(null);

	useEffect(() => {
		if (isLoading) {
			<Loader />;
		} else if (!user) {
			navigate('/signin');
		} else {
			fetchProperty();
		}
	}, [isLoading, user, navigate]);

	useEffect(() => {
		if (property) {
			setEditableProperty({ ...property });
		}
	}, [property]);

	const fetchProperty = async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/fetch-single-listing/${id}`);
			if (response.ok) {
				const data = await response.json();
				setProperty(data);
				setMainImage(`https://raw.githubusercontent.com/neerajsharma684/Real_Estate_Marketplace/main/images/${data.imageName[0]}`);
				if (data.email !== user?.email) {
					navigate('/not-authorized');
				}
			} else {
				console.error('Failed to fetch property:', response.statusText);
			}
		} catch (error) {
			console.error('Error fetching property:', error);
		}
	};

	// 	if (id) {
	// 		fetchProperty();
	// 	}
	// }, [id]);

	const handleImageClick = (imageName: string) => {
		setMainImage(`https://raw.githubusercontent.com/neerajsharma684/Real_Estate_Marketplace/main/images/${imageName}`);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);
			setNewImages((prevImages) => [...prevImages, ...filesArray]);
			if (!mainImage) {
				setMainImage(URL.createObjectURL(filesArray[0]));
			}
		}
	};

	const handleImageDelete = (index: number) => {
		setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	const handleIndexChange = (index: number, newIndex: number) => {
		if (newIndex < 0 || newIndex >= newImages.length) return;
		const updatedImages = [...newImages];
		const [movedImage] = updatedImages.splice(index, 1);
		updatedImages.splice(newIndex, 0, movedImage);
		setNewImages(updatedImages);
	};

	const openGoogleMaps = (address: string) => {
		const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
		window.open(mapUrl, '_blank');
	};

	const handleEditClick = (field: string) => {
		setEditField(field);
	};

	const handleInputChange = (field: string, value: string | number) => {
		if (editableProperty) {
			setEditableProperty({ ...editableProperty, [field]: value });
		}
	};

	const handleSave = () => {
		// Implement save logic here, e.g., send updated data to the server
		setEditField(null);
	};

	if (!property) return <div><Loader /></div>;

	return (
		<div className="flex flex-col md:flex-row p-6 min-h-screen">
			<div className="md:w-1/2 flex flex-col items-center">
				<img src={mainImage} alt="Main" className="w-12/12 h-4/6 mb-4 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300" />
				<div className="flex space-x-2 overflow-x-auto mb-4 no-scrollbar">
					{property.imageName.map((img, index) => (
						<img
							key={index}
							src={`https://raw.githubusercontent.com/neerajsharma684/Real_Estate_Marketplace/main/images/${img}`}
							alt={`Thumbnail ${index + 1}`}
							className="w-28 h-28 object-cover cursor-pointer rounded-lg shadow-md transform hover:scale-110 transition-transform duration-300"
							onClick={() => handleImageClick(img)}
						/>
					))}
				</div>
				<div className=''>
					<label className="mt-4 bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-500 hover:text-white transition-colors duration-300">
						Choose Files
						<input type="file" multiple onChange={handleImageChange} className="hidden" />
					</label>
					<button
						className="bg-blue-500 text-white p-2 rounded-lg w-fit ml-4"

					>
						Upload
					</button>
				</div>
				<div className="image-preview-container max-w-xl overflow-x-auto pb-2 mt-4 example-container">
					<div className="image-preview flex gap-2">
						{newImages.map((image, index) => (
							<div
								key={index}
								className="image-container relative flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg transform hover:scale-105 transition-transform duration-300"
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
									<button
										type="button"
										onClick={() => handleIndexChange(index, index - 1)}
										className="text-white bg-gray-500 hover:bg-gray-600 text-sm p-1 rounded-full shadow focus:outline-none"
									>
										<FontAwesomeIcon icon={faArrowUp} />
									</button>
									<button
										type="button"
										onClick={() => handleIndexChange(index, index + 1)}
										className="text-white bg-gray-500 hover:bg-gray-600 text-sm p-1 rounded-full shadow focus:outline-none"
									>
										<FontAwesomeIcon icon={faArrowDown} />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className="md:w-1/2 p-4 space-y-6">
				{/* Name Field */}
				<div className='flex items-center'>
					<label className='text-3xl font-semibold'>Name: </label>
					{editField === 'name' ? (
						<input
							type="text"
							value={editableProperty?.name || ''}
							onChange={(e) => handleInputChange('name', e.target.value)}
							className="text-4xl font-bold ml-2"
						/>
					) : (
						<h1 className="text-4xl font-bold ml-2">{property.name}</h1>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('name')}
					/>
				</div>
				{/* Address Field */}
				<div className="flex items-center">
					<label className='text-2xl font-semibold'>Address: </label>
					{editField === 'address' ? (
						<input
							type="text"
							value={editableProperty?.address || ''}
							onChange={(e) => handleInputChange('address', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<button
							onClick={() => openGoogleMaps(property.address)}
							className="ml-2 text-blue-500 hover:text-blue-700"
							title="View on Google Maps"
						>
							<FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
							<span className="text-gray-700 text-xl ml-2">{property.address}</span>
						</button>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('address')}
					/>
				</div>
				{/* Description Field */}
				<div className="flex items-center">
					<label className='text-2xl font-semibold'>Description: </label>
					{editField === 'address' ? (
						<input
							type="text"
							value={editableProperty?.description || ''}
							onChange={(e) => handleInputChange('description', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
							<p className="text-gray-700 text-xl ml-2">{property.description}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('address')}
					/>
				</div>
				{/* Price Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Price: </label>
					{editField === 'price' ? (
						<input
							type="number"
							value={editableProperty?.price || ''}
							onChange={(e) => handleInputChange('price', e.target.value)}
							className="text-3xl text-green-500 font-bold ml-2"
						/>
					) : (
						<p className="text-3xl text-green-500 font-bold ml-2">₹{Number(property.price).toLocaleString('en-IN')}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('price')}
					/>
				</div>
				{/* Email Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Email: </label>
					{editField === 'email' ? (
						<input
							type="email"
							value={editableProperty?.email || ''}
							onChange={(e) => handleInputChange('email', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.email}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('email')}
					/>
				</div>
				{/* Phone Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Phone: </label>
					{editField === 'phone' ? (
						<input
							type="tel"
							value={editableProperty?.phone || ''}
							onChange={(e) => handleInputChange('phone', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.phone}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('phone')}
					/>
				</div>
				{/* WhatsApp Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>WhatsApp: </label>
					{editField === 'whatsapp' ? (
						<input
							type="tel"
							value={editableProperty?.whatsapp || ''}
							onChange={(e) => handleInputChange('whatsapp', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.whatsapp}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('whatsapp')}
					/>
				</div>
				{/* Telegram Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Telegram: </label>
					{editField === 'telegram' ? (
						<input
							type="text"
							value={editableProperty?.telegram || ''}
							onChange={(e) => handleInputChange('telegram', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.telegram}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('telegram')}
					/>
				</div>
				{/* Bedrooms Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Bedrooms: </label>
					{editField === 'bedrooms' ? (
						<input
							type="number"
							value={editableProperty?.bedrooms || ''}
							onChange={(e) => handleInputChange('bedrooms', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.bedrooms}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('bedrooms')}
					/>
				</div>
				{/* Bathrooms Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Bathrooms: </label>
					{editField === 'bathrooms' ? (
						<input
							type="number"
							value={editableProperty?.bathrooms || ''}
							onChange={(e) => handleInputChange('bathrooms', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.bathrooms}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('bathrooms')}
					/>
				</div>
				{/* Kitchens Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Kitchens: </label>
					{editField === 'kitchens' ? (
						<input
							type="number"
							value={editableProperty?.kitchens || ''}
							onChange={(e) => handleInputChange('kitchens', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.kitchens}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('kitchens')}
					/>
				</div>
				{/* Halls Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Halls: </label>
					{editField === 'halls' ? (
						<input
							type="number"
							value={editableProperty?.halls || ''}
							onChange={(e) => handleInputChange('halls', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.halls}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('halls')}
					/>
				</div>
				{/* Four Wheeler Parking Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Four Wheeler Parking: </label>
					{editField === 'four_wheeler_parking' ? (
						<input
							type="number"
							value={editableProperty?.four_wheeler_parking || ''}
							onChange={(e) => handleInputChange('four_wheeler_parking', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.four_wheeler_parking}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('four_wheeler_parking')}
					/>
				</div>
				{/* Two Wheeler Parking Field */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Two Wheeler Parking: </label>
					{editField === 'two_wheeler_parking' ? (
						<input
							type="number"
							value={editableProperty?.two_wheeler_parking || ''}
							onChange={(e) => handleInputChange('two_wheeler_parking', e.target.value)}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.two_wheeler_parking}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('two_wheeler_parking')}
					/>
				</div>
				{/* Action Field as a Dropdown */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Action: </label>
					{editField === 'action' ? (
						<select
							value={editableProperty?.action || ''}
							onChange={(e) => handleInputChange('action', e.target.value)}
							className="text-xl ml-2"
						>
							<option value="sell">Sell</option>
							<option value="rent">Rent</option>
							<option value="lease">Lease</option>
						</select>
					) : (
						<p className="text-xl ml-2">{property.action}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('action')}
					/>
				</div>
				{/* Property Type Field as a Dropdown */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Property Type: </label>
					{editField === 'property_type' ? (
						<select
							value={editableProperty?.property_type || ''}
							onChange={(e) => handleInputChange('property_type', e.target.value)}
							className="text-xl ml-2"
						>
							<option value='Flat'>Flat</option>
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
					) : (
						<p className="text-xl ml-2">{property.property_type}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('property_type')}
					/>
				</div>
				{/* Discount Percent and Amount Fields with Auto-fill Logic */}
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Discount Percent: </label>
					{editField === 'discountPercent' ? (
						<input
							type="number"
							value={editableProperty?.discountPercent || ''}
							onChange={(e) => {
								const discountPercent = Number(e.target.value);
								const price = parseFloat(editableProperty?.price || '0');
								const discountAmount = (price * discountPercent) / 100;
								handleInputChange('discountPercent', discountPercent);
								handleInputChange('discountAmount', discountAmount.toFixed(2));
							}}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.discountPercent}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('discountPercent')}
					/>
				</div>
				<div className='flex items-center'>
					<label className='text-2xl font-semibold'>Discount Amount: </label>
					{editField === 'discountAmount' ? (
						<input
							type="number"
							value={editableProperty?.discountAmount || ''}
							onChange={(e) => {
								const discountAmount = Number(e.target.value);
								const price = parseFloat(editableProperty?.price || '0');
								const discountPercent = (discountAmount / price) * 100;
								handleInputChange('discountAmount', discountAmount.toFixed(2));
								handleInputChange('discountPercent', discountPercent.toFixed(2));
							}}
							className="text-xl ml-2"
						/>
					) : (
						<p className="text-xl ml-2">{property.discountAmount}</p>
					)}
					<FontAwesomeIcon
						icon={faPencilAlt}
						className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => handleEditClick('discountAmount')}
					/>
				</div>
				<div>
					<button
						className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-transform duration-300"
						onClick={handleSave}
					>
						Update Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateListing;