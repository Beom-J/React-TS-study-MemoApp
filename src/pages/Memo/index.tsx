import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import WriteMemo from './WriteMemo';
import { LocalStorageKey } from '../../core/constants';
import ViewMemo from './ViewMemo';
import Memos from '../../components/Memos';
import { MemoType } from '../../types/MemoType';
import ModifyMemo from './ModifyMemo';
import './style.css';

const Memo = ({ userId }: { userId: string }) => {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const defaultMemos = [
    {
      contentId: '',
      name: '',
      title: '',
      content: i18n.t('message.defaultContentMessage')
    }
  ];

  const localDbMemos: MemoType[] = JSON.parse(
    window.localStorage.getItem(LocalStorageKey.memos) ||
      JSON.stringify(defaultMemos)
  );

  // memo list state
  const [memos, setMemos] = useState(localDbMemos);

  // view memo state
  const [memo, setMemo] = useState({
    contentId: '',
    name: userId,
    title: '',
    content: i18n.t('message.defaultContentMessage')
  });

  // 새로운 글 작성했을때 리스트 리렌더링
  const handleOnCreate = (memo: MemoType) => {
    if (memos[0].contentId === '') {
      setMemos([memo]);
    } else {
      setMemos([...memos, memo]);
    }
  };

  // memo 클릭시 해당 memo 값을 들고 뷰페이지로 전환
  const handleClickMemo = (memo: MemoType) => {
    if (memo.name === '') {
      setMemo({ ...memo, name: userId });
      return;
    }
    setMemo(memo);
    navigate('/memo/viewmemo');
  };

  // 수정 버튼 누를 시 동작
  const handleModifyButton = () => {
    navigate('/memo/modifymemo');
  };

  // 삭제 버튼 누를 시 동작
  const handleDeleteButton = (memo: MemoType) => {
    // 필터링으로 기존 state 배열에서 먼저 삭제
    const result = localDbMemos.filter(
      (originMemo) => originMemo.contentId !== memo.contentId
    );
    // 로컬 정보 덮어씌우기
    window.localStorage.setItem(LocalStorageKey.memos, JSON.stringify(result));
    // state 업데이트 -> 리렌더링
    setMemos(result);
    setMemo({
      contentId: '',
      name: userId,
      title: '',
      content: i18n.t('message.defaultContentMessage')
    });
  };

  return (
    <div className="memo-warrap">
      <div className="memo-list">
        <Link to="/memo/writememo" className="add-btn">
          {t('button.writeMemo')}
        </Link>
        <Memos memos={memos} onClick={handleClickMemo} />
      </div>
      <div className="memo-view">
        <Routes>
          <Route
            path="/writememo"
            element={
              <WriteMemo
                userId={userId}
                contentId={memo.contentId}
                onCreate={handleOnCreate}
              />
            }
          />
          <Route
            path="/modifymemo"
            element={
              <ModifyMemo
                userId={userId}
                contentId={memo.contentId}
                onCreate={setMemos}
              />
            }
          />
          <Route
            path="/viewmemo"
            element={
              <ViewMemo
                memo={memo}
                userID={userId}
                onClickModifyButton={handleModifyButton}
                onClickDeleteButton={handleDeleteButton}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Memo;
