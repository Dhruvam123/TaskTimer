import { AppBar, Toolbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Header = () => {
  return (
    <Box>
      <AppBar position="">
        <Toolbar sx={{padding:"20px"}}>
            <Typography variant="h4">
                TODO LIST
            </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
