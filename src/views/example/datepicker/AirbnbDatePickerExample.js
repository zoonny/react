import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from './AirbnbDatePickerExampleIcon';
import { Form, Input, FormGroup, Container, Label } from 'reactstrap';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class AirbnbDatePickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null,
    };

    this.handleDatesChange = this.handleDatesChange.bind(this);
  }

  handleDatesChange(date) {
    console.log(date);
    this.setState({
      date: date,
    });
  }

  render() {
    const { handleDatesChange } = this;

    return (
      <div className="animated fadeIn">
        <Container>
          <Form>
            <FormGroup>
              <SingleDatePicker
                // showClearDate={true}
                customInputIcon={
                  <svg className="icon icon-small">
                    <Icon icon="ICON_CALENDER" className="icon icon-large" />
                  </svg>
                }
                inputIconPosition="after"
                small={true}
                block={false}
                numberOfMonths={1}
                date={this.state.date}
                onDateChange={date => this.handleDatesChange(date)}
                focused={this.state.focused}
                onFocusChange={({ focused }) => this.setState({ focused })}
                openDirection="down"
                hideKeyboardShortcutsPanel={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">
                {this.state.date &&
                  moment(this.state.date).format('YYYY-MM-DD')}
              </Label>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AirbnbDatePickerExample;
