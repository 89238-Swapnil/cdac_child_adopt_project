import { useState } from 'react';

const ContactUs = () => {
  const quotes = [
    "Communication is the bridge between confusion and clarity.",
    "Your message matters - let's connect and create something great together.",
    "Every conversation is an opportunity to make an impact.",
    "Reaching out is the first step toward new possibilities."
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    query: ''
  });

  const [randomQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      query: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-8 border border-gray-100">
      <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-2 tracking-tight">
        CONTACT US
      </h1>
      <p className="text-center text-gray-600 mb-8 text-lg">
        Have questions? We're here to help!
      </p>
      
      <div className="bg-blue-100 border-l-4 border-blue-700 p-4 mb-8 italic text-gray-800 rounded-r">
        "{randomQuote}"
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            placeholder="+1 (123) 456-7890"
          />
        </div>
        
        <div>
          <label htmlFor="query" className="block text-sm font-semibold text-gray-700 mb-1">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="query"
            name="query"
            value={formData.query}
            onChange={handleChange}
            required
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent"
            placeholder="How can we help you?"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-900 text-red font-bold py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        >
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
};

export default ContactUs;