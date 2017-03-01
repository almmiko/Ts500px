import * as React from 'react';

interface IinfiniteScroll {
  loadMore: any;
}

export function InfiniteScroll({loadMore}: IinfiniteScroll) {

  window.addEventListener('scroll', handleScroll);

  function handleScroll() {

    const windowHeight = 'innerHeight' in window ?
      window.innerHeight : document.documentElement.offsetHeight;

    const body = document.body;
    const html = document.documentElement;



    const docHeight = Math.max(body.scrollHeight,
      body.offsetHeight, html.clientHeight,
      html.scrollHeight, html.offsetHeight);

    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      loadMore();
    }
  }

  return (<div></div>);
}

export default InfiniteScroll;
