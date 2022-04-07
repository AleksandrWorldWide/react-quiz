import React from 'react'
import { NavLink } from 'react-router-dom'
import css from './QuizList.module.scss'
import { fetchQuizes } from '../../store/actions/quiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'

class QuizList extends React.Component {



	// updateQuizID (id) {
	// 	console.log('id ',id)
	// 	const state = {...this.state}
	// 	state.activeQuiz = id
	// 	this.setState({
	// 		state
	// 	})
	// 	console.log('state ', this.state.activeQuiz)
	// }

	renderQuizes () {
		return this.props.quizes.map(quiz => {
			return(
				<li key={quiz.id}>
					<NavLink
						to={'/quiz/' + quiz.id}
						// onClick={() => this.updateQuizID(quiz.id)}
					>
						{quiz.name}
					</NavLink>
				</li>
			)
		})
	}

	componentDidMount() {
		this.props.fetchQuizes()
		
	}

	render() {

		return(
			<div className={css.QuizList}>
				<h1>List Tests</h1>
				{
					this.props.loading && this.props.quizes.length !== 0
					? <Loader/>
					: <ul>
						{this.renderQuizes()}
					</ul>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		quizes: state.quiz.quizes,
		loading: state.quiz.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizes: () => dispatch(fetchQuizes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)