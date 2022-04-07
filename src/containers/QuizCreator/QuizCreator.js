import React from 'react'
import css from './QuizCreator.module.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {createControl, validate, validateForm} from '../../form/formFramework'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz} from '../../store/actions/create'


function createOptionControl(count) {
	return createControl(
		{
			label: `variant ${count}`,
			errorMessage: 'not empty',
			id: count
		}, {required: true})
}

function createFormControls() {
	return {
		question: createControl(
			{
				label: 'input Question',
				errorMessage: 'invalid value'
			}, 
			{reuqired: true}
		),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4),
	}
}

class QuizCreator extends React.Component {

	state = {
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls()
	}

	onSubmitHandler(event) {
		return(
			event.preventDefault()
		)
	}

	addQuestionHandler = () => {
		const {question, option1, option2, option3, option4} = this.state.formControls
		const questionItem = {
			question: question.value,
			id: this.props.quiz.length + 1,
			rightAnswerId: this.state.rightAnswerId,
			answers: [
				{text: option1.value, id: option1.id},
				{text: option2.value, id: option2.id},
				{text: option3.value, id: option3.id},
				{text: option4.value, id: option4.id}
			]
		}

		this.props.createQuizQuestion(questionItem)

		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
			formControls: createFormControls()
		})
	}
	createQuizHandler = () => {

	this.setState({
		isFormValid: false,
		rightAnswerId: 1,
		formControls: createFormControls()
	})
	this.props.finishCreateQuiz()

		
	}

	changeHandler(value, ctrl) {
		const formControls = this.state.formControls
		const control = formControls[ctrl]

		control.touched = true
		control.value = value
		control.valid = validate(control.value, control.validation)

		formControls[ctrl] = control
		this.setState({
			formControls, isFormValid: validateForm(formControls)
		})
	}
	renderInputs() {
		return Object.keys(this.state.formControls).map((ctrl, index) => {
			const control = this.state.formControls[ctrl]
			return(
				<React.Fragment>
					<Input
						key={ctrl + index}
						label={control.label}
						value={control.value}
						valid={control.valid}
						shouldValide={!!control.validation}
						touched={control.touched}
						errorMessage={control.errorMessage}
						onChange={event => this.changeHandler(event.target.value, ctrl)}
					/>
					{
						index === 0 ? <hr/> : null
					}
				</React.Fragment>
				
			)
		})
	}
	selectChangeHandler =event => {
		this.setState({
			rightAnswerId: +event.target.value
		})
	}
	
	render() {

		const select = <Select
			label='select true answer'
			value={this.state.rightAnswerId}
			onChange={this.selectChangeHandler}
			options={[
				{text: 1, value: 1},
				{text: 2, value: 3},
				{text: 3, value: 3},
				{text: 4, value: 4},
			]}
		/>

		return(
			<div className={css.QuizCreator}>
				<h1>Quiz Creator</h1>
				<form onSubmit={this.onSubmitHandler}>
					{
						this.renderInputs()
					}
					{select}
					<Button type='primary' onClick={this.addQuestionHandler} disabled={!this.state.isFormValid} >add Question</Button>
					<Button type='success' onClick={this.createQuizHandler} disabled={this.props.quiz.length === 0} >create Test</Button>
				</form>
			</div>
		)
	}
}

function mapState(state) {
	return {
		quiz: state.create.quiz
	}
}

function mapDispatch(dispatch) {
	return {
		createQuizQuestion: item => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: () => dispatch(finishCreateQuiz())
	}
}

export default connect(mapState, mapDispatch)(QuizCreator)