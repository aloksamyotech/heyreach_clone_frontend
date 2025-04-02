import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { MoreVert, Delete, Edit, FileDownload, Visibility, DoDisturbAlt,CompareArrows } from "@mui/icons-material";
import './ActionMenu.css';

const ActionMenu = ({ canRename, canDelete, canExport, canView, canDisconnect, canReConnect, onRename, onDelete, onExport, onView,viewTitle,renameTitle,deleteTitle}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {canView && (
          <MenuItem onClick={onView}>
            <Visibility fontSize="small" /> <span style={{padding:'0 5px'}}>{viewTitle}</span>
          </MenuItem>
        )}
        {canExport && (
          <MenuItem onClick={onExport}>
            <FileDownload fontSize="small" /> <span style={{padding:'0 5px'}}>Export to CSV</span>
          </MenuItem>
        )}
        {canRename && (
          <MenuItem onClick={onRename}>
            <Edit fontSize="small" /> <span style={{padding:'0 5px'}}>{renameTitle}</span>
          </MenuItem>
        )}
        {canDelete && (
          <MenuItem onClick={onDelete}>
            <Delete fontSize="small" /> <span style={{padding:'0 5px'}}>{deleteTitle}</span>
          </MenuItem>
        )}
        {canDisconnect && (
            <MenuItem onClick={onDelete}>
              <DoDisturbAlt fontSize="small" /> <span style={{padding:'0 5px'}}>Disconnect</span>
            </MenuItem>
        )}
        {canReConnect && (
          <MenuItem onClick={onDelete}>
              <CompareArrows fontSize="small" /> <span style={{padding:'0 5px'}}>Re-connect</span>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default ActionMenu;
