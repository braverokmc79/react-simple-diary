
import React, { useState, useEffect } from 'react';

const CounterA = React.memo(({ count }) => {

    useEffect(() => {
        console.log(` CounterA update -- count :${count}`);
    })

    return <div>{count}</div>
});

const CounterB = React.memo(({ obj }) => {
    useEffect(() => {
        console.log(` CounterB update -- count :${obj.count}`);
    })
    return <div>{obj.count}</div>
});

const areEqual = (prevProps, nextProps) => {
    //return true //이전 프롭스 현재 프롭스가 같다 -> 리랜더링을 일이키지 않게 된다.
    //return flase // 이전 프롭스와 현재 프롭스가 다르면 -> 리랜더링을 일으킨다.
    return prevProps.obj.count === nextProps.obj.count;
}

const MemoizedCounterB = React.memo(CounterB, areEqual);


const OptimizeTest = () => {
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    });

    return (
        <div style={{ padding: 50 }}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count} />
                <button onClick={() => setCount(count)}>A button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj={obj} />

                <button onClick={() => setObj({
                    count: obj.count,
                })}>B button</button>

            </div>
        </div >
    );
};

export default OptimizeTest;