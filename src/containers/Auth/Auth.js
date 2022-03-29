import React from 'react'
import css from './Auth.module.scss'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import axios from 'axios'

const validateEmail = (email) => {
	return String(email)
	  .toLowerCase()
	  .match(
		 /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	  );
 };
class Auth extends React.Component {

	state = {
		isFormValid: false,
		formControls: {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'invalid email',
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Password',
				errorMessage: 'invalid password',
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6
				}
			}
		}
	}

	async loginHandler() {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}
		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[AIzaSyDmwmnpsblNpj6YUPwvk_501h1ZFP7bO7w]', authData)
			console.log(response.data)
		}
		catch(e) {
			console.log(e)
		}
	}

	async regHandler() {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}
		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[AIzaSyDmwmnpsblNpj6YUPwvk_501h1ZFP7bO7w]', authData)
			console.log(response.data)
		}
		catch(e) {
			console.log(e)
		}
	}

	submitHandler(event) {
		event.preventDefault()
	}

	validateControl(value, validation) {
		if (!validation) {
			return true
		}
		let isValid = true
		if (validation.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (validation.email) {
			isValid = validateEmail(value) && isValid
		}
		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid
		}
		return isValid
	}

	onChangeHandler(event, controlName) {
		const formControls = {...this.state.formControls}
		const control = {...formControls[controlName]}
		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)
		formControls[controlName] = control
		let isFormValid = true
		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})
		this.setState({
			formControls, isFormValid
		})
	}

	renderInputs = () => {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]
			return(
				<Input
					key={controlName + index}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					errorMessage={control.errorMessage}
					shouldValidate={!!control.validation}
					onChange={event => this.onChangeHandler(event, controlName)}
				/>
			)
		})
	}

	render(){
		console.log(this.state.formControls.email.value)
		return(
			<div className={css.Auth}>
				<div className="">
					<h1>Auth</h1>
					<form onSubmit={this.submitHandler} className={css.AuthForm}> 
						{
							this.renderInputs()
						}
						<Button type='success' onClick={this.loginHandler} disabled={!this.state.isFormValid}>Enter</Button>
						<Button type='primary' onClick={this.regHandler} disabled={!this.state.isFormValid}>Regisration</Button>
					</form>
				</div>
			</div>
		)			
	}
}

export default Auth
