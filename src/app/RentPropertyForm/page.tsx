"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
  rooms: number;
  bathrooms: number;
  photos: File[];
}

const RentPropertyForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    location: "",
    rooms: 1,
    bathrooms: 1,
    photos: [],
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, photos: Array.from(e.target.files) });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!formData.price) {
      newErrors.price = "Price is required";
      isValid = false;
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("rooms", formData.rooms.toString());
        formDataToSend.append("bathrooms", formData.bathrooms.toString());

        formData.photos.forEach((photo) => {
          formDataToSend.append("photos", photo);
        });

        const response = await fetch("http://localhost:3001/properties", {
          method: "POST",
          body: formDataToSend,
        });

        if (!response.ok) {
          throw new Error("Failed to submit property.");
        }

        // Redirige al usuario a la página de inicio u otra página
        router.push("/Home");
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message || "Submission error.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-xl shadow-lg w-96 border border-gray-500/40">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-300">Property Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-200"
              placeholder="Enter the title of the property"
            />
            {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-200"
              placeholder="Enter the description of the property"
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-300">Price per night</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-200"
              placeholder="Enter the price per night"
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-300">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-200"
              placeholder="Enter the location"
            />
            {errors.location && <span className="text-red-500 text-sm">{errors.location}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="rooms" className="block text-gray-300">Rooms</label>
            <input
              type="number"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-200"
              placeholder="Number of rooms"
              min={1}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bathrooms" className="block text-gray-300">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-200"
              placeholder="Number of bathrooms"
              min={1}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="photos" className="block text-gray-300">Photos</label>
            <input
              type="file"
              name="photos"
              multiple
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-200"
            />
          </div>

          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
          >
            Submit Property
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentPropertyForm;
