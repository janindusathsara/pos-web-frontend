import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DropdownCategory = () => {

    const [categories, setCategories] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {

        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
        }

    }

    return (
        <div>
            <ul className="flex flex-col dropdownCategory">
                <li className="flex flex-col gap-4 createNewCategory">
                    <Link to={`/categories`} className="nav-link">Create New Category</Link>
                </li>
                {categories && categories.map((category) => (
                    <li className="flex flex-col gap-4">
                        <Link to={`/categories/${category.id}/products`} className="nav-link">{category.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default DropdownCategory;