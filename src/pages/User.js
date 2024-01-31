import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const User = () => {

    const [changePassword, setChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [products, setProducts] = useState(null);
    const [orders, setOrders] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [userDetail, setUserDetail] = useState({
        id: "",
        username: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        getUserDetails();
        getMyProducts();
        getMyOrders();
    }, [])

    const getUserDetails = async () => {
        const response = await axios.get("http://localhost:8080/getuser");
        setUserDetail(response.data);
    }

    const getMyProducts = async () => {
        const response = await axios.get(`http://localhost:8080/users/products/${id}`);
        setProducts(response.data);
    }

    const getMyOrders = async () => {
        const response = await axios.get(`http://localhost:8080/orders/user/${id}`);
        setOrders(response.data);
    }

    const handleChangePassword = () => {
        setChangePassword(true);
    }

    const handleOldPassword = (e) => {
        setOldPassword(e.target.value);
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const data = {
            "id": userDetail.id,
            "oldPassword": oldPassword,
            "newPassword": newPassword
        }

        try {

            const response = await axios.put("http://localhost:8080/users/change-password", data)

            if (response.status === 200) {
                setChangePassword(false);
                alert("Successfully Changed");
            } else {
                alert("Incorrect Old Password")
            }

            setOldPassword(null);
            setNewPassword(null);

        } catch (error) {

            setOldPassword(null);
            setNewPassword(null);
            alert("Invalid Details");

        }

    }

    const handleProductUpdate = (e) => {
        navigate(`/user/${id}/update-product/${e.target.value}`);
    }

    const handleProductDelete = async (e) => {
        const data = {
            "productId": e.target.value
        }
        const response = await axios.put(`http://localhost:8080/products/delete/${id}`, data);
        console.log(response.data);
        getMyProducts();
    }

    return (
        <>

            <div className="container text-center mt-4">
                <div className="card">
                    <div className="card-body-user">
                        <h5 className="card-title">User</h5>
                        <h7 className="card-text">Username : {userDetail.username}</h7><br />
                        <h7 className="card-text">E-mail Address : {userDetail.email}</h7><br />
                        <button className="btn btn-secondary" onClick={handleChangePassword}>Change password</button>
                    </div>
                </div>
            </div>

            {changePassword && (

                <div className="container mt-10">
                    <form class="form-horizontal" onSubmit={handleSubmit}>
                        <fieldset>

                            <legend>Change Password</legend>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Old Password</label>
                                <div class="col-md-6">
                                    <input type="password" placeholder="Enter Your Old Password" class="form-control input-md" required onChange={handleOldPassword} value={oldPassword} />

                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">New Password</label>
                                <div class="col-md-6">
                                    <input type="password" placeholder="Enter Your New Password" class="form-control input-md" required onChange={handleNewPassword} value={newPassword} />

                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label"></label>
                                <div class="col-md-4">
                                    <button class="btn btn-primary" type="submit">Save Password</button>
                                </div>
                            </div>

                        </fieldset>
                    </form>
                </div>
            )}

            <div className="allProducts">
                <h3 className="text-center pt-5">My Products</h3>
                <div className="allProducts">
                    {products && products.map((product) => (
                        <div className="card">
                            <div className="card-body-user">
                                <h5 className="card-title">{product.name}</h5>
                                <h7 className="card-text">LKR : {product.price}</h7><br />
                                <h7 className="card-text">{product.description}</h7><br />
                                <h7 className="card-text">Remaining Qty : {product.qty}</h7><br />
                                <h7 className="card-text">Soleded Qty : {product.soldedQty}</h7><br />
                                <button className="btn btn-secondary mr-2" onClick={handleProductUpdate} value={product.id}>Update</button>
                                <button className="btn btn-danger mx-2" onClick={handleProductDelete} value={product.id}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="text-center pt-5">My Orders</h3>
                <div className="allOrders">
                    {orders && orders.map((order) => (
                        <div className="card">
                            <div className="card-body-user">
                                <h5 className="card-title">{order.id}</h5>
                                <h7 className="card-text">Date & Time : {order.orderTime}</h7><br />
                                <ul>
                                    {order.products && order.products.map((pro) => (
                                        <li>{pro.name} - LKR {pro.price}</li>
                                    ))}
                                </ul>
                                <h7 className="card-text">Total : {order.total}</h7><br />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

}

export default User;