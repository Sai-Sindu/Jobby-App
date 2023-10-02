import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    rating,
    title,
    location,
  } = jobDetails

  return (
    <li className="similar-job-card">
      <div className="logo-title-rating-card">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="heading">Description</h1>
      <p className="description-text">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobs
