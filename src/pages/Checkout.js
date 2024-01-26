import axios from "axios";
import { useEffect, useState } from "react";

const Checkout = () => {

    const [products, setProducts] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const getProducts = async () => {
        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    const createOrder = async () => {

        const productIds = orderProducts.map(obj => obj.id);
        const data = {
            products: productIds
        }

        const response = await axios.post("http://localhost:8080/orders", data);
        if(response.status === 201) {
            setOrderProducts([]);
            setTotal(0);
        } else {
            
        }

    }

    return (
        <>
            <div className="container-fluid">
                <h1>Checking Out</h1>
                <div className="row">

                    <div class="col-sm-6 mb-3 mb-sm-0">

                        {products && products.map(product => (
                            <div class="card col-sm-4 mb-3 mb-sm-0">
                                <div class="card-body">
                                    <h5 class="card-title">{product.name}</h5>
                                    <p class="card-text">LKR {product.price}</p>
                                    <button className="btn btn-sm btn-primary" onClick={() => {
                                        setOrderProducts([...orderProducts, product]);

                                        let currentTotal = total;
                                        currentTotal = currentTotal + product.price;
                                        setTotal(currentTotal);
                                    }}>Add to Cart</button>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="col-md-6">
                        <h2>Order</h2>

                        <table className="table table-stripped">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>

                                {orderProducts && orderProducts.map(product => (
                                    <tr>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                    </tr>
                                ))}

                            </tbody>
                            <thead>
                                <tr>
                                    <th colSpan={2}>
                                        Total
                                    </th>
                                    <th>
                                        {total}
                                    </th>
                                </tr>

                            </thead>
                        </table>

                        <button className="btn btn-secondary" onClick={createOrder}>Complete Order</button>
                    </div>
                </div>

            </div>
        </>
    )

}

export default Checkout;