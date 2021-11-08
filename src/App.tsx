import { MouseEvent, useState } from 'react';
import './App.css';
import Memo from './components/Memo';
import MemoList from './components/MemoList';

type memoProps = {
  id: string;
  name: string;
  title: string;
  createDate: string;
  content: string;
};

function App() {
  const [memo, setMemo] = useState({
    id: 'user001',
    name: 'user1',
    title: 'title1',
    createDate: '2021-11-08',
    content: 'content1'
  });

  const [viewPage, setViewPage] = useState({
    id: 'user001',
    name: 'user1',
    title: 'title1',
    createDate: '2021-11-08',
    content: 'content1'
  });

  function handleClickMemo(event: MouseEvent) {
    console.log('memo componenet :', event.currentTarget);
  }

  function handleAddButton(event: MouseEvent) {
    console.log('click add button');
  }

  function handleSaveButton() {
    console.log('click save button');
  }

  return (
    <div className="warrap">
      <nav className="nav">
        <span> 안녕하세요, ㅇㅇㅇ님! </span>
        <button className="log-in-btn" type="button">
          Log-in
        </button>
      </nav>
      <div className="memo-warrap">
        <div className="memo-list">
          <button className="add-btn" type="button" onClick={handleAddButton}>
            메모 추가
          </button>
          <MemoList />
        </div>
        <div className="memo-view">
          <span>제목</span>
          <input type="text" />
          <br />
          <span>내용</span>
          <textarea />
          <br />
          <button className="save-btn" type="button" onClick={handleSaveButton}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
