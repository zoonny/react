import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from 'react-data-grid';

import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

const columns = [
  { key: 'id', name: 'ID', editable: true },
  { key: 'title', name: 'Title', editable: true },
  { key: 'complete', name: 'Complete', editable: true },
];

const makeRows = () => {
  let rows = [];

  for (let i = 0; i <= 10000; i++) {
    rows.push({
      id: i,
      title: 'Task ' + i,
      complete: 20 + i,
    });
  }

  return rows;
};

class ModalAlertContainerExample extends Component {
  constructor() {
    super();
    this.state = { rows: makeRows() };
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  render() {
    const { onOpenModal, onOpenAlert } = this.props;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button
                  block
                  color="primary"
                  onClick={onOpenModal}
                  className="mr-1"
                >
                  Modal
                </Button>
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <Button
                  block
                  color="primary"
                  onClick={onOpenAlert}
                  className="mr-1"
                >
                  Alert
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <div>
            <ReactDataGrid
              columns={columns}
              rowGetter={i => this.state.rows[i]}
              rowsCount={this.state.rows.length}
              onGridRowsUpdated={this.onGridRowsUpdated}
              enableCellSelect={true}
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default ModalAlertContainerExample;
