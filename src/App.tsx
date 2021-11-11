import { useState } from 'react';
import './App.css';
import LogedIn from './components/LogedIn';
import LogedOut from './components/LogedOut';
import MemoWrrap from './components/MemoWrap';

const user = new Map<string, string>();
user.set('ID', 'test');
user.set('pwd', 'test');

function App() {
  const [isLoggedIn, setLogin] = useState(false);

  const onClickLogInButton = (isSavedUser: boolean) => {
    console.log(isSavedUser);
    if (isSavedUser) {
      setLogin(true);
      return;
    }
    alert('등록된 회원이 아닙니다.');
  };

  return (
    <div className="warap">
      <nav className="nav">
        {isLoggedIn ? (
          <LogedIn user={user} />
        ) : (
          <LogedOut user={user} onClick={onClickLogInButton} />
        )}
      </nav>
      <MemoWrrap />
    </div>
  );
}

export default App;
