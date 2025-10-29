import { useState } from "react";
import { motion } from "framer-motion";
import { FiCamera, FiHome, FiShoppingBag, FiCoffee, FiUsers, FiCheck } from "react-icons/fi";

const services = [
  { id: "architecture", name: "Architecture Photography", icon: FiHome },
  { id: "lifestyle", name: "Lifestyle Photography", icon: FiUsers },
  { id: "product", name: "Product Photography", icon: FiShoppingBag },
  { id: "food", name: "Food Photography", icon: FiCoffee },
];

export default function Quote() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [currentStep, setCurrentStep] = useState("service-selection");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // Architecture fields
    propertyName: "",
    propertyType: "",
    bedrooms: "",
    areasToShoot: {},
    otherAreas: "",
    aerialPhotography: "",
    fpvVideo: "",
    location: "",
    // Product fields
    productName: "",
    numberOfProducts: "",
    modelRequired: "",
    backgroundType: "",
    stylingRequired: "",
    // Food fields
    foodItems: "",
    foodLocation: "",
    // Lifestyle fields
    numberOfDays: "",
    lifestyleDetails: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleArea = (area) => {
    setFormData((prev) => {
      const newAreas = { ...prev.areasToShoot };
      if (newAreas[area]) {
        delete newAreas[area];
      } else {
        newAreas[area] = 1;
      }
      return { ...prev, areasToShoot: newAreas };
    });
  };

  const updateAreaQuantity = (area, quantity) => {
    setFormData((prev) => ({
      ...prev,
      areasToShoot: {
        ...prev.areasToShoot,
        [area]: parseInt(quantity) || 0,
      },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare submission data
    const submissionData = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      services: selectedServices.join(", "),
    };

    // Add service-specific data
    if (selectedServices.includes("architecture")) {
      submissionData.propertyName = formData.propertyName;
      submissionData.propertyType = formData.propertyType;
      submissionData.bedrooms = formData.bedrooms;
      submissionData.areasToShoot = Object.entries(formData.areasToShoot)
        .map(([area, qty]) => `${area}: ${qty}`)
        .join(", ");
      submissionData.otherAreas = formData.otherAreas;
      submissionData.aerialPhotography = formData.aerialPhotography;
      submissionData.fpvVideo = formData.fpvVideo;
      submissionData.location = formData.location;
    }

    if (selectedServices.includes("product")) {
      submissionData.productName = formData.productName;
      submissionData.numberOfProducts = formData.numberOfProducts;
      submissionData.modelRequired = formData.modelRequired;
      submissionData.backgroundType = formData.backgroundType;
      submissionData.stylingRequired = formData.stylingRequired;
    }

    if (selectedServices.includes("food")) {
      submissionData.foodItems = formData.foodItems;
      submissionData.foodLocation = formData.foodLocation;
    }

    if (selectedServices.includes("lifestyle")) {
      submissionData.numberOfDays = formData.numberOfDays;
      submissionData.lifestyleDetails = formData.lifestyleDetails;
    }

    try {
      // Send to API endpoint
      const response = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setCurrentStep("success");
      } else {
        alert("Failed to submit quote request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const proceedToQuestions = () => {
    if (selectedServices.length > 0) {
      setCurrentStep("questions");
    }
  };

  const architectureAreas = [
    "Restaurant",
    "Reception",
    "Bedrooms",
    "Poolside",
    "Rooftop",
    "Lobby",
    "Bar Area",
    "Spa",
    "Gym",
    "Gardens",
    "Exterior",
    "Common Areas",
    "Banquet Halls",
    "Conference Rooms",
    "Kitchen",
    "Bathroom",
  ];

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-light mb-6">
            Get a <span style={{ color: "#f15a24" }}>Quote</span>
          </h1>
          <p className="text-lg text-gray-400 font-light">
            Tell us about your photography needs and we'll provide a custom quote
          </p>
        </motion.div>

        {/* Service Selection */}
        {currentStep === "service-selection" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-light mb-8 text-center">
              Select the services you need:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {services.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedServices.includes(service.id);
                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`relative p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                      isSelected
                        ? "border-[#f15a24] bg-[#f15a24]/10"
                        : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-4 rounded-full ${
                          isSelected ? "bg-[#f15a24]" : "bg-zinc-800"
                        }`}
                      >
                        <Icon size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-medium">{service.name}</h3>
                      </div>
                      {isSelected && (
                        <div className="bg-[#f15a24] rounded-full p-1">
                          <FiCheck size={20} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedServices.length > 0 && (
              <div className="text-center">
                <button
                  onClick={proceedToQuestions}
                  className="bg-[#f15a24] text-white px-12 py-4 rounded-full hover:bg-[#d14b1a] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl"
                >
                  Continue to Questions
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Questions Form */}
        {currentStep === "questions" && (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-2xl font-light mb-6" style={{ color: "#f15a24" }}>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                    placeholder="+94 XX XXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Architecture Photography Questions */}
            {selectedServices.includes("architecture") && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-light mb-6" style={{ color: "#f15a24" }}>
                  Architecture Photography Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Property Name *
                    </label>
                    <input
                      type="text"
                      name="propertyName"
                      required
                      value={formData.propertyName}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="e.g., Grand Hotel Colombo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Property Type *
                    </label>
                    <select
                      name="propertyType"
                      required
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                    >
                      <option value="">Select property type</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Private Property">Private Property</option>
                      <option value="Resort">Resort</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Commercial Building">Commercial Building</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Number of Bedrooms (if applicable)
                    </label>
                    <input
                      type="text"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="e.g., 5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Areas to be Shot * (Select areas and specify quantity)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      {architectureAreas.map((area) => (
                        <div
                          key={area}
                          className={`border rounded-lg p-4 transition-all duration-200 ${
                            formData.areasToShoot[area]
                              ? "border-[#f15a24] bg-[#f15a24]/10"
                              : "border-zinc-700 bg-black"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!formData.areasToShoot[area]}
                                onChange={() => toggleArea(area)}
                                className="mr-2 w-4 h-4 accent-[#f15a24]"
                              />
                              <span className="text-sm">{area}</span>
                            </label>
                          </div>
                          {formData.areasToShoot[area] && (
                            <div className="flex items-center gap-2">
                              <label className="text-xs text-gray-400">Quantity:</label>
                              <input
                                type="number"
                                min="1"
                                value={formData.areasToShoot[area]}
                                onChange={(e) => updateAreaQuantity(area, e.target.value)}
                                className="w-20 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm focus:border-[#f15a24] focus:outline-none"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Other Areas (if any)
                    </label>
                    <textarea
                      name="otherAreas"
                      value={formData.otherAreas}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="e.g., Wine cellar (1), Helipad (1), Private beach area (1)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Property Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="e.g., Colombo, Sri Lanka"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Aerial Photography Required? *
                    </label>
                    <select
                      name="aerialPhotography"
                      required
                      value={formData.aerialPhotography}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                    >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      FPV Cinematic Single-Take Property Tour Video Required? *
                    </label>
                    <select
                      name="fpvVideo"
                      required
                      value={formData.fpvVideo}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                    >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Product Photography Questions */}
            {selectedServices.includes("product") && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-light mb-6" style={{ color: "#f15a24" }}>
                  Product Photography Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Product Name/Description *
                    </label>
                    <input
                      type="text"
                      name="productName"
                      required
                      value={formData.productName}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="e.g., Jewelry collection, Electronics, Clothing"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Number of Products to be Shot *
                    </label>
                    <input
                      type="text"
                      name="numberOfProducts"
                      required
                      value={formData.numberOfProducts}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="e.g., 10-15 items"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Model Required? *
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Note: Models must be contacted and provided by the client
                    </p>
                    <select
                      name="modelRequired"
                      required
                      value={formData.modelRequired}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                    >
                      <option value="">Select option</option>
                      <option value="Individual Product Only">Individual Product Only (No Model)</option>
                      <option value="Model Wearing/Using Product">Model Wearing/Using Product (Client Provides)</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Background Type *
                    </label>
                    <select
                      name="backgroundType"
                      required
                      value={formData.backgroundType}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                    >
                      <option value="">Select background</option>
                      <option value="Plain Background">Plain Background (White/Black/Gray)</option>
                      <option value="Styled Background">Styled Background</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Styling Required for Each Item? *
                    </label>
                    <select
                      name="stylingRequired"
                      required
                      value={formData.stylingRequired}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                    >
                      <option value="">Select option</option>
                      <option value="Yes - Full Styling">Yes - Full Styling</option>
                      <option value="Partial Styling">Partial Styling</option>
                      <option value="No Styling Needed">No Styling Needed</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Food Photography Questions */}
            {selectedServices.includes("food") && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-light mb-6" style={{ color: "#f15a24" }}>
                  Food Photography Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Number of Dishes/Items to be Shot *
                    </label>
                    <input
                      type="text"
                      name="foodItems"
                      required
                      value={formData.foodItems}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="e.g., 15-20 dishes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Shoot Location *
                    </label>
                    <input
                      type="text"
                      name="foodLocation"
                      required
                      value={formData.foodLocation}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="e.g., Restaurant location or studio"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Lifestyle Photography Questions */}
            {selectedServices.includes("lifestyle") && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
                <h3 className="text-2xl font-light mb-6" style={{ color: "#f15a24" }}>
                  Lifestyle Photography Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Number of Days Required *
                    </label>
                    <input
                      type="text"
                      name="numberOfDays"
                      required
                      value={formData.numberOfDays}
                      onChange={handleInputChange}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="e.g., 1 day, 2 days"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Additional Details *
                    </label>
                    <textarea
                      name="lifestyleDetails"
                      required
                      value={formData.lifestyleDetails}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 focus:border-[#f15a24] focus:outline-none transition-colors"
                      placeholder="Please describe the type of lifestyle photography needed, number of people, locations, specific shots required, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 justify-center pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep("service-selection")}
                className="bg-zinc-800 text-white px-8 py-4 rounded-full hover:bg-zinc-700 transition-all duration-300 font-medium text-lg"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#f15a24] text-white px-12 py-4 rounded-full hover:bg-[#d14b1a] transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Quote Request"}
              </button>
            </div>
          </motion.form>
        )}

        {/* Success Message */}
        {currentStep === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="bg-[#f15a24] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheck size={40} />
            </div>
            <h2 className="text-3xl font-light mb-4">Quote Request Submitted!</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Thank you for your interest. I'll review your requirements and send you a
              custom quote within 24-48 hours.
            </p>
            <a
              href="/"
              className="inline-block bg-[#f15a24] text-white px-8 py-3 rounded-full hover:bg-[#d14b1a] transition-all duration-300 font-medium"
            >
              Return to Home
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
