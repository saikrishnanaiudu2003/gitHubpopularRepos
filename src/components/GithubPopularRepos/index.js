import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositaryItem from '../RepositoryItem'

import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiUserList: apiStatusList.initial,
    activeLanguageId: languageFiltersData[0].id,
    reposList: [],
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiUserList: apiStatusList.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.popular_repos.map(eachRepositary => ({
        id: eachRepositary.id,
        imageUrl: eachRepositary.avatar_url,
        forkscount: eachRepositary.forks_count,
        starscount: eachRepositary.stars_count,
        issusescount: eachRepositary.issues_count,
        name: eachRepositary.name,
      }))
      this.setState({
        reposList: updateData,
        apiUserList: apiStatusList.success,
      })
    } else {
      this.setState({
        apiUserList: apiStatusList.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {reposList} = this.state

    return (
      <div className="items-repos-card">
        {reposList.map(eachRepo => (
          <RepositaryItem key={eachRepo.id} repoItem={eachRepo} />
        ))}
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h>Something went wrong</h>
    </div>
  )

  renderViweItems = () => {
    const {apiUserList} = this.state

    switch (apiUserList) {
      case apiStatusList.success:
        return this.renderSuccessView()
      case apiStatusList.failure:
        return this.renderFailureView()
      case apiStatusList.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  updateUserClickItem = newFilterId => {
    this.setState({activeLanguageId: newFilterId}, this.getRepos)
  }

  render() {
    const {activeLanguageId} = this.state
    return (
      <div className="main-card">
        <h1>Popular</h1>
        <div className="items-card">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              activeId={eachItem.id === activeLanguageId}
              items={eachItem}
              updateUserClickItem={this.updateUserClickItem}
            />
          ))}
        </div>
        <div className="flex-images-card">
          <ul className="images-card">{this.renderViweItems()}</ul>
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
