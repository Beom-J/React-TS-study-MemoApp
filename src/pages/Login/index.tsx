import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { LocalStorageKey } from '../../core/constants';
import './style.css';

function Login({ onLogin }: { onLogin: (id: string) => void }) {
  const navigate = useNavigate();
  const [userForm, setUserForm] = useState({
    id: '',
    password: ''
  });

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserForm({
      ...userForm,
      [name]: value
    });
  };

  const handleLogInClick = () => {
    if (userForm.id === '' || userForm.password === '') {
      alert('ID 와 비밀번호를 입력하세요.');
      return;
    }

    // localStorages 비교 처리 추가하자!!

    window.localStorage.setItem(LocalStorageKey.loginUser, userForm.id);
    onLogin(userForm.id);
    navigate('/memo');
  };

  return (
    <section className="loginbody">
      <div className="form-field">
        <span> ID : </span>&nbsp;
        <input
          type="text"
          name="id"
          placeholder="ID를 입력하세요"
          onChange={handleInputValue}
        />
      </div>
      <div className="form-field">
        <span> 비밀번호 : </span>&nbsp;
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력하세요"
          onChange={handleInputValue}
        />
      </div>
      <button className="log-in-btn" type="button" onClick={handleLogInClick}>
        Log-In
      </button>
    </section>
  );
}

export default Login;
