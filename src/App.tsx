import './App.css';
import MemoWrrap from './components/MemoWrap';

function App() {
  return (
    <div className="warap">
      <nav className="nav">
        <span> 안녕하세요, ㅇㅇㅇ님! </span>
        <button className="log-in-btn" type="button">
          Log-in
        </button>
      </nav>
      <MemoWrrap />
    </div>
  );
}

export default App;
