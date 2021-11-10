import Memo, { memoProps } from './Memo';

type memoList = {
  memoList: memoProps[];
  onClick: (memo: memoProps) => void;
};

function MemoList({ memoList, onClick }: memoList) {
  let key = 0;
  return (
    <div>
      <ul>
        {memoList.map((memo: memoProps) => {
          key += 1;
          return <Memo memo={memo} key={memo.name + key} onClick={onClick} />;
        })}
      </ul>
    </div>
  );
}

export default MemoList;
