import React, { MouseEvent, RefObject, useRef } from 'react';
import { memoProps } from './MemoList';

// type memoProps = {
//   id: string;
//   name: string;
//   title: string;
//   createDate: string;
//   content: string;
// };

type memo = {
  params: memoProps;
};

function Memo({ params }: memo) {
  return (
    <ul className="memo">
      <li className="title">{params.title}</li>
      <li className="info">
        <div className="id">{params.id}</div>
      </li>
    </ul>
  );
}

export default Memo;
