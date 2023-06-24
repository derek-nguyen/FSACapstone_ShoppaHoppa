import React from "react";
import { Container, TextField, Button } from '@mui/material'

const Register = () => {

    // Need to create a handleSubmit function
    // Need a registration endpoint
    // Need to redirect user to page with all products

    return (
        <Container maxWidth="sm">
            <form className="registration-form">
                <h1>Register Your Account</h1>
                <br></br>
                <TextField
                    id="filled-basic"
                    label="Email"
                    required
                    fullWidth
                    className="form-field"
                    sx={{ marginBottom: "16px" }}
                >
                </TextField>
                <TextField
                    id="filled-basic"
                    label="Password"
                    required
                    fullWidth
                    className="form-field"
                    sx={{ marginBottom: "16px" }}
                >
                </TextField>
                <Button type="submit" variant="contained">Register</Button>
            </form>
        </Container>
    )
}

export default Register;