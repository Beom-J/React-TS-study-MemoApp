import React, { useState } from 'react';

type logInProps = {
  user: Map<string, string>;
  onClick: (isSavedUser: boolean) => void;
};

const LogedOut = ({ user, onClick }: logInProps) => {
  //   const [userInfo, setUserInfo] = useState({
  //     ID: '',
  //     pwd: ''
  //   });

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
