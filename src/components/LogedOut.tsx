import React, { useState } from 'react';

type logInProps = {
  userList: user[];
  onClickLogInButton: (isSavedUser: user | undefined) => void;
};

export type user = {
  ID: string;
  pwd: string;
};

const LogedOut = ({ userList, onClickLogInButton }: logInProps) => {
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
    console.log('userList ::', userList);
    const isSavedUser: user | undefined = userList.find((user) => {
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
