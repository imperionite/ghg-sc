import { Facebook, Instagram, LinkedIn, GitHub } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Icon from "@mui/material/Icon";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://github.com/imperionite/ghg",
    icon: <LinkedIn fontSize="large" />,
  },
  {
    name: "Facebook",
    href: "https://github.com/imperionite/ghg",
    icon: <Facebook fontSize="large" />,
  },
  {
    name: "Instagram",
    href: "https://github.com/imperionite/ghg",
    icon: <Instagram fontSize="large" />,
  },
  {
    name: "X",
    href: "https://github.com/imperionite/ghg",
    icon: (
      <Icon fontSize="large" sx={{ fontWeight: "bold", fontSize: 30 }}>
        𝕏
      </Icon>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/imperionite/ghg",
    icon: <GitHub fontSize="large" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-200 text-center py-8 px-4 mt-auto">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm mb-4">
          <strong>GHG-Scout PH</strong> — A project extension of{" "}
          <strong>
            <a
              href="https://github.com/imperionite/ghg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              GHG Data Explorer PH
            </a>
          </strong>
          , coded as a test version with 💚 by{" "}
          <strong>
            <a
              href="https://github.com/imperionite"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              Arnel Imperial
            </a>
          </strong>
          <br />
          Built as a course project for <em>
            People and Earth's Ecosystems
          </em>{" "}
          at MMDC.
        </p>
        <p className="mt-2 text-xs max-w-xl mx-auto mb-6">
          Empowering local communities to track and interpret greenhouse gas
          emissions. Your data helps raise awareness and fight climate change in
          the Philippines.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6">
          {socialLinks.map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="text-neutral-300 hover:text-amber-400 transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
