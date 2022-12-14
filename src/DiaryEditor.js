import React, { useRef, useState, useEffect, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
    const { onCreate } = useContext(DiaryDispatchContext)

    useEffect(() => {
        console.log("DiaryEditor  렌더");
    })

    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 3
    });

    const handlerChangeState = (e) => {
        //  console.log(e.target.name, e.target.value);
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        if (state.author.length < 1) {
            //alert("작성자는 최소 1글자 이상 입력해주세요.");
            authorInput.current.focus();
            return;
        }

        if (state.content.length < 5) {
            //alert("일기 본문은 최소 5글자 이상 입력해주세요.");
            contentInput.current.focus();
            return;
        }

        onCreate(state.author, state.content, state.emotion);
        alert("저장 성공");
        setState({
            author: "",
            content: "",
            emotion: 1
        })
    }


    return (<div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input
                name="author"
                ref={authorInput}
                value={state.author}
                onChange={handlerChangeState}
            />
            {/* onChange={(e) => {
                //     setState({...state, author: e.target.value })
                //  */}
        </div>
        <div>
            <textarea
                name="content"
                ref={contentInput}
                value={state.content}
                onChange={handlerChangeState}
            />
        </div>
        <div>
            <span>오늘의 감정점수 : </span>
            <select name="emotion"
                value={state.emotion}
                onChange={handlerChangeState}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div>);
};

export default React.memo(DiaryEditor);