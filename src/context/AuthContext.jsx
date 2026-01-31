import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('popx_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    const existingUsers = JSON.parse(localStorage.getItem('popx_users') || '[]');
    const userExists = existingUsers.find(u => u.email === userData.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const newUser = { ...userData, id: Date.now().toString() };
    localStorage.setItem('popx_users', JSON.stringify([...existingUsers, newUser]));
    localStorage.setItem('popx_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('popx_users') || '[]');
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    localStorage.setItem('popx_user', JSON.stringify(foundUser));
    setUser(foundUser);
  };

  const logout = () => {
    localStorage.removeItem('popx_user');
    setUser(null);
  };

  const updateUser = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('popx_user', JSON.stringify(updatedUser));

    const existingUsers = JSON.parse(localStorage.getItem('popx_users') || '[]');
    const newUsersList = existingUsers.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('popx_users', JSON.stringify(newUsersList));
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
