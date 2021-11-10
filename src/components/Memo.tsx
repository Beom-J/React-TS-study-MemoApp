export type memoProps = {
  id: string;
  name: string;
  title: string;
  content: string;
};

type memo = {
  memo: memoProps;
  onClick: (memo: memoProps) => void;
};

function Memo({ memo, onClick }: memo) {
  return (
    <li onClick={() => onClick(memo)} onKeyDown={() => console.log('keyDown')}>
      <div className="memo">
        <div className="title">{memo.title}</div>
        <div className="info">
          <div className="name">{memo.name}</div>
        </div>
      </div>
    </li>
  );
}

export default Memo;
