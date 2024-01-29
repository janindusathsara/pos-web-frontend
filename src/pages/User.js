import axios from "axios";
import { useEffect, useState } from "react";

const User = () => {

    const [changePassword, setChangePassword] = useState(false);
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [userDetail, setUserDetail] = useState({
        id: "",
        username: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        const response = await axios.get("http://localhost:8080/getuser");
        setUserDetail(response.data);
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

    return (
        <>

            <div className="container text-center pb-10">
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

        </>
    )

}

export default User;