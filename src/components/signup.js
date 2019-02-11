import React from "react";

class SignUp extends React.Component {
    render() {
        return (
            <div className="login-form">
                <form>
                    <h2>Sign Up Form</h2>
                    <div className="form-group">
                        <label for="fname">First Name:</label>
                        <input type="text" className="form-control" id="fname" />
                    </div>
                    <div className="form-group">
                        <label for="lname">Last Name:</label>
                        <input type="text" className="form-control" id="lname" />
                    </div>
                    <div className="form-group">
                        <label for="name">User Name:</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label for="email">Email Id:</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd" />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Confirm Password:</label>
                        <input type="password" className="form-control" id="pwd" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success float-right">Submit</button>
                    </div>
                    <div className="form-group">
                        <a href="javascript:void(0);">Login</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;