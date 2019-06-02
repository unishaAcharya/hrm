import React, { Component } from 'react';

class RightSidebar extends Component {
    render() {
        return (
            <aside className={localStorage.getItem('activeSidebar')}>
                <div style={{margin: '10px'}}>
                    <h4 className="control-sidebar-heading">Layout Options</h4>
                    <div className="form-group"><input id="layout_fixed" type="checkbox" data-layout="fixed" className="pull-right chk-col-grey" />
                        <label htmlFor="layout_fixed" className="control-sidebar-subheading">Fixed layout</label></div>
                    <div className="form-group"><input id="layout_boxed" type="checkbox" data-layout="layout-boxed" className="pull-right chk-col-grey" />
                        <label htmlFor="layout_boxed" className="control-sidebar-subheading">Boxed Layout</label></div>
                    <div className="form-group"><input id="toggle_sidebar" type="checkbox" data-layout="sidebar-collapse" className="pull-right chk-col-grey" />
                        <label htmlFor="toggle_sidebar" className="control-sidebar-subheading">Toggle Sidebar</label></div>
                    <div className="form-group"><input id="toggle_right_sidebar" type="checkbox" data-controlsidebar="control-sidebar-open"
                        className="pull-right chk-col-grey" /> <label htmlFor="toggle_right_sidebar" className="control-sidebar-subheading">Toggle
Right Sidebar Slide</label></div>
                    <div className="form-group"><input id="toggle_right_sidebar_skin" type="checkbox" data-sidebarskin="toggle" className="pull-right chk-col-grey" />
                        <label htmlFor="toggle_right_sidebar_skin" className="control-sidebar-subheading">Toggle Right Sidebar Skin</label></div>
                    <h4 className="control-sidebar-heading">Skins</h4>
                    {/* <ul className="list-unstyled clearfix">
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-blue"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#242a33', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-blue" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin">Blue</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-black"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div className="clearfix"><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#242a33', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                style={{ display: 'block', width: '60%', float: 'left', height: '40px', background: '#f4f6f9', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin">Black</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-purple"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#242a33', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-purple" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin">Purple</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-green"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#242a33', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-green" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin">Green</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-red"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#242a33', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-red" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin">Red</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-yellow"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#242a33', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-yellow" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin">Yellow</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-blue-light"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#ffffff', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-blue" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin" style={{ fontSize: '12px' }}>Blue Light</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-black-light"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div className="clearfix"><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#ffffff', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                style={{ display: 'block', width: '60%', float: 'left', height: '40px', background: '#2A3E52', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin" style={{ fontSize: '12px' }}>Black Light</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-purple-light"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#ffffff', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-purple" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin" style={{ fontSize: '12px' }}>Purple Light</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-green-light"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#ffffff', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-green" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopTightTadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin" style={{ fontSize: '12px' }}>Green Light</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-red-light"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#ffffff', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-red" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin" style={{ fontSize: '12px' }}>Red Light</p>
                        </li>
                        <li style={{ float: 'left', width: '33.33333%', padding: '5px' }}><a href="javascript:void(0)" data-skin="skin-yellow-light"
                            style={{ display: 'block', boxShadow: '0 0 3px rgba(0,0,0,0.4)', borderRadius: '100px' }} className="clearfix full-opacity-hover">
                            <div><span style={{ display: 'block', width: '40%', float: 'left', height: '40px', background: '#ffffff', borderTopLeftRadius: '30px', borderBottomLeftRadius: '30px' }}></span><span
                                className="bg-yellow" style={{ display: 'block', width: '60%', float: 'left', height: '40px', borderTopRightRadius: '30px', borderBottomRightRadius: '30px' }}></span></div>
                        </a>
                            <p className="text-center no-margin" style={{ fontSize: '12px' }}>Yellow Light</p>
                        </li>
                    </ul> */}
                </div>
            </aside>
        )
    }
}

export default RightSidebar;