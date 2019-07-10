import React, { Component } from 'react';
import { withPosts } from '../providers';
import { PostList, PostForm } from '../components';

import { Container, Row, Col } from 'reactstrap';
import '../styles/styles.css';

/**
 * Class decorator wraps a component using the withPosts provider
 * to get data retrieved with GraphQL.
 */
@withPosts
export default class PostRoot extends Component {
  render() {
    const { posts, postsLoading } = this.props;

    return (
      <div>
        <h2 className="posts-title">Posts Module</h2>
        <hr />
        <Row>
          <Col>
            <PostList postsLoading={postsLoading} posts={posts} />
          </Col>
          <Col>
            <PostForm />
          </Col>
        </Row>
      </div>
    );
  }
}
