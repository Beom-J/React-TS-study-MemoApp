import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { LocalStorageKey } from '../../core/constants';
import { User } from '../../types/UserType';
import './style.css';

const SignUp = () => {
  const { t, i18n } = useTranslation();

  // 저장 버튼 누르면 /memo 로 이동
  const navigate = useNavigate();
  // input 에 적힌 내용으로 state 설정
  const [inputs, setInputs] = useState({
    id: '',
    password: ''
  });

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSaveUser = () => {
    if (inputs.id === '' || inputs.password === '') {
      alert(i18n.t('alert.emptyInputCheck'));
      return;
    }

    const localDbUsers = window.localStorage.getItem(LocalStorageKey.users);

    if (localDbUsers) {
      // 중복 아이디 유효성 검사
      const userIds: string[] = JSON.parse(localDbUsers).map(
        (user: User) => user.id
      );
      if (userIds.includes(inputs.id)) {
        alert(i18n.t('alert.signUpDbCheck'));
        return;
      }

      // 저장된 id 있으면 기존 배열에 1개 더 추가
      window.localStorage.setItem(
        LocalStorageKey.users,
        JSON.stringify([
          ...JSON.parse(localDbUsers),
          {
            id: inputs.id,
            password: inputs.password
          }
        ])
      );
    } else {
      // 없으면 배열 생성!
      window.localStorage.setItem(
        LocalStorageKey.users,
        JSON.stringify([{ id: inputs.id, password: inputs.password }])
      );
    }
    // 로컬 스토리지에 저장 완료 후 /memo 페이지로 이동
    navigate('/memo');
  };

  return (
    <div className="sign-up">
      <h3>{t('message.welcomeToSign')}</h3>
      <span>{t('input.id')} : </span>
      <input
        type="text"
        name="id"
        placeholder={t('input.pleaseId')}
        onChange={handleDataChange}
      />
      <br />
      <span>{t('input.password')} : </span>
      <input
        type="password"
        name="password"
        placeholder={t('input.pleasePassword')}
        onChange={handleDataChange}
      />
      <br />
      <button type="button" onClick={handleSaveUser}>
        {t('button.save')}
      </button>
    </div>
  );
};

export default SignUp;
