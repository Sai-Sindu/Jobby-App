import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const jobDetailsApiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetails extends Component {
  state = {
    jobDetailsObject: {},
    skillsList: [],
    similarJobsList: [],
    lifeAtCompanyDetails: {},
    jobDetailsApiStatus: jobDetailsApiStatusConst.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getSimilarJobsFormattedData = eachJob => ({
    companyLogoUrl: eachJob.company_logo_url,
    employmentType: eachJob.employment_type,
    id: eachJob.id,
    jobDescription: eachJob.job_description,
    rating: eachJob.rating,
    title: eachJob.title,
    location: eachJob.location,
  })

  getSkillsFormattedData = eachSkill => ({
    name: eachSkill.name,
    imageUrl: eachSkill.image_url,
  })

  renderJobDetailsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
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

  getJobDetails = async () => {
    this.setState({jobDetailsApiStatus: jobDetailsApiStatusConst.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsUrl, options)
    if (response.ok) {
      const jobDetailsData = await response.json()

      const formattedJobDetailsData = {
        companyLogoUrl: jobDetailsData.job_details.company_logo_url,
        companyWebsiteUrl: jobDetailsData.job_details.company_website_url,
        employmentType: jobDetailsData.job_details.employment_type,
        id: jobDetailsData.job_details.id,
        jobDescription: jobDetailsData.job_details.job_description,
        location: jobDetailsData.job_details.location,
        packagePerAnnum: jobDetailsData.job_details.package_per_annum,
        rating: jobDetailsData.job_details.rating,
        title: jobDetailsData.job_details.title,
      }

      const formattedSkills = jobDetailsData.job_details.skills.map(eachSkill =>
        this.getSkillsFormattedData(eachSkill),
      )

      const formattedLifeAtCompany = {
        description: jobDetailsData.job_details.life_at_company.description,
        imageUrl: jobDetailsData.job_details.life_at_company.image_url,
      }

      const formattedSimilarJobs = jobDetailsData.similar_jobs.map(eachJob =>
        this.getSimilarJobsFormattedData(eachJob),
      )

      this.setState({
        jobDetailsObject: formattedJobDetailsData,
        similarJobsList: formattedSimilarJobs,
        skillsList: formattedSkills,
        lifeAtCompanyDetails: formattedLifeAtCompany,
        jobDetailsApiStatus: jobDetailsApiStatusConst.success,
      })
    } else {
      this.setState({jobDetailsApiStatus: jobDetailsApiStatusConst.failure})
    }
  }

  renderSimilarJobs = () => {
    const {similarJobsList} = this.state
    console.log(similarJobsList)
    return (
      <>
        <h1 className="heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsList.map(eachJob => (
            <SimilarJobs jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetails = () => {
    const {jobDetailsObject, skillsList, lifeAtCompanyDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetailsObject
    const {description, imageUrl} = lifeAtCompanyDetails

    return (
      <div className="job-item-container">
        <div className="logo-title-rating-card">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div className="title-rating-card">
            <h1 className="company-title">{title}</h1>
            <div className="rating-card">
              <AiFillStar size={20} color="#fbbf24" />
              <p className="rating-num">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-job-package-card">
          <div className="location-job-card">
            <div className="icons-card">
              <MdLocationOn size={20} color="#f8fafc" />
              <p className="icons-text">{location}</p>
            </div>
            <div className="icons-card">
              <BsFillBriefcaseFill size={20} color="#f8fafc" />
              <p className="icons-text">{employmentType}</p>
            </div>
          </div>
          <p className="package-text">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <div className="description-card">
          <h1 className="heading">Description</h1>
          <a href={companyWebsiteUrl} className="website-link">
            Visit <FiExternalLink />
          </a>
        </div>
        <p className="description-text">{jobDescription}</p>
        <h1 className="heading">Skills</h1>
        <ul className="skills-list-card">
          {skillsList.map(eachSkill => (
            <Skills skillDetails={eachSkill} key={eachSkill.name} />
          ))}
        </ul>
        <h1 className="heading">Life at Company</h1>
        <div className="life-at-company-card">
          <p className="description">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="life-at-company-img"
          />
        </div>
      </div>
    )
  }

  renderSuccessView() {
    return (
      <>
        <div className="job-detail-bg-container">
          {this.renderJobDetails()}
          {this.renderSimilarJobs()}
        </div>
      </>
    )
  }

  renderJobDetailsSwitchStatus = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case jobDetailsApiStatusConst.inProgress:
        return this.renderJobDetailsLoadingView()
      case jobDetailsApiStatusConst.success:
        return this.renderSuccessView()
      case jobDetailsApiStatusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-detail-bg-container">
          {this.renderJobDetailsSwitchStatus()}
        </div>
      </>
    )
  }
}

export default JobDetails
