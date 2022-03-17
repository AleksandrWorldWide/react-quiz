import { NavLink } from 'react-router-dom'
import css from './QuizList.module.scss'

const QuizList = props => {

	const renderQuizes = () => {
		return [1,2,3].map((quiz, index) => {
			return(
				<li key={index}>
					<NavLink
						to={'/quiz/' + quiz}
					>
						Test {quiz}
					</NavLink>
				</li>
			)
		})
	}

	return(
		<div className={css.QuizList}>
			<h1>List Tests</h1>
			<ul>
				{renderQuizes()}
			</ul>
		</div>
	)
}

export default QuizList