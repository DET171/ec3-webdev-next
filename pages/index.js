import Head from 'next/head';
import supabase from '../lib/supabase';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
	const [todoTitle, setTodoTitle] = useState([]);
	const [todoText, setTodoText] = useState([]);
	const [todos, setTodos] = useState([]);

	const addTodo = async () => {
		const { data, error } = await supabase
			.from('todos')
			.insert([
				{
					todo_title: todoTitle,
					todo_content: todoText,
					completed_status: false,
				},
			]);

		if (error) {
			console.log(error);
		}

		fetchTodos();
	};

	const fetchTodos = async () => {
		const { data, error } = await supabase
			.from('todos')
			.select();

		if (error) {
			console.log(error);
		}

		setTodos(data);
		console.log(data);
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<>
			<Head>
				<title>Todos</title>
			</Head>
			<main className='bg-slate-200 min-h-screen'>
				<div className='container mx-auto p-10'>
					<h1 className='text-4xl font-bold text-slate-900 text-center'>Todos</h1>

					<input type='text' value={todoTitle} onChange={(e) => {
						setTodoTitle(e.target.value);
					}} className='w-full border border-slate-300 rounded p-2 mt-5' />

					<textarea className='w-full border border-slate-300 rounded p-2 mt-5 h-48' value={todoText} onChange={(e) => {
						setTodoText(e.target.value);
					}} />

					<button onClick={() => addTodo()} className='w-full bg-blue-500 duration-200 hover:bg-blue-700 text-white rounded p-2 mt-5'>Add Todo</button>
					<hr className='my-5' />

					{todos.map((todo) => (
						<div key={todo.id} className={`bg-white rounded p-5 my-5 ${
							todo.completed_status ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
						}`}>
							<h1 className='text-2xl font-bold text-slate-900'>{todo.todo_title}</h1>
							<p className='text-slate-900'>{todo.todo_content}</p>
							<Link href={`/todos/${todo.id}`} className='text-blue-600'>
								View
							</Link>
						</div>
					))}
				</div>
			</main>
		</>
	);
}
