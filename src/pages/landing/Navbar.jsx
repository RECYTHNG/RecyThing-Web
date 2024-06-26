import { useEffect, useState } from "react";
import Logo from "../../assets/image/recything-logo.png";
import menuIcon from "../../assets/svg/burger.svg";  // Add a menu icon for mobile view

const menuItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about-us" },
  { label: "Fitur", href: "#fitur" },
  { label: "FAQ", href: "#faq" },
  { label: "Partner", href: "#partner" }
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleAnchorClick = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth"
        });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-[#E6F4FC] sticky top-0 z-10">
      <div className="flex flex-wrap items-center justify-between mx-auto py-5 px-4 md:px-[75px]">
        <img src={Logo} alt="Recything Logo" className="h-8 md:h-auto" />
        <button
          className="text-[#616161] md:hidden"
          onClick={toggleMenu}
        >
          <img src={menuIcon} alt="Menu Icon" className="h-6 w-6" />
        </button>
        <div className={`${menuOpen ? "block" : "hidden"} w-full md:block md:w-auto text-[18px] md:text-[24px]`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#E6F4FC] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#E6F4FC]">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block py-2 px-3 text-[#616161] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-500 md:p-0 relative hover:underline decoration-primary-500 underline-offset-4"
                  style={{ textDecorationSkipInk: 'skip-ink' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
