import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

const Paginator = ({ count, page, setPage, limit }) => {
  const theme = useTheme();

  const numberOfPages = Math.ceil(count / limit);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Pagination
        count={numberOfPages}
        page={page}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            //components={{ previous: '<<', next: '>>' }}
            {...item}
            sx={{
              color: theme.palette.secondary.main,
              bgcolor: '#e7e7e7',
              ...(item.page === page && {
                backgroundColor: theme.palette.primary.main,
                color: 'secondary',
              }),
            }}
          />
        )}
        showFirstButton
        showLastButton
        //hidePrevButton={page === 1}
        //hideNextButton={page === numberOfPages}
        //siblingCount={2} // Números de página diretamente adjacentes à página atual
        //boundaryCount={1} // Números de página no início e no fim
      />
    </Stack>
  );
};

export default Paginator;
