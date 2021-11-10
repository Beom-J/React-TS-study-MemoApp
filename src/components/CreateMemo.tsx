import '../css/Memo-Wrap.css';

type props = {
  id: string;
  name: string;
  title: string;
  content: string;
  onDataChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onCreate: (id: string) => void;
};

function CreateMemo({
  id,
  name,
  title,
  content,
  onDataChange,
  onCreate
}: props) {
  return (
    <div className="write-page">
      <input
        className="name"
        type="text"
        name="name"
        placeholder="이름입력"
        onChange={onDataChange}
        value={name}
      />
      &nbsp;&nbsp;
      <input
        className="title"
        type="text"
        name="title"
        placeholder="제목입력"
        onChange={onDataChange}
        value={title}
      />
      &nbsp;&nbsp;
      <textarea
        className="content"
        name="content"
        placeholder="내용입력"
        onChange={onDataChange}
        value={content}
      />
      &nbsp;&nbsp;
      <button
        onClick={() => {
          onCreate(id);
        }}
        type="button"
      >
        저장
      </button>
    </div>
  );
}

export default CreateMemo;
