import { useEffect, useState } from 'react';
import { Form, FormControl, ListGroup, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import ImageSlideShow from '../components/ImageSlideShow';
import Post from '../components/Post';
import ReactPaginate from 'react-paginate';
import '../components/Pagination.css';
import { FcPrevious, FcNext } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, reset } from '../features/posts/postSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance';
// import { FaSearch } from 'react-icons/fa';

const Home = () => {
  const [toggleSlideShow, setToggleSlideShow] = useState(true);
  // Define some vars for pagination function
  const [pageNumber, setPageNumber] = useState(0);
  const [postList, setPostList] = useState({});
  const dispatch = useDispatch()

  const { posts, isLoading, isError, message } = useSelector((state) => state.posts)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getAllPosts())

    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  const searchPost = async (e) => {
    const searchValue = e.target.value;
    if (searchValue.length < 1) {return}
    await axios.get(`/api/posts/search?text=${searchValue}`)
      .then(res => {
        setPostList(res.data)
      })
      .catch(err => toast.error(err));
  };

  if (isLoading) {
    return <Spinner />
  }
  // Set the number of items for each page
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;
  // This function is used to display the set of items on the home page
  const displayPosts = posts
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((post, idx) => {
      return (
        <Post key={idx} post={post} showUsername={true} fromFavoritePostPage={false} />
      );
    });

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
      <Container fluid>
        <Row>
          <Col>
            <Form className='mt-2'>
              <FormControl
                  type="search"
                  placeholder="Search..."
                  className="me-5"
                  aria-label="Search"
                  onChange={searchPost} // onChange will trigger "search post"
              />
            </Form>
          </Col>
          <Col>
            {/* Rendering button showing/hiding slide show */}
            <div className="right__side mt-2">
              <Button
                  variant="primary"
                  size="sm"
                  onClick={()=> setToggleSlideShow(!toggleSlideShow)}
                  style={{ backgroundColor: '#c3edbf', borderColor: '#c3edbf' }}
              >
                {toggleSlideShow? "Hide Slide Show" : "Show Slide Show"}
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Post-List area */}
          <Col>
            {postList.length > 0 ? (
                <ListGroup variant="flush" as="ol">
                  {
                    postList.map((post) => {
                      return (
                          <ListGroup.Item key={post._id}>
                            <div className="fw-bold h4" style={{color: "#fbb9c5"}}>
                              <Link to={`/postDetail/${post._id}`} style={{ textDecoration: 'none', color: "#fbb9c5" }}>{post.title}</Link>
                            </div>
                            <div style={{color: "#b8dfe6"}}>{post.content} - <span className="text-secondary">{`Last modified: ${formatDistance(new Date(post.updatedAt), new Date())}`}</span></div>
                          </ListGroup.Item>
                      );
                    })
                  }
                </ListGroup>) : null}
            <h3 className='title mb-2' style={{color: "#fbb9c5"}}>Product List</h3>
            {posts.length > 0 ? (
                <>
                  {displayPosts}
                </>
            ) : ('')
            }
            {/* Rendering the pagination buttons */}
            <Row className='pt-2'>
              <ReactPaginate
                  previousLabel={<FcPrevious />}
                  nextLabel={<FcNext />}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
              />
            </Row>
          </Col>
          {/* Image Slide Show area */}
          <Col className={toggleSlideShow? "show":"hide"}>
            <h3 className='title mb-2' style={{color: "#b8dfe6"}}>Product Slide Show</h3>
            {posts.length > 0 ? (<ImageSlideShow posts={posts} />):('')}
          </Col>
        </Row>
      </Container>
  );

}

export default Home
