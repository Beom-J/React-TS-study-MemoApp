import { useState } from 'react';
import { LocalStorageKey } from '../../core/constants';
import { MemoType } from '../../types/Types';
import CreateMemo from '../../components/memo/CreateMemo';
import Memos from '../../components/memo/Memos';
import ViewPage from '../../components/memo/ViewPage';

const makeRandomId = () => {
  const id =
    Math.random().toString(20).substring(2, 10) +
    Math.random().toString(20).substring(2, 10);
  return id;
};

const Memo = ({ userId }: { userId: string }) => {
  // 우측 뷰 섹션 전환용 bool state
  const [isWriteMemoSection, setWriteMemoSection] = useState(false);
  // memo list state
  const [memos, setMemos] = useState([
    {
      id: makeRandomId(),
      name: userId,
      title: '임시글 입니다!',
      content: '로그인 후 자유롭게 수정해보세요~'
    }
  ]);

  // create memo state
  const [inputs, setInputs] = useState({
    id: '',
    name: userId,
    title: '',
    content: ''
  });

  // view memo state
  const [memo, setMemo] = useState({
    id: '',
    name: userId,
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
    checkLogIn();

    if (inputs.title === '' || inputs.content === '') {
      alert('빈칸을 채워주세요.');
      return;
    }

    // 새 글일 경우는 id 값이 공백이므로 만들어서 넣어 줌
    if (id === '') {
      const newMemo = {
        id: makeRandomId(),
        name: userId,
        title,
        content
      };
      setMemos([...memos, newMemo]);
    }
    // 수정할 경우는 해당 id 값의 글만 수정
    if (id !== '') {
      const modifiedMemo = {
        id,
        name: userId,
        title,
        content
      };
      const tmp: MemoType[] = [];
      memos.forEach((memo) =>
        memo.id === id ? tmp.push(modifiedMemo) : tmp.push(memo)
      );
      setMemos(tmp);
    }

    setInputs({
      id: '',
      name: userId,
      title: '',
      content: ''
    });
    setMemo({
      id: '',
      name: userId,
      title: '',
      content: '메모를 클릭하거나, 새로운 메모를 추가해보세요'
    });
    setWriteMemoSection(false);
  };

  function checkLogIn() {
    if (userId === '') {
      alert('로그인 후 사용 가능합니다.');
      return false;
    }
    return true;
  }

  function checkAthority(userId: string, memo: MemoType) {
    if (userId !== memo.name) {
      return false;
    }
    return true;
  }

  // write page 로 전환시켜주는 함수
  const handleAddButton = () => {
    setWriteMemoSection(checkLogIn());
  };

  // memo 클릭시 해당 memo 값을 들고 뷰페이지로 전환
  const handleClickMemo = (memo: MemoType) => {
    setWriteMemoSection(false);
    if (memo.name === '') {
      setMemo({ ...memo, name: userId });
      return;
    }
    setMemo(memo);
  };

  // 수정 버튼 누를 시 동작
  const handleModifyButton = (memo: MemoType) => {
    if (!checkAthority(userId, memo)) {
      alert('권한이 없습니다.');
      return;
    }
    setInputs(memo);
    setWriteMemoSection(checkLogIn());
  };

  // 삭제 버튼 누를 시 동작
  const handleDeleteButton = (memo: MemoType) => {
    if (!checkAthority(userId, memo)) {
      alert('권한이 없습니다.');
      return;
    }
    if (checkLogIn()) {
      const newMemoList: MemoType[] = memos.filter(
        (originalMemo) => originalMemo !== memo
      );
      setMemos(newMemoList);
      setMemo({
        id: '',
        name: userId,
        title: '',
        content: '메모를 클릭하거나, 새로운 메모를 추가해보세요'
      });
    }
  };

  return (
    <div className="memo-warrap">
      <div className="memo-list">
        <button className="add-btn" type="button" onClick={handleAddButton}>
          메모 추가
        </button>
        <Memos memos={memos} onClick={handleClickMemo} />
      </div>
      <div className="memo-view">
        {isWriteMemoSection ? (
          <CreateMemo
            id={id}
            name={userId}
            title={title}
            content={content}
            onDataChange={handleDataChange}
            onCreate={handleSaveMemo}
          />
        ) : (
          <ViewPage
            memo={memo}
            userID={userId}
            onClickModifyButton={handleModifyButton}
            onClickDeleteButton={handleDeleteButton}
          />
        )}
      </div>
    </div>
  );
};

export default Memo;
