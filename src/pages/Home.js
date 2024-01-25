import { Link } from "react-router-dom";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])

    const getProducts = async () => {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data);
    }

    const getCategories = async () => {
        const response = await axios.get("http://localhost:8080/categories");
        setCategories(response.data);
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            {categories && categories.map((category) => (
                                <li class="nav-item">
                                    <Link to={`/categories/${category.id}/products`} className="nav-link">{category.name}</Link>
                                </li>
                            ))}
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Category
                                </a>
                                <ul class="dropdown-menu">
                                    {categories && categories.map((category) => (
                                        <li class="dropdown-item">
                                            <Link to={`/categories/${category.id}/products`} className="nav-link">{category.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li class="nav-item">
                                <Link to={`/checkout`} className="nav-link">Checkout</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={`/categories`} className="nav-link">Category</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <h1>Home</h1>

            <ul>
                <li>
                    <Link to="/products">Products</Link>
                </li>
            </ul>

            <ol>
                {products && products.map((product) => (
                    <li>
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ol>


        </>
    )

}

export default Home;