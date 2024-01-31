import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {

    const [product, setProduct] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        qty: "",
        soldedQty: "",
        category: {
            id: "",
            name: ""
        }
    });
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [qty, setQty] = useState(null);
    const [categoryId, setCategoryId] = useState(product.category.id);
    const navigate = useNavigate();

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

    const handleDescription = (event) => {
        setDescription(event.target.value);
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

    const handleSubmit = async (event) => {

        event.preventDefault();

        const data = {
            "name": name,
            "price": price,
            "qty": qty,
            "description": description,
            "categoryId": categoryId
        }

        const response = await axios.put(`http://localhost:8080/products/${id}`,data);
        console.log(response.data);
        if (response.status === 200) {
            navigate(-1);
        } else {
            setName("");
            setDescription("");
            setPrice("");
            setQty("");
            setCategoryId("");
        }

    }

    return (

        <>

            <div className="container flex">
                <form class="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Update Product</legend>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="text" placeholder={product.name} class="form-control input-md" required onChange={handleName} value={name}/>

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <textarea class="form-control" required onChange={handleDescription} value={description}>{product.description}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price</label>
                            <div class="col-md-6">
                                <input type="text" placeholder={product.price} class="form-control input-md" required onChange={handlePrice} value={price} />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Quantity</label>
                            <div class="col-md-6">
                                <input type="text" placeholder={product.qty} class="form-control input-md" required onChange={handleQty} value={qty} />
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Category Id</label>
                            <div class="col-md-6">
                                <select class="form-control" onChange={handleCategory}>
                                    <option>Please select - {product.category.name}</option>
                                    {categories && categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label"></label>
                            <div class="col-md-4">
                                <button class="btn btn-primary" type="submit">Save Product</button>
                            </div>
                        </div>

                    </fieldset>
                </form>
            </div>

        </>

    )

}

export default UpdateProduct;