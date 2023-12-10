"use client"
// Import necessary modules and components
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

// Define the props interface for the Category component
interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

// Define the functional component Category with React.FC and provided props
const Category: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {
  // Access the Next.js router and search parameters hook
  const router = useRouter();
  const params = useSearchParams();

  // Define a callback function to handle category click events
  const handleClick = useCallback(() => {
    // Check if the clicked category is "All"
    if (label === "All") {
      // If "All" is clicked, navigate to the root path "/"
      router.push("/");
    } else {
      // If another category is clicked, update the query parameters
      // Parse existing query parameters using query-string library
      let currentQuery = {};
      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      // Update the query with the clicked category
      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      // Serialize the updated query parameters to a URL string
      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      // Navigate to the updated URL
      router.push(url);
    }
  }, [label, params, router]);

  // Render the Category component with conditional styling based on "selected" prop
  return (
    <div
      className={`flex items-center text-center justify-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? "border-b-800 text-slate-800"
          : "border-transparent text-slate-500"
      }`}
      onClick={handleClick} // Attach the click handler to the component
    >
      <Icon size={20} /> {/* Render the category icon */}
      <div className="font-medium text-sm">{label}</div> {/* Render the category label */}
    </div>
  );
};

// Export the Category component as the default export
export default Category;
