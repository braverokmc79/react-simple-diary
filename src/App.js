import React, { useEffect, useMemo, useRef, useCallback, useReducer } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import OptimizeTest from "./OptimizeTest";

const reducer = (state, action) => {

  switch (action.type) {
    case "INIT":
      return action.data;

    case "CREATE": {
      const create_date = new Date().getTime();
      const newItem = { ...action.data, create_date }
      return [newItem, ...state];
    }
    case "REMOVE":
      return state.filter(item => item.id !== action.targetId)

    case "EDIT":
      return state.map(item => item.id === action.targetId ? { ...item, content: action.newContent } : item)

    default:
      return state;
  }

}


export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {
  // const [data, setData] = useState([]);
  const dataId = useRef(0);

  const [data, dispatch] = useReducer(reducer, []);


  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++
      };
    });

    dispatch({ type: "INIT", data: initData });
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  const onCreate = (author, content, emotion) => {
    dispatch({
      type: "CREATE", data: {
        author,
        content,
        emotion,
        id: dataId.current
      }
    })
    dataId.current += 1;
  };

  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId })
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent })
  }, []);


  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }
    console.log("?????? ?????? ??????");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;


  const memorizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit }
  }, [])


  return (
    <DiaryStateContext.Provider value={data} >
      <DiaryDispatchContext.Provider value={memorizedDispatches}>
        <div className="App">
          <OptimizeTest />
          <DiaryEditor onCreate={onCreate} />
          <div>?????? ?????? : {data.length}</div>
          <div>?????? ?????? ?????? ?????? : {goodCount}</div>
          <div>?????? ?????? ?????? ?????? : {badCount}</div>
          <div>?????? ?????? ?????? ?????? : {goodRatio}</div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};
export default App;
