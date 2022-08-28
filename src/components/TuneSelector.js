import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import { IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { CircularLinkedList, Node } from "./CircularLinkedList";

const TuneSelector = (props) => {
  const tunelist = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
    "B#",
  ];
  const [tune, setTune] = useState(props.tune);
  const tuneCircularList = new CircularLinkedList();
  tunelist.forEach((element) => {
    const node = new Node(element);
    tuneCircularList.append(node);
  });

  var presentNode = useRef(tuneCircularList.firstNode);

  const prevTune = () => {
    presentNode.current = presentNode.current.prev;
    setTune(presentNode.current.value);
  };

  const nextTune = () => {
    presentNode.current = presentNode.current.next;
    setTune(presentNode.current.value);
  };

  useEffect(() => {
    presentNode.current = tuneCircularList.findNodebyValue(
      presentNode.current,
      props.tune
    );
    props.tuneChange(props.stringNum, presentNode.current.value);
  }, []);

  useEffect(() => {
    try {
      props.tuneChange(props.stringNum, presentNode.current.value);
    } catch (error) {
      console.log(error);
    }
  }, [presentNode.current.value]);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px white",
        }}
      >
        <Typography>{props.stringNum}</Typography>
        <Stack sx={{ alignItems: "center" }}>
          <IconButton onClick={prevTune}>
            <ArrowDropUpOutlinedIcon />
          </IconButton>
          <Box sx={{ border: "2px white" }}>{tune}</Box>
          <IconButton onClick={nextTune}>
            <ArrowDropDownOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>
    </div>
  );
};

export default TuneSelector;
