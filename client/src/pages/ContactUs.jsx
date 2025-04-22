import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  Sparkles,
  ExternalLink,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Reset form after successful submission
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: <MapPin size={20} />,
      title: "Our Location",
      content: "Avenue Mohammed V, Marrakech, Morocco",
      cta: "Get Directions",
      link: "https://www.google.com/maps?ll=31.634621,-8.007853&z=12&t=m&hl=en&gl=US&mapclient=embed&q=Marrakesh+Morocco",
    },
    {
      icon: <Phone size={20} />,
      title: "Phone Number",
      content: "+212 681930875",
      cta: "Call Us",
      link: "tel:+212681930875",
    },
    {
      icon: <Mail size={20} />,
      title: "Email Address",
      content: "contact@libritech.ma",
      cta: "Send Email",
      link: "mailto:mzilinassim@gmail.com",
    },
    {
      icon: <Clock size={20} />,
      title: "Working Hours",
      content: "Monday - Friday: 9AM - 6PM",
      cta: "See Full Schedule",
      link: "/libritech/Working-Hours",
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, link: "#facebook", name: "Facebook" },
    { icon: <Twitter size={20} />, link: "#twitter", name: "Twitter" },
    { icon: <Instagram size={20} />, link: "#instagram", name: "Instagram" },
    { icon: <Linkedin size={20} />, link: "#linkedin", name: "LinkedIn" },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="flex flex-col gap-12 relative z-10">
          {/* Title Section with animated underline */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-medium text-sm">
              <Sparkles size={16} className="animate-pulse" />
              <span>We're here to help</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                Touch
              </span>{" "}
              With Us
            </h1>

            <div className="relative mx-auto">
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have a question or want to visit? Reach out to us through the
                form below or visit our library in the heart of Marrakech.
              </p>
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.link}
                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                aria-label={`Visit our ${social.name} page`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white/90 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg border border-purple-100 dark:border-purple-900/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="space-y-2">
                  <div className="font-bold text-lg text-gray-900 dark:text-white">
                    {item.title}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {item.content}
                  </div>
                  <a
                    href={item.link}
                    className="inline-flex items-center mt-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                  >
                    {item.cta}
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Google Map with animation */}
          <div
            id="map-container"
            className={`w-full h-[80vh] rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700 transition-all duration-1000 `}
          >
            <div className="relative w-full h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54341.40217724851!2d-8.0300633706212!3d31.63468688527944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakesh%2C%20Morocco!5e0!3m2!1sen!2sus!4v1710530000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Marrakech Map"
                className="filter dark:brightness-75 dark:contrast-125"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-8 border-white/20 dark:border-gray-800/30 rounded-xl"></div>
            </div>
          </div>

          {/* Contact Form with enhanced UI */}
          <div className="bg-white/95 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-xl border border-purple-100 dark:border-purple-900/30">
            <div className="max-w-4xl mx-auto">
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-6 rounded-full bg-green-100 dark:bg-green-900/30 mb-6 animate-bounce">
                    <CheckCircle
                      size={64}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 max-w-md">
                    Thank you for reaching out. We'll get back to you as soon as
                    possible, usually within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-8 px-6 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Send Us a Message
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We'd love to hear from you! Fill out the form below and
                      we'll respond as soon as possible.
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User
                            size={18}
                            className="text-gray-400 group-focus-within:text-purple-500 transition-colors"
                          />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail
                            size={18}
                            className="text-gray-400 group-focus-within:text-purple-500 transition-colors"
                          />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                          placeholder="johndoe@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MessageSquare
                          size={18}
                          className="text-gray-400 group-focus-within:text-purple-500 transition-colors"
                        />
                      </div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Your subject here"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 pt-4 flex items-start pointer-events-none">
                        <Send
                          size={18}
                          className="text-gray-400 group-focus-within:text-purple-500 transition-colors"
                        />
                      </div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="block w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                        placeholder="Write your message here..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Send size={18} className="mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
