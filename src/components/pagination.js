import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationLinks = ({ currentPage, numberOfPages }) => {
    const baseUrl = '/blog/page/';
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === numberOfPages;
    const prevPage = currentPage > 2 ? `/blog/page/${currentPage - 1}` : '/blog' ;
    const nextPage = (currentPage + 1) > numberOfPages ? numberOfPages : currentPage + 1;
    return (
      <Pagination className="page-navigation" aria-label="Page navigation">
        <PaginationItem disabled={isFirstPage}>
          <PaginationLink href="/blog">
            <i className="fa fa-step-backward" aria-hidden="true"></i>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={isFirstPage}>
          <PaginationLink href={prevPage}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i>
          </PaginationLink>
        </PaginationItem>

        {Array.from({ length: numberOfPages }).map((_, index) => {
          const pageNumber = index + 1
          const isActive = pageNumber === currentPage

          return (
            <PaginationItem key={index} active={isActive}>
              {isActive ? (
                <span className="page-link">{pageNumber}</span>
              ) : (
                <PaginationLink
                  href={pageNumber > 1 ? `${baseUrl}${pageNumber}` : "/blog"}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          )
        })}

        <PaginationItem disabled={isLastPage}>
          <PaginationLink href={`${baseUrl}${nextPage}`}>
            <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={isLastPage}>
          <PaginationLink href={`${baseUrl}${numberOfPages}`}>
            <i className="fa fa-step-forward" aria-hidden="true"></i>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    )
}

export default PaginationLinks
