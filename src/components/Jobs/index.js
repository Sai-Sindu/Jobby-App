import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'
import Profile from '../Profile'
import JobFilters from '../JobFilters'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsApiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchText: '',
    activeEmploymentTypeId: [],
    activeSalaryRangeId: '',
    jobsApiStatus: jobsApiStatusConst.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {searchText, activeEmploymentTypeId, activeSalaryRangeId} = this.state
    console.log(activeEmploymentTypeId)
    this.setState({jobsApiStatus: jobsApiStatusConst.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?search=${searchText}&employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok) {
      const jobsData = await response.json()

      const formattedJobsData = jobsData.jobs.map(eachJob => ({
        id: eachJob.id,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({
        jobsList: formattedJobsData,
        jobsApiStatus: jobsApiStatusConst.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiStatusConst.failure})
    }
  }

  changeSalaryRange = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobsList)
  }

  addEmploymentType = id => {
    const {activeEmploymentTypeId} = this.state
    if (activeEmploymentTypeId.includes(id)) {
      const filterActiveEmploymentTypeId = activeEmploymentTypeId.filter(
        eachId => eachId !== id,
      )
      this.setState(
        {activeEmploymentTypeId: filterActiveEmploymentTypeId},
        this.getJobsList,
      )
    } else {
      this.setState(
        prevState => ({
          activeEmploymentTypeId: [...prevState.activeEmploymentTypeId, id],
        }),
        this.getJobsList,
      )
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onClickSearch = () => {
    this.getJobsList()
  }

  renderSearchBar = () => {
    const {searchText} = this.state
    return (
      <div className="search-bar-card">
        <input
          type="search"
          placeholder="Search"
          value={searchText}
          className="search-input-card"
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearch}
        >
          <BsSearch size={20} color="#f1f5f9" />
        </button>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="search-not-found-card">
          <div className="no-jobs-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1 className="no-jobs-title">No Jobs Found</h1>
            <p className="no-jobs-description">
              We could not find any jobs. Try other filters
            </p>
          </div>
        </div>
      )
    }
    return (
      <div className="jobs-lists-card-container">
        <ul className="jobs-list-card">
          {jobsList.map(eachJob => (
            <JobItem jobItemDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobsList()
  }

  renderJobsFailureView = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-card-title">Oops! Something Went Wrong</h1>
      <p className="failure-card-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderJobsSwitchStatus = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsApiStatusConst.inProgress:
        return this.renderJobsLoadingView()
      case jobsApiStatusConst.success:
        return this.renderJobsList()
      case jobsApiStatusConst.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeEmploymentTypeId, activeSalaryRangeId} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-profile-filters-container">
          <div className="profile-filters-card">
            <Profile />
            <hr className="separator" />
            <JobFilters
              employmentTypesList={employmentTypesList}
              activeEmploymentTypeId={activeEmploymentTypeId}
              addEmploymentType={this.addEmploymentType}
              salaryRangesList={salaryRangesList}
              activeSalaryRangeId={activeSalaryRangeId}
              changeSalaryRange={this.changeSalaryRange}
            />
          </div>
          <div className="jobs-list-container">
            {this.renderSearchBar()}
            {this.renderJobsSwitchStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
