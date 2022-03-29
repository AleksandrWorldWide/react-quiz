import React from 'react'
import { NavLink } from 'react-router-dom'
import css from './QuizList.module.scss'
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class QuizList extends React.Component {

	state = {
		quizes: [],
		loading: true,
		// activeQuiz: '1'
	}

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
		return this.state.quizes.map(quiz => {
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

	async componentDidMount() {
		try {
			const response = await axios.get('/quizes.json')
			const quizes = []
			Object.keys(response.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Test #${index + 1}`
				})
			})
			this.setState({
				quizes,
				loading: false
			})
		}
		catch(e) {
			console.log(e)
		}
	}

	render() {

		return(
			<div className={css.QuizList}>
				<h1>List Tests</h1>
				{
					this.state.loading 
					? <Loader/>
					: <ul>
						{this.renderQuizes()}
					</ul>
				}
			</div>
		)
	}
}

export default QuizList