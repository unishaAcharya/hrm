import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Dashboard
        <small>Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </section>

                <section className="content">

                    <div className="row">
                        <div className="col-xl-3 col-md-6 col-12 ">
                            <div className="box box-body bg-purple">
                                <div className="flexbox">
                                    <span className="ion ion-ios-person-outline font-size-50"></span>
                                    <span className="font-size-40 font-weight-200">12,568</span>
                                </div>
                                <div className="text-right">Users</div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 col-12 ">
                            <div className="box box-body bg-red">
                                <div className="flexbox">
                                    <span className="ion ion-ios-copy-outline font-size-50"></span>
                                    <span className="font-size-40 font-weight-200">8,568</span>
                                </div>
                                <div className="text-right">Invoices</div>
                            </div>
                        </div>
                        <div className="clearfix visible-sm-block"></div>

                        <div className="col-xl-3 col-md-6 col-12">
                            <div className="box box-body">
                                <div className="flexbox">
                                    <span className="ion ion-ios-paper-outline text-purple font-size-50"></span>
                                    <span className="font-size-40 font-weight-200">+100</span>
                                </div>
                                <div className="text-right">Article</div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 col-12">
                            <div className="box box-body">
                                <div className="flexbox">
                                    <span className="ion ion-ios-briefcase-outline text-red font-size-50"></span>
                                    <span className="font-size-40 font-weight-200">16,568</span>
                                </div>
                                <div className="text-right">Income</div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-8 col-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Area Chart</h3>

                                    <div className="box-tools pull-right">
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="chart">
                                        <canvas id="areaChart" style={{height:'270px'}}></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h5 className="box-title">Top Locations</h5>
                                    <div className="box-tools pull-right">
                                        <ul className="card-controls">
                                            <li className="dropdown">
                                                <a data-toggle="dropdown" href="#"><i className="ion-android-more-vertical"></i></a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    <a className="dropdown-item active" href="#">Today</a>
                                                    <a className="dropdown-item" href="#">Yesterday</a>
                                                    <a className="dropdown-item" href="#">Last week</a>
                                                    <a className="dropdown-item" href="#">Last month</a>
                                                </div>
                                            </li>
                                            <li><a href="#" className="link card-btn-reload" data-toggle="tooltip" title="" data-original-title="Refresh"><i className="fa fa-circle-thin"></i></a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="box-body">
                                    <div className="text-center py-20">
                                        <div className="donut" data-peity='{ "fill": ["#e9ab2e", "#398bf7", "#06d79c"], "radius": 80, "innerRadius": 60  }' >9,6,5</div>
                                    </div>

                                    <ul className="flexbox flex-justified text-center mt-30">
                                        <li className="br-1">
                                            <div className="font-size-20 text-primary">953</div>
                                            <small>New York</small>
                                        </li>

                                        <li className="br-1">
                                            <div className="font-size-20 text-info">813</div>
                                            <small>Los Angeles</small>
                                        </li>

                                        <li>
                                            <div className="font-size-20 text-yellow">369</div>
                                            <small>Dallas</small>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                        <div className="col-md-6 col-lg-4">
                            <div className="box box-body">
                                <div className="flexbox">
                                    <div id="linechart" >1,4,3,7,6,4,8,9,6,8,12</div>
                                    <div className="text-right">
                                        <span>New Users</span><br />
                                        <span>
                                            <i className="ion-ios-arrow-up text-success"></i>
                                            <span className="font-size-18 ml-1">113</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="box box-body">
                                <div className="flexbox">
                                    <div id="barchart">1,4,3,7,6,4,8,9,6,8,12</div>
                                    <div className="text-right">
                                        <span>Monthly Sale</span><br />
                                        <span>
                                            <i className="ion-ios-arrow-up text-success"></i>
                                            <span className="font-size-18 ml-1">%80</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="box box-body">
                                <div className="flexbox">
                                    <div id="discretechart">1,4,3,7,6,4,8,9,6,8,12</div>
                                    <div className="text-right">
                                        <span>Impressions</span><br />
                                        <span>
                                            <i className="ion-ios-arrow-up text-success"></i>
                                            <span className="font-size-18 ml-1">%80</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">

                        <div className="col-xl-4 col-lg-6 col-12">
                            <div className="box">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Recently Products</h3>

                                    <div className="box-tools pull-right">
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                        </button>
                                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <ul className="products-list product-list-in-box">
                                        <li className="item">
                                            <div className="product-img">
                                                <img src="../images/default-50x50.gif" alt="Product Image" />
                                            </div>
                                            <div className="product-info">
                                                <a href="javascript:void(0)" className="product-title">iphone 7plus
						  <span className="label label-warning pull-right">$300</span></a>
                                                <span className="product-description">
                                                    12MP Wide-angle and telephoto cameras.
							</span>
                                            </div>
                                        </li>
                                        <li className="item">
                                            <div className="product-img">
                                                <img src="../images/default-50x50.gif" alt="Product Image" />
                                            </div>
                                            <div className="product-info">
                                                <a href="javascript:void(0)" className="product-title">Apple Tv
						  <span className="label label-info pull-right">$400</span></a>
                                                <span className="product-description">
                                                    Library | For You | Browse | Radio
							</span>
                                            </div>
                                        </li>
                                        <li className="item">
                                            <div className="product-img">
                                                <img src="../images/default-50x50.gif" alt="Product Image" />
                                            </div>
                                            <div className="product-info">
                                                <a href="javascript:void(0)" className="product-title">MacBook Air<span
                                                    className="label label-danger pull-right">$450</span></a>
                                                <span className="product-description">
                                                    Make big things happen. All day long.
							</span>
                                            </div>
                                        </li>
                                        <li className="item">
                                            <div className="product-img">
                                                <img src="../images/default-50x50.gif" alt="Product Image" />
                                            </div>
                                            <div className="product-info">
                                                <a href="javascript:void(0)" className="product-title">iPad Pro
						  <span className="label label-success pull-right">$289</span></a>
                                                <span className="product-description">
                                                    Anything you can do, you can do better.
							</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="box-footer text-center">
                                    <a href="javascript:void(0)" className="uppercase">View All Products</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-12">
                            <div className="box box-widget widget-user-3">
                                
                                <div className="box-footer no-padding">
                                    <ul className="nav d-block nav-stacked">
                                        <li className="nav-item"><a href="#" className="nav-link">Sales <span className="pull-right badge bg-blue">1310</span></a></li>
                                        <li className="nav-item"><a href="#" className="nav-link">Projects <span className="pull-right badge bg-green">120</span></a></li>
                                        <li className="nav-item"><a href="#" className="nav-link">Followers <span className="pull-right badge bg-yellow">8K</span></a></li>
                                        <li className="nav-item"><a href="#" className="nav-link">Tasks <span className="pull-right badge bg-red">58</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flexbox flex-justified text-center bg-white">
                                <div className="no-shrink py-30">
                                    <span className="ion ion-social-facebook font-size-50" style={{color: '#3b5998'}}></span>
                                </div>

                                <div className="py-25 bg-blue">
                                    <div className="font-size-30">+250</div>
                                    <span>Likes</span>
                                </div>
                            </div>

                        </div>

                        <div className="col-xl-4 col-lg-6 col-12">
                            <div className="box direct-chat direct-chat-danger">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Direct Chat</h3>

                                    <div className="box-tools pull-right">
                                        <span data-toggle="tooltip" title="1 New Messages" className="badge bg-red">1</span>
                                        <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                                            <i className="fa fa-comments"></i></button>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                        </button>
                                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="direct-chat-messages" id="direct-chat">
                                        <div className="direct-chat-msg">
                                            <div className="direct-chat-info clearfix">
                                                <span className="direct-chat-name pull-left">James Anderson</span>
                                                <span className="direct-chat-timestamp pull-right">April 14, 2017 18:00 </span>
                                            </div>
                                            <img className="direct-chat-img" src="../images/user1-128x128.jpg" alt="message user image" />
                                            <div className="direct-chat-text">
                                                Lorem Ipsum is simply dummy text industry.
				  </div>
                                        </div>
                                        <div className="direct-chat-msg right">
                                            <div className="direct-chat-info clearfix">
                                                <span className="direct-chat-name pull-right">Michael Jorden</span>
                                                <span className="direct-chat-timestamp pull-left">April 14, 2017 18:00</span>
                                            </div>
                                            <img className="direct-chat-img" src="../images/user3-128x128.jpg" alt="message user image" />
                                            <div className="direct-chat-text">
                                                Lorem Ipsum is...
				  </div>
                                        </div>
                                        <div className="direct-chat-msg">
                                            <div className="direct-chat-info clearfix">
                                                <span className="direct-chat-name pull-left">James Anderson</span>
                                                <span className="direct-chat-timestamp pull-right">April 14, 2017 18:00 </span>
                                            </div>
                                            <img className="direct-chat-img" src="../images/user1-128x128.jpg" alt="message user image" />
                                            <div className="direct-chat-text">
                                                Lorem Ipsum is simply dummy text industry.
				  </div>
                                        </div>
                                        <div className="direct-chat-msg right">
                                            <div className="direct-chat-info clearfix">
                                                <span className="direct-chat-name pull-right">Michael Jorden</span>
                                                <span className="direct-chat-timestamp pull-left">April 14, 2017 18:00</span>
                                            </div>
                                            <img className="direct-chat-img" src="../images/user3-128x128.jpg" alt="message user image" />
                                            <div className="direct-chat-text">
                                                Lorem Ipsum is...
				  </div>
                                        </div>
                                        <div className="direct-chat-msg">
                                            <div className="direct-chat-info clearfix">
                                                <span className="direct-chat-name pull-left">James Anderson</span>
                                                <span className="direct-chat-timestamp pull-right">April 14, 2017 18:00 </span>
                                            </div>
                                            <img className="direct-chat-img" src="../images/user1-128x128.jpg" alt="message user image" />
                                            <div className="direct-chat-text">
                                                Lorem Ipsum is simply dummy text industry.
				  </div>
                                        </div>
                                        <div className="direct-chat-msg right">
                                            <div className="direct-chat-info clearfix">
                                                <span className="direct-chat-name pull-right">Michael Jorden</span>
                                                <span className="direct-chat-timestamp pull-left">April 14, 2017 18:00</span>
                                            </div>
                                            <img className="direct-chat-img" src="../images/user3-128x128.jpg" alt="message user image" />
                                            <div className="direct-chat-text">
                                                Lorem Ipsum is...
				  </div>
                                        </div>

                                    </div>
                                    <div className="direct-chat-contacts">
                                        <ul className="contacts-list">
                                            <li>
                                                <a href="#">
                                                    <img className="contacts-list-img" src="../images/user1-128x128.jpg" alt="User Image" />

                                                    <div className="contacts-list-info">
                                                        <span className="contacts-list-name">
                                                            Pavan kumar
							  <small className="contacts-list-date pull-right">April 14, 2017</small>
                                                        </span>
                                                        <span className="contacts-list-email">info@.multipurpose.com</span>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <img className="contacts-list-img" src="../images/user7-128x128.jpg" alt="User Image" />

                                                    <div className="contacts-list-info">
                                                        <span className="contacts-list-name">
                                                            Sonu Sud
							  <small className="contacts-list-date pull-right">March 14, 2017</small>
                                                        </span>
                                                        <span className="contacts-list-email">sonu@gmail.com</span>
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <form action="#" method="post">
                                        <div className="input-group">
                                            <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                                            <span className="input-group-btn">
                                                <button type="submit" className="btn btn-danger">Send</button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-xl-7 col-12">
                            <div className="box">
                                <div className="box-header">
                                    <i className="fa fa-envelope"></i>

                                    <h3 className="box-title">Quick Email</h3>
                                    <div className="pull-right box-tools">
                                        <button type="button" className="btn btn-danger btn-sm" data-widget="remove" data-toggle="tooltip"
                                            title="Remove">
                                            <i className="fa fa-times"></i></button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <form action="#" method="post">
                                        <div className="form-group">
                                            <input type="email" className="form-control" name="emailto" placeholder="Email to:" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="subject" placeholder="Subject" />
                                        </div>
                                        <div>
                                            <textarea className="textarea" placeholder="Message" style={{width: '100%', height: '125px', fontSize: '14px', lineHeight: '18px', border: '1px solid #dddddd', padding: '10px'}}></textarea>
                                        </div>
                                    </form>
                                </div>
                                <div className="box-footer clearfix">
                                    <button type="button" className="pull-right btn btn-blue" id="sendEmail"> Send <i className="fa fa-paper-plane-o"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-12">
                            <div className="box">

                                <div className="box-body">
                                    <h4><a href="#">Awesome Quote Blog Post</a></h4>
                                    <p><time>October 16, 2017</time></p>

                                    <p>Holisticly maximize team building ROI via next-generation resources. Enthusiastically promote team driven customer service and error-free solutions. Dynamically myocardinate vertical leadership for synergistic "outside the box" thinking. Efficiently extend global.</p>

                                    <div className="flexbox align-items-center mt-3">
                                        <a className="btn btn-blue" href="#">Read more</a>

                                        <div className="gap-items-4">
                                            <a className="text-muted" href="#">
                                                <i className="fa fa-heart mr-1"></i> 12
                    </a>
                                            <a className="text-muted" href="#">
                                                <i className="fa fa-comment mr-1"></i> 3
                    </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Dashboard;