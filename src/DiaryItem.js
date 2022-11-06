const DiaryItem = ({ author, content, emotion, create_date }) => {
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
        </div >
    );
};

export default DiaryItem;