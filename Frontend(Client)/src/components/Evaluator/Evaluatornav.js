import React from "react";
import "../css/styles.css";
import { Link, Outlet } from "react-router-dom";
import AvatarMenu from "../AuxillaryComponents/AvatarMenu";

import {
  BsFillPersonPlusFill,
  BsFiles,
  BsBuilding,
  BsFillGearFill,
  BsFillPeopleFill,
  BsFillBookFill,
  BsFillHouseDoorFill,
  BsFillBookmarkPlusFill,
  BsListCheck,
  BsFillFilePdfFill,
  BsFillFolderFill,
} from "react-icons/bs";
import useAuth from "../../MyHooks/useAuth";
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
  //console.log("folders in evaluator nav",Folders);
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/EvalFolders/showAll");
    console.log("Folders", res.data);

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
            <b>EVALUATOR DASHBOARD</b>
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
                height: "calc(100vh - 57px)",
                overflow: "auto",
              }}
              class="sb-sidenav-menu"
            >
              <div class="nav">
                <div class="sb-sidenav-menu-heading"></div>
                <Link class="nav-link sidenavtext " to="Dashboard">
                  <div class="sb-nav-link-icon">
                    <BsBuilding color="#fff" />
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
                  Evaluate Folders
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
                    console.log("dsds", i);
                    return (
                      <>
                        {(i.Folder.Round1==true && i.Folder.Evaluated == true) || (i.Folder.Round2==true && i.Folder.Evaluated == true) || i.Folder.Revision == true ||  i.Folder.Evaluated != true? (
                          <div
                            style={{
                              marginLeft: "12px",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                            class="nav-link sidenavtext "
                            onClick={() => {
                              if (i.Folder.LabTheory == "Theory") {
                                navigate(
                                  `/Evaluator/FolderTemplete/${i._id}`,
                                  { state: { i } },
                                  {
                                    replace: true,
                                  }
                                );
                              }
                              if (i.Folder.LabTheory == "Lab") {
                                navigate(
                                  `/Evaluator/FolderTemplete/${i._id}`,
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
                            {i.Folder?.Course?.Code} {i.Folder?.Course?.Name}{" "}
                            {i.Folder?.LabTheory == "Lab" &&
                              "(" + i.Folder?.LabTheory + ")"}
                          </div>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}

                <Link class="nav-link sidenavtext " to="FoldersInRevision">
                  <div class="sb-nav-link-icon">
                    <BsBuilding color="#fff" />
                  </div>
                  Folders In Revision
                </Link>

                <Link class="nav-link sidenavtext " to="EvaluatedFolders">
                  <div class="sb-nav-link-icon">
                    <BsBuilding color="#fff" />
                  </div>
                  Evaluated Folders
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
            height: "calc(100vh - 57px)",
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
