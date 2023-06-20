import React, { useEffect } from "react";

import { useState } from "react";


const Home = () => {
	
	const [tasks, setTasks] = useState([])
	const [newTask,setNewTask] = useState({})
	const [user, setUser] = useState("")
	const [initialValueTask, setInitialValueTask] = useState("");


	useEffect(() =>{
		getTasks()
	}, [])

	const createUser = ()=>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/' + user, {
			method: 'post',			
			headers: {
			  "Content-Type": "application/json"
			},
			body: JSON.stringify([])
		  })
		  .then(res =>{
			return res.json();
		})
		  .then(resAsJson => {		 
			  console.log(resAsJson); 
			  getTasks()
			})
		  .catch((error) => {
			  console.log(error);
		  });

	}

	const getTasks =()=>{
		if(user !== "") {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/' + user, {
      	method: 'get',
      	headers: {
        "Content-Type": "application/json"
      	}
    	})
    	.then((res) => res.json())
		.then(resAsJson =>{ 
			console.log(resAsJson);
			setTasks(resAsJson);		
		})
		.catch((error)=>{
			console.log(error);
		});
    }
	}
	
	const updateTasks = ()=>{
		const newTasks = [...tasks, newTask]
		setTasks(newTasks);
		setNewTask("");
		fetch('https://assets.breatheco.de/apis/fake/todos/user/' + user, {
			method: 'put',
			body: JSON.stringify(newTasks),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then((res) => res.json())		 
		  .then(resAsJson => {
			  console.log(resAsJson); 
		  })
		  .catch((error) => {
			  console.log(error);
		  });
	}

	const deleteTasks = (index)=>{
		const updatedTasks = tasks.filter((_, i) => i !== index);
		setTasks(updatedTasks);
		fetch('https://assets.breatheco.de/apis/fake/todos/user/' + user, {
			method: 'put',
			body: JSON.stringify(updatedTasks),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
		  .then((res) => res.json())		 
		  .then(resAsJson => {
			  console.log(resAsJson); 
		  })
		  .catch((error) => {
			  console.log(error);
		  });
	}

	const deleteUser=()=>{
		fetch('https://assets.breatheco.de/apis/fake/todos/user/' + user, {
		method: 'delete',
		headers: {
			"Content-Type": "application/json"
		}
    	})
		.then(res => {
			console.log(res.ok); 
			return res.json(); 
		})
		.then(() => {
			setUser("")	
			setTasks([])
		})
		.catch(error => {
			console.log(error);
		});
		}
	
	const tasksLenght = tasks.length + " item left"

	return (
		<div className="page">
			<div className="user">
				<input 
					type="text" 
					className="username"
					placeholder="Enter a name..." 
					value={user} 
					onChange={(e) => setUser(e.target.value)}					  				
					onKeyDown={(e) => {
						if(e.key === 'Enter') {
							createUser()}
						}}
					/>		
			</div>
			<button className="delete" onClick={deleteUser}>Delete User</button>
				<div className="todos d-justify-content-arround">todos
					<div className="square-list" >												
						<input 
						type="text" 
						placeholder="Enter a new task..." 
						value={newTask.label || initialValueTask} 
						onChange={(e) => setNewTask({label: e.target.value, done: false})}					  				
						onKeyDown={(e) => {
							if(e.key === 'Enter') {
								updateTasks();
								setInitialValueTask("");
							} 	
							}}
						/>	
					
						<ul className="list">	
							{tasks.map((task, index) => {
								return <li key={index}><div>{task.label} <button className="deleteTask" id={index} onClick={()=>deleteTasks(index)}>X</button>
								</div></li>
							})}										
						</ul>
						<div className="footer">{tasksLenght} </div>
					</div>
					<div className="second-page"></div>
					<div className="third-page"></div>

				</div>
		</div>
	);
};

export default Home;
