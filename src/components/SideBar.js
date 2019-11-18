import React, { useState, useEffect } from "react";
import useStyles from "../Style";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import TextField from "@material-ui/core/TextField";
import uuidv4 from "uuid";
import _ from "lodash";

const SideBar = props => {
  const [projectTitle, setProjectTitle] = useState("");
  const { projects, setProjects, setSelectedProject } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    console.log(projects);
    setSelectedIndex(index);
    setSelectedProject(projects[index]);
  };
  const classes = useStyles();

  const projectsDel = index => {
    console.log("del");
    let _projects = _.clone(projects);
    _projects.splice(index, 1);
    setProjects(_projects);
    setSelectedProject(projects[0]);
  };

  const projectsAdd = () => {
    if (!projectTitle) return;
    let _projects = _.clone(projects);
    _projects.push({ title: projectTitle, memos: [] });
    setProjects(_projects);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListSubheader>
          <TextField
            id="standard-basic"
            className={classes.textField}
            label="New Project"
            value={projectTitle}
            margin="normal"
            onChange={e => {
              setProjectTitle(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                projectsAdd();
                setProjectTitle("");
              }
            }}
          />
        </ListSubheader>
        <Divider />
        {_.map(projects, (item, index) => {
          const id = uuidv4();
          return (
            <React.Fragment key={id}>
              <ListItem
                button
                onClick={e => handleListItemClick(e, index)}
                selected={selectedIndex === index}
              >
                <ListItemIcon>
                  <FolderOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <ListItemIcon onClick={e => projectsDel(index)}>
                  <HighlightOffOutlinedIcon />
                </ListItemIcon>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
};

export default SideBar;
