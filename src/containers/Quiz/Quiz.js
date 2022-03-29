import React from "react";
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from "../../components/UI/Loader/Loader";
import axios from "../../axios/axios-quiz";

export default class Quiz extends React.Component {

	state = {
		isFinished: false,
		results: {},
		activeQuestion: 0,
		answerState: null,
		quiz: [],
		loading: true
	}

	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}

	onAnswerClickHandler = (answerId) => {

		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0]
			if (this.state.answerState[key] === 'success') {
				return
			}
		}
		const question = this.state.quiz[this.state.activeQuestion]
		const results = this.state.results

		if (question.rightAnswerId === answerId) {

			if (!results[question.id]) {
				results[question.id] = 'success'
			}

			this.setState({
				answerState: {[answerId]: 'success'},
				results
			})

			const timeout = window.setTimeout(() => {

				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}
				window.clearTimeout(timeout)
			},1000)
			
		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: {[answerId]: 'error'},
				results
			})
			const timeout = window.setTimeout(() => {

				if (this.isQuizFinished()) {
					this.setState({
						isFinished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}
				window.clearTimeout(timeout)
			},1000)
		}
		
	}

	retryHandler = () => {
		this.setState({
			activeQuestion: 0,
			answerState: null,
			isFinished: false,
			results: {}
		})
	}

	async componentDidMount() {
		try {
			const response = await axios.get('/quizes/-MzE6RqSVVgRA4--f4T_.json')
			const quiz = response.data
			// const r = await axios.get('/quizes.json')
			// console.log(r.data)
			// Object.keys(r.data).forEach(item => {
			// 	console.log(item)
			// })
			this.setState({
				quiz,
				loading: false
			})
		}
		catch (e) {
			console.log(e)
		}
	}

	render () {
console.log('props', this.props)
		return(
			<div className={classes.Quiz}>
				
				<div className={classes.QuizWrapper}>
					<h1>Fühlen Sie diese Form</h1>

					{
						this.state.loading 
						? <Loader/>
						: this.state.isFinished ?
						<FinishedQuiz
							results={this.state.results}
							quiz={this.state.quiz}
							onRetry={this.retryHandler}
						/> :
						<ActiveQuiz
							question={this.state.quiz[this.state.activeQuestion].question}
							answers={this.state.quiz[this.state.activeQuestion].answers}
							onAnswerClick={this.onAnswerClickHandler}
							quizLength={this.state.quiz.length}
							answerNumber={this.state.activeQuestion + 1}
							state={this.state.answerState}
						/>
					}

					
				</div>
			</div>
		)
	}
}