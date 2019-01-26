import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';
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
import PostList from 'views/example/crud/PostList';
import Paging from 'views/example/crud/Paging';
import PostEditModal from 'views/example/crud/PostEditModal';
import { Map, List, fromJS } from 'immutable';

import * as api from 'apis/example/api';
// import * as inputParsers from 'libs/InputParsers';
import inputParsers from 'libs/InputParsers';

export const endPage = (page, pageCount) => {
  return pageCount + Math.floor(page / (pageCount + 1)) * pageCount;
};

export const startPage = (page, pageCount) => {
  const end = endPage(page, pageCount);
  return end - pageCount + 1;
};

class PostContainer extends Component {
  // ES6
  state = {
    posts: [],
    visible: false,
    editMode: '', // w:write | r:read | e:edit
    post: {
      title: '',
      body: '',
      tags: '',
    },
    page: 1,
    lastPage: 5,
    pageCount: 5,
    tag: null,
  };

  // Immutable  // not working
  // state = fromJS({
  //   posts: [],
  //   visible: false,
  //   editMode: '', // w:write | r:read | e:edit
  //   post: {
  //     title: '',
  //     body: '',
  //     tags: '',
  //   },
  // });

  getPostList = async () => {
    const { page, tag } = this.state;

    let res = null;

    try {
      res = await api.getPostList({
        tag: tag,
        page: page,
      });
    } catch (e) {
      console.error(e);
    }

    if (res && res.data) {
      this.setState({
        ...this.state,
        posts: res.data,
      });

      // this.state.set('posts', fromJS(res.data));
      // this.state.set('visible', true);
      // console.log('posts:', this.state.toJS());
      // console.log('visible:', this.state.get('visible'));
    }
  };

  getPost = async id => {
    let res = null;
    try {
      res = await api.getPost(id);
    } catch (e) {
      console.log(e);
    }

    if (res && res.data) {
      this.setState({
        ...this.state,
        post: res.data,
      });

      // this.state.set('posts', res.data);
    }
  };

  writePost = async data => {
    let res = null;
    try {
      res = await api.writePost({
        title: data.get('title'),
        body: data.get('body'),
        tags: data.get('tags') ? data.get('tags').split(',') : [],
      });
    } catch (e) {
      console.log(e);
    }
  };

  editPost = async (id, data) => {
    let res = null;
    try {
      res = await api.editPost({
        id: id,
        title: data.get('title'),
        body: data.get('body'),
        tags: data.get('tags') ? data.get('tags').split(',') : [],
      });
    } catch (e) {
      console.log(e);
    }
  };

  removePost = async id => {
    let res = null;
    try {
      res = await api.removePost(id);
    } catch (e) {
      console.log(e);
    }
  };

  updatePostList = () => {
    setTimeout(() => {
      this.getPostList();
    }, 100);
  };

  componentDidMount() {
    this.getPostList();
  }

  handleOpenPostEditModal = e => {
    // open modal for write
    console.log('-----> handleOpenModal');

    this.setState({
      ...this.state,
      visible: true,
      editMode: 'w',
      post: {
        ...this.state.post,
        title: '',
        body: '',
        tags: '',
      },
    });

    // this.state
    //   .set('visible', true)
    //   .set('editMode', 'w')
    //   .set('opts', {})
    //   .setIn(['post', 'title'], '')
    //   .setIn(['post', 'body'], '')
    //   .setIn(['post', 'tags'], '');
    // console.log(this.state.toJS());
  };

  handleCancel = e => {
    // close modal
    console.log('-----> handleCancel');
    this.setState({
      ...this.state,
      visible: false,
    });
    // this.state.set('visible', false);
  };

  handleConfirm = e => {
    // write
    e.preventDefault();
    console.log('-----> handleConfirm');
    const form = e.target;
    const data = new FormData(form);

    // parsing form data
    for (let name of data.keys()) {
      const input = form.elements[name];
      const parserName = input.dataset.parse;

      if (parserName) {
        const parser = inputParsers[parserName];
        const parsedValue = parser(data.get(name));
        data.set(name, parsedValue);
      }
    }

    const { editMode } = this.state;

    if (editMode === 'w') {
      this.writePost(data);
    } else if (editMode === 'e') {
      this.editPost(e.target.id, data);
    }

    this.updatePostList();
    this.handleCancel();
  };

  handleItemClick = e => {
    // view
    console.log('-----> handleItemClick');
    console.log('target', e.target);
    console.log('target.id', e.target.id);

    this.getPost(e.target.id);

    this.setState({
      ...this.state,
      visible: true,
      editMode: 'r',
      opts: {
        readOnly: 'readOnly',
      },
    });
  };

  handleItemEdit = e => {
    // edit
    console.log('-----> handleItemEdit');
    console.log('target', e.target);
    console.log('target.id', e.target.id);

    this.getPost(e.target.id);

    this.setState({
      ...this.state,
      visible: true,
      editMode: 'e',
      opts: {},
    });
  };

  handleItemDelete = e => {
    // delete
    console.log('-----> handleItemDelete');
    console.log('target', e.target);
    console.log('target.id', e.target.id);

    const { BaseActions } = this.props;
    BaseActions.showModal({
      modalName: 'confirm',
      title: '포스트 삭제',
      message: '선택한 포스트를 삭제하시겠습니까?',
      onConfirm: this.handleConfirmModal,
      args: e.target.id,
    });
  };

  handleConfirmModal = e => {
    this.removePost(e.target.id);

    const { BaseActions } = this.props;

    BaseActions.hideModal({
      modalName: 'confirm',
    });

    this.updatePostList();
  };

  handleChange = e => {
    console.log('-----> handleChange');
    console.log('target', e.target);
    console.log('target.id', e.target.id);

    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [name]: value,
      },
    });

    console.log('key in:', this.state.post[name]);
  };

  // handleClickPage = async e => {
  handleClickPage = e => {
    console.log('-----> handleClickPage');
    console.log('target', e.target);
    console.log('target.id', e.target.id);

    this.setState({
      ...this.state,
      page: parseInt(e.target.id),
    });

    this.updatePostList();
    // await this.getPostList();
  };

  handleClickPrev = e => {
    console.log('-----> handleClickPrev');

    const { page, pageCount } = this.state;

    this.setState({
      ...this.state,
      page: endPage(page, pageCount) - pageCount,
    });

    this.updatePostList();
  };

  handleClickNext = e => {
    console.log('-----> handleClickNext');

    const { page, pageCount } = this.state;

    this.setState({
      ...this.state,
      page: startPage(page, pageCount) + pageCount,
    });

    this.updatePostList();
  };

  handleSearch = e => {
    console.log('handleSearch');
    this.updatePostList();
  };

  onChange = e => {
    const { value, name } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  render() {
    const {
      posts,
      visible,
      editMode,
      opts,
      post,
      page,
      lastPage,
      pageCount,
      tag,
    } = this.state;
    const {
      handleOpenPostEditModal,
      handleCancel,
      handleConfirm,
      handleItemClick,
      handleItemEdit,
      handleItemDelete,
      handleChange,
      handleClickPage,
      handleClickPrev,
      handleClickNext,
      handleSearch,
      onChange,
    } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
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
                    size="sm"
                    value={tag}
                    onChange={onChange}
                    // {...opts}
                  />
                </Col>
                <Col md="2">
                  <Button color="dark" outline size="sm" onClick={handleSearch}>
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
              </CardHeader>
              <CardBody>
                {/* <Paging page={page} lastPage={lastPage} tag={tag} /> */}
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
          toggle={handleCancel}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onChange={handleChange}
          className={null}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    args: state.base.getIn(['modal', 'confirm', 'args']),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(withRouter(PostContainer));
