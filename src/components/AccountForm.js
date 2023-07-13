import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom"
import { registerUser, loginUser } from "../axios-services";
import Swal from 'sweetalert2';

const AccountForm = (props) => {

    const { setUserToken, setUser } = props;
    const params = useParams();
    const { actionType } = params;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();

        if (actionType === "register") {
            try {
                const registeredUser = await registerUser(email, password);
                if (registeredUser) {
                    setEmail('');
                    setPassword('');
                    setUserToken(registeredUser.token);
                    localStorage.setItem('userToken', JSON.stringify(registeredUser.token));
                    setUser(registeredUser.user);
                    localStorage.setItem('user', JSON.stringify(registeredUser.user));
                    Swal.fire({
                        position: 'top-middle',
                        icon: 'success',
                        title: ` Registration successful. Welcome ${registeredUser.user.username}`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                    history.push('/products');
                }
            } catch (error) {
                console.error(error);
                alert(error)
            }
        } else if (actionType === "login") {
            try {
                const loggedInUser = await loginUser(email, password);
                if (loggedInUser) {
                    setEmail('');
                    setPassword('');
                    setUserToken(loggedInUser.token);
                    localStorage.setItem('userToken', JSON.stringify(loggedInUser.token));
                    setUser(loggedInUser.user);
                    localStorage.setItem('user', JSON.stringify(loggedInUser.user));
                    Swal.fire({
                        position: 'top-middle',
                        icon: 'success',
                        title: ` Welcome back ${loggedInUser.user.username}`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                    history.push('/products');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (

        <form className="account-form" onSubmit={handleSubmit}>
            <h1>{actionType === "login" ? "Login" : "Register Your Account"}</h1>
            <br></br>
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" name="email" className="form-input" required value={email} onChange={(event) => setEmail(event.target.value)}></input>
            <label htmlFor="password" className="form-label" >Password</label>
            <input type="password" name="password" className="form-input" required value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <button type="submit" className="form-button">Submit</button>
            <div>
                {actionType === 'login'
                    ? <Link to="/account/register" className="form-link">Need an account? Register here.</Link>
                    : <Link to="/account/login" className="form-link">Already have an account? Log in here</Link>
                }
            </div>
        </form>
    )
}

export default AccountForm;