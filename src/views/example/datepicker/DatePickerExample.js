import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import DatePicker from 'react-datepicker';
// import { registerLocale, setDefaultLocale } from DatePicker;
import 'react-datepicker/dist/react-datepicker.css';
// import ko from 'date-fns/locale/ko';
// DatePicker.registerLocale('ko', ko);
// DatePicker.setDefaultLocale('ko');

class DatePickerExample extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(date) {
    console.log('handleChange', date);

    this.setState({
      date: date,
    });

    console.log(this.state.date);
  }

  handleSelect(date) {
    console.log('handleSelect', date);
  }

  render() {
    const { date } = this.state;
    const { handleChange, handleSelect, handleSubmit } = this;

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                {'DatePicker: '}
              </Col>
              <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
                <DatePicker
                  selected={date}
                  onSelect={handleSelect}
                  onChange={handleChange}
                  name="startDate"
                  //   dateFormat="yyyy/MM/dd hh:mm:ss"
                  dateFormat="yyyy/MM/dd"
                  locale="ko"
                />
              </Col>
            </Row>
          </CardHeader>
          <CardBody>{date.toLocaleDateString()}</CardBody>
        </Card>
      </div>
    );
  }
}

export default DatePickerExample;
