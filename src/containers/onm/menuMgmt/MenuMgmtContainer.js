import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/comn/base';

import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

import TreeLabel from 'views/onm/menuMgmt/TreeLabel';

class MenuMgmtContainer extends Component {
  static propTypes = {
    keys: PropTypes.array,
  };

  static defaultProps = {
    // keys: ['0-0-0-0'],
    keys: ['ONM_01'],
  };

  constructor(props) {
    super(props);
    const keys = props.keys;
    this.state = {
      defaultExpandedKeys: keys,
      defaultSelectedKeys: keys,
      defaultCheckedKeys: keys,
    };
  }

  componentDidMount() {
    const { BaseActions } = this.props;
    BaseActions.getMenu();
  }

  handleExpand = expandedKeys => {
    console.log('handleExpand', expandedKeys);
  };

  handleSelect = (selectedKeys, info) => {
    console.log('handleSelect', selectedKeys, info);
    this.selKey = info.node.props.eventKey;
  };

  handleCheck = (checkedKeys, info) => {
    console.log('handleCheck', checkedKeys, info);
  };

  handleEdit = checkedKeys => {
    console.log('handleEdit', checkedKeys);
    setTimeout(() => {
      console.log('current key: ', this.selKey);
    }, 0);
  };

  handleDelete = e => {
    if (!window.confirm('sure to delete?')) {
      return;
    }
    e.stopPropagation();
  };

  loadTreeItem = items => {
    const { handleEdit, handleDelete } = this;

    return items
      .filter((item, index) => {
        if (item.title === true) return false;
        return true;
      })
      .map((item, index) => {
        let children = null;
        if (item.children) {
          children = this.loadTreeItem(item.children);
        }

        return {
          key: item.id,
          title: (
            <TreeLabel
              title={item.name}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ),
          disableCheckbox: false,
          children: children,
        };
      });
  };

  render() {
    const { menu } = this.props;
    const {
      loadTreeItem,
      handleExpand,
      handleSelect,
      handleCheck,
      handleEdit,
      handleDelete,
    } = this;

    let _children = null;
    if (menu && menu.items) {
      _children = loadTreeItem(menu.items);
    }

    const menuTree = [
      {
        key: 'ROOT',
        title: (
          <TreeLabel
            title={'메뉴'}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ),
        disableCheckbox: true,
        children: _children,
      },
    ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>메뉴 트리</CardHeader>
              <CardBody>
                <Tree
                  className="myCls"
                  showLine
                  checkable
                  selectable={false}
                  defaultExpandAll
                  defaultSelectedKeys={this.state.defaultSelectedKeys}
                  defaultCheckedKeys={this.state.defaultCheckedKeys}
                  onExpand={handleExpand}
                  // onSelect={handleSelect}
                  onCheck={handleCheck}
                  onDelete={handleDelete}
                  treeData={menuTree}
                  // treeData={treeData}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <CardHeader>list header</CardHeader>
              <CardBody>list body</CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(
  state => ({
    args: state.base.getIn(['modal', 'confirm', 'args']),
    page: state.base.getIn(['paging', 'post', 'page']),
    lastPage: state.base.getIn(['paging', 'post', 'lastPage']),
    pageCount: state.base.getIn(['paging', 'post', 'pageCount']),
    menu: state.base.get('menu'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
  }),
)(MenuMgmtContainer);
