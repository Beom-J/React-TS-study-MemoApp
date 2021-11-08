interface MemoProps {
  seq: number;
  title: string;
  id: string;
  date: string;
  content: string;
}

function Memo({
  memo,
  onClick
}: {
  memo: MemoProps;
  onClick: (event: EventListener) => void;
}) {
  return (
    <ul className="memo" onClick={handleClickMemo}>
      <li className="title">{memo.title}</li>
      <li className="info">
        <div className="id">{memo.id}</div>
        <div className="date">{memo.date}</div>
      </li>
    </ul>
  );
}

function handleClickMemo() {
  console.log('Memo click!');
}

export default Memo;
