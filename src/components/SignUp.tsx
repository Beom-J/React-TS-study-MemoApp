import React, { ChangeEvent, useState } from 'react';
import '../css/SignUp.css';

type props = {
  onClickSaveButton: () => void;
};

const SignUp = ({ onClickSaveButton }: props) => {
  const [inputs, setInputs] = useState({
    ID: '',
    pwd: ''
  });

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSaveUser = () => {
    if (inputs.ID === '' || inputs.pwd === '') {
      alert('빈칸을 채워주세요');
      return;
    }
    // 로컬 스토리지에 저장
    window.localStorage.setItem(inputs.ID, inputs.pwd);
    onClickSaveButton();
  };

  return (
    <div className="sign-up">
      <h3>회원가입을 환영합니다!</h3>
      <span>ID : </span>
      <input
        type="text"
        name="ID"
        placeholder="ID 를 입력하세요"
        onChange={handleDataChange}
      />
      <br />
      <span>비밀번호 : </span>
      <input
        type="password"
        name="pwd"
        placeholder="비밀번호를 입력하세요"
        onChange={handleDataChange}
      />
      <br />
      <button type="button" onClick={handleSaveUser}>
        저장
      </button>
    </div>
  );
};

export default SignUp;
