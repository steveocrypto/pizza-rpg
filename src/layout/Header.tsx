import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="max-w-5xl mx-auto pt-6">
      <div className="sm:px-6 flex space-x-8">
        <Link to="/class" className="text-gray-500 hover:text-gray-50 transition">
          Class
        </Link>
        <Link to="/component" className="text-gray-500 hover:text-gray-50 transition">
          Component
        </Link>
      </div>
    </div>
  );
}
