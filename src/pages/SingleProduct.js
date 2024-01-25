import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {

    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById();
    },[])

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
    }

    return(
        <>
            {product &&
                <div>
                    <h2>{product.name}</h2>
                    <div>LKR {product.price}</div>
                    <div>Stock: {product.qty}</div>
                </div>
            }
        </>
    )

}

export default SingleProduct;