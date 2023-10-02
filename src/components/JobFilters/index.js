import './index.css'

const JobFilters = props => {
  const renderSalaryRange = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachRange => {
      const {changeSalaryRange} = props

      const onClickSalaryRange = () => {
        changeSalaryRange(eachRange.salaryRangeId)
      }

      return (
        <li className="job-type-card" key={eachRange.salaryRangeId}>
          <input
            type="radio"
            id={eachRange.salaryRangeId}
            value={eachRange.label}
            name="salary"
            onClick={onClickSalaryRange}
          />
          <label htmlFor={eachRange.salaryRangeId} className="label-text">
            {eachRange.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypes = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachType => {
      const {addEmploymentType} = props

      const onClickEmploymentType = () => {
        addEmploymentType(eachType.employmentTypeId)
      }

      return (
        <li className="job-type-card" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            onClick={onClickEmploymentType}
          />
          <label htmlFor={eachType.employmentTypeId} className="label-text">
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="job-filters-container">
      <h1 className="employment-type-title">Type of Employment</h1>
      <ul className="job-type-filter">{renderEmploymentTypes()}</ul>
      <hr className="separator" />
      <h1 className="salary-range-title">Salary Range</h1>
      <ul className="salary-range-card">{renderSalaryRange()}</ul>
    </div>
  )
}

export default JobFilters
