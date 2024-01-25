import axios from "axios";
import './CategoryProduct.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryProduct = () => {

    const { id } = useParams();
    const [products, setProducts] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        getCategoryById();
        getProductByCategory();
    }, [])

    const getProductByCategory = async () => {
        const response = await axios.get(`http://localhost:8080/categories/${id}/products`);
        setProducts(response.data);
    }

    const getCategoryById = async () => {
        const response = await axios.get(`http://localhost:8080/categories/${id}`);
        setCategory(response.data);
    }

    return (
        <>

            <div className="row">
                {category &&
                    <h2 className="container text-center">{category.name}</h2>
                }
            </div>
            <div className="products-row">
                {products && products.map(product => (
                    <div className="card col-lg-3 col-sm-6">
                        <h5 className="card-title">{product.name}</h5>
                        <div className="card-text">LKR {product.price}</div>
                        <div className="card-text">Stock: {product.qty}</div>
                    </div>
                ))}
            </div>

        </>

    )

}

export default CategoryProduct;