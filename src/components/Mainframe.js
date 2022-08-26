import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography
} from "@mui/material";
import React, { useRef, useState } from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import AddSongDialog from "./AddSongDialog";
import AddTuneDialog from "./AddTuneDialog";
import { baseUrl } from "./constants";
import Songtable from "./Songtable";
import TuningSetting from "./Tunesetting";

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
        if(response.status === 201) {
          console.log("Add song complete!")
          setLoading(false)
        }
      }
      )
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
    <div>
      {/* Grid Test */}
      <Container>
        <Grid
          className="wholecontainer"
          container
          spacing={1}
          sx={{ border: "2px solid gray" }}
        >
          <Grid item xs={12} sx={{ border: "2px solid gray", margin: "10px" }}>
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
          <Grid container xs={12} sx={{}}>
            <Grid item xs={6} sx={{ backgroundColor: "skyblue" }}>
              <TuningSetting
                tune={tune}
                setTune={setTune}
                tunedic={tunedic}
                returnTuneString={returnTuneString}
              />
              <Button
                sx={{ border: "1px groove white", margin: "10px" }}
                onClick={fetchSearch}
              >
                SEARCH
              </Button>
              <Button onClick={Test}>Test</Button>
            </Grid>
            <Grid item xs={6}>
              <SongtableContainer />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default DefaultFrame;
