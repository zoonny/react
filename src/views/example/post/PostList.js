import React, { Component } from 'react';
import { Table } from 'reactstrap';
import PostItem from './PostItem';

const columns = ['번호', '제목', '내용', '태그', '작성일', '편집'];

const PostList = ({ posts, onItemClick, onItemEdit, onItemDelete }) => {
  if (!posts) return <div>No Data...</div>;

  return (
    <div className="animated fadeIn">
      <Table responsive hover>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">
                {column}
              </th>
            ))}
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
};

export default PostList;
