import GitHubIcon from "@mui/icons-material/GitHub";
import MailIcon from "@mui/icons-material/Mail";
import { Grid, IconButton, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { typography } from "@mui/system";

const Footer = () => {
  return (
    <Grid
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid",
        gap: "10px"
      }}
    >
      <IconButton size="large">
        <GitHubIcon sx={{ fontSize: "35px", color: "white" }} />
      </IconButton>
      <IconButton size="large">
        <MailIcon sx={{ fontSize: "35px", color: "white" }} />
      </IconButton>
      <Button
        style={{
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
          marginLeft:"7px",
        }}
      >
        <Typography color="skyblue" fontSize="15px" sx={{fontWeight: 'bold'}}>ABOUT</Typography>
      </Button>
    </Grid>
  );
};

export default Footer;
