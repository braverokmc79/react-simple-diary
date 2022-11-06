const DiaryItem = ({ id, author, content, emotion, create_date, onDelete }) => {
    return (
        <div className="DiaryItem">
            <div className="info">
                <span>
                    작성자 : {author} | 감정점수 : {emotion}
                </span>
                <br />
                <span className="date"> {new Date(create_date).toLocaleString()}</span>
            </div>
            <div className="content">{content}</div>
            <button onClick={() => {
                if (window.confirm(`${id} 번째 일기를 정말 삭제하시겠습니까?`)) {
                    onDelete(id);
                }
            }}>삭제하기</button>
        </div >
    );
};

export default DiaryItem;