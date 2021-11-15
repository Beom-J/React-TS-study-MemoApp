import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LocalStorageKey } from '../../../core/constants';
import { makeRandomString } from '../../../core/customFuntions';
import { MemoType } from '../../../types/MemoType';
import './style.css';

type props = {
  userId: string;
  contentId: string;
  onCreate: (memo: MemoType) => void;
};

function WriteMemo({ userId, contentId, onCreate }: props) {
  const navigate = useNavigate();
  // create memo state
  const [inputs, setInputs] = useState({
    contentId,
    name: userId,
    title: '',
    content: ''
  });

  // input 에 입력한 값 읽어오는 함수
  const handleDataChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const { title, content } = inputs;

  // input 에 입력한 값 검사
  const handleSaveMemoClick = () => {
    if (inputs.name === '') {
      alert('로그인 후 사용 가능합니다.');
      return;
    }
    if (inputs.title === '' || inputs.content === '') {
      alert('빈칸을 채워주세요.');
      return;
    }

    const localDbMemos = window.localStorage.getItem(LocalStorageKey.memos);
    if (localDbMemos) {
      // 첫 메모가 아닐 경우 배열에 추가
      window.localStorage.setItem(
        LocalStorageKey.memos,
        JSON.stringify([
          ...JSON.parse(localDbMemos),
          {
            contentId: makeRandomString(),
            name: userId,
            title,
            content
          }
        ])
      );
    } else {
      // 첫 메모일 경우 배열 생성
      window.localStorage.setItem(
        LocalStorageKey.memos,
        JSON.stringify([
          {
            contentId: makeRandomString(),
            name: userId,
            title,
            content
          }
        ])
      );
    }

    // 메모리스트 state 에 현재 input 값 업데이트
    onCreate({
      contentId: makeRandomString(),
      name: userId,
      title,
      content
    });
    navigate('/memo/viewmemo');
  };

  return (
    <div className="write-memo">
      <input
        className="name"
        type="text"
        name="name"
        placeholder="로그인 후 이용 가능합니다."
        onChange={handleDataChange}
        value={userId}
        disabled
      />
      &nbsp;&nbsp;
      <input
        className="title"
        type="text"
        name="title"
        placeholder="제목입력"
        onChange={handleDataChange}
        value={title}
      />
      &nbsp;&nbsp;
      <textarea
        className="content"
        name="content"
        placeholder="내용입력"
        onChange={handleDataChange}
        value={content}
      />
      &nbsp;&nbsp;
      <button onClick={handleSaveMemoClick} type="button">
        저장
      </button>
    </div>
  );
}

export default WriteMemo;
