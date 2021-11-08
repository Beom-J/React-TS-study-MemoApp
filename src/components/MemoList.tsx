import { useState } from 'react';
import Memo from './Memo';
import CreateMemo from './CreateMemo';

export type memoProps = {
  id: string;
  name: string;
  title: string;
  content: string;
};

function MemoList() {
  const [memoList, setMemoList] = useState([
    {
      id: 'user001',
      name: 'user1',
      title: 'title1',
      content: 'content1'
    },
    {
      id: 'user002',
      name: 'user2',
      title: 'title2',
      content: 'content2'
    },
    {
      id: 'user003',
      name: 'user3',
      title: 'title3',
      content: 'content3'
    }
  ]);

  const [inputs, setInputs] = useState({
    id: '',
    name: '',
    title: '',
    content: ''
  });

  const { id, name, title, content } = inputs;

  const onDataChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const onCreate = () => {
    const memo = {
      id: 'user00',
      name,
      title,
      content
    };
    setMemoList([...memoList, memo]);

    setInputs({
      id: '',
      name: '',
      title: '',
      content: ''
    });
  };

  return (
    <div>
      <CreateMemo
        name={name}
        title={title}
        content={content}
        onDataChange={onDataChange}
        onCreate={onCreate}
      />
      {memoList.map((memo) => {
        return <Memo params={memo} key={memo.id} />;
      })}
    </div>
  );
}

export default MemoList;
