import { MemoType } from '../../../types/MemoType';

type memo = {
  memo: MemoType;
  userID: string;
  onClickModifyButton: (memo: MemoType) => void;
  onClickDeleteButton: (memo: MemoType) => void;
};

const ViewMemo = ({
  memo,
  userID,
  onClickModifyButton,
  onClickDeleteButton
}: memo) => {
  return (
    <>
      {memo.title !== '' && userID === memo.name && userID !== '' ? (
        <div>
          <button
            type="button"
            className="modify"
            onClick={() => onClickModifyButton(memo)}
          >
            수정
          </button>
          <button
            type="button"
            className="delete"
            onClick={() => onClickDeleteButton(memo)}
          >
            삭제
          </button>
        </div>
      ) : (
        ''
      )}

      <div className="view-memo">
        {memo.title === '' ? '' : <div className="name">{memo.name}</div>}
        <div className="title">{memo.title}</div>
        <div className="content">{memo.content}</div>
      </div>
    </>
  );
};

export default ViewMemo;
