import React, { useState, useEffect } from "react";
import "../css/styles.css";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { muiAbtn } from "../style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, LinearProgress, Tooltip } from "@mui/material";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import CustomNoRowsOverlay from "../AuxillaryComponents/CustomNoRowsOverlay";
const columns = [
  {
    field: "Program",
    headerName: "Program",
    width:250,
  },
  {
    field: "Course",
    headerName: "Course",
    width:250,
  },
  {
    field: "Evaluator",
    headerName: "Evaluator",
    width:250,
  },

  {
    field: "actions",
    headerName: "Actions",
    width:250,
    editable: false,
    renderCell: HandleButton,
  },
];

function HandleButton(row) {
  const navigate = useNavigate();
  const senddata = (roww) => {
    console.log("helllo", roww);
    navigate("/Faculty/Returned", { state: roww.row });
  };
  const senddataa = (roww) => {
    console.log("helllo", roww.row.data._id);
    const idd=roww.row.data._id
    if(roww.row.data.LabTheory=="Theory"){
    navigate(
      `/Faculty/CourseFolder/${idd}`,
      { state: { idd } },
      {
        replace: true,
      }
    );
    }
    else{
      navigate(
        `/Faculty/LabFolder/${idd}`,
        { state: { idd } },
        {
          replace: true,
        }
      );
    }
    //navigate("/Faculty/Returned", { state: roww.row });
  };
  return (
    <>
      <Tooltip title="View Revision" placement="top-start">
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
      </Tooltip>

     <Tooltip title="Edit" placement="top-start">
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
            senddataa(row);
            //navigate('/Faculty/Returned',{state:{row:row}})
          }}
          //   onClick={handleOpenClo}
        >
          <AiFillEdit />
        </Button>
        </Tooltip>
    </>
  );
}
export default function FolderInRevision() {
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
      if (val.User?._id == userid && val.WantRevision==true) {
        row.push( {
          _id: val._id,
          id: id,
          Program: val.Program,
          Course: val.Course.Name + "-" + val.Course.Code,
          Evaluator: val.Evaluator?.Name,
          Faculty: val.User.Name,
          data: val,
        })
      }
    });
    console.log("uajh", row);
    setRows(row);
  };
  return (
    <div
      style={{
        width: "100%",
        padding: 40,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card style={{ padding: 30, borderRadius: 10 }}>
        <h1 className="mb-4 py-4">
          <b>FOLDER IN REVISION</b>
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
      </Card>
    </div>
  );
}
