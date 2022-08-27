import { BottomNavigation, Grid, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    // <BottomNavigation
    //   showLabels
    //   value={value}
    //   onChange={(event, newValue) => {
    //     setValue(newValue);
    //   }}
    // >
    //   <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
    //   <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
    //   <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
    // </BottomNavigation>
    <Grid sx={{ flexGrow:1, }}>
        <IconButton>
            <GitHubIcon />
        </IconButton>
    </Grid>
  );
};

export default Footer;
