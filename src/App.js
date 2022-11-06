import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import './App.css';

const dummyList = [
  {
    id: 1,
    author: "홍길동",
    content: "하이1 ",
    emotion: 2,
    create_date: new Date().getTime()
  },

  {
    id: 2,
    author: "이순신",
    content: "하이2 ",
    emotion: 3,
    create_date: new Date().getTime()
  },

  {
    id: 3,
    author: "테스터",
    content: "하이3 ",
    emotion: 4,
    create_date: new Date().getTime()
  }


]

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
