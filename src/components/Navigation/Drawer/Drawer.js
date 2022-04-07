import React from "react";
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from "react-router-dom";



export default class Drawer extends React.Component {

	renderLinks(links) {
		return links.map((link, index) => {
			return(
				<li key={index}>
					<NavLink
						to={link.to}
						end={link.end}
						onClick={this.props.onClose}
					>{link.label}</NavLink>
				</li>
			)
		})
	}
	
	render() {
		const cls = [classes.Drawer]
		if (!this.props.isOpen) {
			cls.push(classes.close)
		}
		const links = [
			{to: '/', label: 'list', end: true}
		]
		if (this.props.isAuthenticated) {
			links.push({to: '/quiz-creator', label: 'create Test', end: false})
			links.push({to: '/logout', label: 'Exit', end: false})
		} else {
			links.push({to: '/auth', label: 'auth', end: false})
		}
		return(
			<React.Fragment>
				<nav className={cls.join(' ')}>
					<ul>
						{this.renderLinks(links)}
					</ul>
				</nav>
				{ this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
			</React.Fragment>
			
		)
	}

}