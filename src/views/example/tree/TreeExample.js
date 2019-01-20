import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

const treeData = [
  {
    key: '0-0',
    title: 'parent 1',
    children: [
      {
        key: '0-0-0',
        title: 'parent 1-1',
        children: [{ key: '0-0-0-0', title: 'parent 1-1-0' }],
      },
      {
        key: '0-0-1',
        title: 'parent 1-2',
        children: [
          { key: '0-0-1-0', title: 'parent 1-2-0', disableCheckbox: true },
          { key: '0-0-1-1', title: 'parent 1-2-1' },
        ],
      },
    ],
  },
];

class TreeExample extends Component {
  static propTypes = {
    keys: PropTypes.array,
  };

  static defaultProps = {
    keys: ['0-0-0-0'],
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

  onExpand = expandedKeys => {
    // console.log('onExpand', expandedKeys, arguments);
    console.log('onExpand', expandedKeys);
  };

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    this.selKey = info.node.props.eventKey;
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  onEdit = () => {
    setTimeout(() => {
      console.log('current key: ', this.selKey);
    }, 0);
  };

  onDel = e => {
    if (!window.confirm('sure to delete?')) {
      return;
    }
    e.stopPropagation();
  };

  render() {
    const customLabel = (
      <span className="cus-label">
        <span>operations: </span>
        <span style={{ color: 'blue' }} onClick={this.onEdit}>
          Edit
        </span>
        &nbsp;
        <label onClick={e => e.stopPropagation()}>
          <input type="checkbox" /> checked
        </label>
        &nbsp;
        <span style={{ color: '#EB0000' }} onClick={this.onDel}>
          Delete
        </span>
      </span>
    );

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop" /> Tree
          </div>
          <div className="card-body">
            <Tree
              className="myCls"
              showLine
              checkable
              defaultExpandAll
              defaultExpandedKeys={this.state.defaultExpandedKeys}
              onExpand={this.onExpand}
              defaultSelectedKeys={this.state.defaultSelectedKeys}
              defaultCheckedKeys={this.state.defaultCheckedKeys}
              onSelect={this.onSelect}
              onCheck={this.onCheck}
            >
              <TreeNode title="parent 1" key="0-0">
                <TreeNode title={customLabel} key="0-0-0">
                  <TreeNode
                    title="leaf"
                    key="0-0-0-0"
                    style={{ background: 'rgba(255, 0, 0, 0.1)' }}
                  />
                  <TreeNode title="leaf" key="0-0-0-1" />
                </TreeNode>
                <TreeNode title="parent 1-1" key="0-0-1">
                  <TreeNode
                    title="parent 1-1-0"
                    key="0-0-1-0"
                    disableCheckbox
                  />
                  <TreeNode title="parent 1-1-1" key="0-0-1-1" />
                </TreeNode>
                <TreeNode title="parent 1-2" key="0-0-2" disabled>
                  <TreeNode title="parent 1-2-0" key="0-0-2-0" disabled />
                  <TreeNode title="parent 1-2-1" key="0-0-2-1" />
                </TreeNode>
              </TreeNode>
            </Tree>

            <h2>Check on Click TreeNode</h2>
            <Tree
              className="myCls"
              showLine
              checkable
              selectable={false}
              defaultExpandAll
              onExpand={this.onExpand}
              defaultSelectedKeys={this.state.defaultSelectedKeys}
              defaultCheckedKeys={this.state.defaultCheckedKeys}
              onSelect={this.onSelect}
              onCheck={this.onCheck}
              treeData={treeData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TreeExample;
