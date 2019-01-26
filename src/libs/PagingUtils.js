const PagingUtils = {
  endPage: function(page, pageCount) {
    return pageCount + Math.floor(page / (pageCount + 1)) * pageCount;
  },
  startPage: function(page, pageCount) {
    const end = this.endPage(page, pageCount);
    return end - pageCount + 1;
  },
};

export default PagingUtils;
