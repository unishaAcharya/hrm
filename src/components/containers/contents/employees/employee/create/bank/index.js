import React from 'react';

const BankDetails = (props) => (
    <div className="box-body">
        <div className="row">
            <div className="col">
                {
                    props.bankDetailsList.map((val, idx) => {
                        let bankName = `bankName-${idx}`, accountName = `accountName-${idx}`, accountNumber = `accountNumber-${idx}`, branchName = `branchName-${idx}`
                        return (
                            <div className="row" key={idx}>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Bank </label>
                                        <div className="controls">
                                            <input
                                                name="bankName"
                                                id={bankName}
                                                onChange={(e) => props.change(e)}
                                                type="text"
                                                className="form-control"
                                                placeholder="Bank Name"
                                                data-id={idx}
                                                value={val.bankName}
                                            />
                                            <span className="help-block">{((props.errorMessageInfo.length - 1) >= idx) && props.errorMessageInfo[idx].errorbankName}</span>                                   </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>Account Name</label>
                                        <div className="controls">
                                            <input
                                                name="accountName"
                                                id={accountName}
                                                onChange={(e) => props.change(e)}
                                                type="text"
                                                className="form-control"
                                                placeholder="Account Name"
                                                data-id={idx}
                                                value={val.accountName}
                                            />
                                            <span className="help-block">{((props.errorMessageInfo.length - 1) >= idx) && props.errorMessageInfo[idx].erroraccountName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label>Account Number</label>
                                        <div className="controls">
                                            <input
                                                name="accountNumber"
                                                id={accountNumber}
                                                onChange={(e) => props.change(e)}
                                                type="text"
                                                className="form-control"
                                                placeholder="Passed Year"
                                                data-id={idx}
                                                value={val.accountNumber}

                                            />
                                            <span className="help-block">{((props.errorMessageInfo.length - 1) >= idx) && props.errorMessageInfo[idx].erroraccountNumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <label>Branch </label>
                                        <div className="controls">
                                            <input
                                                name="branchName"
                                                id={branchName}
                                                onChange={(e) => props.change(e)}
                                                type="text"
                                                className="form-control"
                                                placeholder="Branch Name"
                                                data-id={idx}
                                                value={val.branchName}
                                            />
                                            <span className="help-block">{((props.errorMessageInfo.length - 1) >= idx) && props.errorMessageInfo[idx].errorbranchName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-1 ml-auto">
                                    {idx == 0 && <button onClick={props.add("add")} className="btn btn-info" style={{ marginTop: "29px", marginLeft: "-14px" }}>Add</button>}
                                    {!idx == 0 && <button onClick={props.removeField(idx)} className="btn btn-danger" style={props.getTextStyle(idx)} style={{ marginTop: "29px", marginLeft: "-14px" }}>Remove</button>}
                                </div>
                            </div>)
                    })
                }
            </div>
        </div>
    </div>
)

export default BankDetails;
