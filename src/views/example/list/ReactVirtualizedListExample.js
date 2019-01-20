import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import ConfirmModal from 'views/comn/modal/ConfirmModal';

import {
  Grid,
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  ScrollSync,
} from 'react-virtualized';
import styles from './ReactVirtualizedListExample.css';

const rowCount = 999999; // 299만인 경우 느려짐, multi scroll 시, id 값이 틀려짐

// const width = 600;
// const height = 800;
const rowHeight = 70;

class ReactVirtualizedListExample extends Component {
  constructor() {
    super();
    this.list = Array(rowCount)
      .fill()
      .map((val, idx) => {
        return {
          id: idx,
          name: 'Name',
          image: 'http://via.placeholder.com/40',
          text:
            "I'm Text. I'm Text. I'm Text. I'm Text. I'm Text. I'm Text. I'm Text. I'm Text. I'm Text. I'm Text.",
        };
      });

    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    });
  }

  renderColumn = ({ index, key, style }) => {
    return (
      <div key={key} style={style} className="row">
        <div className="content">
          <div>{this.list[index].id}</div>
        </div>
      </div>
    );
  };

  renderRow = ({ index, key, style, parent }) => {
    return (
      <CellMeasurer
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style} className="row">
          <div className="image">
            <img src={this.list[index].image} alt="" />
          </div>
          <div className="content">
            <div>{this.list[index].id}</div>
            <div>{this.list[index].name}</div>
            <div>{this.list[index].text}</div>
          </div>
        </div>
      </CellMeasurer>
    );
  };

  // // 다른 컴포넌트로 넘기는 경우, this undefined 오류 방지를 위해
  // // 실행 시점의 this 객체를 얻기 위해 아래와 같은 람다 형식의 함수로 넘기거나
  // // constructor에 아래와 같이 바인딩 처리
  // // this.renderRow = this.renderRow.bind(this);
  // renderRow = ({ index, key, style }) => {
  //   // index 기준으로 원본 list에서 name, text 정보를 로딩
  //   return (
  //     <div key={key} style={style} className="row">
  //       <div className="image">
  //         <img src={this.list[index].image} alt="" />
  //       </div>
  //       <div className="content">
  //         <div>{this.list[index].name}</div>
  //         <div>{this.list[index].text}</div>
  //       </div>
  //     </div>
  //   );
  // };

  // renderRow({ index, key, style }) {
  //   // index 기준으로 원본 list에서 name, text 정보를 로딩
  //   console.log(this);
  //   console.log(this.list);
  //   return (
  //     <div key={key} style={style} className="row">
  //       <div className="image">
  //         <img src={this.list[index].image} alt="" />
  //       </div>
  //       <div className="content">
  //         <div>{this.list[index].name}</div>
  //         <div>{this.list[index].text}</div>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    const { list, renderRow } = this;

    return (
      <>
        <Card>
          <CardHeader>
            <Row className="align-items-center">List</Row>
          </CardHeader>
          <ScrollSync>
            {({ onScroll, scrollTop, scrollLeft }) => (
              <div className="list">
                {/* <span>
                  {scrollTop} - {scrollLeft}
                </span> */}
                {/* <AutoSizer disableWidth> */}
                <AutoSizer>
                  {({ width, height }) => {
                    return (
                      <div>
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                          }}
                        >
                          <List
                            className="leftSide"
                            width={50}
                            height={height}
                            rowHeight={rowHeight}
                            // deferredMeasurementCache={this.cache}
                            // rowHeight={this.cache.rowHeight}
                            scrollTop={scrollTop}
                            rowRenderer={this.renderColumn}
                            rowCount={this.list.length}
                            overscanRowCount={3}
                          />
                        </div>
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 50,
                          }}
                        >
                          <List
                            width={width - 30}
                            height={height}
                            onScroll={onScroll}
                            rowHeight={rowHeight}
                            // deferredMeasurementCache={this.cache}
                            // rowHeight={this.cache.rowHeight}
                            rowRenderer={this.renderRow}
                            rowCount={this.list.length}
                            overscanRowCount={3}
                          />
                        </div>
                      </div>
                    );
                  }}
                </AutoSizer>
              </div>
            )}
          </ScrollSync>
        </Card>
      </>
    );
  }
}

export default ReactVirtualizedListExample;
