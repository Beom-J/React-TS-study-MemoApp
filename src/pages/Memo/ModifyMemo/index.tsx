import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { LocalStorageKey } from '../../../core/constants';
import { MemoType } from '../../../types/MemoType';

type props = {
  userId: string;
  contentId: string;
  onCreate: (modifiedMemos: MemoType[]) => void;
};

function ModifyMemo({ userId, contentId, onCreate }: props) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const emptyMemos = [
    {
      contentId: '',
      name: '',
      title: '',
      content: ''
    }
  ];

  // local 에서 memos 받아오기
  const localDbMemos: MemoType[] = JSON.parse(
    window.localStorage.getItem(LocalStorageKey.memos) ||
      JSON.stringify(emptyMemos)
  );

  const toBeModifiedMemo: MemoType = localDbMemos.find(
    (memo) => memo.contentId === contentId
  ) || {
    contentId: '',
    name: '',
    title: '',
    content: ''
  };

  // input 창에 수정할 내용 세팅
  const [inputs, setInputs] = useState({
    ...toBeModifiedMemo
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
      alert(i18n.t('alert.logInCheck'));
      return;
    }
    if (inputs.title === '' || inputs.content === '') {
      alert(i18n.t('alert.emptyInputCheck'));
      return;
    }

    const modifiedMemos: MemoType[] = [];
    localDbMemos.forEach((memo) => {
      if (memo.contentId === inputs.contentId) {
        modifiedMemos.push(inputs);
      } else {
        modifiedMemos.push(memo);
      }
    });

    window.localStorage.setItem(
      LocalStorageKey.memos,
      JSON.stringify(modifiedMemos)
    );
    onCreate(modifiedMemos);
    navigate('/memo');
  };

  return (
    <div className="write-memo">
      <input
        className="name"
        type="text"
        name="name"
        placeholder={t('alert.logInCheck')}
        onChange={handleDataChange}
        value={userId}
        disabled
      />
      &nbsp;&nbsp;
      <input
        className="title"
        type="text"
        name="title"
        placeholder={t('input.pleaseTitle')}
        onChange={handleDataChange}
        value={title}
      />
      &nbsp;&nbsp;
      <textarea
        className="content"
        name="content"
        placeholder={t('input.pleaseContent')}
        onChange={handleDataChange}
        value={content}
      />
      &nbsp;&nbsp;
      <button onClick={handleSaveMemoClick} type="button">
        {t('button.save')}
      </button>
    </div>
  );
}

export default ModifyMemo;
