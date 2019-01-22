import React, { Component } from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from 'reactstrap';
import PostItem from './PostItem';

class PostList extends Component {
  state = {
    posts: null,
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }

  render() {
    const { posts, onItemClick, onItemEdit, onItemDelete } = this.props;

    if (!posts) return <div>No Data...</div>;

    return (
      <div className="animated fadeIn">
        <Table responsive hover>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">내용</th>
              <th scope="col">태그</th>
              <th scope="col">작성일</th>
              <th scope="col">편집</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <PostItem
                key={index}
                index={index}
                post={post}
                onItemClick={onItemClick}
                onItemEdit={onItemEdit}
                onItemDelete={onItemDelete}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PostList;
