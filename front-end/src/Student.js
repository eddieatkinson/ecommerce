import React, { Component } from 'react';

class Student extends Component{
	render(){
		var students = [
			'Casey',
			'Eddie',
			'Jamie',
			'Valerie'
		];
		var studentArray = students.map((student, index)=>{
			return(<li key={index}>{student}</li>);
		});
		return(
			<div>
				<ul>
					{studentArray}
				</ul>
			</div>
		);
	}
}

export default Student;