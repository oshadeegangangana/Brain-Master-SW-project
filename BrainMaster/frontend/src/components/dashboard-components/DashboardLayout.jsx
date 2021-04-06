import React, {Component} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import {NavLink, Link} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {api} from "../../config/config.json";
import Clock from "react-live-clock";

// Components
import UserList from "../admin-components/UserList";
import EditProfile from "../user-components/EditProfile";
import Login from "../user-components/Login";
import AddAccount from "../admin-components/AddAccount";
import EditUser from "../user-components/EditUser";
import SignUp from "../user-components/SignUp";
import MainDash from "./components/MainDash";
import Footer from "../home-components/Footer";
import PageTitle from "../home-components/PageTitle";
import About from "../home-components/About";
import UserProfile from "../user-components/UserProfile";
import AddGkPaper from "../gk-components/AddGKPaper";
import AddGkQuestion from "../gk-components/AddGKQuestion";
import AdminGkPaperList from "../gk-components/AdminGKPaperList";
import AddIqPaper from "../iq-components/AddIQPaper";
import AddIqQuestion from "../iq-components/AddIQQuestion";
import AdminIqPaperList from "../iq-components/AdminIQPaperList";
import IqPaperList from "../iq-components/paper-list/IqPaperList";
import GkPaperList from "../gk-components/paper-list/gkPaperList";
import InstructionsGkExam from "../gk-components/InstructionsGkExam";
import InstructionsIqExam from "../iq-components/InstructionsIqExam";
import GkExam from "../gk-components/GkExam";
import IqExam from "../iq-components/IqExam";
import GkExamResult from "../gk-components/GkExamResult";
import IqExamResult from "../iq-components/IqExamResult";
import ViewExamDetails from "../user-components/sub-components/ViewExamDetails";
import GkPaperList2 from "../gk-components/paper-list/gkPaperList2";
import GkPaperList3 from "../gk-components/paper-list/gkPaperList3";
import GkPaperList4 from "../gk-components/paper-list/gkPaperList4";
import GkPaperList5 from "../gk-components/paper-list/gkPaperList5";
import IqPaperList2 from "../iq-components/paper-list/iqPaperList2";
import IqPaperList3 from "../iq-components/paper-list/iqPaperList3";
import IqPaperList4 from "../iq-components/paper-list/iqPaperList4";
import IqPaperList5 from "../iq-components/paper-list/iqPaperList5";
import AddNews from "../news-components/AddNews";
import NewsListAdmin from "../news-components/NewsListAdmin";
import AddEvent from "../event-components/AddEvent";
import EventListAdmin from "../event-components/EventListAdmin";
import ManageAd from "../advertisement-components/ManageAd";
import AddAd from "../advertisement-components/AddAd";
import AddKnowledge from "../knowledge-components/AddKnowledge";
import ManageKnowledge from "../knowledge-components/ManageKnowledge";
import ForgotPassword from "../user-components/ForgotPassword";
import AddQuestion from "../questions-components/AddQuestion";
import ManageQuestions from "../questions-components/ManageQuestions";
import EditEvent from "../event-components/EditEvent";
import EditNews from "../news-components/EditNews";

class DashboardLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            activeUser: [],
            redirect: null,
            login: false,
            hiddenUser: true,
            hiddenAdmin: true,
        };
    }


    componentDidMount() {
        let active = JSON.parse(localStorage.getItem("login"));
        if (active && active.login) {
            this.setState({
                login: true,
            });
            if (active.user_role.localeCompare("user") == 0) {
                this.setState({
                    hiddenUser: false,
                });
            } else if (active.user_role.localeCompare("admin") == 0) {
                this.setState({
                    hiddenAdmin: false,
                });
            } else {
                alert("Invalid User. No user role assigned !");
            }
            const loggedUser = active.user_id;
            fetch(api + "/user/" + loggedUser)
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        isLoaded: true,
                        activeUser: json,
                    });
                    window.sessionStorage.setItem(
                        "activeUserID:",
                        this.state.activeUser.user_id
                    );
                });
        } else {
            this.state.activeUser = [];
            window.localStorage.clear();
            window.sessionStorage.clear();
            this.setState({redirect: "/"});
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <Router>
                    <Redirect to={this.state.redirect}/>
                    <Switch>
                        <Route path="/" exact>
                            <Login/>
                        </Route>
                        <Route path="/sign_up" exact>
                            <SignUp/>
                        </Route>
                        <Route path="/forgot_pw" exact>
                            <ForgotPassword />
                        </Route>
                    </Switch>
                </Router>
            );
        }
        return (
            <div>
                <div className="page-container">
                    <Router>
                        {/* sidebar menu area start */}
                        <div className="sidebar-menu">
                            <div className="sidebar-header">
                                <div className="logo">
                                    <a href="/">
                                        <img src="assets/images/icon/logo.png" alt="logo"/>
                                    </a>

                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <div className="main-menu">
                                <div className="menu-inner">
                                    <nav>
                                        <ul className="metismenu" id="menu">
                                            <li className="">
                                                <a>
                                                    <NavLink
                                                        to="/"
                                                        exact
                                                        activeStyle={{color: "white"}}
                                                    >
                                                        <i className="ti-dashboard"/>{" "}
                                                        <span> Dashboard </span>
                                                    </NavLink>
                                                </a>
                                            </li>

                                            {/* User Management */}
                                            <li hidden={this.state.hiddenAdmin}>
                                                <a href="javascript:void(0)" aria-expanded="true">
                                                    <i className="ti-user"/>
                                                    <span>User Management</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/admin_reg"
                                                                exact
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Add User</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/user_list"
                                                                exact
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Manage Users</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            {/* General Knowledge Paper - Admin */}
                                            <li hidden={this.state.hiddenAdmin}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-pie-chart"/>
                                                    <span>GK - Admin</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/add_gk"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Add GK Paper</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/admin_gk_list"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Manage GK Papers</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            {/* IQ Paper - Admin */}
                                            <li hidden={this.state.hiddenAdmin}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-light-bulb"/>
                                                    <span>IQ - Admin</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/add_iq"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Add IQ Paper</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/admin_iq_list"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Manage IQ Papers</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            {/*News Management*/}
                                            <li hidden={this.state.hiddenAdmin}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-bell"/>
                                                    <span>News</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/add_news"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Add News</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/admin_news_list"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Manage News</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            {/*Event Management*/}
                                            <li hidden={this.state.hiddenAdmin}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-blackboard"/>
                                                    <span>Events</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/add_event"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Add Event</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/admin_event_list"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Manage Events</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            {/*Advertisements - Admin */}
                                            <li hidden={this.state.hiddenAdmin}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-bookmark-alt"/>
                                                    <span>Advertisements</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/manage_ad"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Manage Ads</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>

                                            {/*Knowledge - Admin*/}
                                            <li hidden={this.state.hiddenAdmin}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-write"/>
                                                    <span>Knowledge</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/manage_knowledge"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Manage Docs</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>

                                            {/*Questions-Admin*/}
                                            <li hidden={this.state.hiddenAdmin}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-help-alt"/>
                                                    <span>Questions</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/manage_questions"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Manage Questions</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>

                                            {/* GK Paper - User */}
                                            <li hidden={this.state.hiddenUser}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-pie-chart"/>
                                                    <span>GK Papers</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/gk_list1"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Politics</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/gk_list2"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Health</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/gk_list3"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>International</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/gk_list4"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Sports</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/gk_list5"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>History</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>

                                            {/* IQ Paper - User */}
                                            <li hidden={this.state.hiddenUser}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-light-bulb"/>
                                                    <span>IQ Papers</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/iq_list1"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Age Related</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/iq_list2"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Number Sequence</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/iq_list3"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Speed Related</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/iq_list4"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Time related</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/iq_list5"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Logical</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>

                                            {/*Advertisements - User */}
                                            <li hidden={this.state.hiddenUser}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-bookmark-alt"/>
                                                    <span>Advertisements</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/add_ad"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Publish Ads</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>

                                            {/*Knowledge - User */}
                                            <li hidden={this.state.hiddenUser}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-write"/>
                                                    <span>Knowledge</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/add_knowledge"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Upload Docs</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>

                                            {/*Question - User*/}
                                            <li hidden={this.state.hiddenUser}>
                                                <a
                                                    href="javascript:void(0)"
                                                    aria-expanded="true"
                                                >
                                                    <i className="ti-help-alt"/>
                                                    <span>Questions</span>
                                                </a>
                                                <ul className="collapse">
                                                    <li>
                                                        <a>
                                                            <NavLink
                                                                to="/add_question"
                                                                activeStyle={{color: "white"}}
                                                            >
                                                                <span>Post Question</span>
                                                            </NavLink>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </li>


                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        {/* sidebar menu area end */}
                        {/* main content area start */}
                        <div className="main-content">
                            {/* header area start */}
                            <div className="header-area">
                                <div className="row align-items-center">
                                    {/* nav and search button */}
                                    <div className="col-md-6 col-sm-8 clearfix">
                                        <div className="nav-btn pull-left">
                                            <span/>
                                            <span/>
                                            <span/>
                                        </div>

                                    </div>
                                    {/* profile info & task notification */}
                                    <div className="col-md-6 col-sm-4 clearfix">
                                        <ul className="notification-area pull-left">
                                            <Clock
                                                ticking={true}
                                                format={"hh:mm:ss A - dddd, MMMM Mo, YYYY"}
                                                style={{fontSize: "1.5em"}}
                                            />
                                        </ul>

                                        <ul className="notification-area pull-right">
                                            <li id="full-view">
                                                <i className="ti-fullscreen"/>
                                            </li>
                                            <li id="full-view-exit">
                                                <i className="ti-zoom-out"/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* header area end */}
                            {/* page title */}
                            <PageTitle role={this.state.activeUser.role} f_name={this.state.activeUser.f_name}/>

                            {/* Routers */}
                            <div className="main-content-inner">
                                <Switch>
                                    <Route path="/" exact>
                                        <MainDash/>
                                    </Route>
                                    <Route path="/admin_reg" exact>
                                        <AddAccount/>
                                    </Route>
                                    <Route path="/user_list" exact>
                                        <UserList/>
                                    </Route>
                                    <Route path="/edit_profile" exact>
                                        <EditProfile/>
                                    </Route>
                                    <Route path="/edit_admin_user" exact>
                                        <EditUser/>
                                    </Route>
                                    <Route path="/profile" exact>
                                        <UserProfile role={this.state.activeUser.role}/>
                                    </Route>
                                    <Route path="/about" exact>
                                        <About/>
                                    </Route>
                                    <Route path="/add_gk" exact>
                                        <AddGkPaper/>
                                    </Route>
                                    <Route path="/add_gk_q" exact>
                                        <AddGkQuestion/>
                                    </Route>
                                    <Route path="/admin_gk_list" exact>
                                        <AdminGkPaperList/>
                                    </Route>
                                    <Route path="/add_iq" exact>
                                        <AddIqPaper/>
                                    </Route>
                                    <Route path="/add_iq_q" exact>
                                        <AddIqQuestion/>
                                    </Route>
                                    <Route path="/admin_iq_list" exact>
                                        <AdminIqPaperList/>
                                    </Route>
                                    <Route path="/iq_list1" exact>
                                        <IqPaperList/>
                                    </Route>
                                    <Route path="/iq_list2" exact>
                                        <IqPaperList2/>
                                    </Route>
                                    <Route path="/iq_list3" exact>
                                        <IqPaperList3/>
                                    </Route>
                                    <Route path="/iq_list4" exact>
                                        <IqPaperList4/>
                                    </Route>
                                    <Route path="/iq_list5" exact>
                                        <IqPaperList5/>
                                    </Route>
                                    <Route path="/gk_list1" exact>
                                        <GkPaperList/>
                                    </Route>
                                    <Route path="/gk_list2" exact>
                                        <GkPaperList2/>
                                    </Route>
                                    <Route path="/gk_list3" exact>
                                        <GkPaperList3/>
                                    </Route>
                                    <Route path="/gk_list4" exact>
                                        <GkPaperList4/>
                                    </Route>
                                    <Route path="/gk_list5" exact>
                                        <GkPaperList5/>
                                    </Route>
                                    <Route path="/ins_iq" exact>
                                        <InstructionsIqExam/>
                                    </Route>
                                    <Route path="/ins_gk" exact>
                                        <InstructionsGkExam/>
                                    </Route>
                                    <Route path="/gk_exam" exact>
                                        <GkExam/>
                                    </Route>
                                    <Route path="/gk_result" exact>
                                        <GkExamResult/>
                                    </Route>
                                    <Route path="/iq_exam" exact>
                                        <IqExam/>
                                    </Route>
                                    <Route path="/iq_result" exact>
                                        <IqExamResult/>
                                    </Route>
                                    <Route path="/view_exam_details" exact>
                                        <ViewExamDetails/>
                                    </Route>
                                    <Route path="/add_news" exact>
                                        <AddNews/>
                                    </Route>
                                    <Route path="/admin_news_list" exact>
                                        <NewsListAdmin/>
                                    </Route>
                                    <Route path="/add_event" exact>
                                        <AddEvent/>
                                    </Route>
                                    <Route path="/admin_event_list" exact>
                                        <EventListAdmin/>
                                    </Route>
                                    <Route path="/manage_ad" exact>
                                        <ManageAd/>
                                    </Route>
                                    <Route path="/add_ad" exact>
                                        <AddAd/>
                                    </Route>
                                    <Route path="/add_knowledge" exact>
                                        <AddKnowledge/>
                                    </Route>
                                    <Route path="/manage_knowledge" exact>
                                        <ManageKnowledge/>
                                    </Route>
                                    <Route path="/add_question" exact>
                                        <AddQuestion/>
                                    </Route>
                                    <Route path="/manage_questions" exact>
                                        <ManageQuestions />
                                    </Route>
                                    <Route path="/edit_event" exact>
                                        <EditEvent />
                                    </Route>
                                    <Route path="/edit_news" exact>
                                        <EditNews />
                                    </Route>
                                </Switch>
                            </div>


                        </div>

                        {/* main content area end */}
                        {/* footer */}
                        <Footer/>
                    </Router>
                </div>
                {/* page container area end */}
            </div>
        );
    }
}

export default DashboardLayout;
