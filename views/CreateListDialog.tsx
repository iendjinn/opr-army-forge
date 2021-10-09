import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../data/store'
import { useRouter } from 'next/router';
import { Button, Dialog, TextField } from "@mui/material";
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { createList } from "../data/listSlice";

const rotations = {} as any;

export default function CreateListDialog({ open, setOpen }) {

  const army = useSelector((state: RootState) => state.army);
  const [armyName, setArmyName] = useState("");
  const [pointsLimit, setPointsLimit] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const create = () => {
    dispatch(createList({ name: armyName || "My List", pointsLimit: pointsLimit || null }));
    router.push('/list');
  };

  return (
    <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
      <AppBar position="static" elevation={0} color="transparent">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(false)}
          >
            <ClearIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {army.data?.name || "New Army"}
          </Typography>
          <Button variant="contained" onClick={() => create()}>Create List</Button>
        </Toolbar>
      </AppBar>
      <div className="is-flex is-flex-direction-column p-4">
        <div className="is-flex p-2 mb-6" style={{ position: "relative", height: "100px", boxSizing: "content-box" }}>
          <div style={{
            zIndex: 0,
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url("img/army_bg.png")`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: 'no-repeat'
          }}></div>
          <div className="is-flex" style={{
            height: "100px",
            width: "100%",
            backgroundImage: `url("img/gf_armies/${army.data?.name}.png")`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: 'no-repeat',
            position: "relative", zIndex: 1
          }}></div>
        </div>
        <TextField variant="filled" label="List Name" className="mb-4" value={armyName} onChange={(e) => setArmyName(e.target.value)} />
        <TextField variant="filled" label="Points Limit" type="number" />
      </div>
    </Dialog>
  );
}