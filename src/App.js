import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRef } from 'react';
import OptimizeTest from './OptimizeTest';
import './App.css';


//http://jsonplaceholder.typicode.com/posts/1/comments

function App() {

  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch('http://jsonplaceholder.typicode.com/comments')
      .then(data => data.json());
    //  console.log(res);

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++
      }
    })

    setData(initData);
  }

  useEffect(() => {
    getData();
  }, [])

  const onCreate = useCallback((author, content, emotion) => {
    console.log(" onCreate 합수 실행");
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current
    };

    dataId.current += 1;
    //setData([newItem, ...data]); =>
    setData((data) => [newItem, ...data]);

  }, []);



  const onRemove = (targetId) => {
    //console.log(`${targetId} 가 삭제되었습니다.`);
    const newDiaryList = data.filter(item => item.id !== targetId);
    setData(newDiaryList);
  }

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) => it.id === targetId ? { ...it, content: newContent } : it
      ));
  }

  const getDiaryAnalisys = useMemo(() => {
    //console.log("일기 분석 시작");
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);


  const { goodCount, badCount, goodRatio } = getDiaryAnalisys;



  return (
    <div className="App">
      {/* <OptimizeTest /> */}
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length} </div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 개수 : {goodRatio}</div>

      <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove} />
    </div>
  );



}

export default App;
