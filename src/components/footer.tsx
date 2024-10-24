import Link from "next/link";
import { FaTwitter } from "react-icons/fa"; // Importar iconos

export const FooterV0 = () => {
  return (
    <footer className="bg-[#23213a] rounded-l shadow">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center">
          © 2024
          <a href="#" className="hover:underline">
            XFY D-Money™
          </a>
          All Rights Reserved.
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-white sm:mt-0">
          <li>
            <Link
              href="/"
              className="flex items-center me-4 hover:underline md:me-6"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="flex items-center me-4 hover:underline md:me-6"
            >
              Licensing
            </Link>
          </li>

          <li>
            <a
              href="https://x.com/XFYMoney"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center me-4 hover:underline md:me-6 px-4"
            >
              <FaTwitter className="mr-1" /> {/* Icono para "Twitter" */}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
