import React from "react";
import {
  BookOpen,
  ChevronRight,
  Star,
  Check,
  Award,
  Sparkles,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { features, testimonials, stats } from "../services/data";

function Home() {
  const animatedTextStyle = {
    backgroundImage: "url('/welcome.png')",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    backgroundSize: "200%",
    animation: "animate 5s linear infinite",
  };

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION  */}
      <section className="relative h-[95vh] overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient"></div>

        {/* Parallax Background Image */}
        <div
          className="absolute inset-0 z-10 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          }}
        />

        {/* Curved overlay - using CSS variables for colors */}
        <div className="absolute inset-0 z-20">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            {/* First Path */}
            <path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              className="fill-[rgba(126,34,206,0.80)] dark:fill-[rgba(126,34,206,0.80)]"
            />

            {/* Second Path */}
            <path
              d="M0,0 L100,0 L100,70 C75,90 25,80 0,100 Z"
              className="fill-white dark:fill-[#111827]"
            />
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="max-w-4xl">
            <h1
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100"
              style={animatedTextStyle}
            >
              Welcome to LibriTech
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300">
              <TypeAnimation
                sequence={[
                  "Revolutionizing your digital library experience",
                  1000,
                  "Discover, Read, and Manage your books effortlessly",
                  1000,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </p>

            <Link
              to="/discover/books"
              className="px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg text-white bg-[#7e22ce] hover:bg-[#6b21a8]"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <BookOpen className="h-10 w-10 text-white" />
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjd1NjdhZHppZ2xzeDlkYXFhZDRkNjg1OTMzYmM1cWV3OWVyeHRmciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V8oj5SlnHsZMY/giphy.gif"
                  alt="Library interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 overflow-hidden rounded-2xl shadow-lg transform translate-y-8">
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2lveDI2aXdhd29meXMzcWppdXR1MTExYWJvbHY5YWd5MWJoa2dlMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JrSwnF7PLhgvmNfM8C/giphy.gif"
                  alt="Reading area"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHpuZDdxYTQzdmNoaHRudXphbXRrb2Y5N2t3NGN1bjRmNXh4N2hmdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dsKCuWQJ5oM0rKMMWM/giphy.gif"
                  alt="Digital resources"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 overflow-hidden rounded-2xl shadow-lg transform translate-y-8">
                <img
                  src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmhhMmh5cTYxbmtwZDEyMmVxY2UzaTh2dTc3cWltZDNlejdzNjZ6ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BWEY1LI6WdaN2/giphy.gif"
                  alt="Community event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-medium text-sm">
                <Award size={16} />
                <span>Why Choose LibriTech</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                The Perfect Blend of
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                  {" "}
                  Traditional & Digital
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                LibriTech offers a unique library experience that combines the
                best aspects of traditional libraries with the convenience and
                innovation of modern technology.
              </p>

              <ul className="space-y-4">
                {[
                  "Access thousands of books, e-books, and audiobooks",
                  "Personalized recommendations based on your reading preferences",
                  "Join reading groups and cultural events",
                  "Advanced digital catalog with powerful search features",
                  "Professional librarians available for consultation",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/libritech/about-us"
                className="mt-8 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
              >
                Learn More About Us
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-medium text-sm">
              <Sparkles size={16} className="animate-pulse" />
              <span>Innovative Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need for Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                {" "}
                Reading Journey
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              LibriTech combines the best of traditional libraries with
              cutting-edge technology to enhance your reading experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.length &&
              features?.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="inline-flex p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                    <feature.icon />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section
        id="stats-section"
        className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-900 dark:to-indigo-900"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.length &&
              stats?.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="inline-flex p-4 rounded-full bg-white/20 text-white mb-4">
                    <stat.icon size={28} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-medium text-sm">
              <Star size={16} />
              <span>User Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Members Are Saying
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover how LibriTech is transforming reading experiences for our
              community members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.length &&
              testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 relative"
                >
                  <div className="absolute top-6 right-8 text-purple-100 dark:text-purple-900/30">
                    <svg
                      className="h-16 w-16"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M10 8v6c0 3.314-2.686 6-6 6H4v4h4c5.523 0 10-4.477 10-10V8h-8zm18 0v6c0 3.314-2.686 6-6 6h-1v4h4c5.523 0 10-4.477 10-10V8h-7z" />
                    </svg>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-8 relative z-10">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4 border-2 border-purple-500 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-800 dark:from-purple-900 dark:to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Join thousands of readers who have transformed their reading
            experience with LibriTech. Discover new books and track your
            progress.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/discover/books"
              className="px-8 py-4 rounded-full text-lg font-semibold bg-white text-purple-700 hover:bg-yellow-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Explore Our Collection
            </Link>
            <Link
              to="/libritech/contact-us"
              className="px-8 py-4 rounded-full text-lg font-semibold bg-purple-500/30 backdrop-blur-sm text-white border border-white/30 hover:bg-purple-500/50 transition-colors shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
