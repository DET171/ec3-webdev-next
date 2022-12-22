import supabase from '../../lib/supabase';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function TodoView() {
	const router = useRouter();
	const { todo } = router.query;
	const [todoData, setTodoData] = useState(null);

	const fetchTodo = async () => {
		const { data, error } = await supabase
			.from('todos')
			.select('*')
			.eq('id', todo);

		if (error) {
			console.log(error);
		}

		setTodoData(data[0]);
		console.log(data);
	};

	useEffect(() => {
		fetchTodo();
	}, []);

	const deleteTodo = () => {
		supabase
			.from('todos')
			.delete()
			.eq('id', todo)
			.then((res) => {
				console.log(res);
				router.push('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const completeTodo = () => {
		supabase
			.from('todos')
			.update({ completed_status: true })
			.eq('id', todo)
			.then((res) => {
				console.log(res);
				router.push('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<Head>
				<title>Todo View</title>
			</Head>
			<main className='bg-slate-200 min-h-screen'>
				<div className='container mx-auto p-10'>
					<h1 className='text-4xl font-bold text-slate-900 text-center'>Detailed View</h1>
					{todoData && (
						<div className='bg-white rounded p-5 mt-5'>
							<h2 className='text-2xl font-bold text-slate-900'>{todoData.todo_title} {
								todoData.completed_status ? <span className='text-green-500'>(Completed)</span> : <span className='text-red-500'>(Incomplete)</span>
							}</h2>
							<p className='text-slate-900'>{todoData.todo_content}</p>

							<div className='flex justify-end mt-5'>
								<button
									onClick={deleteTodo}
									className='bg-red-500 hover:bg-red-700 duration-200 text-white px-5 py-2 rounded ml-5'>
									Delete
								</button>

								<button onClick={completeTodo} className='bg-green-500 hover:bg-green-700 duration-200 text-white px-5 py-2 rounded ml-5'>
								Complete
								</button>
							</div>
						</div>
					)}
				</div>
			</main>
		</>
	);
}