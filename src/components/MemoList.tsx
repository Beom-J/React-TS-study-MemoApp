import Memo, { memoProps } from './Memo';

type memoList = {
  memoList: memoProps[];
  onClick: (memo: memoProps) => void;
};

function MemoList({ memoList, onClick }: memoList) {
  return (
    <div>
      <ul>
        {memoList.map((memo: memoProps) => {
          return <Memo memo={memo} key={memo.id} onClick={onClick} />;
        })}
      </ul>
    </div>
  );
}

export default MemoList;
