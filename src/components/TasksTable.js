import React from "react";
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
import { InputAdornment, TextField } from "@material-ui/core";
import CreateTask from "./CreateTask";

const rows = [
  {
    id: "123",
    name: "task1",
    duration: "3",
    start: "2000-02-20",
    finish: "2000-02-20",
  },
  {
    id: "1234",
    name: "task2",
    duration: "3",
    start: "2000-02-20",
    finish: "2000-02-20",
  },
  {
    id: "1235",
    name: "task3",
    duration: "3",
    start: "2000-02-20",
    finish: "2000-02-20",
  },
  {
    id: "1236",
    name: "task4",
    duration: "3",
    start: "2000-02-20",
    finish: "2000-02-20",
  },
  {
    id: "1237",
    name: "task5",
    duration: "3",
    start: "2000-02-20",
    finish: "2000-02-20",
  },
];

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
  { id: "operations", numeric: false, disablePadding: true },
];

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
}));

export default function TasksTable() {
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
    changed: false,
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.id);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, row) => {
    if (row.id !== currentTask.id)
      setCurrentTask({
        id: row.id,
        name: row.name,
        duration: row.duration,
        start: row.start,
        finish: row.finish,
        changed: false,
      });
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    console.log("name changed");
    // e.target.value = currentTask.name;
    setCurrentTask({ ...currentTask, name: newName, changed: true });
  };
  const handleDurationChange = (e) => {
    const newDuration = e.target.value;
    if (!isNaN(newDuration))
      setCurrentTask({ ...currentTask, duration: newDuration, changed: true });
  };
  const handleStartChange = (e) => {
    const newStart = e.target.value;
    console.log(newStart);
    setCurrentTask({ ...currentTask, start: newStart, changed: true });
  };
  const handleFinishChange = (e) => {
    const newFinish = e.target.value;
    setCurrentTask({ ...currentTask, finish: newFinish, changed: true });
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
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const taskSelected = (id) => {
    if (id === currentTask.id) return true;
    else return false;
  };
  const handleDelete = (id) => {
    console.log("Delete: ", id);
  };
  const handleSave = (row) => {
    console.log("save: ", row);
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
  const handleDiscard = (row) => {
    console.log("discard: ", row);
    setCurrentTask({
      id: row.id,
      name: row.name,
      duration: row.duration,
      start: row.start,
      finish: row.finish,
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
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      // selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell> */}
                      <TableCell component="th" id={labelId}>
                        {row.id}
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={
                            taskSelected(row.id) ? currentTask.name : row.name
                          }
                          onChange={handleNameChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={
                            taskSelected(row.id)
                              ? currentTask.duration
                              : row.duration
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
                            taskSelected(row.id) ? currentTask.start : row.start
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
                            taskSelected(row.id)
                              ? currentTask.finish
                              : row.finish
                          }
                          onChange={handleFinishChange}
                          disabled
                        />
                      </TableCell>
                      <TableCell>
                        {currentTask.changed && taskSelected(row.id) ? (
                          <React.Fragment>
                            <Tooltip title="Save">
                              <IconButton
                                aria-label="Save"
                                onClick={() => handleSave(row)}
                                disabled={!handleDisabledSaveBtn()}
                              >
                                <SaveIcon />{" "}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Discard">
                              <IconButton
                                aria-label="Discard"
                                onClick={() => handleDiscard(row)}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Tooltip>
                          </React.Fragment>
                        ) : (
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleDelete(row.id)}
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
          count={rows.length}
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
