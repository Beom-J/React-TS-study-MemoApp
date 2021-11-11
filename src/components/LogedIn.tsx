const LogedIn = ({ user }: { user: Map<string, string> }) => {
  return (
    <div>
      <span> 안녕하세요, {user.get('ID')}님! </span>
      <button className="log-in-btn" type="button">
        Log-out
      </button>
    </div>
  );
};

export default LogedIn;
