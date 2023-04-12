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
import { Helmet } from 'react-helmet';
import './homeStyles.css';


// import { FaSearch } from 'react-icons/fa';

const Home = () => {
  const [toggleSlideShow, setToggleSlideShow] = useState(true);
  // Define some vars for pagination function
  const [pageNumber, setPageNumber] = useState(0);
  const [postList, setPostList] = useState({});
  const dispatch = useDispatch()
  const { posts, isLoading, isError, message } = useSelector((state) => state.posts)

  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [...new Set(posts.map((post) => post.city))];
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const filteredPosts = selectedCategory
      ? posts.filter((post) => post.city === selectedCategory)
      : posts;

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
  const displayPosts = filteredPosts
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
      <>
        <Helmet>
          <title>Pop Zombie - Home</title>
          <meta property="og:title" content="Pop Zombie - Home" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://i.imgur.com/KieXhJW.png" />
          <meta property="og:url" content="https://www.pop-zombie.com" />
          <meta property="og:description" content="Explore the world of Pop Zombie, your go-to hub for captivating content on travel, lifestyle, and more. Join us, share your favorites, and discover your next adventure! " />
        </Helmet>
        <Container fluid>
          <Row>

            <Col>
              {/* Rendering button showing/hiding slide show */}
              <div className="right__side mt-2">
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setToggleSlideShow(!toggleSlideShow)}
                    style={{
                      backgroundColor: '#c3edbf',
                      borderColor: '#c3edbf',
                      width:'13%'
                    }}
                >
                  {toggleSlideShow ? "Hide Slide Show" : "Show Slide Show"}
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            {/* Dividing the screen into 3 columns */}
            <Col xs={8} md={4}>
              <Row className="mt-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Col>
                  <h3 style={{
                    color: '#80E1D1',
                    fontSize:'22px',
                  }}>Categories</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-grid gap-2">
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            variant="outline-primary"
                            onClick={() => handleCategoryClick(category)}
                            style={{
                              backgroundColor: '#FFA07A',
                              borderColor: '#FFA07A',
                              width:'50%'
                            }}
                        >
                          {category}
                        </Button>
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xs={8} md={4} className="d-flex justify-content-center align-items-center">

              {/* Post-List area */}
              <Col>
                <div>
                  <Row className="mb-2">
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

                  </Row>
                </div>

                <Row>
                  {postList.length > 0 ? (
                      <ListGroup variant="flush" as="ol">
                        {
                          postList.map((post) => {
                            return (
                                <ListGroup.Item key={post._id}>
                                  <div className="fw-bold h4" style={{ color: "#fbb9c5" }}>
                                    <Link to={`/postDetail/${post._id}`} style={{ textDecoration: 'none', color: "#f17891" }}>{post.title}</Link>
                                  </div>
                                  <div style={{ color: "#b8dfe6" }}>{post.content} - <span className="text-secondary">{`Last modified: ${formatDistance(new Date(post.updatedAt), new Date())}`}</span></div>
                                </ListGroup.Item>
                            );
                          })
                        }
                      </ListGroup>) : null}
                  <div>
                    <Row className="mb-2">
                      {/* Image Slide Show area */}
                      <div className={toggleSlideShow ? "show" : "hide"}>
                        <h3 className='title mb-2' style={{ color: "#b99ef5" }}>Pop Zombie Slide Show</h3>
                        {posts.length > 0 ? (<ImageSlideShow posts={posts} />) : ('')}
                      </div>
                    </Row>
                  </div>
                  <h3 className='title mb-2' style={{ color: "#f17891" }}>Pop Zombie List</h3>
                  {posts.length > 0 ? (
                      <>
                        {displayPosts}
                      </>
                  ) : ('')
                  }
                </Row>


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
            </Col>

          </Row>
        </Container>
      </>
  );

}

export default Home
