import React, { useState, useEffect } from "react";
import HeaderMenu from "./components/HeaderMenu";
import SideBar from "./components/SideBar";
import ProjectsBody from "./components/ProjectsBody";
import _ from "lodash";
import useStyles from "./Style";

const App = () => {
  const [visible, setVisible] = useState(true);
  const [projects, setProjects] = useState([
    {
      title: "sample1",
      memos: [
        { memoTitle: "data1", memoBody: "data", tags: ["test1", "test2"] },
        { memoTitle: "data2", memoBody: "data", tags: ["test1", "test2"] },
        { memoTitle: "data3", memoBody: "data", tags: ["test1", "test2"] }
      ]
    },
    {
      title: "sample2",
      memos: [
        { memoTitle: "data4", memoBody: "data", tags: ["test1", "test2"] },
        { memoTitle: "data5", memoBody: "data", tags: ["test1", "test2"] },
        { memoTitle: "data6", memoBody: "data", tags: ["test1", "test2"] }
      ]
    },
    {
      title: "sample3",
      memos: [
        { memoTitle: "data7", memoBody: "data", tags: ["test1", "test2"] },
        { memoTitle: "data8", memoBody: "data", tags: ["test1", "test2"] },
        { memoTitle: "data9", memoBody: "data", tags: ["test1", "test2"] }
      ]
    }
  ]);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const classes = useStyles();

  useEffect(() => {
    let data = _.clone(projects);
    _.merge(
      _.filter(data, item => {
        return item.title === selectedProject.title;
      }),
      [selectedProject]
    );
    setProjects(data);
  }, [selectedProject]);

  return (
    <div className={classes.root}>
      <HeaderMenu
        visible={visible}
        setVisible={setVisible}
        className={classes.header}
      />
      <div className={classes.bodyContainer}>
        {visible && (
          <div className={classes.aSide}>
            <SideBar
              projects={projects}
              setProjects={setProjects}
              setSelectedProject={setSelectedProject}
            />
          </div>
        )}
        <div className={classes.body}>
          {!selectedProject || (
            <ProjectsBody
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
