import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { LocalStorageKey } from '../../core/constants';
import './style.css';

function Login({ onLogin }: { onLogin: (id: string) => void }) {
  const { t, i18n } = useTranslation();

  // 저장 버튼 누르면 /memo 로 이동
  const navigate = useNavigate();
  // input 에 적힌 내용으로 state 설정
  const [inputs, setInputs] = useState({
    id: '',
    password: ''
  });

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleLogInClick = () => {
    if (inputs.id === '' || inputs.password === '') {
      alert(i18n.t('alert.inputIdAndPassword'));
      return;
    }

    const localDbUsers = window.localStorage.getItem(LocalStorageKey.users);

    // local 에 저장된 유저가 있고, 입력한 값과 일치하는 정보가 있으면 로그인 성공
    if (localDbUsers && localDbUsers.match(JSON.stringify(inputs))) {
      // 페이지 새로고침 시 로그인 유지하기 위해 로그인한 유저 정보 local 에 저장
      window.localStorage.setItem(LocalStorageKey.loginUser, inputs.id);
      // 콜백으로 App state 에 로그인 한 유저 정보 업데이트 -> 렌더링
      onLogin(inputs.id);
      navigate('/memo');
    } else {
      alert(i18n.t('alert.incorrectUsernameOrPassword'));
    }
  };

  return (
    <div className="login-body">
      <span> {t('input.id')} : </span>&nbsp;
      <input
        type="text"
        name="id"
        placeholder={t('input.pleaseId')}
        onChange={handleInputValue}
      />
      <br />
      <span> {t('input.password')} : </span>&nbsp;
      <input
        type="password"
        name="password"
        placeholder={t('input.pleasePassword')}
        onChange={handleInputValue}
      />
      <br />
      <button className="log-in-btn" type="button" onClick={handleLogInClick}>
        {t('button.logIn')}
      </button>
    </div>
  );
}

export default Login;
