import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TIO
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
