import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {

    render() {
        return(
        <header class="main-header">

            <a href="index2.html" class="logo">
                <span class="logo-mini"><b>T</b>C</span>
                <span class="logo-lg"><b>Thoughts</b>CREST</span>
            </a>

            <nav class="navbar navbar-static-top" role="navigation">

                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                 <li class="notifications-menu">
                            <Link to="/notificationGrid">
                                <i class="fa fa-bell-o"></i>
                                <span class="label label-warning">10</span>
                            </Link>
                        </li>

                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image"></img>
                                    <span class="hidden-xs">Shibi Ramachandran</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li class="user-header">
                                    <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image"></img>

                                        <p>
                                            Shibi Ramachandran - Web Developer
                                            <small>Member since Nov. 2012</small>
                                        </p>
                                </li>
                                <li class="user-body">
                                    <div class="row">
                                        <div class="col-xs-4 text-center">
                                            <a href="#">Followers</a>
                                        </div>
                                        <div class="col-xs-4 text-center">
                                            <a href="#">Sales</a>
                                        </div>
                                        <div class="col-xs-4 text-center">
                                            <a href="#">Friends</a>
                                        </div>
                                    </div>
                                </li>
                                <li class="user-footer">
                                    <div class="pull-left">
                                        <a href="#" class="btn btn-default btn-flat">Profile</a>
                                    </div>
                                    <div class="pull-right">
                                        <a href="#" class="btn btn-default btn-flat">Sign out</a>
                                    </div>
                                </li>
                            </ul>
                        </li>

                        <li class="dropdown messages-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-gears"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <div class="box box-warning">
                                        <div class="box-header with-border">
                                            <h3 class="box-title">Settings</h3>
                                        </div>
                                        <div class="box-body">
                                            <form role="form"><div class="form-group">
                                                    <label>Language</label>
                                                    <select class="form-control">
                                                        <option selected>English</option>
                                                        <option>Spanish</option>
                                                        <option>French</option>
                                                        <option>German</option>
                                                        <option>Tamil</option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label>Timezone</label>
                                                    <select class="form-control" >
                                                        <option>EST</option>
                                                        <option>PST</option>
                                                        <option>GMT</option>
                                                        <option>IST</option>
                                                        <option>EET</option>
                                                    </select>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </li>
                                <li class="footer"><a href="#">Save</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        );
    }
}
export default HeaderComponent;