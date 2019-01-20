import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import ConfirmModal from 'views/comn/modal/ConfirmModal';

import { Grid } from 'react-virtualized';
import styles from './datagrid.css';

const makeRows = () => {
  let rows = [];
  for (let row = 0; row <= 10000; row++) {
    let cols = [];
    for (let col = 0; col < 3; col++) {
      cols.push('col' + col);
    }
    rows.push(cols);
  }

  return rows;
};

let list = null;

class SimpleGridExample extends Component {
  constructor() {
    super();
    list = makeRows();
  }

  cellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style}>
        {list[rowIndex][columnIndex]}
      </div>
    );
  }

  render() {
    const { cellRenderer } = this;
    // const { list } = this.state;

    return (
      <>
        <Card>
          <CardHeader>
            <Row className="align-items-center">Grid</Row>
          </CardHeader>
          <CardBody>
            <Grid
              className={styles.BodyGrid}
              cellRenderer={cellRenderer}
              columnCount={list[0].length}
              columnWidth={100}
              height={300}
              rowCount={list.length}
              rowHeight={50}
              width={300}
            />
          </CardBody>
        </Card>
      </>
    );
  }
}

export default SimpleGridExample;
