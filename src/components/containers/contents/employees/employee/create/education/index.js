import React, { Component } from "react";

//const Education = (props) =>
class Education extends Component {
  render() {
    const props = this.props;
    return (
      <div className="box-body">
        <div className="row">
          <div className="col">
            {props.educationList.map((val, idx) => {
              let degreeName = `degreeName-${idx}`,
                boardUniversity = `boardUniversity-${idx}`,
                gradePercentage = `gradePercentage-${idx}`,
                passedYear = `passedYear-${idx}`;
              return (
                <div className="row" key={idx}>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Degree Name</label>
                      <div className="controls">
                        <input
                          name="degreeName"
                          id={degreeName}
                          onChange={e => props.change(e)}
                          type="text"
                          className="form-control"
                          placeholder="Degree Name"
                          data-id={idx}
                          value={val.degreeName}
                        />
                        <span className="help-block">
                          {props.errorMessageInfo.length - 1 >= idx &&
                            props.errorMessageInfo[idx].errordegreeName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Board University</label>
                      <div className="controls">
                        <select
                          type="select"
                          id={boardUniversity}
                          name="boardUniversity"
                          className="form-control"
                          data-id={idx}
                          onChange={e => props.change(e)}
                          value={val.boardUniversity}
                        >
                          <option value="TU">Trivhuvan University</option>
                          <option value="PU">Pokhara University</option>
                          <option value="PurU">Purvanchal University</option>
                          <option value="BU">British University</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Grade Percentage</label>
                      <div className="controls">
                        <input
                          name="gradePercentage"
                          type="date"
                          onChange={e => props.change(e)}
                          className="form-control"
                          id={gradePercentage}
                          data-id={idx}
                          value={val.gradePercentage}
                        />
                        <span className="help-block">
                          {props.errorMessageInfo.length - 1 >= idx &&
                            props.errorMessageInfo[idx].errorgradePercentage}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label>Passed Year</label>
                      <div className="controls">
                        <input
                          name="passedYear"
                          id={passedYear}
                          onChange={e => props.change(e)}
                          type="text"
                          className="form-control"
                          placeholder="Passed Year"
                          value={val.passedYear}
                          data-id={idx}
                        />
                        <span className="help-block">
                          {props.errorMessageInfo.length - 1 >= idx &&
                            props.errorMessageInfo[idx].errorpassedYear}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1">
                    {idx == 0 && (
                      <button
                        onClick={props.add("add")}
                        className="btn btn-info"
                        style={{ marginTop: "29px", marginLeft: "-14px" }}
                      >
                        Add
                      </button>
                    )}
                    {!idx == 0 && (
                      <button
                        onClick={props.removeField(idx)}
                        className="btn btn-danger"
                        style={props.getTextStyle(idx)}
                        style={{ marginTop: "29px", marginLeft: "-14px" }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default Education;
