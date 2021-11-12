import { useState } from 'react';
import './App.css';
import LogedIn from './components/LogedIn';
import LogedOut from './components/LogedOut';
import MemoWrap from './components/MemoWrap';
import SignUp from './components/SignUp';
import { User } from './Types/Types';

function getUsersFromLocalStage() {
  const userIDs: string[] = Object.keys(window.localStorage);
  const users: User[] = userIDs.map((key) => {
    return {
      ID: key,
      pwd: window.localStorage.getItem(key) || ''
    };
  });
  return users;
}

function App() {
  // section 전환용 boolean
  const [isLoggedIn, setIsLogin] = useState(false);
  const [isNeedSignUp, setIsNeedSignUp] = useState(true);

  // local Storage 에 저장된 유저 리스트 목록
  const signedUsers = getUsersFromLocalStage();

  // 현재 로그인한 유저 정보
  const [loggedUser, setLoggedUser] = useState({
    ID: '',
    pwd: ''
  });

  const handleLogInButton = (isSignedUser: User | undefined) => {
    if (!isSignedUser) {
      alert('등록된 회원이 아닙니다.');
      return;
    }
    setLoggedUser(isSignedUser);
    setIsLogin(true);
    setIsNeedSignUp(false);
  };

  const handleSignUpButton = () => {
    setIsNeedSignUp(true);
  };

  const handleSaveUserButton = () => {
    setIsNeedSignUp(false);
  };

  const handleLogOutButton = () => {
    setLoggedUser({ ID: '', pwd: '' });
    setIsLogin(false);
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
            <LogedOut
              user={loggedUser}
              onClickLogOutButton={handleLogOutButton}
            />
          ) : (
            <LogedIn
              users={signedUsers}
              onClickLogInButton={handleLogInButton}
            />
          )}
        </div>
      </nav>
      <div hidden={!isNeedSignUp}>
        <MemoWrap user={loggedUser} />
      </div>
      <div hidden={isNeedSignUp}>
        <SignUp onClickSaveButton={handleSaveUserButton} />
      </div>
    </div>
  );
}

export default App;
