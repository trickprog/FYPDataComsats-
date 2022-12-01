import React from "react";
import "../css/styles.css";
import { Link, Outlet } from "react-router-dom";

import AvatarMenu from "../AuxillaryComponents/AvatarMenu";

import {
  BsFillBookFill,
  BsFillHouseDoorFill,
  BsFillBookmarkPlusFill,
  BsListCheck,
  BsFillFilePdfFill,
  BsFillFolderFill,
} from "react-icons/bs";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FacultyNavigation() {
  const [openFolders, setOpenFolders] = React.useState(false);
  const [Folders, setFolders] = React.useState([]);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  React.useEffect(() => {
    getData();
  }, []);
  console.log(Folders);
  const getData = async () => {
    const res = await axios.get(
      "http://localhost:4000/UserAssigedFolders/showAll"
    );
    console.log(res.data);
    setFolders([...res.data]);
  };

  return (
    <React.Fragment>
      <div
        class="bg"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
          borderBottom: "1px solid #fff",
        }}
      >
        <nav class="sb-topnav navbar navbar-expand navbar-dark ">
          <a class="navbar-brand ps-3" to="/Dashboard">
            <b>FACULTY DASHBOARD</b>
          </a>
          <button
            class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
            id="sidebarToggle"
            to="#!"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <AvatarMenu />
          </div>
        </nav>
      </div>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav class="sb-sidenav accordion bg" id="sidenavAccordion">
            <div
              style={{
                height: "calc(100vh - 58px)",
                overflow: "auto",
              }}
              class="sb-sidenav-menu"
            >
              <div class="nav">
                <div class="sb-sidenav-menu-heading"></div>
                <Link class="nav-link sidenavtext " to="Dashboard">
                  <div class="sb-nav-link-icon">
                    <BsFillHouseDoorFill color="#fff" />
                  </div>
                  Dashboard
                </Link>

                <div
                  onClick={() => {
                    openFolders ? setOpenFolders(false) : setOpenFolders(true);
                  }}
                  style={{ cursor: "pointer" }}
                  class="nav-link sidenavtext"
                >
                  <div class="sb-nav-link-icon">
                    <BsFillBookFill color="#fff" />
                  </div>
                  Course Folders
                  <div style={{ marginLeft: "auto" }} class="sb-nav-link-icon">
                    {openFolders ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </div>
                </div>
                {openFolders &&
                  Folders.length > 0 &&
                  Folders.map((i) => {
                    console.log("sda", i);
                    return (
                      <>
                        {i.Evaluated != true ||
                        i.WantRevision == true ||
                        (i.Evaluated == true && i.Round1 == false) ||
                        (i.Evaluated == true && i.Round2 == false) ? (
                          <div
                            style={{
                              marginLeft: "12px",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                            class="nav-link sidenavtext "
                            onClick={() => {
                              if (i.LabTheory == "Theory") {
                                navigate(
                                  `/Faculty/CourseFolder/${i._id}`,
                                  { state: { i } },
                                  {
                                    replace: true,
                                  }
                                );
                              }
                              if (i.LabTheory == "Lab") {
                                navigate(
                                  `/Faculty/LabFolder/${i._id}`,
                                  { state: { i } },
                                  {
                                    replace: true,
                                  }
                                );
                              }
                            }}
                          >
                            <div class="sb-nav-link-icon">
                              <BsListCheck color="#fff" />
                            </div>
                            {i.Course.Code} {i.Course.Name}{" "}
                            {i.LabTheory == "Lab" && "(" + i.LabTheory + ")"}
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}

                <Link class="nav-link sidenavtext" to="FolderInRevision">
                  <div class="sb-nav-link-icon">
                    <BsFillFilePdfFill color="#fff" />
                  </div>
                  Folder In Revision
                </Link>

                <Link class="nav-link sidenavtext" to="ReturnedFolders">
                  <div class="sb-nav-link-icon">
                    <BsFillFilePdfFill color="#fff" />
                  </div>
                  Returned Folders
                </Link>
              </div>
              <div
                style={{ position: "fixed", left: "8px", bottom: "8px" }}
                class="sb-sidenav-footer sidenavtext"
              >
                Comsats University Islamabad
              </div>
            </div>
          </nav>
        </div>
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 58px)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
