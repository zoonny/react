import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

import { makeData, Logo, Tips } from './CrudExampleUtil';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class TableExample extends Component {
  constructor() {
    super();
    this.state = {
      data: makeData(),
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop" /> CRUD
          </div>
          <div className="card-body">
            <ReactTable
              data={data}
              columns={[
                {
                  Header: 'Name',
                  columns: [
                    {
                      Header: 'First Name',
                      accessor: 'firstName',
                    },
                    {
                      Header: 'Last Name',
                      id: 'lastName',
                      accessor: d => d.lastName,
                    },
                  ],
                },
                {
                  Header: 'Info',
                  columns: [
                    {
                      Header: 'Age',
                      accessor: 'age',
                    },
                    {
                      Header: 'Status',
                      accessor: 'status',
                    },
                  ],
                },
                {
                  Header: 'Stats',
                  columns: [
                    {
                      Header: 'Visits',
                      accessor: 'visits',
                    },
                  ],
                },
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
            <br />
            {/* <Tips /> */}
            {/* <Logo /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default TableExample;
