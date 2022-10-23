import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BlogPagePagination({ pages, elements }) {
  const handleClick = (e, i) => {
    if (i <= 1) {
      elements(() => 0);
    } else {
      elements((i - 1) * 4 + 1);
    }
  };

  return (
    <Stack spacing={2}>
      {pages && (
        <Pagination
          onChange={handleClick}
          count={pages}
          variant="outlined"
          shape="rounded"
        />
      )}
    </Stack>
  );
}
