import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import PagingUtils from 'libs/PagingUtils';

class Paging extends Component {
  handleClickPage = async e => {
    const { onChangePage } = this.props;

    onChangePage(parseInt(e.target.id));
  };

  handleClickPrev = async e => {
    const { paging } = this.props;
    const { page, pageCount } = paging;

    const { onChangePage } = this.props;

    onChangePage(PagingUtils.endPage(page, pageCount) - pageCount);
  };

  handleClickNext = async e => {
    const { paging } = this.props;
    const { page, pageCount } = paging;

    const { onChangePage } = this.props;

    onChangePage(PagingUtils.startPage(page, pageCount) + pageCount);
  };

  render() {
    const { paging, lastPage } = this.props;
    const { page, pageCount } = paging;

    const { handleClickPage, handleClickPrev, handleClickNext } = this;

    const end = PagingUtils.endPage(page, pageCount);
    const start = end - pageCount + 1;
    const pageArr = [];
    let index = start;
    while (index <= end && index <= lastPage) {
      pageArr.push(index);
      index++;
    }

    let prevOpts = null;
    if (start === 1) {
      prevOpts = {
        disabled: true,
      };
    }

    let nextOpts = null;
    if (end >= lastPage) {
      nextOpts = {
        disabled: true,
      };
    }

    return (
      <div className="animated fadeIn">
        <Pagination className="pagination justify-content-center">
          <PaginationItem {...prevOpts}>
            <PaginationLink previous tag="button" onClick={handleClickPrev} />
          </PaginationItem>
          {pageArr.map((item, index) => {
            let opts = null;

            if (item === page) {
              opts = {
                active: true,
              };
            }

            return (
              <PaginationItem key={index} {...opts}>
                <PaginationLink
                  id={item}
                  tag="button"
                  onClick={handleClickPage}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem {...nextOpts}>
            <PaginationLink next tag="button" onClick={handleClickNext} />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default Paging;
