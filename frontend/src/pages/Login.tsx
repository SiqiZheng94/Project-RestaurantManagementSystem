import React, {useState} from 'react';
import {User} from "../model/User.ts";


type LoginProps = {
    setIsLoggedIn: (isLoggedIn: boolean | undefined) => void;
}
export default function Login (props:LoginProps){
    const [user, setUser] = useState<User>({
        username: 'admin',
        password: '',
        token: null,
    });


    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    setUser({ ...user, token: data.token });
                    localStorage.setItem('token', data.token);
                    alert('Login successful!');
                    props.setIsLoggedIn(true);
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            } else {
                alert('Login failed. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        required
                        placeholder={"admin"}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                        placeholder={"123456"}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};