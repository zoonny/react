import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export const endPage = (page, pageCount) => {
  return pageCount + Math.floor(page / (pageCount + 1)) * pageCount;
};

export const startPage = (page, pageCount) => {
  const end = endPage(page, pageCount);
  return end - pageCount + 1;
};

class Paging extends Component {
  render() {
    const {
      page,
      lastPage,
      pageCount,
      onClickPage,
      onClickPrev,
      onClickNext,
    } = this.props;

    // const end = pageCount + Math.floor(page / (pageCount + 1)) * pageCount;
    const end = endPage(page, pageCount);
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

    console.log('page', page);

    return (
      <div className="animated fadeIn">
        <Pagination className="pagination justify-content-center">
          <PaginationItem {...prevOpts}>
            <PaginationLink previous tag="button" onClick={onClickPrev} />
          </PaginationItem>
          {pageArr.map((item, index) => {
            let opts = null;

            console.log('item', item, 'page', page);

            if (item === page) {
              opts = {
                active: true,
              };
            }

            return (
              <PaginationItem key={index} {...opts}>
                <PaginationLink id={item} tag="button" onClick={onClickPage}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem {...nextOpts}>
            <PaginationLink next tag="button" onClick={onClickNext} />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default Paging;
