"use client";
import { useState } from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { ShieldAlert } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    message: '',
    agreeToPrivacy: false
  });

  const whatsappNumber = '6282022424'; 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();    

    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.message) {
      toast.warning('Please fill in all fields.', {
        icon: <ShieldAlert />,
        duration: 4000,
        style: { borderRadius: '8px', background: '#333', color: '#fff' }
      });
      return;
    }

    // Format the message for WhatsApp
    const whatsappMessage = `*New Contact Form Submission*

*Name:* ${formData.firstName} ${formData.lastName}
*Phone:* ${formData.phone}
*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      message: '',
      agreeToPrivacy: false
    });
  };

  return (
    <div className="min-h-screen bg-hero-gradient py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto mt-30 ">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Contact Form */}
            <div className="p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Contact us</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={5}
                    className="w-full px-4 py-3 text-base text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full text-gray-600 border-1 border-black py-3 sm:py-4 rounded-lg font-semibold active:bg-gray-200 transition duration-200 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <MessageSquare size={20} />
                  SEND MESSAGE
                </button>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="bg-gradient-to-br from-blue-300 to-gray-400 p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-center order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Get in Touch</h2>
              <p className="text-gray-600 mb-8 sm:mb-12 leading-relaxed text-sm sm:text-base">
                You need more information? Check what other persons are saying about our product. They are very happy with their purchase.
              </p>

              <div className="space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-opacity-10 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Phone size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-semibold">+91 6282022424 | +91 89214 42424</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className=" bg-opacity-10 p-2.5 sm:p-3 rounded-lg flex-shrink-0">
                    <Mail size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-semibold break-all">navastraderskarakunnu@gmail.com</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}