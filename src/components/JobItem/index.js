import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    id,
    location,
    rating,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
  } = jobItemDetails

  return (
    <Link to={`/jobs/${id}`} className="job-item-link">
      <li className="job-item-container">
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
        <h1 className="heading">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
