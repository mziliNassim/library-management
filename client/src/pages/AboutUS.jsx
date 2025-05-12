import React, { useEffect, useState } from "react";
import { team } from "../services/data"; // Adjust the path as needed
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaUser } from "react-icons/fa";

import {
  BookOpen,
  Users,
  Award,
  Target,
  Calendar,
  BookMarked,
  Heart,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Coffee,
  Library,
  BookOpen as Book,
  Globe,
  Check,
  Star,
  ArrowRight,
  Bookmark,
  ChevronDown,
} from "lucide-react";

const AboutUS = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll animation
  useEffect(() => {
    document.title = "LibriTech - About Us";
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stats data
  const stats = [
    {
      icon: <BookMarked size={28} />,
      value: "25,000+",
      label: "Books in Collection",
    },
    { icon: <Users size={28} />, value: "12,000+", label: "Active Members" },
    { icon: <Calendar size={28} />, value: "500+", label: "Events Per Year" },
    { icon: <Globe size={28} />, value: "40+", label: "Languages Available" },
  ];

  // Values data
  const values = [
    {
      icon: <BookOpen size={24} />,
      title: "Knowledge Accessibility",
      description:
        "We believe everyone should have equal access to information and resources.",
    },
    {
      icon: <Heart size={24} />,
      title: "Community First",
      description:
        "Building strong community connections through literacy and learning.",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Lifelong Learning",
      description: "Supporting educational journeys at every stage of life.",
    },
    {
      icon: <Coffee size={24} />,
      title: "Welcoming Environment",
      description: "Creating comfortable, inclusive spaces for all visitors.",
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Dynamic 3D Layered Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-500 to-purple-700 opacity-90"></div>

          {/* Animated floating shapes */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute h-64 w-64 rounded-full bg-purple-300/20 blur-3xl top-1/4 left-1/4 animate-float-slow"></div>
            <div className="absolute h-96 w-96 rounded-full bg-purple-300/20 blur-3xl bottom-1/4 right-1/4 animate-float-medium"></div>
            <div className="absolute h-48 w-48 rounded-full bg-purple-300/20 blur-3xl top-1/3 right-1/3 animate-float-fast"></div>
          </div>

          {/* Mesh grid overlay */}
          <div className="absolute inset-0 bg-[url('/mesh-grid.svg')] bg-repeat opacity-10"></div>
        </div>

        {/* Books floating in parallax */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <img
            src="/books flooting.png"
            alt="Floating book"
            className="absolute w-32 md:w-48 top-1/4 left-10 md:left-20 transform -rotate-12 animate-float-book-1"
          />
          <img
            src="/books flooting.png"
            alt="Floating book"
            className="absolute w-40 md:w-56 bottom-1/4 right-10 md:right-24 transform rotate-12 animate-float-book-2"
          />
          <img
            src="/books flooting.png"
            alt="Floating book"
            className="absolute w-24 md:w-40 top-2/3 left-1/3 transform rotate-6 animate-float-book-3"
          />
        </div>

        {/* Glass morphism card */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <div className="relative max-w-4xl flex flex-col w-full backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <Bookmark className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-6 -right-6 h-12 w-12 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>

            <div className="inline-flex w-fit mx-auto items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/20 text-white font-medium text-sm backdrop-blur-sm">
              <Sparkles size={16} className="animate-pulse" />
              <span>Our Story</span>
            </div>

            {/* Gradient text animation */}
            <h1 className="text-5xl text-center md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-indigo-200 animate-text-shimmer">
              About <span className="text-yellow-300">LibriTech</span>
            </h1>

            {/* Animated typed text with improved visibility */}
            <div className="bg-black/30 w-fit mx-auto backdrop-blur-sm rounded-xl p-4 mb-8">
              <p className="text-xl text-center md:text-2xl text-white">
                <TypeAnimation
                  sequence={[
                    "Bridging traditional library values.",
                    1000,
                    "Integrating cutting-edge technology.",
                    1000,
                    "Creating a modern learning experience for the Marrakech community.",
                    1000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#mission"
                className="px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-purple-500/50 hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Our Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </a>

              <a
                href="#team"
                className="px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Meet Our Team
                  <ChevronRight className="ml-2 h-5 w-5" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 transition-opacity duration-500 ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center text-white">
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-medium text-sm">
                <Library size={16} />
                <span>Our Story</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                From Traditional Library to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                  {" "}
                  Innovation Hub
                </span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                Founded in 2010, LibriTech began as a small community library in
                the heart of Marrakech. Our vision was to create a space where
                traditional library services could meet modern technological
                innovation.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                Over the years, we've grown from a collection of 5,000 books to
                a comprehensive resource center with both physical and digital
                media, computer labs, workshop spaces, and a vibrant community
                program calendar.
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  What Makes Us Different
                </h3>
                <ul className="space-y-3">
                  {[
                    "Integration of traditional library with digital technology",
                    "Specialized collections representing Moroccan heritage",
                    "Multilingual resources in Arabic, French, English, and Berber",
                    "Community-driven programming and events",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-6 w-6 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 overflow-hidden rounded-2xl shadow-lg    ">
                <img
                  src="https://i.pinimg.com/736x/bf/81/8c/bf818c1211434df757cc6c42cb57e6c0.jpg"
                  alt="Library interior"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 overflow-hidden rounded-2xl shadow-lg transform translate-y-8">
                <img
                  src="https://i.pinimg.com/736x/d7/76/c8/d776c8527ae955776f83dfc34cc70ceb.jpg"
                  alt="Reading area"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="https://i.pinimg.com/736x/1c/b4/77/1cb477ef31149044be09d3ddf186263e.jpg"
                  alt="Technology center"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 overflow-hidden rounded-2xl shadow-lg transform translate-y-8">
                <img
                  src="https://i.pinimg.com/736x/41/1d/8e/411d8ef3098351d70da1e708021f0769.jpg"
                  alt="Community event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-900 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-full bg-white/20 text-white mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission and Vision */}
      <div id="mission" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-medium text-sm">
              <Target size={16} />
              <span>Our Purpose</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Mission & Vision
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Guiding principles that drive our work and shape our future in the
              community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-2xl border border-purple-100 dark:border-purple-800/30 shadow-lg">
              <div className="inline-flex p-3 rounded-lg bg-purple-100 dark:bg-purple-800/50 text-purple-600 dark:text-purple-300 mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To empower the community of Marrakech through equal access to
                knowledge resources, innovative technology, and cultural
                programming that celebrates our heritage while embracing global
                perspectives.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Provide accessible information resources for all",
                  "Preserve and promote Moroccan cultural heritage",
                  "Foster technological literacy and digital inclusion",
                  "Create vibrant community spaces for learning and connection",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 shadow-lg">
              <div className="inline-flex p-3 rounded-lg bg-indigo-100 dark:bg-indigo-800/50 text-indigo-600 dark:text-indigo-300 mb-4">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To be the premier knowledge hub in Morocco, recognized for our
                innovative integration of traditional library services with
                cutting-edge technology, and a model for community engagement in
                the MENA region.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Become a center for digital innovation in North Africa",
                  "Build the most comprehensive multilingual collection in Morocco",
                  "Establish international partnerships with leading libraries",
                  "Develop a sustainable model for 21st century libraries",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-medium text-sm">
              <Star size={16} />
              <span>Core Values</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What We Stand For
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide our work and define our culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 font-medium text-sm">
              <Users size={16} />
              <span>Our People</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Meet The Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate professionals bringing LibriTech's vision to life
              every day.
            </p>
          </div>

          <div className="flex justify-center space-x-12">
            {team?.length > 0 &&
              team?.map((member, index) => (
                <div
                  key={index}
                  className="w-80 shadow-lg rounded-lg overflow-hidden bg-gray-50 dark:bg-[#1e293b] py-4 backdrop-blur-sm bg-opacity-50"
                >
                  <img
                    src={`/${member.img}`}
                    alt={member.name}
                    className="w-56 h-56 object-cover rounded-full mx-auto mb-4"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                      {member.role}
                    </p>
                    <div className="flex space-x-3">
                      <a
                        href={member.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full inline-block bg-[#8961b3] opacity-80 hover:opacity-100"
                      >
                        <FaGithub />
                      </a>
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full inline-block bg-[#8961b3] opacity-80 hover:opacity-100"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href={member.socials.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full inline-block bg-[#8961b3] opacity-80 hover:opacity-100"
                      >
                        <FaUser />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-br from-purple-600 to-indigo-800 dark:from-purple-900 dark:to-indigo-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Visit us today to explore our collections, attend an event, or
            become a member of LibriTech.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/libritech/contact-us"
              className="px-8 py-3 rounded-lg bg-white text-purple-700 font-medium hover:bg-yellow-100 transition-colors shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
            <Link
              to="/discover/books"
              className="px-8 py-3 rounded-lg bg-purple-500/30 backdrop-blur-sm text-white border border-white/30 font-medium hover:bg-purple-500/50 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
