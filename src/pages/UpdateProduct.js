import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {

    const [product, setProduct] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const [categories, setCategories] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getProduct();
        getCategories();
    }, [])

    const getProduct = async () => {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleQty = (event) => {
        setQty(event.target.value);
    }

    const handleCategory = (event) => {
        setCategoryId(event.target.value);
    }

    const getCategories = async () => {
        const response = await axios.get("http://localhost:8080/categories");
        setCategories(response.data);
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "categoryId": categoryId
        }

        fetch(`http://localhost:8080/products/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            alert(response.statusText);
            return response.json();
        }).then((data) => {
            setName("");
            setPrice("");
            setQty("");
            setCategoryId("");

            console.log(data)
        }).catch(error => {
            console.log(error);
        })

    }

    return (

        <>

            <div className="container flex">
                <form class="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Update Product</legend>
                        {
                            (() => {
                                if (product !== null) {
                                    return (
                                        <><div class="form-group">
                                            <label class="col-md-4 control-label">Name</label>
                                            <div class="col-md-6">
                                                <input type="text" placeholder={product.name} class="form-control input-md" required onChange={handleName} />

                                            </div>
                                        </div><div class="form-group">
                                                <label class="col-md-4 control-label">Price</label>
                                                <div class="col-md-6">
                                                    <input type="text" placeholder={product.price} class="form-control input-md" required onChange={handlePrice} />

                                                </div>
                                            </div><div class="form-group">
                                                <label class="col-md-4 control-label">Quantity</label>
                                                <div class="col-md-6">
                                                    <input type="text" placeholder={product.qty} class="form-control input-md" required onChange={handleQty} />

                                                </div>
                                            </div><div class="form-group">
                                                <label class="col-md-4 control-label">Category Id</label>
                                                <div class="col-md-6">
                                                    <select class="form-control" onChange={handleCategory}>
                                                        <option>Please Select</option>
                                                        {categories && categories.map((category) => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div><div class="form-group">
                                                <label class="col-md-4 control-label"></label>
                                                <div class="col-md-4">
                                                    <button class="btn btn-primary" type="submit">Save Product</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            })()
                        }
                    </fieldset>
                </form>
            </div>

        </>

    )

}

export default UpdateProduct;