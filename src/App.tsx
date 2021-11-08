import { useState } from 'react';
import './App.css';
import Memo from './components/Memo';

function App() {
  const memo = {
    seq: 0,
    title: '제목',
    id: '작성자',
    date: '작성날짜',
    content: '내용'
  };

  const [viewPage, setViewPage] = useState({
    seq: 0,
    title: '',
    id: '',
    date: '',
    content: ''
  });

  return (
    <div className="warrap">
      <nav className="nav">
        <span> 안녕하세요, ㅇㅇㅇ님! </span>
        <button className="log-in-btn">Log-in</button>
      </nav>
      <div className="memo-warrap">
        <div className="memo-list">
          <button className="add-btn">메모 추가</button>
          <Memo memo={memo} onClick={handleClickMemo} />
          <Memo memo={memo} onClick={handleClickMemo} />
          <Memo memo={memo} onClick={handleClickMemo} />
        </div>
        <div className="memo-view">
          <div className="buttons">
            <button className="modify">수정</button>
            <button className="delete">삭제</button>
          </div>
          {viewPage.title === '' ? (
            '메모장 입니다~!'
          ) : (
            <>
              <ul className="top">
                <li className="title"> {viewPage.title} </li>
                <li className="id"> {viewPage.id} </li>
                <li className="date"> {viewPage.date} </li>
              </ul>
              <div className="content"> {viewPage.content} </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function handleClickMemo(event: EventListener) {
  console.log('app click!');
}

export default App;
