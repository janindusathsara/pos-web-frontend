import { useState } from "react";
import './Category.css';

const Category = () => {

    const [name, setName] = useState(null);

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            "name": name
        }

        fetch("http://localhost:8080/categories", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setName('');
            console.log(data)
        }).catch(error => {
            console.log(error);
        })

    }

    return (

        <>

            <form class="form-horizontal" onSubmit={handleSubmit}>
                <fieldset>

                    <legend>Create New Category</legend>

                    <div class="form-group">
                        <label class="col-md-4 control-label" >Name</label>
                        <div class="col-md-5">
                            <input type="text" placeholder="Enter Category Name" class="form-control input-md" required onChange={handleName} value={name} />

                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label" for=""></label>
                        <div class="col-md-4">
                            <button class="btn btn-primary">Save Category</button>
                        </div>
                    </div>

                </fieldset>
            </form>

        </>

    )

}

export default Category;