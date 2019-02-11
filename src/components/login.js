import React from "react";

class Login extends React.Component {
    render() {
        return (
            <div className="login-form">
                <form>
                    <h2>Login Form</h2>
                    <div className="form-group">
                        <label for="email">User Name:</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success float-right">Login</button>
                    </div>
                    <div className="form-group">
                        <a href="javascript:void(0);">forgot password?</a>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;