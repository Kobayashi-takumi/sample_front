import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../Style";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Popper from "@material-ui/core/Popper";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import PageviewIcon from "@material-ui/icons/Pageview";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import _ from "lodash";

const ProjectsBody = props => {
  const { selectedProject, setSelectedProject } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dataDelete = index => {
    let _data = _.clone(selectedProject);
    _data.memos.splice(index, 1);
    console.log(index);
    setSelectedProject(_data);
  };

  return (
    <>
      <Grid container>
        <Grid container justify="flex-end" className={classes.bodyHeader}>
          <Grid item>
            <BodyHeader setOpen={setOpen} open={open} />
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.projectTitle}>
          <Grid item md={6}>
            <Paper>
              <Typography variant="h3" className={classes.projectTitleString}>
                {selectedProject.title}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid container direction="row" wrap="wrap" spacing={3}>
          {_.map(selectedProject.memos, (items, index) => {
            return (
              <Grid item md={3} key={index}>
                <Cards
                  chips={items.tags}
                  dataDelete={dataDelete}
                  cardId={index}
                  items={items}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                  id={index}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <FormModal
        open={open}
        setOpen={setOpen}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </>
  );
};

const Cards = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectMemo, setSelectMemo] = useState();
  const classes = useStyles();
  let {
    chips,
    dataDelete,
    cardId,
    items,
    selectedProject,
    setSelectedProject,
    id
  } = props;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          title={items.memoTitle}
          action={
            <>
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Popper open={open} anchorEl={anchorEl} placement="right-start">
                <div className={classes.cardActionList}>
                  <IconButton
                    onClick={async e => {
                      handleClick();
                      await setSelectMemo(items);
                      await setFormOpen(!formOpen);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={e => {
                      dataDelete(cardId);
                      handleClick();
                    }}
                  >
                    <DeleteOutline />
                  </IconButton>
                </div>
              </Popper>
            </>
          }
        />
        <CardContent>{items.memoBody}</CardContent>
        <div className={classes.cardFutter}>
          {_.map(chips, (item, index) => {
            return <Chip key={index} label={item} color="primary" />;
          })}
          <IconButton className={classes.detailBtn}>
            <PageviewIcon />
          </IconButton>
        </div>
      </Card>
      <FormModal
        open={formOpen}
        setOpen={setFormOpen}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectMemo={selectMemo}
        id={id}
      />
    </>
  );
};

const BodyHeader = props => {
  const classes = useStyles();
  const [filter, setFilter] = useState("");
  const { open, setOpen } = props;
  const modalOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.bodyHeaderContent}>
      <TextField
        id="standard-basic"
        className={classes.textField}
        label="Search"
        value={filter}
        margin="normal"
        onChange={e => {
          setFilter(e.target.value);
        }}
      />
      <Fab color="primary" aria-label="add" onClick={e => modalOpen()}>
        <AddIcon />
      </Fab>
    </div>
  );
};

const FormModal = props => {
  const {
    open,
    setOpen,
    selectedProject,
    setSelectedProject,
    selectMemo,
    id
  } = props;
  const memoData = selectMemo || { memoTitle: "", memoBody: "", tags: [] };
  const [title, setTitle] = useState(memoData.memoTitle);
  const [content, setContent] = useState(memoData.memoBody);
  const [tags, setTags] = useState(memoData.tags);
  const [tag, setTag] = useState();
  const classes = useStyles();

  useEffect(() => {
    setTitle(memoData.memoTitle);
    setContent(memoData.memoBody);
    setTags(memoData.tags);
  }, [selectMemo]);

  const addTag = value => {
    let _tags = _.clone(tags);
    _tags.push(value);
    setTags(_tags);
  };

  const tagDelete = index => {
    let _tags = _.clone(tags);
    _tags.splice(index, 1);
    setTags(_tags);
  };

  const memoPush = () => {
    let _selectedProject = _.clone(selectedProject);
    if (!id && id !== 0) {
      _selectedProject.memos.push({
        memoTitle: title,
        memoBody: content,
        tags: tags
      });
    } else {
      _selectedProject.memos[id] = {
        memoTitle: title,
        memoBody: content,
        tags: tags
      };
    }
    setSelectedProject(_selectedProject);
  };

  const onClear = () => {
    if (!id && id !== 0) {
      setTitle("");
      setContent("");
      setTags([]);
    } else {
      setTitle(memoData.memoTitle);
      setContent(memoData.memoBody);
      setTags(memoData.tags);
    }
    setOpen(!open);
  };

  return (
    <Modal
      open={open}
      onClose={e => setOpen(!open)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <FormGroup className={classes.paper}>
        <FormLabel component="legend">Title</FormLabel>
        <TextField
          label="タイトル"
          margin="normal"
          variant="outlined"
          value={title || ""}
          onChange={e => setTitle(e.target.value)}
        />
        <FormLabel>Content</FormLabel>
        <TextField
          id="outlined-multiline-static"
          label="内容"
          multiline
          rows="10"
          margin="normal"
          variant="outlined"
          value={content || ""}
          onChange={e => setContent(e.target.value)}
        />
        <FormLabel>Tag</FormLabel>
        <TextField
          label="タグを追加"
          margin="normal"
          variant="outlined"
          value={tag || ""}
          onChange={e => setTag(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              addTag(e.target.value);
              setTag("");
            }
          }}
        />
        <div>
          {_.map(tags, (tag, index) => {
            return (
              <Chip key={index} label={tag} onDelete={e => tagDelete(index)} />
            );
          })}
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={e => {
              onClear();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={e => {
              memoPush();
              onClear();
            }}
          >
            OK!
          </Button>
        </div>
      </FormGroup>
    </Modal>
  );
};

export default ProjectsBody;
