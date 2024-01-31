import { useState } from "react";
import './Styles.css';
import axios from "axios";

const Category = () => {

    const [name, setName] = useState(null);

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "name": name
        }

        const response = await axios.post("http://localhost:8080/categories", data);
        if (response.status === 200) {
            setName("");
        } else {
            console.log(response.data);
        }

    }

    return (

        <>
            <div className="text-center mb-4 mt-4">
                <h3>Create New Category</h3>
            </div>
            <div className="container forms">
                <form class="form" onSubmit={handleSubmit}>
                    <div class="form-group mb-3">
                        <label class="col-md-4 control-label" >Name</label>
                        <div class="form-group mb-3">
                            <input type="text" placeholder="Enter Category Name" class="form-control input-md" required onChange={handleName} value={name} />

                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <div class="col-md-6">
                            <button class="btn btn-primary">Save Category</button>
                        </div>
                    </div>

                </form>
            </div>
        </>

    )

}

export default Category;