import React from "react";

const workHistory = (props) => (
    <div className="box-body">
        <div className="row">
            <div className="col">
                {props.workHistory.map((val, idx) => {
                    let organization = `organization-${idx}`, jobTitle = `jobTitle-${idx}`, workStartDate = `workStartDate-${idx}`, experience = `experience-${idx}`
                    return (
                        <div className="row" key={idx} >
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Organization Name</label>
                                    <div className="controls">
                                        <input
                                            name="organization"
                                            id={organization}
                                            onChange={(e) => props.change(e)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Organization Name"
                                            data-id={idx}
                                            value={val.organization}
                                        />
                                        <span className="help-block">{((props.errorMessageInfo.length - 1) >= idx) && props.errorMessageInfo[idx].errororganization}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Job Title</label>
                                    <div className="controls">
                                        <input
                                            name="jobTitle"
                                            id={jobTitle}
                                            onChange={(e) => props.change(e)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Job Title"
                                            data-id={idx}
                                            value={val.jobTitle}
                                        />
                                        <span className="help-block">{((props.errorMessageInfo.length - 1) >= idx) && props.errorMessageInfo[idx].errorjobTitle}</span>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label>Work Start Date</label>
                                    <div className="controls">
                                        <input
                                            name="workStartDate"
                                            type="date"
                                            onChange={(e) => props.change(e)}
                                            className="form-control"
                                            id={workStartDate}
                                            value={val.workStartDate}
                                            data-id={idx}

                                        />
                                        <span className="help-block">{((props.errorMessageInfo.length - 1) >= idx) && props.errorMessageInfo[idx].errorworkStartDate}</span>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label>Experience</label>
                                    <div className="controls">
                                        <input
                                            name="experience"
                                            id={experience}
                                            onChange={(e) => props.change(e)}
                                            type="text"
                                            className="form-control"
                                            placeholder="Experience"
                                            value={val.experience}
                                            data-id={idx}
                                        />
                                        <span className="help-block">{((props.errorMessageInfo.length - 1) >= idx) && props.errorMessageInfo[idx].errorexperience}</span>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1">
                                {idx == 0 && <button onClick={props.add("add")} className="btn btn-info" style={{ marginTop: "29px", marginLeft: "-14px" }}>Add</button>}
                                {!idx == 0 && <button onClick={props.removeField(idx)} className="btn btn-danger" style={props.getTextStyle(idx)} style={{ marginTop: "29px", marginLeft: "-14px" }}>Remove</button>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
)

export default workHistory;
