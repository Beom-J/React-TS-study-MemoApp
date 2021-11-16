import { useTranslation } from 'react-i18next';
import { MemoType } from '../../../types/MemoType';
import './style.css';

type memo = {
  memo: MemoType;
  userID: string;
  onClickModifyButton: () => void;
  onClickDeleteButton: (memo: MemoType) => void;
};

const ViewMemo = ({
  memo,
  userID,
  onClickModifyButton,
  onClickDeleteButton
}: memo) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      {memo.title !== '' && userID === memo.name && userID !== '' ? (
        <div>
          <button
            type="button"
            className="modify"
            onClick={onClickModifyButton}
          >
            {t('button.modify')}
          </button>
          <button
            type="button"
            className="delete"
            onClick={() => onClickDeleteButton(memo)}
          >
            {t('button.delete')}
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
