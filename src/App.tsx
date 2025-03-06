import React, { Component } from 'react'
import { TAppStore } from './Configurations/AppStore'
import { connect, ConnectedProps } from 'react-redux'
import AppRouter from './AppRouter'
interface IAppProps extends PropsFromRedux {}

class App extends Component<IAppProps> {
  render() {
    return <AppRouter />
  }
}

const mapStateToProps = (state: TAppStore) => {
  return {}
}

const connector = connect(mapStateToProps, null)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)
