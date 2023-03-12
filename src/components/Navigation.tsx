import OpacityTwoToneIcon from '@mui/icons-material/OpacityTwoTone';
import { Box, AppBar, Toolbar, IconButton, Typography, alpha, InputBase, styled, Menu } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navigation() {

    const navigate = useNavigate()

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
          <Toolbar>
            <OpacityTwoToneIcon></OpacityTwoToneIcon>
            <Typography
                variant="h6"
                onClick={(e) => {navigate("/")}}
                component="a"
                noWrap
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textDecoration: 'none', color: 'inherit', cursor: "pointer" }}
            >
                Water Level Report
            </Typography>
            <SearchBar />
          </Toolbar>
      </AppBar>
    </Box>
    )
}
