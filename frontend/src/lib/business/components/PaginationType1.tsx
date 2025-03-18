import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { usePagination } from "./usePagination";

interface PaginationProps {
  className?: string;
  baseQueryString: string;
  totalPages: number;
  currentPageNumber: number;
}

export default function PaginationType1({
  className,
  baseQueryString,
  totalPages,
  currentPageNumber,
}: PaginationProps) {
  const {
    pageButtonUrl,
    prevEllipsisButtonPageNumber,
    nextEllipsisButtonPageNumber,
    middlePages,
  } = usePagination({
    baseQueryString,
    totalPages,
    currentPageNumber,
  });

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationNumber
          pageNumber={1}
          currentPageNumber={currentPageNumber}
          pageButtonUrl={pageButtonUrl}
        />

        {prevEllipsisButtonPageNumber && (
          <PaginationLink href={pageButtonUrl(prevEllipsisButtonPageNumber)}>
            <PaginationEllipsis />
          </PaginationLink>
        )}

        {middlePages.map((pageNum) => (
          <PaginationNumber
            key={pageNum}
            pageNumber={pageNum}
            currentPageNumber={currentPageNumber}
            pageButtonUrl={pageButtonUrl}
          />
        ))}

        {nextEllipsisButtonPageNumber && (
          <PaginationLink href={pageButtonUrl(nextEllipsisButtonPageNumber)}>
            <PaginationEllipsis />
          </PaginationLink>
        )}

        <PaginationNumber
          pageNumber={totalPages}
          currentPageNumber={currentPageNumber}
          pageButtonUrl={pageButtonUrl}
        />
      </PaginationContent>
    </Pagination>
  );
}

const PaginationNumber = ({
  pageNumber,
  currentPageNumber,
  pageButtonUrl,
}: {
  pageNumber: number;
  currentPageNumber: number;
  pageButtonUrl: (page: number) => string;
}) => (
  <PaginationItem>
    <PaginationLink
      href={pageButtonUrl(pageNumber)}
      isActive={pageNumber === currentPageNumber}
    >
      {pageNumber}
    </PaginationLink>
  </PaginationItem>
);
