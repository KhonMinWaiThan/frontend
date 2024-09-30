// src/components/CategorySidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const categories = ['All', 'Toys', 'Food', 'Accessories']; // Example categories

const CategorySidebar = ({ setSelectedCategory }) => {
    const navigate = useNavigate(); // For navigating to the product list page

    const handleCategoryClick = (category) => {
        console.log(`Category clicked: ${category}`); // Log which category was clicked
        setSelectedCategory(category); // Set the selected category in the parent component
        navigate('/products'); // Navigate to the products page
    };

    return (
        <div className="sidebar">
            <h4>Categories</h4>
            <ul className="list-group">
                {categories.map((category) => (
                    <li
                        key={category}
                        className="list-group-item"
                        onClick={() => handleCategoryClick(category)} // Handle click event to select category
                        style={{ cursor: 'pointer' }} // Change cursor style for clarity
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategorySidebar;
