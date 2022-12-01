import React, { useState, useEffect } from "react";
import "./css/styles.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { muiAbtn, muibtn } from "./style";
import CustomNoRowsOverlay from "./AuxillaryComponents/CustomNoRowsOverlay";
import { Card, LinearProgress, Tooltip } from "@mui/material";
import { AiFillEdit, AiFillEye } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import axios from 'axios'
const columns = [
  {
    field: "Program",
    headerName: "Program",
    flex: 1,
  },
  {
    field: "Course",
    headerName: "Course",
    flex: 1,
  },
  {
    field: "Faculty",
    headerName: "Faculty",
    flex: 1,
  },
  {
    field: "Evaluator",
    headerName: "Evaluator",
    flex: 1,
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    editable: false,
    renderCell: HandleButton,
  },
];
function HandleButton(row) {
  const navigate = useNavigate();
  const senddata = (roww) => {
    console.log("helllo", roww);
    navigate("/Admin/Returned", { state: roww.row });
  };
  const senddata1 = (roww) => {
    console.log("helllo", roww);
    navigate('/Admin/ReturnedEvaluation',{state:roww.row})
  };
  return (
    <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{
            backgroundColor: "#4b2980",
            marginLeft: 10,
            padding: 10,
          }}
          onClick={() => {
            senddata(row);
            //navigate('/Faculty/Returned',{state:{row:row}})
          }}
          // onClick={handleOpenClo}
        >
          <AiFillEye />
        </Button>
        
        <Button
        variant="contained"
        color="primary"
        size="small"
        style={{
          backgroundColor: "#4b2980",
          marginLeft: 10,
          padding: 10,
        }}
        onClick={() => {
          senddata1(row);
          //navigate('/Faculty/Returned',{state:{row:row}})
        }}
      >
        <AiFillEye style={{ marginRight: 10 }} />
        Evaluation
      </Button>
    </>
  );
}
export default function AllCourseFolder() {
  const navigate = useNavigate();
  const [Rows, setRows] = useState([]);
  const [Posts, setPosts] = useState([]);
  const userid = JSON.parse(localStorage.getItem("user"));
  React.useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axios.get(`http://localhost:4000/EvalFolders/showfolder`);
    setPosts(res.data);
    console.log("res",res.data)
    var row = [];
    var index = 0;
    res.data.map((val, id) => {
      if ( val.WantRevision==false) {
        row.push( {
          _id: val?._id,
          id: id,
          Program: val?.Program,
          Course: val.Course?.Name + "-" + val.Course?.Code,
          Evaluator: val.Evaluator?.Name,
          Faculty: val.User?.Name,
          data: val,
        })
      }
    });
    console.log("uajh", row);
    setRows(row);
  };

  

  return (
    <div
      className="container"
      style={{ height: 700, width: "100%", padding: 20 }}
    >
      <h1 className="mb-4 py-4">
        <b>ALL COURSE FOLDERS</b>
      </h1>
      <div>
        <DataGrid
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            LoadingOverlay: LinearProgress,
          }}
          style={{ height: 400, width: "100%" }}
          columns={columns}
          getRowId={(Rows) => Rows._id}
          rows={Rows}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}
