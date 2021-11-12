import { User } from '../Types/Types';

type Props = {
  user: User;
  onClickLogOutButton: () => void;
};

const LogedIn = ({ user, onClickLogOutButton }: Props) => {
  return (
    <div>
      <span> 안녕하세요, {user.ID}님! </span>
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

export default LogedIn;
