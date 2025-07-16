export default function Footer() {
  return (
    <footer className="w-full bg-gray-200 border-t-2 border-solid border-gray-400">
      <div className="cs-container py-8">
        <div className="grid grid-cols-4">
          {/* Footer links */}
          <ul className="flex-col flex gap-4">
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Getting Here
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                FAQs
              </a>
            </li>
          </ul>

          {/* Footer links */}
          <ul className="flex-col flex gap-4">
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Places to Stay
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Things to Do
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Events Calendar
              </a>
            </li>
          </ul>

          {/* Footer links */}
          <ul className="flex-col flex gap-4">
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Restaurants
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Nightlife
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Shopping
              </a>
            </li>
          </ul>

          {/* Footer links */}
          <ul className="flex-col flex gap-4">
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Plan Your Trip
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-800 font-medium hover:text-gray-600 transition-colors duration-300"
              >
                Newsletter Signup
              </a>
            </li>
          </ul>
        </div>
        <p className="text-center pt-8 text-gray-800 font-medium">
          2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
