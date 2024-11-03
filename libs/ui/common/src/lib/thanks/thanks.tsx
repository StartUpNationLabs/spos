import { Box, Typography } from '@mui/material';

export function Thanks() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Typography variant="body1"
                  component="span"
                  fontWeight={400}
                  fontSize={'5vw'}
      >
        Thank you for dining with us !
      </Typography>
    </Box>
  );
}
