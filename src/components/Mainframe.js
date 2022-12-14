import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  Paper,
} from "@mui/material";
import React, { useRef, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import AddSongDialog from "./AddSongDialog";
import AddTuneDialog from "./AddTuneDialog";
import { baseUrl } from "./constants";
import Footer from "./Footer";
import Songtable from "./Songtable";
import TuningSetting from "./Tunesetting";
import "../style/Mainframe.css";

const DefaultFrame = (props) => {
  var tunedic = useRef({});
  const [tune, setTune] = useState("");
  const [open, setOpen] = useState(false);
  const [openaddsong, setOpenaddsong] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [refreshSongList, setRefreshSongList] = useState(false);
  const [loading, setLoading] = useState(false);

  const returnTuneString = (dict) => {
    return dict[6] + dict[5] + dict[4] + dict[3] + dict[2] + dict[1];
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen_addsong = () => {
    setOpenaddsong(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose_addsong = () => {
    setOpenaddsong(false);
  };

  const fetchAddSong = (data) => {
    fetch(baseUrl + "/api/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Add song complete!");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Error occured while fetch: ", error);
      });
  };

  const fetchSearch = () => {
    console.log(returnTuneString(tunedic.current));
    var tunestr = returnTuneString(tunedic.current);
    console.log("send this body: ", tunestr);
    fetch(
      baseUrl + "/api/songs/search?" + new URLSearchParams({ tuning: tunestr }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => response.json()) // await body
      .then((data) => {
        console.log(data);
        searchResult.length = 0;
        console.log("Before add: ", searchResult);
        let temparr = [];
        var i = 0;
        while (true) {
          if (data[i] === undefined) break;
          temparr.push(data[i]);
          i++;
        }
        temparr.map((row) => {
          searchResult.push(row);
        });
        console.log(searchResult);
        setRefreshSongList(!refreshSongList);
      })
      .catch((err) => console.log("Error occured during fetch: ", err));
  };

  const Test = () => {
    console.log("current tunedic is ", tunedic.current);
  };

  const SongtableContainer = () => {
    useDeepCompareEffect(() => {
      console.log("Rerender Songlist Component");
    }, [searchResult]);
    return (
      <Songtable
        key={refreshSongList}
        rowdata={searchResult}
        refreshSongList={refreshSongList}
        setRefreshSongList={setRefreshSongList}
      ></Songtable>
    );
  };

  return (
    <div class="basebox" className="basebox">
      <Container
        sx={{
          border: "2px green solid",
          flexDirection: "column",
          flex: 1,
          display: "flex",
        }}
      >
        <Grid
          className="wholecontainer"
          container
          spacing={1}
          sx={{ border: "dashed gray 5px", display: "flex" }}
        >
          <Grid
            item
            xs={12}
            sx={{ border: "2px solid gray", margin: "10px", height: "100" }}
          >
            <AppBar position="static" sx={{ backgroundColor: "skyblue" }}>
              <Toolbar>
                <Typography sx={{ flexGrow: 1, textAlign: "left" }}>
                  TUNING SONG FINDER
                </Typography>
                <Button sx={{ color: "white" }} onClick={handleClickOpen}>
                  Add Tuning
                </Button>
                <AddTuneDialog open={open} onClose={handleClose} />
                <Button
                  sx={{ color: "white" }}
                  onClick={handleClickOpen_addsong}
                >
                  Add Song
                </Button>
                <AddSongDialog
                  open={openaddsong}
                  fetchAddSong={fetchAddSong}
                  loading={loading}
                  setLoading={setLoading}
                  onClose={handleClose_addsong}
                ></AddSongDialog>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid
            container
            xs={12}
            sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Grid
              item
              xs={6}
              sx={{
                backgroundColor: "skyblue",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                border: "2px red solid",
                minWidth: "400px",
              }}
            >
              <Grid
                sx={{
                  border: "1px blue dashed",
                  flex: 1,
                  alignItems: "stretch",
                }}
              >
                <TuningSetting
                  tune={tune}
                  setTune={setTune}
                  tunedic={tunedic}
                  returnTuneString={returnTuneString}
                />
              </Grid>
              <Grid sx={{ border: "1px green dashed", alignSelf: "center" }}>
                <Button
                  sx={{ border: "1px groove white", margin: "0 auto" }}
                  onClick={fetchSearch}
                >
                  SEARCH
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{
                minWidth: "400px",}}>
              <SongtableContainer />
            </Grid>
          </Grid>
        </Grid>
        <Paper
          sx={{
            backgroundColor: "skyblue",
            height: "100px",
            marginTop: "auto", // ??? ????????? ????????? ????????? ?????? ??? margin??? ????????????.
            display: "flex",
          }}
        >
          <Footer></Footer>
        </Paper>
      </Container>
    </div>
  );
};

export default DefaultFrame;
