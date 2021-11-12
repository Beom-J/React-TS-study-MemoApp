import React, { useState } from 'react';
import { User } from '../Types/Types';

type logInProps = {
  users: User[];
  onClickLogInButton: (isSavedUser: User | undefined) => void;
};

const LogedOut = ({ users, onClickLogInButton }: logInProps) => {
  const [inputs, setInputs] = useState({
    ID: '',
    pwd: ''
  });

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleLogInButton = () => {
    if (inputs.ID === '' || inputs.pwd === '') {
      alert('ID 와 비밀번호를 입력하세요.');
    }
    const isSavedUser: User | undefined = users.find((user) => {
      return JSON.stringify(user) === JSON.stringify(inputs);
    });
    onClickLogInButton(isSavedUser);
  };

  return (
    <>
      <span> ID : </span>&nbsp;
      <input
        type="text"
        name="ID"
        placeholder="ID를 입력하세요"
        onChange={handleInputValue}
      />
      &nbsp; &nbsp;
      <span> 비밀번호 : </span>&nbsp;
      <input
        type="password"
        name="pwd"
        placeholder="비밀번호를 입력하세요"
        onChange={handleInputValue}
      />
      <button className="log-in-btn" type="button" onClick={handleLogInButton}>
        Log-In
      </button>
    </>
  );
};

export default LogedOut;
