import React from "react";
import "../css/styles.css";
import { Link, Outlet } from "react-router-dom";
import AvatarMenu from "../AuxillaryComponents/AvatarMenu";
import {
  BsFilePersonFill,
  BsFiles,
  BsFillCalendarWeekFill,
  BsFillFilterCircleFill,
  BsFillHouseDoorFill,
  BsFillBookmarkPlusFill,
  BsCalendarMonthFill,
  BsStickyFill,
} from "react-icons/bs";

export default function CACnav() {
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
            <b>CAC DASHBOARD</b>
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

                <Link class="nav-link sidenavtext" to="CacCourseTask">
                  <div class="sb-nav-link-icon">
                    <BsFilePersonFill color="#fff" />
                  </div>
                  Courses Assigned
                </Link>

                <Link class="nav-link sidenavtext" to="CacSosTask">
                  <div class="sb-nav-link-icon">
                    <BsStickyFill color="#fff" />
                  </div>
                  SOS Assigned
                </Link>

                <Link class="nav-link sidenavtext" to="CacCdfTask">
                  <div class="sb-nav-link-icon">
                    <BsStickyFill color="#fff" />
                  </div>
                  CDF Assigned
                </Link>

                <Link class="nav-link sidenavtext" to="CacSyllabusTask">
                  <div class="sb-nav-link-icon">
                    <BsFiles color="#fff" />
                  </div>
                  Syllabus Assigned
                </Link>

                <Link class="nav-link sidenavtext" to="FacultyMeeting">
                  <div class="sb-nav-link-icon">
                    <BsCalendarMonthFill color="#fff" />
                  </div>
                  Meetings
                </Link>
                <Link class="nav-link sidenavtext" to="SetAvailability">
                  <div class="sb-nav-link-icon">
                    <BsFillCalendarWeekFill color="#fff" />
                  </div>
                  Set/Edit Availability
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
