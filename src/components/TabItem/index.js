import './index.css'

const TabItem = props => {
  const {tabDetails, isActive, clickTab} = props
  const {tabId, displayText} = tabDetails

  const onClickTab = () => {
    clickTab(tabId)
  }

  return (
    <li>
      <button
        type="button"
        onClick={onClickTab}
        className={isActive ? 'active-tab' : ''}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem