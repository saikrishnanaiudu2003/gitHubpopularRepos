import './index.css'

const RepositaryItem = props => {
  const {repoItem} = props
  const {name, imageUrl, forkscount, starscount, issusescount} = repoItem

  return (
    <li className="card-items">
      <img src={imageUrl} alt={name} className="image-1" />
      <h1 className="main-head">{name}</h1>
      <div className="Text-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="logo-image"
        />
        <p>{starscount} stars</p>
      </div>
      <div className="Text-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="logo-image"
        />
        <p>{forkscount} forks</p>
      </div>
      <div className="Text-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="logo-image"
        />
        <p>{issusescount} issues</p>
      </div>
    </li>
  )
}
export default RepositaryItem
