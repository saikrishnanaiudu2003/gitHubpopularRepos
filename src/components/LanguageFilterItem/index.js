import './index.css'

const LanguageFilterItem = props => {
  const {items, activeId, updateUserClickItem} = props
  const {id, language} = items
  const btnClass = activeId
    ? 'language-btn active-language-btn'
    : 'language-btn'

  const updateIdItem = () => {
    updateUserClickItem(id)
  }
  return (
    <li className="items-card-text">
      <button className={btnClass} type="button" onClick={updateIdItem}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
