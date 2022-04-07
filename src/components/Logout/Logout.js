import React from "react";
import { connect } from "react-redux";
import { logout } from '../../store/actions/auth'
import { Route, Navigate  } from 'react-router-dom'

class Logout extends React.Component {
	componentDidMount() {
		this.props.logout()
	}
	render() {
		return <Route path="*" element={<Navigate to ="/" />}/>
	}
}

function mapDispatch(dispatch) {
	return {
		logout: () => dispatch(logout())
	}
}

export default connect(null, mapDispatch)(Logout)