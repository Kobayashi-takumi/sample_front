import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    height: "20%"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "80%",
    justifyContent: "center"
  },
  aSide: {
    width: "20%",
    height: "100%",
    backgroundColor: theme.palette.background.paper
  },
  body: {
    display: "flex",
    width: "80%",
    height: "100%"
  },
  projectTitle: {
    padding: "5%"
  },
  projectTitleString: {
    textAlign: "center",
    padding: "3%"
  },
  card: {
    height: "100%"
  },
  bodyHeader: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    padding: "1%"
  },
  cardActionList: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderBottom: "solid 1px"
  },
  paper: {
    position: "absolute",
    width: "30%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "10%",
    right: "10%"
  },
  button: {
    margin: theme.spacing(1)
  },
  cardFutter: {
    width: "100%"
  },
  detailBtn: {
    paddingRight: "auto"
  }
}));

export default useStyles;
