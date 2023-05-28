import default_image from '../logo/default_user.jpg';
import formatDistance from 'date-fns/formatDistance';

const COLORS = {
    pink: "#fbb9c5",
    purple: "#e6c8fe",
    yellow: "#fcf7e3",
    green: "#88d8c0",
    blue: "#b8dfe6",
};

const CommentDetail = ({ comment }) => {
    const image = comment.author.image ? comment.author.image : default_image;
    const author = `${comment.author.firstName} ${comment.author.lastName}`;
    const commentDate = `${formatDistance(new Date(comment.updatedAt), new Date())}`;
    return (
        <>
            <div className="sub-card">
                {/* Display author's image */}
                <img src={image} alt="" className="author-small-image" />
                <div className="px-2" style={{ color: COLORS.pink }}>
                    {author}
                </div>
            </div>
            <div className="px-2" style={{ color: '#3a5a78' }}>
                {comment.comment}
            </div>
            <div className="sub-text">
                {comment.rating > 0 ? (
                    <div className="px-2" style={{ color: COLORS.purple }}>
                        Rating: {comment.rating} {comment.rating === 1 ? `star` : `stars`} -
                    </div>
                ) : (
                    ""
                )}
                <div className="px-2" style={{ color: COLORS.green }}>
                    {commentDate}
                </div>
            </div>
        </>
    );
};

export default CommentDetail;
