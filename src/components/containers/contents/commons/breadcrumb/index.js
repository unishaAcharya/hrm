import React from 'react';
import { Link } from 'react-router-dom'

const breadCrumb = (props) => (
    <section className="content-header">
        <h1>
            {props.title}
        </h1>
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={props.rootUrl}><i className="fa fa-dashboard"></i> {props.root}</Link></li>
            <li className="breadcrumb-item"><Link to={props.parentUrl}>{props.parent}</Link></li>
            <li className="breadcrumb-item active">{props.child}</li>
        </ol>
    </section>
)

export default breadCrumb;
