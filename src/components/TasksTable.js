import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
// import FilterListIcon from "@material-ui/icons/FilterList";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import { InputAdornment, MenuItem, Select, TextField } from "@material-ui/core";
import CreateTask from "./CreateTask";
import * as tasksActions from "../store/actions/tasks";
import { connect } from "react-redux";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "duration", numeric: false, disablePadding: true, label: "Duration" },
  { id: "start", numeric: false, disablePadding: true, label: "Start " },
  { id: "finish", numeric: false, disablePadding: true, label: "Finish " },
  { id: "resource", numeric: false, disablePadding: true, label: "Resource " },
  { id: "operations", numeric: false, disablePadding: false },
];

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

function EnhancedTableHead(props) {
  const {
    classes,
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    // rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === "light"
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: "1 1 100%",
//   },
// }));

// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected, selected } = props;

//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           className={classes.title}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           className={classes.title}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Tasks
//         </Typography>
//       )}

//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete" onClick={handleDelete}>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  select: {
    minWidth: 150,
  },
}));

function TasksTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  // const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentTask, setCurrentTask] = React.useState({
    id: "",
    name: "",
    duration: "",
    start: "",
    finish: "",
    resource: "",
    changed: false,
  });

  useEffect(() => {
    props.onFetchTasks();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = props.tasks.map((n) => n.id);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };
  const getFinishDate = (start, duration) => {
    var y = parseInt(start.split("-")[0]);
    var mm = parseInt(start.split("-")[1]) - 1;
    var dd = parseInt(start.split("-")[2]);
    var date = new Date(y, mm, dd, 0, 0, 0, 0);

    date.setTime(date.getTime() + duration * 24 * 60 * 60 * 1000);

    dd = date.getDate();
    mm = date.getMonth() + 1;
    y = date.getFullYear();
    return y + "-" + mm + "-" + dd;
  };
  const handleClick = (event, task) => {
    if (task.id !== currentTask.id) {
      setCurrentTask({
        id: task.id,
        name: task.name,
        duration: task.duration,
        start: convert(task.start),
        finish: convert(task.finish),
        resource: task.resource,
        changed: false,
      });
    }
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    console.log("name changed");
    // e.target.value = currentTask.name;
    setCurrentTask({ ...currentTask, name: newName, changed: true });
  };
  const handleDurationChange = (e) => {
    const newDuration = e.target.value;
    if (isNaN(newDuration)) return;
    setCurrentTask({
      ...currentTask,
      duration: newDuration,
      finish: getFinishDate(currentTask.start, newDuration),
      changed: true,
    });
  };
  const handleStartChange = (e) => {
    const newStart = e.target.value;
    setCurrentTask({
      ...currentTask,
      start: newStart,
      finish: getFinishDate(newStart, currentTask.duration),
      changed: true,
    });
  };
  const handleFinishChange = (e) => {
    const newFinish = e.target.value;
    setCurrentTask({ ...currentTask, finish: newFinish, changed: true });
  };
  const handleResourceChange = (e) => {
    const newResource = e.target.value;
    setCurrentTask({ ...currentTask, resource: newResource, changed: true });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, props.tasks.length - page * rowsPerPage);

  const taskSelected = (id) => {
    if (id === currentTask.id) return true;
    else return false;
  };
  const handleDelete = (id) => {
    console.log("Delete: ", id);
    props.onDeleteTask(id);
  };
  const handleSave = (task) => {
    console.log("save: ", task);
    props.onModifyTask(
      currentTask.id,
      currentTask.name,
      currentTask.duration,
      currentTask.start,
      currentTask.finish
    );
    setCurrentTask({
      id: currentTask.id,
      name: currentTask.name,
      duration: currentTask.duration,
      start: currentTask.start,
      finish: currentTask.finish,
      resource: currentTask.resource,
      changed: false,
    });
    console.log(currentTask.resource);
    props.onAssignResourceToTask(currentTask.id,currentTask.resource);
  };
  const handleDisabledSaveBtn = () => {
    if (
      currentTask.name.length > 0 &&
      currentTask.duration > 0 &&
      currentTask.start.length > 0
      // &&
      // currentTask.stRate.length > 0
    )
      return true;
    else return false;
  };
  const handleDiscard = (task) => {
    console.log("discard: ", task);
    setCurrentTask({
      id: task.id,
      name: task.name,
      duration: task.duration,
      start: task.start,
      finish: task.finish,
      resource: task.resource,
      changed: false,
    });
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
        /> */}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.tasks.length}
            />
            <TableBody>
              {stableSort(props.tasks, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task, index) => {
                  // const isItemSelected = isSelected(task.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, task)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={task.id}
                      // selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell> */}
                      <TableCell id={labelId}>{task.id}</TableCell>
                      <TableCell>
                        <TextField
                          value={
                            taskSelected(task.id) ? currentTask.name : task.name
                          }
                          onChange={handleNameChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={
                            taskSelected(task.id)
                              ? currentTask.duration
                              : task.duration
                          }
                          onChange={handleDurationChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                days
                              </InputAdornment>
                            ),
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          id="date"
                          type="date"
                          value={
                            taskSelected(task.id)
                              ? currentTask.start
                              : convert(task.start)
                          }
                          onChange={handleStartChange}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={
                            taskSelected(task.id)
                              ? currentTask.finish
                              : convert(task.finish)
                          }
                          onChange={handleFinishChange}
                          disabled
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={
                            taskSelected(task.id)
                              ? currentTask.resource
                              : task.resource
                          }
                          className={classes.select}
                          onChange={handleResourceChange}
                        >
                          {props.resources.length > 0 ? (
                            props.resources.map((resource) => (
                              <MenuItem key={resource.id} value={resource.id}>
                                {resource.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value={"disabled"} disabled>
                              There are no resources!
                            </MenuItem>
                          )}
                        </Select>
                      </TableCell>

                      <TableCell>
                        {currentTask.changed && taskSelected(task.id) ? (
                          <React.Fragment>
                            <Tooltip title="Save">
                              <IconButton
                                aria-label="Save"
                                onClick={() => handleSave(task)}
                                disabled={!handleDisabledSaveBtn()}
                              >
                                <SaveIcon />{" "}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Discard">
                              <IconButton
                                aria-label="Discard"
                                onClick={() => handleDiscard(task)}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Tooltip>
                          </React.Fragment>
                        ) : (
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(task.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      <CreateTask />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
    resources: state.resources.resources,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTasks: () => dispatch(tasksActions.fetchTasks()),
    onDeleteTask: (id) => dispatch(tasksActions.removeTaskFromProject(id)),
    onModifyTask: (id, name, duration, start, finish) =>
      dispatch(
        tasksActions.modifyTaskInProject(id, name, duration, start, finish)
      ),
    onAssignResourceToTask: (taskID,resourceID) =>
      dispatch(
        tasksActions.assignResourceToTask(taskID,resourceID)
      ),  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksTable);
