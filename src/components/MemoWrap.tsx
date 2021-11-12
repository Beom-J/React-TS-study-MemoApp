import { useState } from 'react';
import { memoProps, user } from '../Types/Types';
import CreateMemo from './CreateMemo';
import MemoList from './MemoList';
import ViewPage from './ViewPage';

const makeRandomId = () => {
  const id =
    Math.random().toString(20).substring(2, 10) +
    Math.random().toString(20).substring(2, 10);
  return id;
};

const MemoWrap = ({ user }: { user: user }) => {
  // 우측 뷰페이지 전환용 bool state
  const [isWritePage, setWritePage] = useState(false);
  // memo list state
  const [memoList, setMemoList] = useState([
    {
      id: makeRandomId(),
      name: user.ID,
      title: '임시글 입니다!',
      content: '로그인 후 자유롭게 수정해보세요~'
    }
  ]);

  // create memo state
  const [inputs, setInputs] = useState({
    id: '',
    name: user.ID,
    title: '',
    content: ''
  });

  // view memo state
  const [memo, setMemo] = useState({
    id: '',
    name: user.ID,
    title: '',
    content: '메모를 클릭하거나, 새로운 메모를 추가해보세요'
  });

  // input 에서 받아온 값 저장용 변수
  const { id, title, content } = inputs;

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

  // input 에 입력한 값을 memo list 에 추가
  const handleSaveMemo = (id: string) => {
    checkLogIn(user);

    if (inputs.title === '' || inputs.content === '') {
      alert('빈칸을 채워주세요.');
      return;
    }

    // 새 글일 경우는 id 값이 공백이므로 만들어서 넣어 줌
    if (id === '') {
      const newMemo = {
        id: makeRandomId(),
        name: user.ID,
        title,
        content
      };
      setMemoList([...memoList, newMemo]);
    }
    // 수정할 경우는 해당 id 값의 글만 수정
    if (id !== '') {
      const modifiedMemo = {
        id,
        name: user.ID,
        title,
        content
      };
      const tmp: memoProps[] = [];
      memoList.forEach((memo) =>
        memo.id === id ? tmp.push(modifiedMemo) : tmp.push(memo)
      );
      setMemoList(tmp);
    }

    setInputs({
      id: '',
      name: user.ID,
      title: '',
      content: ''
    });
    setMemo({
      id: '',
      name: user.ID,
      title: '',
      content: '메모를 클릭하거나, 새로운 메모를 추가해보세요'
    });
    setWritePage(false);
  };

  function checkLogIn(user: user) {
    if (user.ID === '') {
      alert('로그인 후 사용 가능합니다.');
      return false;
    }
    return true;
  }

  function checkAthority(userID: string, memo: memoProps) {
    if (userID !== memo.name) {
      return false;
    }
    return true;
  }

  // write page 로 전환시켜주는 함수
  const handleAddButton = () => {
    setWritePage(checkLogIn(user));
  };

  // memo 클릭시 해당 memo 값을 들고 뷰페이지로 전환
  const handleClickMemo = (memo: memoProps) => {
    setWritePage(false);
    if (memo.name === '') {
      setMemo({ ...memo, name: user.ID });
      return;
    }
    setMemo(memo);
  };

  // 수정 버튼 누를 시 동작
  const handleModifyButton = (memo: memoProps) => {
    if (!checkAthority(user.ID, memo)) {
      alert('권한이 없습니다.');
      return;
    }
    setInputs(memo);
    setWritePage(checkLogIn(user));
  };

  // 삭제 버튼 누를 시 동작
  const handleDeleteButton = (memo: memoProps) => {
    if (!checkAthority(user.ID, memo)) {
      alert('권한이 없습니다.');
      return;
    }
    if (checkLogIn(user)) {
      const newMemoList: memoProps[] = memoList.filter(
        (originalMemo) => originalMemo !== memo
      );
      setMemoList(newMemoList);
      setMemo({
        id: '',
        name: user.ID,
        title: '',
        content: '메모를 클릭하거나, 새로운 메모를 추가해보세요'
      });
    }
  };

  return (
    <div className="memo-warap">
      <div className="memo-list">
        <button className="add-btn" type="button" onClick={handleAddButton}>
          메모 추가
        </button>
        <MemoList memoList={memoList} onClick={handleClickMemo} />
      </div>
      <div className="memo-view">
        {isWritePage ? (
          <CreateMemo
            id={id}
            name={user.ID}
            title={title}
            content={content}
            onDataChange={handleDataChange}
            onCreate={handleSaveMemo}
          />
        ) : (
          <ViewPage
            memo={memo}
            userID={user.ID}
            onClickModifyButton={handleModifyButton}
            onClickDeleteButton={handleDeleteButton}
          />
        )}
      </div>
    </div>
  );
};

export default MemoWrap;
