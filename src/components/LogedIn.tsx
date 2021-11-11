import { user } from '../Types';

type props = {
  user: user;
  onClickLogOutButton: () => void;
};

const LogedIn = ({ user, onClickLogOutButton }: props) => {
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
