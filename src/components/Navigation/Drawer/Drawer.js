import React from "react";
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [1,2,3]

export default class Drawer extends React.Component {

	renderLinks() {
		return links.map((link, index) => {
			return(
				<li key={index}>
					<a>link {link}</a>
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