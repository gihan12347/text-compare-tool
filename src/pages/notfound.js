import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="text-center">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-yellow-500" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">404 - Page Not Found</h1>
        <p className="mt-2 text-base text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
