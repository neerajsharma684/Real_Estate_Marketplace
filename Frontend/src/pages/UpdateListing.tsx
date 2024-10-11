import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
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
	const { id } = useParams<{ id: string }>(); // Extract the id from the URL
	const [property, setProperty] = useState<Property | null>(null);
	const [mainImage, setMainImage] = useState<string>('');
	const [newImages, setNewImages] = useState<File[]>([]);
	const user = useSelector((state: RootState) => state.user.currentUser);
	const isLoading = useSelector((state: RootState) => state.user.loading);
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) {
		  <Loader />;
		} else if (!user) {
		  navigate('/signin');
		} else {
		  fetchProperty();
		}
	  }, [isLoading, user, navigate]);

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

	if (!property) return <div><Loader /></div>;

	return (
		<div className="flex flex-col md:flex-row p-6 min-h-screen">
			<div className="md:w-1/2 flex flex-col items-center">
				<img src={mainImage} alt="Main" className="w-12/12 h-4/6 mb-4 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300" />
				<div className="flex space-x-2 overflow-x-auto mb-4">
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
				<div className="image-preview-container max-w-xl overflow-x-auto pb-2 mt-4 no-scrollbar">
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
			<div className="md:w-1/2 p-4">
				<h1 className="text-4xl font-bold mb-2">{property.name}</h1>
				<p className="text-xl mb-2">{property.address}</p>
				<p className="text-xl mb-4">{property.price}</p>
				{/* Add more details as needed */}
				<button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-transform duration-300">
					Update Details
				</button>
			</div>
		</div>
	);
};

export default UpdateListing;