import { useState } from 'react';
import CreateMemo from './CreateMemo';
import { memoProps } from './Memo';
import MemoList from './MemoList';
import ViewPage from './ViewPage';

const MemoWrap = () => {
  // 우측 뷰페이지 전환용 bool state
  const [isWritePage, setWritePage] = useState(false);

  // memo list state
  const [memoList, setMemoList] = useState([
    {
      id: '',
      name: 'user1',
      title: 'title1',
      content: 'content1'
    },
    {
      id: '',
      name: 'user2',
      title: 'title2',
      content: 'content2'
    }
  ]);

  // create memo state
  const [inputs, setInputs] = useState({
    id: '',
    name: '',
    title: '',
    content: ''
  });

  // view memo state
  const [memo, setMemo] = useState({
    id: '',
    name: '',
    title: '',
    content: '메모를 클릭하거나, 새로운 메모를 추가해보세요'
  });

  // input 에서 받아온 값 저장용 변수
  const { id, name, title, content } = inputs;

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
  const handleCreate = () => {
    const newMemo = {
      id,
      name,
      title,
      content
    };
    setMemoList([...memoList, newMemo]);
    setInputs({
      id: '',
      name: '',
      title: '',
      content: ''
    });
    setWritePage(false);
  };

  // write page 로 전환시켜주는 함수
  const handleAddButton = () => {
    setWritePage(true);
  };

  // memo 클릭시 해당 memo 값을 들고 뷰페이지로 전환
  const handleClickMemo = (memo: memoProps) => {
    setMemo(memo);
  };

  // 수정 버튼 누를 시 동작
  const handleModifyButton = (memo: memoProps) => {
    console.log('modify : ', memo);
    setInputs(memo);
    setWritePage(true);
  };

  // 삭제 버튼 누를 시 동작
  const handleDeleteButton = (memo: memoProps) => {
    const newMemoList: memoProps[] = memoList.filter(
      (originalMemo) => originalMemo !== memo
    );
    setMemoList(newMemoList);
    setMemo({
      id: '',
      name: '',
      title: '',
      content: '메모를 클릭하거나, 새로운 메모를 추가해보세요'
    });
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
            name={name}
            title={title}
            content={content}
            onDataChange={handleDataChange}
            onCreate={handleCreate}
          />
        ) : (
          <ViewPage
            memo={memo}
            onClickModifyButton={handleModifyButton}
            onClickDeleteButton={handleDeleteButton}
          />
        )}
      </div>
    </div>
  );
};

export default MemoWrap;