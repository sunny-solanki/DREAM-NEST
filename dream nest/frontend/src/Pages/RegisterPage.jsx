/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.scss"

const RegisterPage = () => {

    const url = "https://dream-nest-guuf.onrender.com/auth";
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    });

    const onChangeHandler = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === 'profileImage' ? files[0] : value
        })
    }

    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const register_form = new FormData();
            for (let key in formData) {
                register_form.append(key, formData[key]);
            }

            const response = await axios.post(`${url}/register`, register_form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="register">
            <div className="register_content">
                <form className="register_content_form" onSubmit={handleSubmit}>
                    <input
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={onChangeHandler}
                        required
                    />
                    <input
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={onChangeHandler}
                        required
                    />
                    {!passwordMatch && (
                        <p style={{ color: 'red' }}>Passwords do not match</p>
                    )}
                    <input
                        id="image"
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={onChangeHandler}
                        style={{ display: "none" }}
                        required
                    />
                    <label htmlFor="image" style={{ cursor: 'pointer' }}>
                        <img src="/assets/addImage.png" alt="add profile photo" />
                        <p>Upload Your Photo</p>
                    </label>

                    {formData.profileImage && (
                        <img src={URL.createObjectURL(formData.profileImage)} alt="profile photo" style={{ maxWidth: "80px" }} />
                    )}

                    <button type="submit" disabled={!passwordMatch}>REGISTER</button>
                </form>
                <a href="/login">Already have an account? Log In Here</a>
            </div>
        </div>
    )
}

export default RegisterPage