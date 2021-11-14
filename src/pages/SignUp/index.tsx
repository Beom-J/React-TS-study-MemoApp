import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { LocalStorageKey } from '../../core/constants';
import './style.css';

const SignUp = () => {
  const navigate = useNavigate();
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
      alert('빈칸을 채워주세요');
      return;
    }

    const localDbUsers = window.localStorage.getItem(LocalStorageKey.users);

    if (localDbUsers) {
      // localDbUsers 아이디랑 일치 하는 유효성 추가하기!

      // 있으면 기존 정보에 1개 더 추가
      window.localStorage.setItem(
        LocalStorageKey.users,
        JSON.stringify([
          JSON.parse(localDbUsers),
          { id: inputs.id, password: inputs.password }
        ])
      );
    } else {
      // 없으면 배열 생성!
      window.localStorage.setItem(
        LocalStorageKey.users,
        JSON.stringify([{ id: inputs.id, password: inputs.password }])
      );
    }

    navigate('/memo');
  };

  return (
    <div className="sign-up">
      <h3>회원가입을 환영합니다!</h3>
      <span>ID : </span>
      <input
        type="text"
        name="id"
        placeholder="ID 를 입력하세요"
        onChange={handleDataChange}
      />
      <br />
      <span>비밀번호 : </span>
      <input
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        onChange={handleDataChange}
      />
      <br />
      <button type="button" onClick={handleSaveUser}>
        저장
      </button>
    </div>
  );
};

export default SignUp;
