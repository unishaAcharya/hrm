import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import EmployeeForm from "./general/index";
import FormValidator from "../../../commons/formValidator";
import "../../../../../assets/css/dropzone.css";
import Contact from "./contact";
import Education from "./education";
import WorkHistory from "./work-history";
import Bank from "./bank";
import PreviewForm from "./preview";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Configuration from "../../../commons/configuration/server";

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: "firstName",
        method: "isEmpty",
        validWhen: false,
        message: "First Name is required."
      },
      {
        field: "firstName",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "dob",
        method: "isEmpty",
        validWhen: false,
        message: "Date of birth is required."
      },
      {
        field: "lastName",
        method: "isEmpty",
        validWhen: false,
        message: "Last Name is required."
      },
      {
        field: "lastName",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "startDate",
        method: "isEmpty",
        validWhen: false,
        message: "Started Date is required."
      },
      {
        field: "endDate",
        method: "isEmpty",
        validWhen: false,
        message: "Ended Date is required."
      },
      {
        field: "contractPeriod",
        method: "isEmpty",
        validWhen: false,
        message: "Contract Period is required."
      },

      {
        field: "nationalId",
        method: "isEmpty",
        validWhen: false,
        message: "National Id is required."
      },

      {
        field: "incomeTaxStatus",
        method: "isEmpty",
        validWhen: false,
        message: "Income Tax Status is required."
      },
      {
        field: "paymentMode",
        method: "isEmpty",
        validWhen: false,
        message: "Payment Mode is required."
      },
      {
        field: "currentAddress",
        method: "isEmpty",
        validWhen: false,
        message: "Current Address is required."
      },

      {
        field: "currentCountry",
        method: "isEmpty",
        validWhen: false,
        message: "Current Country is required."
      },
      {
        field: "currentCountry",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "currentDistrict",
        method: "isEmpty",
        validWhen: false,
        message: "Current District is required."
      },
      {
        field: "currentDistrict",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "permanentAddress",
        method: "isEmpty",
        validWhen: false,
        message: "Permanent Address is required."
      },
      {
        field: "permanentAddress",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "permanentDistrict",
        method: "isEmpty",
        validWhen: false,
        message: "Permanent District is required."
      },
      {
        field: "permanentDistrict",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "phoneMobileNo",
        method: "isEmpty",
        validWhen: false,
        message: "phone Mobile No is required."
      },
      {
        field: "emergencyContactName",
        method: "isEmpty",
        validWhen: false,
        message: "Emergency Contact Name is required."
      },
      {
        field: "emergencyContactName",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "permanentCountry",
        method: "isEmpty",
        validWhen: false,
        message: "Permanent Country is required."
      },
      {
        field: "permanentCountry",
        method: "matches",
        args: [(/^[a-zA-Z ]*$/)],
        validWhen: true,
        message: "Only Alphabetic"
      },
      {
        field: "emergencyContactNo",
        method: "isEmpty",
        validWhen: false,
        message: "Emergency Contact Number is required."
      },
      {
        field: "emergencyContactEmail",
        method: "isEmpty",
        validWhen: false,
        message: "Emergency Contact Email is required."
      }
    ]);
    this.state = {
      formInfo: {},
      imageError: "",
      file: "",
      image: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "male",
      startDate: "",
      endDate: "",
      contractPeriod: "",
      rankId: "",
      branchId: "",
      nationalId: "",
      departmentId: "Select Department",
      incomeTaxStatus: "",
      reportsTo: "Hrm Department",
      bloodGroup: "O+",
      nationality: "Nepali",
      empGroup: "Management",
      serviceType: "Part Time",
      paymentMode: "",
      dob: "",
      branch:[],
      department:[],
      subdepartment:[],
      subDepart:"No Sub Department",
      rank:[],
      academicModel: [
        {
          degreeName: "",
          boardUniversity: "Trivhuvan University",
          passedYear: "",
          gradePercentage: ""
        }
      ],
      employmentHistoryModel: [
        {
          organization: "",
          jobTitle: "",
          workStartDate: "",
          experience: ""
        }
      ],
      bankDetailModel: [
        {
          bankName: "",
          accountName: "",
          accountNumber: "",
          branchName: ""
        }
      ],
      currentAddress: "",
      currentCountry: "",
      currentDistrict: "",
      permanentAddress: "",
      permanentCountry: "",
      permanentDistrict: "",
      phoneMobileNo: "",
      email: "",
      emergencyContactName: "",
      emergencyContactNo: "",
      emergencyContactEmail: "",
      validationfield: false,
      validation: this.validator.valid(),
      contactAccodian: false,
      bankAccodian: false,
      educationAccodian: false,
      workHistoryAccodian: false,
      previewModal: false,
      openPreviewModal: false,
      previewImageData: "",
      errorMessageInfo: [],
      errorMessageWorkHistory: [],
      errorMessageBank: [],

    };
    this.submitted = false;
    this.djsConfig = {
      acceptedFiles: "image/jpeg",
      addRemoveLinks: true,
      autoProcessQueue: false,
      parallelUploads: true,
      maxFiles: 1,
      maxfilesexceeded: function(file) {
        this.removeAllFiles();
        this.addFile(file);
      }
    };
    this.componentConfig = {
      iconFiletypes: [".jpg", ".png", ".jpeg"],
      showFiletypeIcon: true,
      postUrl: `${Configuration.domain}/hrm/saveEmployeeDetail`
    };
    this.dropzone = null;
    this.imageDetails = null;
    this.imageValidate = this.imageValidate.bind(this);
    this.subChange=this.subChange.bind(this);
  }
  handleFormSubmit = async event => {
    event.preventDefault();
    let employeelist = {};

    employeelist.firstName = this.state.firstName;
    employeelist.middleName = this.state.middleName;
    employeelist.lastName = this.state.lastName;
    employeelist.gender = this.state.gender;
    employeelist.startDate = this.state.startDate;
    employeelist.endDate = this.state.endDate;
    employeelist.contractPeriod = this.state.contractPeriod;
    employeelist.rankId = this.state.rankId;
    employeelist.branchId = this.state.branchId;
    employeelist.nationalId = this.state.nationalId;
    employeelist.departmentId = this.state.departmentId;
    employeelist.incomeTaxStatus = this.state.incomeTaxStatus;
    employeelist.reportsTo = this.state.reportsTo;
    employeelist.bloodGroup = this.state.bloodGroup;
    employeelist.nationality = this.state.nationality;
    employeelist.empGroup = this.state.empGroup;
    employeelist.serviceType = this.state.serviceType;
    employeelist.paymentMode = this.state.paymentMode;
    employeelist.subDepartmentId=this.state.subDepartmentId;
    employeelist.dob = this.state.dob;

    let contactDetails = {};
    contactDetails.currentAddress = this.state.currentAddress;
    contactDetails.currentCountry = this.state.currentCountry;
    contactDetails.currentDistrict = this.state.currentDistrict;
    contactDetails.permanentAddress = this.state.permanentAddress;
    contactDetails.permanentCountry = this.state.permanentCountry;
    contactDetails.permanentDistrict = this.state.permanentDistrict;
    contactDetails.phoneMobileNo = this.state.phoneMobileNo;
    contactDetails.email = this.state.email;
    contactDetails.emergencyContactName = this.state.emergencyContactName;
    contactDetails.emergencyContactNo = this.state.emergencyContactNo;
    contactDetails.emergencyContactEmail = this.state.emergencyContactEmail;
    let obj = {};
    obj = JSON.stringify({
      employeeModel: employeelist,
      academicModel: this.state.academicModel,
      employmentHistoryModel: this.state.employmentHistoryModel,
      contactModel: contactDetails,
      bankDetailModel: this.state.bankDetailModel
    });
    await this.setState({
      formInfo: obj
    });

    const validation = this.validator.validate(this.state);

    this.setState({ validation });
    this.submitted = true;
    this.educationDetailsaddField(event);
    this.bankDetailsListaddField(event);
    this.employeeWorkHistoryaddField(event);
    this.imageValidate();
    let that = this;


    Axios({
      method: "post",
      url: `${Configuration.domain}/hrm/saveEmployeeDetail`,
      data: obj,
      headers: { "Content-Type": "application/json" }
    })
      .then(function(response) {
        if (response.status === 201) {
          toast.success("Success Notification!");
          that.setState({
            firstName: "",
            middleName: "",
            lastName: "",
            gender: "male",
            startDate: "",
            endDate: "",
            contractPeriod: "",
            rankId: "",
            branchId: "",
            nationalId: "",
            departmentId: "",
            incomeTaxStatus: "",
            reportsTo: "Hrm Department",
            bloodGroup: "O+",
            nationality: "Nepali",
            empGroup: "Top Level",
            serviceType: "Top Level",
            paymentMode: "",
            dob: "",
            currentAddress: "",
            currentCountry: "",
            currentDistrict: "",
            permanentAddress: "",
            permanentCountry: "",
            permanentDistrict: "",
            phoneMobileNo: "",
            email: "",
            emergencyContactName: "",
            emergencyContactNo: "",
            emergencyContactEmail: "",
            academicModel: academicModel,
            bankDetailModel: bankDetailModel,
            employmentHistoryModel: employmentHistoryModel
          });
        } else {
          toast.error("Error Notification !");
        }
      })
      .catch(function(response) {
        //handle error
        console.log(response);
      });
    var academicModel = [
      {
        degreeName: "",
        boardUniversity: "Trivhuvan University",
        passedYear: "",
        gradePercentage: ""
      }
    ];
    var employmentHistoryModel = [
      {
        organization: "",
        jobTitle: "",
        workStartDate: "",
        experience: ""
      }
    ];
    var bankDetailModel = [
      {
        bankName: "",
        accountName: "",
        accountNumber: "",
        branchName: ""
      }
    ];

    if (validation.isValid) {
    }
  };
  addedFile = file => {
    this.convertImgToBase64(file).then(data =>
      this.setState({ previewImageData: data })
    );
    this.imageDetails = file;
  };
  convertImgToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  imageValidate = () => {
    let error = {};
    let isError = false;

    if (this.imageDetails == null) {
      isError = true;
      this.setState({
        imageError: "Image is Required"
      });
    }

    this.setState({
      error
    });
    return error;
  };
  change = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleOptionChange = async changeEvent => {
    await this.setState({
      gender: changeEvent.target.value
    });
  };
  preview(e) {
    e.preventDefault();
  }
  educationDetailsaddField = actionType => event => {
    event.preventDefault();
    let errorMsg = this.state.academicModel.map((user, key) => {
      let error = {};
      let valid = true;
      if (!user.degreeName) {
        error.errordegreeName = "degreeName is required";
        valid = false;
      } else {
        error.errordegreeName = "";
      }
      if (!user.passedYear) {
        error.errorpassedYear = "passedYear is required";
        valid = false;
      } else {
        error.errorpassedYear = "";
      }
      if (!user.gradePercentage) {
        error.errorgradePercentage = "gradePercentage is required";
        valid = false;
      } else {
        error.errorgradePercentage = "";
      }
      if (
        this.state.academicModel.length - 1 === key &&
        valid &&
        actionType === "add"
      ) {
        this.setState(prevState => ({
          academicModel: [
            ...prevState.academicModel,
            {
              degreeName: "",
              boardUniversity: "Trivhuvan University",
              passedYear: "",
              gradePercentage: ""
            }
          ]
        }));
      }
      return error;
    });

    this.setState(
      prevState => ({
        errorMessageInfo: errorMsg
      }),
      () => this.state.errorMessageInfo //console.log(this.state.errorMessageInfo)
    );
  };
  educationDetailshandleChange = e => {
    let value = e.target.value;
    if (
      [
        "degreeName",
        "boardUniversity",
        "passedYear",
        "gradePercentage"
      ].includes(e.target.name)
    ) {
      let academicModel = [...this.state.academicModel];
      academicModel[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({
        academicModel
      });
    } else {
      this.setState({ [e.target.name]: value.trim() });
    }
  };
  educationDetailsremoveField = id => e => {
    e.preventDefault();
    var academicModel = this.state.academicModel.filter(
      (user, key) =>key !== id

    );
    this.setState({
      academicModel
    });
  };
  employeeWorkHistoryaddField = actionType => event => {
    event.preventDefault();
    let errorMsg = this.state.employmentHistoryModel.map((user, key) => {
      let error = {};
      let valid = true;
      if (!user.organization) {
        error.errororganization = "organization is required";
        valid = false;
      } else {
        error.errororganization = "";
      }
      if (!user.jobTitle) {
        error.errorjobTitle = "jobTitle is required";
        valid = false;
      } else {
        error.errorjobTitle = "";
      }
      if (!user.workStartDate) {
        error.errorworkStartDate = "workStartDate is required";
        valid = false;
      } else {
        error.errororganization = "";
      }
      if (!user.experience) {
        error.errorexperience = "experience is required";
        valid = false;
      } else {
        error.errorexperience = "";
      }
      if (
        this.state.employmentHistoryModel.length - 1 === key &&
        valid &&
        actionType === "add"
      ) {
        this.setState(prevState => ({
          employmentHistoryModel: [
            ...prevState.employmentHistoryModel,
            {
              organization: "",
              jobTitle: "",
              workStartDate: "",
              experience: ""
            }
          ]
        }));
      }
      return error;
    });
    this.setState(
      prevState => ({
        errorMessageWorkHistory: errorMsg
      }),
      () => this.state.errorMessageWorkHistory
    );
  };
  employeeWorkHistoryhandleChange = e => {
    let value = e.target.value;
    if (
      ["organization", "jobTitle", "workStartDate", "experience"].includes(
        e.target.name
      )
    ) {
      let employmentHistoryModel = [...this.state.employmentHistoryModel];
      employmentHistoryModel[e.target.dataset.id][e.target.name] =
        e.target.value;
      this.setState({
        employmentHistoryModel
      });
    } else {
      this.setState({ [e.target.name]: value.trim() });
    }
  };
  educationWorkHistoryremoveField = id => e => {
    e.preventDefault();
    var employmentHistoryModel = this.state.employmentHistoryModel.filter(
      (user, key) => key !== id
    );
    this.setState({
      employmentHistoryModel
    });
  };
  bankDetailsListaddField = actionType => event => {
    event.preventDefault();

    let errorMsg = this.state.bankDetailModel.map((user, key) => {
      let error = {};
      let valid = true;
      if (!user.bankName) {
        error.errorbankName = "bankName is required";
        valid = false;
      } else {
        error.errorbankName = "";
      }
      if (!user.accountName) {
        error.erroraccountName = "accountName is required";
        valid = false;
      } else {
        error.erroraccountName = "";
      }
      if (!user.accountNumber) {
        error.erroraccountNumber = "accountNumber is required";
        valid = false;
      } else {
        error.erroraccountNumber = "";
      }
      if (!user.branchName) {
        error.errorbranchName = "branchName is required";
        valid = false;
      } else {
        error.errorbranchName = "";
      }
      if (
        this.state.bankDetailModel.length - 1 === key &&
        valid &&
        actionType === "add"
      ) {
        this.setState(prevState => ({
          bankDetailModel: [
            ...prevState.bankDetailModel,
            {
              bankName: "",
              accountName: "",
              accountNumber: "",
              branchName: ""
            }
          ]
        }));
      }

      return error;
    });
    this.setState(
      prevState => ({
        errorMessageBank: errorMsg
      }),
      () => this.state.errorMessageBank
    );
  };
  bankDetailsListhandleChange = e => {
    let value = e.target.value;
    if (
      ["bankName", "accountName", "accountNumber", "branchName"].includes(
        e.target.name
      )
    ) {
      let bankDetailModel = [...this.state.bankDetailModel];
      bankDetailModel[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({
        bankDetailModel
      });
    } else {
      this.setState({ [e.target.name]: value.trim() });
    }
  };
  bankDetailsListremoveField = id => e => {
    e.preventDefault();
    var bankDetailModel = this.state.bankDetailModel.filter(
      (user, key) => key !== id
    );
    this.setState({
      bankDetailModel
    });
  };
  getTextStyle(idx) {
    if (idx === 0) {
      return {
        display: "none"
      };
    }
  }
  handleAccodian = data => e => {
    switch (data) {
      case "accodian-contact":
        this.setState({
          contactAccodian: !this.state.contactAccodian,
          bankAccodian: false,
          educationAccodian: false,
          workHistoryAccodian: false
        });
        break;
      case "accodian-bank":
        this.setState({
          contactAccodian: false,
          bankAccodian: !this.state.bankAccodian,
          educationAccodian: false,
          workHistoryAccodian: false
        });
        break;
      case "accodian-education":
        this.setState({
          contactAccodian: false,
          bankAccodian: false,
          educationAccodian: !this.state.educationAccodian,
          workHistoryAccodian: false
        });
        break;
      case "accodian-work":
        this.setState({
          contactAccodian: false,
          bankAccodian: false,
          educationAccodian: false,
          workHistoryAccodian: !this.state.workHistoryAccodian
        });
        break;
      default:
        break;
    }
  };
  showAccodian = active => {
    if (active) {
      return { display: "block" };
    } else {
      return { display: "none" };
    }
  };
  hidePreviewModal = () => this.setState({ openPreviewModal: false });
  branchchange=e=>{
    this.setState({
      branchId:e.target.value
    })
    Axios.get(`${Configuration.domain}/hrm/getAllDepartmentIdAndNameOnly2/${e.target.value}`)
    .then(function(response) {
      if(response.data.t.length <= 0){
        this.setState({
            department:response.data.t,
            departmentId:""
          })
      }else{
        this.setState({
          department:response.data.t,
          departmentId:response.data.t[0].departmentId
        })

      }}.bind(this))
    .catch(function(response) {
       console.log(response);
     });
    }
  departmentchange=e=>{
      this.setState({
        departmentId:e.target.value
      })
      Axios.get(`${Configuration.domain}/hrm/getAllSubDepartmentIdAndNameOnly2/${e.target.value}`)
      .then(function(response) {

        if(response.data.t.length <= 0){
          this.setState({
            subdepartment:response.data.t,
            subDepartmentId:""
          })
        }else{
          this.setState({
            subdepartment:response.data.t,
            subDepartmentId:response.data.t[0].subDepartmentId
          })


       }
      }.bind(this))
      .catch(function(response) {
        console.log(response);
      });
    }
  subChange=e=>{
        this.setState({
        subDepart:e.target.value
      })

        Axios.get(`${Configuration.domain}/hrm/getAllRankIdAndNameOnly3/${e.target.value}`)
      .then(function(response) {

        if(response.data.t.length <= 0){
          this.setState({
            rank:response.data.t,
            rankId:""
          })}else{
          this.setState({
              rank:response.data.t,
            rankId:response.data.t[0].rankId
          })}}.bind(this))
      .catch(function(response) {
        console.log(response);
      });
    }
  rankChange=e=>{
    this.setState({
      rankId:e.target.value
    })
  }
  componentDidMount(){
    Axios.get(`${Configuration.domain}/hrm/getAllBranchIdAndNameOnly`)
    .then(function(response) {
      this.setState({
          branch:response.data.t
      })

      }.bind(this))
    .catch(function(response) {
      console.log(response);
    });
  }
  render() {

    let { validation } = this.state;
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;
    const eventHandlers = {
      addedfile: this.addedFile
    };
    let contactAccodian = false,
      bankAccodian = false,
      workHistoryAccodian = false,
      educationAccodian = false,
      previewModal = false;

    if (this.state.contactAccodian) {
      contactAccodian = true;
    } else if (this.state.bankAccodian) {
      bankAccodian = true;
    } else if (this.state.workHistoryAccodian) {
      workHistoryAccodian = true;
    } else if (this.state.educationAccodian) {
      educationAccodian = true;
    } else if (this.state.previewModal) {
      previewModal = true;
    }

    return (
      <div className="box-body">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-4">
            <div className="form-group">
              <h5>Upload Image</h5>
              <DropzoneComponent
                multiple={false}
                config={config}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
                onChange={this.addedFile}
              />
              <em style={{ color: "red" }}>{this.state.imageError}</em>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <EmployeeForm
              change={this.change}
              validation={validation}
              myvalue={this.state}
              handleOptionChange={this.handleOptionChange}
              branch={this.state.branch}
              branchchange={this.branchchange}
              department={this.state.department}
              departmentchange={this.departmentchange}
              subdepartment={this.state.subdepartment}
              subDepartChange={this.subChange}
              rankChange={this.rankChange}
              rank={this.state.rank}
            />
          </div>
        </div>

        <div className={contactAccodian ? "collapsed-box" : "box"}>
          <div className="box-header with-border">
            <h3 className="box-title">Contact</h3>
            <div className="box-tools pull-right">
              <button
                type="button"
                onClick={this.handleAccodian("accodian-contact")}
                className="btn btn-box-tool"
                data-widget="collapse"
              >
                <i
                  className={!contactAccodian ? "fa fa-plus" : "fa fa-minus"}
                />
              </button>
            </div>
          </div>
          <div className="row" style={this.showAccodian(contactAccodian)}>
            <div className="col-md-12 col-sm-12">
              <Contact
                change={this.change}
                validation={validation}
                myvalue={this.state}
              />
            </div>
          </div>
        </div>

        <div className={educationAccodian ? "collapsed-box" : "box"}>
          <div className="box-header with-border">
            <h3 className="box-title">Academic</h3>
            <div className="box-tools pull-right">
              <button
                type="button"
                onClick={this.handleAccodian("accodian-education")}
                className="btn btn-box-tool"
                data-widget="collapse"
              >
                <i
                  className={!educationAccodian ? "fa fa-plus" : "fa fa-minus"}
                />
              </button>
            </div>
          </div>
          <div className="row" style={this.showAccodian(educationAccodian)}>
            <div className="col-md-12 col-sm-12">
              <Education
                myvalue={this.state}
                change={this.educationDetailshandleChange}
                add={this.educationDetailsaddField}
                validation={validation}
                educationList={this.state.academicModel}
                errorMessageInfo={this.state.errorMessageInfo}
                getTextStyle={this.getTextStyle}
                errorMessageInfo={this.state.errorMessageInfo}
                error={this.state.error}
                removeField={this.educationDetailsremoveField}
              />
            </div>
          </div>
        </div>

        <div className={workHistoryAccodian ? "collapsed-box" : "box"}>
          <div className="box-header with-border">
            <h3 className="box-title">Employment History Model</h3>
            <div className="box-tools pull-right">
              <button
                type="button"
                onClick={this.handleAccodian("accodian-work")}
                className="btn btn-box-tool"
                data-widget="collapse"
              >
                <i
                  className={
                    !workHistoryAccodian ? "fa fa-plus" : "fa fa-minus"
                  }
                />
              </button>
            </div>
          </div>
          <div className="row" style={this.showAccodian(workHistoryAccodian)}>
            <div className="col-md-12 col-sm-12">
              <WorkHistory
                add={this.employeeWorkHistoryaddField}
                change={this.employeeWorkHistoryhandleChange}
                removeField={this.educationWorkHistoryremoveField}
                errorMessageInfo={this.state.errorMessageWorkHistory}
                workHistory={this.state.employmentHistoryModel}
                getTextStyle={this.getTextStyle}
                error={this.state.error}
              />
            </div>
          </div>
        </div>

        <div className={bankAccodian ? "collapsed-box" : "box"}>
          <div className="box-header with-border">
            <h3 className="box-title">Bank </h3>
            <div className="box-tools pull-right">
              <button
                type="button"
                onClick={this.handleAccodian("accodian-bank")}
                className="btn btn-box-tool"
                data-widget="collapse"
              >
                <i className={!bankAccodian ? "fa fa-plus" : "fa fa-minus"} />
              </button>
            </div>
          </div>
          <div className="row" style={this.showAccodian(bankAccodian)}>
            <div className="col-md-12 col-sm-12">
              <Bank
                add={this.bankDetailsListaddField}
                change={this.bankDetailsListhandleChange}
                removeField={this.bankDetailsListremoveField}
                bankDetailsList={this.state.bankDetailModel}
                getTextStyle={this.getTextStyle}
                errorMessageInfo={this.state.errorMessageBank}
                error={this.state.error}
              />
            </div>
          </div>
        </div>

        <div className="text-xs-right">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => this.setState({ openPreviewModal: true })}
          >
            Preview Form
          </button>
          <button
            onClick={this.handleFormSubmit}
            type="submit"
            className="btn btn-success btn-sm"
            style={{ margin: "0 30px" }}
          >
            Submit
          </button>
          <ToastContainer />
        </div>
        <PreviewForm
          preview={this.state}
          actualEducationList={this.state.academicModel}
          actualbankDetails={this.state.bankDetailModel}
          actualWorkList={this.state.employmentHistoryModel}
          previewImageData={this.state.previewImageData}
          open={this.state.openPreviewModal}
          hidePreviewModal={this.hidePreviewModal}
        />
      </div>
    );
  }
}

export default CreateEmployee;
