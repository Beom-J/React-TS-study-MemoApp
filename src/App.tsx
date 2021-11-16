import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes } from 'react-router-dom';
import dayjs from 'dayjs';
import Logout from './components/Logout';
import { LanguageKey, LocalStorageKey } from './core/constants';
import Dayjs from './pages/Dayjs';
import Login from './pages/Login';
import Memo from './pages/Memo';
import SignUp from './pages/SignUp';
import './style/GlobalStyle.css';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguageToKo = () => {
    i18n.changeLanguage(LanguageKey.KO);
    dayjs.locale(LanguageKey.KO);
  };

  const changeLanguageToEn = () => {
    i18n.changeLanguage(LanguageKey.EN);
    dayjs.locale(LanguageKey.EN);
  };

  const [loginUserId, setLoginUserId] = useState(
    // 로컬 스토리지에 로그인한 아이디가 없으면 ''
    window.localStorage.getItem(LocalStorageKey.loginUser) || ''
  );

  const handleLogOutClick = () => {
    // 로그아웃 하면 local 정보 지우기
    window.localStorage.removeItem(LocalStorageKey.loginUser);
    // state 정보도 리셋 -> 렌더링
    setLoginUserId('');
  };

  return (
    <div className="warrap-app">
      <nav className="nav">
        <div>
          <Link to="/signup">{t('button.signUp')}</Link>
          &nbsp;&nbsp;
          <Link to="/dayjs">{t('button.dayjs')}</Link>
        </div>
        <button className="en" type="button" onClick={changeLanguageToEn}>
          English
        </button>
        <button className="ko" type="button" onClick={changeLanguageToKo}>
          한국어
        </button>
        <div className="log-in">
          {loginUserId ? (
            <Logout
              userId={loginUserId}
              onClickLogOutButton={handleLogOutClick}
            />
          ) : (
            <Link to="/login">{t('button.logIn')}</Link>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Memo userId={loginUserId} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dayjs" element={<Dayjs />} />
        <Route path="/login" element={<Login onLogin={setLoginUserId} />} />
        <Route path="/memo/*" element={<Memo userId={loginUserId} />} />
      </Routes>
    </div>
  );
}

export default App;
