import { User } from '../../types/Types';

type Props = {
  userId: string;
  onClickLogOutButton: () => void;
};

const LoginUserInfo = ({ userId, onClickLogOutButton }: Props) => {
  return (
    <div>
      <span> 안녕하세요, {userId}님! </span>
      <button
        className="log-in-btn"
        type="button"
        onClick={onClickLogOutButton}
      >
        Log-out
      </button>
    </div>
  );
};

export default LoginUserInfo;
