import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
import * as postActions from 'store/example/post';
import { withRouter } from 'react-router-dom';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Input,
  Form,
  FormGroup,
} from 'reactstrap';
import PostList from 'views/example/post/PostList';
import Paging from 'views/example/post/Paging';
import PostEditModal from 'views/example/post/PostEditModal';
import { Map, List, fromJS } from 'immutable';

import InputParser from 'libs/InputParser';
import PagingUtils from 'libs/PagingUtils';

class PostContainer extends Component {
  initialize = () => {
    const { PostActions } = this.props;

    PostActions.initialize();
  };

  getPostList = async () => {
    const { page, tag, PostActions } = this.props;

    try {
      await PostActions.getPostList({
        tag,
        page,
      });
    } catch (e) {
      console.error(e);
    }
  };

  updatePostList = () => {
    setTimeout(() => {
      this.getPostList();
    }, 100);
  };

  getPost = async id => {
    const { PostActions } = this.props;

    try {
      await PostActions.getPost(id);
    } catch (e) {
      console.error(e);
    }
  };

  writePost = async post => {
    const { PostActions } = this.props;

    try {
      await PostActions.writePost(post);
    } catch (e) {
      console.error(e);
    }
  };

  editPost = async post => {
    const { PostActions } = this.props;

    try {
      await PostActions.editPost(post);
    } catch (e) {
      console.error(e);
    }
  };

  removePost = async id => {
    const { PostActions } = this.props;

    try {
      await PostActions.removePost(id);
    } catch (e) {
      console.error(e);
    }
  };

  componentDidMount() {
    this.initialize();
    this.getPostList();
  }

  componentDidUpdate() {}

  // PostContainer
  handleSearch = e => {
    this.getPostList();
  };

  handleChange = e => {
    const { PostActions } = this.props;
    const { name, value } = e.target;

    PostActions.changeInput({
      name,
      value,
    });
  };

  // PostItem
  handleItemClick = e => {
    this.getPost(e.target.id);

    const { PostActions } = this.props;

    PostActions.openPostEditModal({
      visible: true,
      editMode: 'r',
    });
  };

  handleItemEdit = e => {
    this.getPost(e.target.id);

    const { PostActions } = this.props;

    PostActions.openPostEditModal({
      visible: true,
      editMode: 'e',
    });
  };

  handleItemDelete = e => {
    const { BaseActions } = this.props;

    BaseActions.showModal({
      modalName: 'confirm',
      title: '포스트 삭제',
      message: '선택한 포스트를 삭제하시겠습니까?',
      onConfirm: this.deleteItem,
      args: e.target.id,
    });
  };

  deleteItem = e => {
    const { BaseActions } = this.props;

    this.removePost(e.target.id);

    BaseActions.hideModal({
      modalName: 'confirm',
    });

    this.updatePostList();
  };

  // PostEdit
  handleOpenPostEditModal = e => {
    const { PostActions } = this.props;

    PostActions.initializePostEdit();

    PostActions.openPostEditModal({
      visible: true,
      editMode: 'w',
    });
  };

  handlePostEditCancel = e => {
    const { PostActions } = this.props;

    PostActions.openPostEditModal({
      visible: false,
    });
  };

  handlePostEditChange = e => {
    const { PostActions } = this.props;
    const { name, value } = e.target;

    PostActions.changePostEditInput({
      name,
      value,
    });
  };

  handlePostEditSubmit = e => {
    e.preventDefault();

    const { editMode } = this.props;

    const form = e.target;
    const data = new FormData(form);

    InputParser.parseInputData(form, data);

    if (editMode === 'w') {
      this.writePost({
        title: data.get('title'),
        body: data.get('body'),
        tags: data.get('tags') ? data.get('tags').split(',') : [],
      });
    } else if (editMode === 'e') {
      this.editPost({
        id: e.target.id,
        title: data.get('title'),
        body: data.get('body'),
        tags: data.get('tags') ? data.get('tags').split(',') : [],
      });
    }

    this.updatePostList();
    this.handlePostEditCancel();
  };

  handleClickPage = e => {
    const { BaseActions } = this.props;

    BaseActions.clickPage({
      view: 'post',
      page: parseInt(e.target.id),
    });

    this.updatePostList();
  };

  handleClickPrev = e => {
    const { BaseActions, page, pageCount } = this.props;

    BaseActions.clickPage({
      view: 'post',
      page: PagingUtils.endPage(page, pageCount) - pageCount,
    });

    this.updatePostList();
  };

  handleClickNext = e => {
    const { BaseActions, page, pageCount } = this.props;

    BaseActions.clickPage({
      view: 'post',
      page: PagingUtils.startPage(page, pageCount) + pageCount,
    });

    this.updatePostList();
  };

  render() {
    const {
      posts,
      tag,
      visible,
      editMode,
      opts,
      post,
      page,
      lastPage,
      pageCount,
    } = this.props;

    const {
      handleSearch,
      handleChange,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handleOpenPostEditModal,
      handlePostEditCancel,
      handlePostEditSubmit,
      handlePostEditChange,
      handleClickPage,
      handleClickPrev,
      handleClickNext,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                    <Col md="2">
                      <i className="fa fa-align-justify" /> Posts{' '}
                      <small className="text-muted">example</small>
                    </Col>
                    <Col md="6">
                      <Input
                        type="text"
                        id="tag"
                        name="tag"
                        placeholder="태그"
                        value={tag}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md="2">
                      <Button
                        color="dark"
                        outline
                        size="sm"
                        onClick={handleSearch}
                      >
                        검색
                      </Button>
                    </Col>
                    <Col md="2" className="float-right">
                      <Button
                        color="dark"
                        outline
                        size="sm"
                        onClick={handleOpenPostEditModal}
                      >
                        등록
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardHeader>
              <CardBody>
                <PostList
                  posts={posts}
                  onItemClick={handleItemClick}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                />
                <Paging
                  page={page}
                  lastPage={lastPage}
                  pageCount={pageCount}
                  onClickPage={handleClickPage}
                  onClickPrev={handleClickPrev}
                  onClickNext={handleClickNext}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <PostEditModal
          visible={visible}
          editMode={editMode}
          opts={opts}
          post={post}
          toggle={handlePostEditCancel}
          onSubmit={handlePostEditSubmit}
          onCancel={handlePostEditCancel}
          onChange={handlePostEditChange}
          className={''}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    args: state.base.getIn(['modal', 'confirm', 'args']),
    tag: state.post.get('tag'),
    posts: state.post.get('posts'),
    visible: state.post.getIn(['postEditModal', 'visible']),
    editMode: state.post.getIn(['postEditModal', 'editMode']),
    opts: state.post.getIn(['postEditModal', 'opts']).toJS(),
    post: state.post.getIn(['postEditModal', 'post']).toJS(),
    page: state.base.getIn(['paging', 'post', 'page']),
    lastPage: state.base.getIn(['paging', 'post', 'lastPage']),
    pageCount: state.base.getIn(['paging', 'post', 'pageCount']),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch),
  }),
)(withRouter(PostContainer));