import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <footer className="transition duration-300 bg-white dark:bg-[#111827] text-gray-950 dark:text-white shadow-inner">
      <div className="container w-10/12  mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold">LibriTech</h3>
            <p className="text-sm mt-2">
              Empowering the future through innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {["About Us", "Services", "Blog"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-3 space-y-2">
              {["Help Center", "Contact Us", "FAQ"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2">
              {["Privacy Policy", "Terms of Service"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={
                      item === "Privacy Policy"
                        ? "/privacy-policy"
                        : "/terms-of-service"
                    }
                    className="transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center transition"
          style={{
            borderColor: "var(--primary-color)",
          }}
        >
          <p className="text-sm">
            © {new Date().getFullYear()} LibriTech. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {[
              { icon: <FaTwitter />, href: "https://twitter.com" },
              { icon: <FaLinkedin />, href: "https://linkedin.com" },
              { icon: <FaGithub />, href: "https://github.com" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-xl transition"
                style={{
                  color: "var(--primary-color)",
                }}
                aria-label="Social Link"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
