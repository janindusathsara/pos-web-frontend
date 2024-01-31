import { Link, useNavigate } from "react-router-dom";
import './Styles.css';
import { useEffect, useState } from "react";
import axios from "axios";
import DropdownCategory from "./DropdownCategory";

const Home = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [catagory, setCategory] = useState(false);
    const [cursor, setCursor] = useState('pointer');
    const [userDetail, setUserDetail] = useState({
        id: "",
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        getUserDetails();
        getProducts();
        getCategories();
    }, [])

    const changeCursor = () => {
        setCategory((prev) => !prev)
        setCursor(prevState => {
            return 'pointer';
        });
    }

    const getUserDetails = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getuser");
            setUserDetail(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
        }
    }

    const getProducts = async () => {

        const response = await axios.get("http://localhost:8080/products");
        setProducts(response.data);

    }

    const getCategories = async () => {

        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/login");
            }
        }

    }

    const handleDropDown = () => {
        setCategory(true);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    const handleUser = () => {
        setCursor(() => {
            return 'pointer';
        });
        navigate(`/user/${userDetail.id}`);
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse topnav-right" id="navbarNav">
                        <ul class="navbar-nav justify-content-end">
                            <li class="nav-item" onClick={changeCursor} style={{ cursor: cursor }}>
                                <h7 className="nav-link navCategory" >Category</h7>
                            </li>
                            <li class="nav-item dropdown">
                                {catagory && (
                                    <DropdownCategory />
                                )}
                            </li>

                            <li class="nav-item">
                                <Link to={`/checkout/${userDetail.id}`} className="nav-link">Checkout</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={`/products/${userDetail.id}`} className="nav-link">New Product</Link>
                            </li>
                            <li class="nav-item px-2" onClick={handleUser} style={{ cursor: cursor }}>
                                <h7 className="nav-link navCategory">User</h7>
                            </li>
                            <li className="nav-item px-2">
                                <button className="btn btn-danger" onClick={handleLogout} >Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <h2 className="text-center my-2">POS - SYSTEM</h2>
            <div className="allProducts">

                {products && products.map((product) => (

                    <div className="card col-lg-3 col-sm-6 border-primary-subtle" >
                        <h5 className="card-title">{product.name}</h5>
                        <div className="card-text">{product.description}</div>
                        <div className="card-text">LKR {product.price}</div>
                        <div className="card-text">Stock: {product.qty}</div>

                    </div>
                    
                ))}


            </div>

        </>
    )

}

export default Home;