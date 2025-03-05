import { BookOpen } from "lucide-react";
import { team } from "../services/data"; // Adjust the path as needed
import { FaLinkedin, FaGithub, FaUser } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

function Home() {
  // ==== CSS for Animated Text Background ====
  const animatedTextStyle = {
    backgroundImage: "url('/welcome.png')",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    backgroundSize: "200%",
    animation: "animate 5s linear infinite",
  };

  return (
    <div className="">
      {/* ===================================
          HERO SECTION
      ==================================== */}
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

      {/* ===================================
          SERVICES SECTION
      ==================================== */}
      <section className="py-20 bg-white dark:bg-[#111827]">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#8961b3]">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto">
          {/* Service Card 1 */}
          <div className="shadow-lg p-6 rounded-lg text-center bg-white dark:bg-[#1e293b] backdrop-blur-sm bg-opacity-50">
            <div className="p-4 rounded-full inline-block mb-4 bg-[#8961b3] opacity-80">
              <BookOpen className="h-8 w-8 text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#8961b3]">
              Personalized Recommendations
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Get book recommendations tailored to your interests and reading
              habits.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="shadow-lg p-6 rounded-lg text-center bg-white dark:bg-[#1e293b] backdrop-blur-sm bg-opacity-50">
            <div className="p-4 rounded-full inline-block mb-4 bg-[#8961b3] opacity-80">
              <BookOpen className="h-8 w-8 text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#8961b3]">
              Content Management Systems
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Efficiently manage your digital library with our powerful CMS
              tools.
            </p>
          </div>

          {/* Service Card 3 */}
          <div
            whileHover={{ scale: 1.05 }}
            className="shadow-lg p-6 rounded-lg text-center bg-white dark:bg-[#1e293b] backdrop-blur-sm bg-opacity-50"
          >
            <div className="p-4 rounded-full inline-block mb-4 bg-[#8961b3] opacity-80">
              <BookOpen className="h-8 w-8 text-[#000]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#8961b3]">
              Secure Cloud Storage
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Store your eBooks safely and access them from any device with
              ease.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================
          TEAM SECTION
      ==================================== */}
      <section className="py-20 bg-[#4a148c]">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#fff]">
          Meet the Team
        </h2>

        <div className="flex justify-center space-x-12">
          {team &&
            team.map((member, index) => (
              <div
                key={index}
                className="w-64 shadow-lg rounded-lg overflow-hidden bg-gray-50 dark:bg-[#1e293b] py-4 backdrop-blur-sm bg-opacity-50"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-950 dark:text-gray-50">
                    {member.name}
                  </h3>
                  <p className="text-gray-950 dark:text-gray-500">
                    {member.role}
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
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
            ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
