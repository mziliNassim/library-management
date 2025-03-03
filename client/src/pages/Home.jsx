import { BookOpen } from "lucide-react";
import { team } from "../services/data"; // Adjust the path as needed

import { FaLinkedin, FaGithub, FaUser } from "react-icons/fa";

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
        {/* Background image with overlay that respects theme */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Curved overlay - using CSS variables for colors */}
        <div className="absolute inset-0 z-10">
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
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="max-w-4xl">
            <h1
              className="text-5xl md:text-6xl font-bold mb-6  text-gray-900 dark:text-gray-100"
              style={animatedTextStyle}
            >
              Welcome to LibriTech
            </h1>

            <p className="text-xl md:text-2xl mb-10 text-gray-700 dark:text-gray-300">
              Revolutionizing your digital library experience
            </p>

            <button className="px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-lg text-white bg-[#7e22ce]">
              Get Started
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute right-1/4 top-1/4 rounded-full h-16 w-16 opacity-70"></div>
          <div className="absolute left-1/3 bottom-1/3 rounded-full h-24 w-24 opacity-70"></div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <BookOpen className="h-10 w-10 text-white" />
        </div>
      </section>

      {/* ===================================
          SERVICES SECTION
      ==================================== */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#8961b3]">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 max-w-6xl mx-auto">
          {/* Service Card 1 */}
          <div className="shadow-md p-6 rounded-lg text-center bg-white dark:bg-[#1e293b]">
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
          <div className="shadow-md p-6 rounded-lg text-center bg-white dark:bg-[#1e293b]">
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
          <div className="shadow-md p-6 rounded-lg text-center bg-white dark:bg-[#1e293b]">
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
            team.map((member, index) => {
              return (
                <div
                  key={index}
                  target="_blank"
                  className="w-64 shadow-lg rounded-lg overflow-hidden bg-gray-50 dark:bg-[#1e293b] py-4"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                  />

                  <div className="p-6">
                    <h3 className="text-xl font-semibold  text-gray-950 dark:text-gray-50">
                      {member.name}
                    </h3>
                    <p className="text-gray-950 dark:text-gray-500">
                      {member.role}
                    </p>
                  </div>

                  <div className="flex justify-center space-x-4">
                    {/* github */}
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full inline-block bg-[#8961b3] opacity-80"
                    >
                      <FaGithub />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full inline-block bg-[#8961b3] opacity-80"
                    >
                      <FaLinkedin />
                    </a>

                    {/* Portfolio */}
                    <a
                      href={member.socials.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full inline-block bg-[#8961b3] opacity-80"
                    >
                      <FaUser />
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}

export default Home;
