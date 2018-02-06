import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBarComponent extends Component {

    render() {
        return (
        <aside class="main-sidebar">
            <section class="sidebar">

                <ul class="sidebar-menu" data-widget="tree">
                    <li >
                        <a href="#" class="sidebar-toggle " data-toggle="push-menu" role="button">
                            <i class="fa fa-arrows-h"></i>
                            <span class="header">MENU</span>
                        </a>
                    </li>
                </ul>
                <div class="user-panel">
                    <div class="pull-left image">
                        <img src="dist/img/user2-160x160.jpg" class="img-circle" alt="User Image"></img>
                    </div>
                    <div class="pull-left info">
                        <p>Shibi Ramachandran</p>
                        <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
                    </div>
                </div>

                <form action="#" method="get" class="sidebar-form">
                    <div class="input-group">
                        <input type="text" name="q" class="form-control" placeholder="Search..."/>
            <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
                    </div>
                </form>

                <ul class="sidebar-menu tree" data-widget="tree">

                    <li class="treeview">
                        <Link to ="/about"><i class="fa fa-link"></i> <span>About</span></Link>
                    </li>
                    <li class="treeview">
                        <Link to="/workflow"><i class="fa fa-link"></i> <span>Workflow</span></Link>
                    </li>
                    <li class="treeview">
                        <Link to="/workflowjs"><i class="fa fa-link"></i> <span>Workflow JS</span></Link>
                    </li>
                    <li class="treeview">
                        <Link to="/formElements"><i class="fa fa-link"></i> <span>FormElements</span></Link>
                    </li>
                    <li class="treeview">
                        <a href="#"><i class="fa fa-link"></i> <span>Multilevel</span>
                            <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                        </a>
                        <ul class="treeview-menu">
                            <li><a href="#">Link in level 2</a></li>
                            <li><a href="#">Link in level 2</a></li>
                        </ul>
                    </li>
                </ul>
            </section>
        </aside>
        );
    }
}
export default SideBarComponent;
