import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import BackIcon from '@mui/icons-material/ArrowBackIosNew';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningIcon from '@mui/icons-material/Warning';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../data/store";
import UpgradeService from "../../services/UpgradeService";
import PersistenceService from "../../services/PersistenceService";
import { updateCreationTime } from "../../data/listSlice";
import ValidationErrors from "../ValidationErrors";
import ValidationService from "../../services/ValidationService";
import { useMediaQuery } from "react-responsive";

export default function MainMenu({ setListConfigurationOpen, setValidationOpen }) {

  const army = useSelector((state: RootState) => state.army);
  const list = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const errors = ValidationService.getErrors(list);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoad = () => {
    router.push("/load");
  };

  const handleSave = () => {
    const creationTime = PersistenceService.createSave(army, list.name, list);
    dispatch(updateCreationTime(creationTime));
  };

  const handleShare = () => {
    PersistenceService.download(list);
  };

  const isBigScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <AppBar elevation={0} style={{ position: "sticky", top: 0, zIndex: 1 }}>
      <Toolbar className="p-0">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => router.back()}
          style={{ marginLeft: "0" }}
        >
          <BackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {list.name}
        </Typography>
        {errors.length > 0 && <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          title="Validation errors"
          onClick={() => setValidationOpen(true)}
          className="mr-2"
        >
          <WarningIcon />
        </IconButton>}
        {isBigScreen && <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          title="View list"
          onClick={() => router.push("/view")}
          className="mr-2"
        >
          <VisibilityIcon />
        </IconButton>}
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setListConfigurationOpen(true)}>Edit Details</MenuItem>
          <MenuItem onClick={() => router.push("/view")}>View</MenuItem>
          {!list.creationTime && <MenuItem onClick={handleSave}>Save</MenuItem>}
          <MenuItem onClick={handleShare}>Export/Share</MenuItem>
          <MenuItem onClick={handleLoad}>Load</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}