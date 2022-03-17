import React from "react";
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'
import { NavLink } from "react-router-dom";

const links = [
	{to: '/', label: 'list', end: true},
	{to: '/auth', label: 'auth', end: false},
	{to: '/quiz-creator', label: 'create Test', end: false}
]

export default class Drawer extends React.Component {

	renderLinks() {
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
		return(
			<React.Fragment>
				<nav className={cls.join(' ')}>
					<ul>
						{this.renderLinks()}
					</ul>
				</nav>
				{ this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
			</React.Fragment>
			
		)
	}

}