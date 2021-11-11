import { useState } from 'react';
import './App.css';
import LogedIn from './components/LogedIn';
import LogedOut from './components/LogedOut';
import MemoWrap from './components/MemoWrap';
import SignUp from './components/SignUp';
import { user } from './Types';

function getUserList() {
  const userIDs: string[] = Object.keys(window.localStorage);
  const userList: user[] = userIDs.map((key) => {
    return {
      ID: key,
      pwd: window.localStorage.getItem(key) || ''
    };
  });
  return userList;
}

function App() {
  // 페이지 전환용 boolean
  const [isLoggedIn, setLogin] = useState(false);
  const [isNeedSignUp, setSignUp] = useState(false);

  // local Storage 에 저장된 유저 리스트 목록
  const savedUserList = getUserList();

  // 현재 로그인한 유저 정보
  const [loggedUser, setLoggedUser] = useState({
    ID: '',
    pwd: ''
  });

  const handleClickLogInButton = (isSavedUser: user | undefined) => {
    if (!isSavedUser) {
      alert('등록된 회원이 아닙니다.');
      return;
    }
    setLoggedUser(isSavedUser);
    setLogin(true);
    setSignUp(false);
  };

  const handleSignUpButton = () => {
    setSignUp(true);
  };

  const handleSaveUserButton = () => {
    setSignUp(false);
  };

  const handleLogOutButton = () => {
    setLoggedUser({ ID: '', pwd: '' });
    setLogin(false);
  };

  return (
    <div className="warap">
      <nav className="nav">
        <div>
          <button type="button" onClick={handleSignUpButton}>
            회원가입
          </button>
        </div>
        <div className="log-in">
          {isLoggedIn ? (
            <LogedIn
              user={loggedUser}
              onClickLogOutButton={handleLogOutButton}
            />
          ) : (
            <LogedOut
              userList={savedUserList}
              onClickLogInButton={handleClickLogInButton}
            />
          )}
        </div>
      </nav>
      <div hidden={isNeedSignUp}>
        <MemoWrap user={loggedUser} />
      </div>
      <div hidden={!isNeedSignUp}>
        <SignUp onClickSaveButton={handleSaveUserButton} />
      </div>
    </div>
  );
}

export default App;
