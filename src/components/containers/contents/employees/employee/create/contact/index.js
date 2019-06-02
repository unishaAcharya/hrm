import React from "react";

const Contact = props => (
  <div className="box-body">
    <div className="row">
      <div className="col">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Current Address</label>
              <div className="controls">
                <input
                  name="currentAddress"
                  id="currentAddress"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Current Address"
                  value={props.myvalue.currentAddress}
                />
                <span className="help-block">
                  {props.validation.currentAddress.message}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Current Country</label>
              <div className="controls">
                <input
                  name="currentCountry"
                  id="currentCountry"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Current Country"
                  value={props.myvalue.currentCountry}
                />
                <span className="help-block">
                  {props.validation.currentCountry.message}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Current District</label>
              <div className="controls">
                <input
                  name="currentDistrict"
                  id="currentDistrict"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Current District"
                  value={props.myvalue.currentDistrict}
                />
                <span className="help-block">
                  {props.validation.currentDistrict.message}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Permanent Address</label>
              <div className="controls">
                <input
                  name="permanentAddress"
                  id="permanentAddress"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Permanent Address"
                  value={props.myvalue.permanentAddress}
                />
                <span className="help-block">
                  {props.validation.permanentAddress.message}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Permanent Country</label>
              <div className="controls">
                <input
                  name="permanentCountry"
                  id="permanentCountry"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Permanent Country"
                  value={props.myvalue.permanentCountry}
                />
                <span className="help-block">
                  {props.validation.permanentCountry.message}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Permanent District</label>
              <div className="controls">
                <input
                  name="permanentDistrict"
                  id="permanentdistrict"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Permanent District"
                  value={props.myvalue.permanentDistrict}
                />
                <span className="help-block">
                  {props.validation.permanentDistrict.message}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Phone Mobile</label>
              <div className="controls">
                <input
                  name="phoneMobileNo"
                  id="phoneMobileNo"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Phone Mobile"
                  value={props.myvalue.phoneMobileNo}
                />
                <span className="help-block">
                  {props.validation.phoneMobileNo.message}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Email</label>
              <div className="controls">
                <input
                  name="email"
                  id="email"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={props.myvalue.email}
                />
                <span className="help-block">
                  {props.validation.emergencyContactEmail.message}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Emergency Contact Name</label>
              <div className="controls">
                <input
                  name="emergencyContactName"
                  id="emergencyContactName"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Emergency Contact Name"
                  value={props.myvalue.emergencyContactName}
                />
                <span className="help-block">
                  {props.validation.emergencyContactName.message}
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Emergency Contact Number</label>
              <div className="controls">
                <input
                  name="emergencyContactNo"
                  id="emergencyContactNo"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Emergency Contact Number"
                  value={props.myvalue.emergencyContactNo}
                />
                <span className="help-block">
                  {props.validation.emergencyContactNo.message}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Emergency Contact Email</label>
              <div className="controls">
                <input
                  name="emergencyContactEmail"
                  id="emergencyContactEmail"
                  onChange={e => props.change(e)}
                  type="text"
                  className="form-control"
                  placeholder="Emergency Contact Email"
                  value={props.myvalue.emergencyContactEmail}
                />
                <span className="help-block">
                  {props.validation.emergencyContactEmail.message}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
