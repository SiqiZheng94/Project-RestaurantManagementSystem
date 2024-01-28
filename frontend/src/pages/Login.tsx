import React, { useState } from 'react';

interface User {
    username: string;
    password: string;
    token: string | null;
}

const Login: React.FC = () => {
    const [user, setUser] = useState<User>({
        username: 'admin',  // 设置用户名为 'admin'
        password: '123456', // 设置密码为 '123456'
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
                    alert('Login successful!');
                    // 在这里可以添加重定向或其他操作
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
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
