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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();

        if (actionType === "register") {
            try {
                if (!firstName || !lastName) {
                    Swal.fire({
                        position: 'top-middle',
                        icon: 'error',
                        title: 'Registration failed',
                        text: 'Please enter your first name and last name.',
                        customClass: {
                            title: 'alert-font'
                        }
                    });
                    return;
                }

                const registeredUser = await registerUser(email, password, firstName, lastName);
                if (registeredUser) {
                    setEmail('');
                    setPassword('');
                    setFirstName('');
                    setLastName('');
                    setUserToken(registeredUser.token);
                    localStorage.setItem('userToken', JSON.stringify(registeredUser.token));
                    setUser(registeredUser.user);
                    localStorage.setItem('user', JSON.stringify(registeredUser.user));
                    Swal.fire({
                        position: 'top-middle',
                        icon: 'success',
                        title: `Registration successful. Welcome ${firstName}`,
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                            title: 'alert-font'
                        }
                    });
                    history.push('/home');
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    position: 'top-middle',
                    icon: 'error',
                    title: 'Registration failed',
                    text: 'This email is already taken. Please use another email.',
                    customClass: {
                        title: 'alert-font'
                    }
                });
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
                        title: `Welcome back ${loggedInUser.user.username}`,
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                            title: 'alert-font'
                        }
                    });
                    history.push('/home');
                }
            } catch (error) {
                console.error(error);
                Swal.fire({
                    position: 'top-middle',
                    icon: 'error',
                    title: 'Login failed',
                    text: 'An error occurred during login.',
                    customClass: {
                        title: 'alert-font'
                    }
                });
            }
        }
    }

    return (
        <form className="account-form" onSubmit={handleSubmit}>
            <h1>{actionType === "login" ? "Login" : "Register Your Account"}</h1>
            <br />
            {actionType === "register" && (
                <>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" name="firstName" className="form-input" required value={firstName} onChange={(event) => setFirstName(event.target.value)}></input>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" name="lastName" className="form-input" required value={lastName} onChange={(event) => setLastName(event.target.value)}></input>
                </>
            )}
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" name="email" className="form-input" required value={email} onChange={(event) => setEmail(event.target.value)}></input>
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" className="form-input" required value={password} onChange={(event) => setPassword(event.target.value)}></input>
            <button type="submit" className="form-button">Submit</button>
            <div>
                {actionType === 'login'
                    ? <Link to="/account/register" className="form-link">Need an account? Register here.</Link>
                    : <Link to="/account/login" className="form-link">Already have an account? Log in here</Link>
                }
            </div>
        </form>
    );

}

export default AccountForm;