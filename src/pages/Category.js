import axios from "axios";
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
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Category Name</label>
                    <input type="text" required className="form-control" onChange={handleName} value={name} />
                </div>
                <button className="btn btn-primary" type="submit">Save Category</button>
            </form>

        </>

    )

}

export default Category;