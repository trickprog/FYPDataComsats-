import { Box, Modal, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import {
  AiFillPrinter,
  AiFillEdit,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import axios from "axios";
import Popup from "./Popup";
import React, { useEffect, useState, useRef } from "react";
import "./pdfstyles.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./Cdfstyles.css";
import comsatslogo from "../CACMember/comsats_logo.png";
import { muiAbtn } from "../style";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  boxShadow: 24,
  p: 4,
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

export default function CDF() {
  axios.defaults.withCredentials = true;

  const { state } = useLocation();
  console.log(state);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const { Code, Name } = state.row;
  const [Version, setVersion] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [res, setresponse] = useState(false);
  const [Totalteaching, setTotalteaching] = useState(0);
  const [Content, setContent] = useState({
    Code: Code,
    Name: Name,
    Credit: "",
    LectureHoursWeek: "0",
    LabHoursWeek: "0",
    Category: "",
    PreRequisites: [],
    catalogue: "jkkl",
    objectiveList: [],
    Books: [],
  });
  const [CDF, setCDF] = useState({
    Topics: [],
    CLOs: [],
    textBook: [],
    referenceBook: [],
  });

  console.log(Version);
  const navigate = useNavigate();
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseX = () => {
    setIsOpen(false);
  };
  const getCat = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/Course/bycode/${Code}`
      );
      console.log(response.data);
      setContent({
        Code: response.data.Code,
        Name: response.data.Name,
        Credit: response.data.Credit,
        LectureHoursWeek: response.data.LectureHoursWeek,
        LabHoursWeek: response.data.LabHoursWeek,
        PreRequisites: response.data.PreRequisites,
        catalogue: response.data.catalogue,
        objectiveList: response.data.objectiveList,
        Books: response.data.Books,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCat();
    getData();
  }, []);

  const getData = async () => {
    console.log(Code);
    const response = await axios.get(
      `http://localhost:4000/CDFVerison/all/${Code}`
    );
    setVersion(response.data);
    if (response.data.length > 0) {
      setresponse(true);
      getContent();
    }
  };

  const [LabCLO, setLabCLO] = useState([]);
  const [TheoryCLO, setTheoryCLO] = useState([]);

  const getContent = async () => {
    const response = await axios.get(
      `http://localhost:4000/CDFVerison/Latest/${Code}`
    );
    setCDF(response.data);
    var sum = 0;
    if (response.data.Topics.length > 0) {
      response.data.Topics.forEach((i) => {
        sum = sum + parseFloat(i.TeachingHours);
      });
    }
    var LabCLOss = [];
    var TheoryCLOss = [];
    response.data.CLOs.forEach((i) => {
      if(i.LaborTheory=="Lab"){
        LabCLOss = [...LabCLOss, i];
      } else if(i.LaborTheory=="Theory") {
        TheoryCLOss = [...TheoryCLOss, i];
      }
    });
    setLabCLO([...LabCLOss]);
    setTheoryCLO([...TheoryCLOss]);
    setTotalteaching(sum);
  };
  const Edit = () => {
    state.row.Content = Content;
    state.row.CDF = CDF;
    navigate(`/CAC/CreateCDF/${Code}`, { state: { row: state.row } });
  };
  const getCon = async (id) => {
    const response = await axios.get(`http://localhost:4000/CDFVerison/${id}`);
    setCDF(response.data);
    var LabCLOss = [];
    var TheoryCLOss = [];
    response.data.CLOs.forEach((i) => {
      if(i.LaborTheory=="Lab"){
        LabCLOss = [...LabCLOss, i];
      } else if(i.LaborTheory=="Theory") {
        TheoryCLOss = [...TheoryCLOss, i];
      }
    });
    var sum = 0;
    if (response.data.Topics.length > 0) {
      response.data.Topics.forEach((i) => {
        sum = sum + parseFloat(i.TeachingHours);
      });
    }
    setLabCLO([...LabCLOss]);
    setTheoryCLO([...TheoryCLOss]);
    setTotalteaching(sum);
  };
  console.log("content", Content);
  console.log("CDF", CDF);
  return (
    <div style={{ height: 700, padding: 30, width: "100%" }}>
      <div className="d-flex justify-content-end mb-4">
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={handleOpen}
        >
          <AiOutlineUnorderedList style={{ marginRight: 10 }} />
          Versions
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={Edit}
        >
          <AiFillEdit style={{ marginRight: 10 }} />
          Add/Edit CDF
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={muiAbtn}
          onClick={handlePrint}
        >
          <AiFillPrinter style={{ marginRight: 10 }} />
          Print
        </Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box mb={3} style={{ display: "flex", justifyContent: "end" }}>
            <CloseIcon
              onClick={handleClose}
              style={{ cursor: "pointer", color: "gray" }}
            />
          </Box>
          <>
            <h4 style={{ textAlign: "center", marginBottom: 30 }}>Versions</h4>
            <table class="table" id="list">
              <thead>
                <tr>
                  <th scope="col">Version</th>
                </tr>
              </thead>
              <tbody>
                {Version.map((Repo, index) => {
                  return (
                    <tr scope="row" key={Repo._id}>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => getCon(Repo._id)}
                      >
                        Version: {index + 1}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        </Box>
      </Modal>
      {!res ? (
        <div>
          <h5 style={{ textAlign: "center" }}>Repository is Empty!</h5>
          <p style={{ textAlign: "center" }}>
            Please add the course description
          </p>
        </div>
      ) : (
        <div ref={componentRef} className="main">
          <div
            className="d-flex row justify-content-center mb-4"
            style={{ margin: 30 }}
          >
            <div className="col-1">
              <img src={comsatslogo} width="100px" height="100px"></img>
            </div>
            <div className="col-11">
              <h1>COMSATS University Islamabad</h1>
              <h1>Department of Computer Science</h1>
              <h1>Course Description Form (CDF)</h1>
            </div>
          </div>
          <div style={{ borderColor: "#000" }}>
            <div>
              <h4
                style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                className="head"
              >
                Course Information
              </h4>
            </div>
            <div>
              <div className="row">
                <div className="col">
                  <h6>
                    <b>Course Code: {Content.Code.split("-")[0]}{Content.Code.split("-")[1]} </b>
                  </h6>
                </div>
                <div className="col">
                  <h6 style={{ paddingBottom: 20, textAlign: "right" }}>
                    <b>Course Title: {Content.Name}</b>
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6 style={{ paddingBottom: 20 }}>
                    <b>
                      Credit Hour:{" "}
                      {Content.Credit +
                        "(" +
                        Content.LectureHoursWeek +
                        "," +
                        Content.LabHoursWeek +
                        ")"}{" "}
                    </b>
                  </h6>
                </div>
                <div className="col">
                  <h6 style={{ paddingBottom: 20, textAlign: "right" }}>
                    <b>Lecture Hours/Week: {Content.LectureHoursWeek}</b>
                  </h6>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <h6 style={{ paddingBottom: 20 }}>
                    <b>Lab Hours/Week: {Content.LabHoursWeek}</b>
                  </h6>
                </div>
                <div className="col">
                  <h6 style={{ textAlign: "right" }}>
                    <b>Pre-Requisite: {Content.PreRequisites}</b>
                  </h6>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  Catalogue Description
                </h4>
              </div>
              <p style={{ paddingBottom: 20 }}> {Content.catalogue}</p>
            </div>
            <div style={{ paddingBottom: 20 }}>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  Unit wise Major Topics:
                </h4>
              </div>
              <div>
                <table className="table table-bordered">
                  <thead
                    style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                  >
                    <tr>
                      <th>Unit#</th>
                      <th>Topic</th>
                      <th>No. of teaching hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CDF.Topics.map((i) => {
                      return (
                        <>
                          <tr>
                            <td style={{ textAlign: "center" }}>{i.Unit}</td>
                            <td>{i.Topic}</td>
                            <td style={{ textAlign: "center" }}>
                              {i.TeachingHours}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    <tr>
                      <th colSpan={2}>Total Contact Hours</th>
                      <td style={{ textAlign: "center" }}>{Totalteaching}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ paddingBottom: 20 }}>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  Mapping of CLOs and SOs
                </h4>
              </div>
              <div>
                <table className="table table-bordered">
                  <thead
                    style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                  >
                    <tr>
                      <th className="col-1">Sr.#</th>
                      <th className="col-1">Unit#</th>
                      <th className="col-7">Course Learning Outcomes</th>
                      <th className="col-2">Bloom Taxonomy Learning Level</th>
                      <th className="col-1">SO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="py-2" style={{ textAlign: "center" }}>
                      <th colSpan={5}>CLO’s for Theory</th>
                    </tr>

                    {TheoryCLO.map((i) => {
                      var Sos = "";
                      i.So.forEach((e) => {
                        console.log("Sos", Sos);
                        if (Sos == "") {
                          Sos = e.Number;
                        } else if (Sos.length == 1) {
                          Sos = Sos + "," + e.Number;
                        } else if (Sos[Sos.length - 2] == ",") {
                          if (
                            parseInt(Sos[Sos.length - 3]) -
                              parseInt(Sos[Sos.length - 1]) ==
                              1 &&
                            parseInt(e.Number) -
                              parseInt(Sos[Sos.length - 1]) ==
                              1
                          ) {
                            Sos[Sos.length - 2] = "-";
                            Sos[Sos.length - 1] = e.Number;
                          } else {
                            Sos = Sos + "," + e.Number;
                          }
                        } else if (Sos[Sos.length - 2] == "-") {
                          if (
                            parseInt(Sos[Sos.length - 3]) -
                              parseInt(Sos[Sos.length - 1]) ==
                              1 &&
                            parseInt(e.Number) -
                              parseInt(Sos[Sos.length - 1]) ==
                              1
                          ) {
                            Sos[Sos.length - 1] = e.Number;
                          } else {
                            Sos = Sos + "," + e.Number;
                          }
                        }
                      });
                      return (
                        <tr>
                          <td style={{}}>{i.sr}</td>
                          <td style={{ textAlign: "center" }}>{i.Unit}</td>
                          <td>{i.CLO}</td>
                          <td
                            style={{
                              textAlign: "center",
                            }}
                          >
                            <i>
                              {i.BTL.map((e) => {
                                return <>{e.BTL}</>;
                              })}
                            </i>
                          </td>
                          <td style={{ textAlign: "center" }}>{Sos}</td>
                        </tr>
                      );
                    })}

                    <tr className="py-2" style={{ textAlign: "center" }}>
                      <th colSpan={5}>CLO’s for Lab</th>
                    </tr>

                    {LabCLO.map((i) => {
                      var Sos = "";
                      i.So.forEach((e) => {
                        console.log("Sos", Sos);
                        if (Sos == "") {
                          Sos = e.Number;
                        } else if (Sos.length == 1) {
                          Sos = Sos + "," + e.Number;
                        } else if (Sos[Sos.length - 2] == ",") {
                          if (
                            parseInt(Sos[Sos.length - 3]) -
                              parseInt(Sos[Sos.length - 1]) ==
                              1 &&
                            parseInt(e.Number) -
                              parseInt(Sos[Sos.length - 1]) ==
                              1
                          ) {
                            Sos[Sos.length - 2] = "-";
                            Sos[Sos.length - 1] = e.Number;
                          } else {
                            Sos = Sos + "," + e.Number;
                          }
                        } else if (Sos[Sos.length - 2] == "-") {
                          if (
                            parseInt(Sos[Sos.length - 3]) -
                              parseInt(Sos[Sos.length - 1]) ==
                              1 &&
                            parseInt(e.Number) -
                              parseInt(Sos[Sos.length - 1]) ==
                              1
                          ) {
                            Sos[Sos.length - 1] = e.Number;
                          } else {
                            Sos = Sos + "," + e.Number;
                          }
                        }
                      });
                      return (
                        <tr>
                          <td style={{}}>{i.sr}</td>
                          <td style={{ textAlign: "center" }}>{i.Unit}</td>
                          <td>{i.CLO}</td>
                          <td
                            style={{
                              textAlign: "center",
                            }}
                          >
                            <i>
                              {i.BTL.map((e) => {
                                return <>{e.BTL}</>;
                              })}
                            </i>
                          </td>
                          <td style={{ textAlign: "center" }}>{Sos}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ paddingBottom: 20 }}>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  CLO Assessment Mechanism
                </h4>
              </div>
              <div>
                <table className="table table-bordered">
                  <thead
                    style={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
                  >
                    <th className="col-1">Assessment Tools</th>
                    {CDF.CLOs.map((i) => {
                      return <th className="col-1">{i.sr}</th>;
                    })}
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                  <tr>
                    <td>Quizzes</td>
                    {CDF.CLOs.map((i)=>{
                      if(i.Quizzes.length==1){
                        return <th>{i.Quizzes.map((e) => e.title)}</th>;
                      }
                      else if(i.Quizzes.length>1){
                        return <th>{i.Quizzes.map((e,index) =>{                           
                          if(index==0){
                            return e?.title
                          }                          
                          // else if(index==i.Quizzes.length-2){
                          //   return e?.title?.charAt(e.title.length-1)
                          // }
                          else if(index==i.Quizzes.length-1){
                            return "& "+e?.title?.charAt(e.title.length-1)
                          }                            
                          else{
                            return ", "+e?.title?.charAt(e.title.length-1)
                          }
                        })}</th>;
                      }
                      else{
                        return <th>{"-"}</th>
                      }
                    })}
                  </tr>
                  <tr>
                    <td>Assignments</td>
                    {CDF.CLOs.map((i)=>{                    
                      if(i.Assignment.length==1){
                        return <th>{i.Assignment.map((e) => e.title)}</th>;
                      }
                      else if(i.Assignment.length>1){
                        return <th>{i.Assignment.map((e,index) =>{                           
                          if(index==0){
                            return e?.title
                          }                          
                          
                          // else if(index==i.Assignment.length-2){
                          //   return e?.title?.charAt(e.title.length-1)
                          // }
                           
                          else if(index==i.Assignment.length-1){
                            
                            return "& "+e?.title?.charAt(e.title.length-1)
                          }
                          
                          else{
                            return ", "+e?.title?.charAt(e.title.length-1)
                          }
                        })}</th>;
                      }
                      else{
                        return <th>{"-"}</th>
                      }
                    })}
                  </tr>
                  <tr>
                  <td>Mid Term Exam</td>
                  {CDF.CLOs.map((i)=>{
                    if(i.Mid!=""){
                      return(
                        <th>{i.Mid}</th>)
                    }
                    else{
                      return(
                      <th>{"-"}</th>)
                    }
                  })}
                  </tr>
                  <tr>
                    <td>Final Term Exam</td>
                    {CDF.CLOs.map((i)=>{
                    if(i.Final!=""){
                      return(
                        <th>{i.Final}</th>)
                    }
                    else{
                      return(
                      <th>{"-"}</th>)
                    }
                      })}
                  </tr>
                  <tr>
                    <td>Project</td>
                    {CDF.CLOs.map((i)=>{
                      if(i.Project!=""){
                        return(
                          <th>{i.Project}</th>)
                      }
                      else{
                        return(
                        <th>{"-"}</th>)
                      }
                    })}

                  </tr>
                </tbody>
                </table>
              </div>
            </div>
            <div>
              <div>
                <h4
                  style={{ backgroundColor: "#000", color: "#fff", padding: 4 }}
                  className="head"
                >
                  Text and Reference Books
                </h4>
              </div>
              <div>
                <h4>TextBook:</h4>
                <ol>
                  {CDF.textBook.map((i) => {
                    return (
                      <li>
                        {i.BookName}, {i.BookWriter}, {i.BookYear}
                      </li>
                    );
                  })}
                </ol>

                <h4>Reference Books:</h4>
                <ol>
                  {CDF.referenceBook.map((i) => {
                    return (
                      <li>
                        {i.BookName}, {i.BookWriter}, {i.BookYear}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
