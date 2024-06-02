import Logo from "../../assets/image/recything-logo.png";

const menuItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Fitur", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Partner", href: "#" }
];

export default function Navbar() {
  return (
    <div className="bg-[#E6F4FC] sticky top-0 z-10">
      <div className="flex flex-wrap items-center justify-between mx-auto py-5 px-[75px]">
        <img src={Logo} alt="Recything Logo" />
        <div className="hidden w-full md:block md:w-auto text-[24px]" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#E6F4FC] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#E6F4FC] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block py-2 px-3 text-[#616161] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-500 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent relative hover:underline decoration-primary-500 underline-offset-4"
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
