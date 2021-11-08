type props = {
  name: string;
  title: string;
  content: string;
  onDataChange: (event: any) => void;
  onCreate: () => void;
};

function CreateMemo({ name, title, content, onDataChange, onCreate }: props) {
  const style = {
    width: '600px',
    margin: '20px',
    padding: '10px',
    border: '3px solid black'
  };

  return (
    <div style={style}>
      <input
        type="text"
        name="name"
        placeholder="이름입력"
        onChange={onDataChange}
        value={name}
      />
      &nbsp;&nbsp;
      <input
        type="text"
        name="title"
        placeholder="제목입력"
        onChange={onDataChange}
        value={title}
      />
      &nbsp;&nbsp;
      <input
        type="text"
        name="content"
        placeholder="내용입력"
        onChange={onDataChange}
        value={content}
      />
      &nbsp;&nbsp;
      <button onClick={onCreate} type="button">
        추가
      </button>
    </div>
  );
}

export default CreateMemo;
