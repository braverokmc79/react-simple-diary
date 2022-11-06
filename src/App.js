import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import './App.css';
import { useState } from 'react';
import { useRef } from 'react';

// const dummyList = [
//   {
//     id: 1,
//     author: "홍길동",
//     content: "하이1 ",
//     emotion: 2,
//     create_date: new Date().getTime()
//   },

//   {
//     id: 2,
//     author: "이순신",
//     content: "하이2 ",
//     emotion: 3,
//     create_date: new Date().getTime()
//   },

//   {
//     id: 3,
//     author: "테스터",
//     content: "하이3 ",
//     emotion: 4,
//     create_date: new Date().getTime()
//   }


// ]

function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current
    };

    dataId.current += 1;
    setData([newItem, ...data]);
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
