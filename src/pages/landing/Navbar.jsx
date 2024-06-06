import { useEffect } from "react";
import Logo from "../../assets/image/recything-logo.png";

const menuItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about-us" },
  { label: "Fitur", href: "#fitur" },
  { label: "FAQ", href: "#faq" },
  { label: "Partner", href: "#partner" }
];

export default function Navbar() {
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
  return (
    <div className="bg-[#E6F4FC] sticky top-0 z-10">
      <div className="flex flex-wrap items-center justify-between mx-auto py-5 px-[75px]">
        <img src={Logo} alt="Recything Logo" />
        <div className="hidden w-full md:block md:w-auto text-[24px]" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#E6F4FC] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#E6F4FC]">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block py-2 px-3 text-[#616161] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-500 md:p-0 relative hover:underline decoration-primary-500 underline-offset-4"
                  style={{ textDecorationSkipInk: 'skip-ink' }}
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
