import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import LoginUserInfo from './components/login/LoginUserInfo';
import { LocalStorageKey } from './core/constants';
import Login from './pages/Login';
import Memo from './pages/Memo';
import SignUp from './pages/SignUp';
import './style/GlobalStyle.css';

function App() {
  const [loginUserId, setLoginUserId] = useState(
    // 로컬 스토리지에 로그인한 아이디가 없으면 ''
    window.localStorage.getItem(LocalStorageKey.loginUser) || ''
  );

  const handleLogOutClick = () => {
    window.localStorage.removeItem(LocalStorageKey.loginUser);
    setLoginUserId('');
  };

  return (
    <div className="warrap-app">
      <nav className="nav">
        <div>
          <Link to="/signup">회원가입</Link>
        </div>
        <div className="log-in">
          {loginUserId ? (
            <LoginUserInfo
              userId={loginUserId}
              onClickLogOutButton={handleLogOutClick}
            />
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Memo userId={loginUserId} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login onLogin={setLoginUserId} />} />
        <Route path="/memo" element={<Memo userId={loginUserId} />} />
      </Routes>
    </div>
  );
}

export default App;
