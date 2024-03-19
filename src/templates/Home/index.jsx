import { Component } from 'react';

import './styles.css';

import { loadPost } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 2,
    searchValue: ""
  };

  async componentDidMount() {
    const { page, postPerPage } = this.state;
    const postAndPhotos = await loadPost();

    this.setState({
      posts: postAndPhotos.slice(page, postPerPage),
      allPosts: postAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state
    const nextPage = page + postPerPage
    const nextPost = allPosts.slice(nextPage, nextPage + postPerPage)

    posts.push(...nextPost)
    this.setState({posts, page: nextPage})
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }
  
  render () {
    var me = this, { posts, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPost = !!searchValue ? 
      posts.filter(post => post.title.toLowerCase().includes(searchValue)) : 
      posts;
    
    return (
      <section className="container">
        <div className="search-container">
          <TextInput searchValue={ searchValue } handleChange={ this.handleChange } />
        </div>
        
        
        { filteredPost.length > 0 && (
          <Posts posts={ filteredPost } />
        ) }

        { filteredPost.length === 0 && (
          <p>Não Existem Posts com o termo "{searchValue}"</p>
        ) }

        <div className="button-container">
          { !searchValue && (
            <Button 
              text="Mais Posts"
              onClick={ me.loadMorePosts }
              disabled={ noMorePosts }
            />
          )}
        </div>
      </section>
    );
  }
}


export default Home;
