import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import ConfirmModal from 'views/comn/modal/ConfirmModal';

import { Grid } from 'react-virtualized';
import styles from './datagrid.css';

const rowCount = 10000;

class NotGridProblemExample extends Component {
  constructor() {
    super();
    this.list = Array(rowCount)
      .fill()
      .map((val, idx) => {
        return {
          id: idx,
          name: 'John Doe',
          image: 'http://via.placeholder.com/40',
          text: 'Text',
        };
      });
  }

  renderRow(item) {
    return (
      <div key={item.id} className="row">
        <div className="image">
          <img src={item.image} alt="" />
        </div>
        <div className="content">
          <div>{item.name}</div>
          <div>{item.text}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        <Card>
          <CardHeader>
            <Row className="align-items-center">Grid</Row>
          </CardHeader>
          <CardBody>{this.list.map(this.renderRow)}</CardBody>
        </Card>
      </>
    );
  }
}

export default NotGridProblemExample;
