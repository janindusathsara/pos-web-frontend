import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qty, setQty] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const {id} = useParams();
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        getCategories();
    }, [])

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleQty = (event) => {
        setQty(event.target.value);
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
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
            "categoryId": categoryId,
        }

        const response = await axios.post(`http://localhost:8080/products/${id}`, data);

        if (response.status === 201) {
            alert("Success");
        } else {
            alert("error")
            console.log(response.data)
        }
        
        setName("");
        setPrice("");
        setQty("");
        setCategoryId("");
        setDescription("");

    }

    return (
        <>
            <div className="container flex">
                <form class="form-horizontal" onSubmit={handleSubmit}>
                    <fieldset>

                        <legend>Create New Product</legend>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="text" placeholder="Enter Product Name" class="form-control input-md" required onChange={handleName} value={name} />

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-6">
                                <textarea class="form-control" required onChange={handleDescription} value={description}></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price</label>
                            <div class="col-md-6">
                                <input type="text" placeholder="Enter Product Price" class="form-control input-md" required onChange={handlePrice} value={price} />

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label" >Quantity</label>
                            <div class="col-md-6">
                                <input type="text" placeholder="Enter Product Qty" class="form-control input-md" required onChange={handleQty} value={qty} />

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Category Id</label>
                            <div class="col-md-6">
                                <select class="form-control" onChange={handleCategory}>
                                    <option>Please Select</option>
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

export default Product;