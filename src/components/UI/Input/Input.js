import css from './Input.module.scss'

function isInvalid({valid, touched, shouldValidate}) {
	return !valid && shouldValidate && touched
}

const Input = props => {
	const inputType = props.type || 'text'
	const cls = [css.Input]
	const htmlFor = `${inputType}-${Math.random()}`

	if (isInvalid(props)) {
		cls.push(css.invalid)
	}

	return(
		<div className={cls.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input type={inputType} id={htmlFor} value={props.value} onChange={props.onChange}/>
			{
				isInvalid(props) ? <span>{props.errorMessage || 'Enter true value'}</span> : null
			}
			
		</div>
	)
}

export default Input