import { MemoType } from '../../types/Types';
import Memo from './Memo';

type memos = {
  memos: MemoType[];
  onClick: (memo: MemoType) => void;
};

function Memos({ memos, onClick }: memos) {
  return (
    <div>
      <ul>
        {memos.map((memo: MemoType) => {
          return <Memo memo={memo} key={memo.id} onClick={onClick} />;
        })}
      </ul>
    </div>
  );
}

export default Memos;
