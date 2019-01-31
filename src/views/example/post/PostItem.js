import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import moment from 'moment';

const PostItem = ({ index, post, onItemClick, onItemEdit, onItemDelete }) => {
  // don't pass key
  const { _id, title, body, tags, publishedDate } = post;

  return (
    <tr key={_id}>
      <th scope="row">{index + 1}</th>
      <td id={_id} onClick={onItemClick}>
        {/* <Link to={`/post/${_id}`}>{title}</Link> */}
        <b id={_id}>{title}</b>
      </td>
      <td>{body && body.length > 20 ? body.substr(0, 20) : body}</td>
      <td>{tags ? tags.join(',') : ''}</td>
      <td>{moment(publishedDate).format('ll')}</td>
      <td id={_id}>
        <Button id={_id} color="dark" outline size="sm" onClick={onItemEdit}>
          수정
        </Button>{' '}
        <Button id={_id} color="dark" outline size="sm" onClick={onItemDelete}>
          삭제
        </Button>
      </td>
    </tr>
  );
};

export default PostItem;
