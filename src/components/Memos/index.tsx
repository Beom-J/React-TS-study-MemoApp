import { MemoType } from '../../types/MemoType';
import Memo from './Memo';

type memos = {
  memos: MemoType[];
  onClick: (memo: MemoType) => void;
};

const Memos = ({ memos, onClick }: memos) => {
  return (
    <div>
      <ul>
        {memos.map((memo: MemoType) => {
          return <Memo memo={memo} key={memo.contentId} onClick={onClick} />;
        })}
      </ul>
    </div>
  );
};

export default Memos;
