import React from "react";
import classes from './Quiz.module.scss'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

export default class Quiz extends React.Component {

	state = {
		isFinished: false,
		results: {},
		activeQuestion: 0,
		answerState: null,
		quiz: [
			{
				question: 'Сколько будет 1 + 1 = ?',
				rightAnswerId: 1,
				id: 1,
				answers: [
					{
						text: '2', id: 1
					},
					{
						text: '3', id: 2
					},
					{
						text: '4', id: 3
					},
					{
						text: '5', id: 4
					}
				]
			},
			{
				question: 'Сколько будет 2 + 2 = ?',
				rightAnswerId: 3,
				id: 2,
				answers: [
					{
						text: '2', id: 1
					},
					{
						text: '3', id: 2
					},
					{
						text: '4', id: 3
					},
					{
						text: '5', id: 4
					}
				]
			}
		]
	}

	isQuizFinished() {
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}

	timeoutHandle() {
		
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

	render () {

		return(
			<div className={classes.Quiz}>
				
				<div className={classes.QuizWrapper}>
					<h1>Fühlen Sie diese Form</h1>

					{
						this.state.isFinished ?
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