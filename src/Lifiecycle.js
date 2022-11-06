import React, { useEffect } from 'react';
import { useState } from 'react';

const UnmountTest = () => {
    useEffect(() => {
        console.log("Mount!");

        return () => {
            //Unmount 시점에 실행되게 됨
            console.log("Unmount!");
        }
    }, []);
    return <div>Unmount Test Component</div>
}

const Lifiecycle = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggle = () => setIsVisible(!isVisible);


    // const [count, setCount] = useState(0);
    // const [text, setText] = useState("");

    // useEffect(() => {
    //     console.log("mount!");
    // });

    // useEffect(() => {
    //     console.log(`count is update : ${count}`);
    //     if (count > 5) {
    //         alert("count 가 5를 넘었습니다.따라서 1로 초기화 합니다.");
    //         setCount(1);
    //     }
    // }, [count]);


    // useEffect(() => {
    //     console.log(`text is update : ${text}`);
    // }, [text]);


    return (
        <div style={{ padding: 20 }}>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest />}
        </div>
    );


};

export default Lifiecycle;