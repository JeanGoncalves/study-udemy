import './styles.css'

export const PostCard = (props) => {
    
    return (
        <div className="post">
            <img src={props.cover} alt={props.title} />
            <div key={ props.id } className="post-content">
                <h2>#{props.id} - { props.title }</h2>
                <p>{ props.body }</p>
            </div>
        </div>
    );
}