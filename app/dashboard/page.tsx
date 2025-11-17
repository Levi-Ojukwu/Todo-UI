/** @format */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Navigation } from "@/components/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import { TodoForm } from "@/components/todo-form";
import { TodoCard } from "@/components/todo-card";
import { Button } from "@/components/ui/button";
import {
	listTodos,
	addTodo as addTodoApi,
	updateTodo as updateTodoApi,
	markTodoCompleted as markTodoCompletedApi,
	deleteTodo as deleteTodoApi,
} from "@/lib/api";
import { ImagePlus, Plus, Settings } from "lucide-react";
import { ConfirmModal } from "@/components/confirm-modal";

interface Todo {
	id: string;
	title: string;
	description: string;
	deadline: string;
	tags: string[];
	completed: boolean;
}

type FilterType = "all" | "active" | "completed";

export default function DashboardPage() {
	const router = useRouter();
	const { user, token } = useAuth();
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);
	const [filter, setFilter] = useState<FilterType>("all");
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [error, setError] = useState("");
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

	useEffect(() => {
		loadTodos();
	}, [token]);

	const loadTodos = async () => {
		if (!token) return;
		setIsLoading(true);
		try {
			const data = await listTodos(token);

			const normalized = data.todos.map((t: any) => ({
				id: t._id,
				title: t.title,
				description: t.description,
				deadline: t.deadline,
				tags: t.tags || [],
				completed: t.completedAt !== null, // convert null -> false, date -> true
			}));

			setTodos(normalized);
			setError("");
		} catch (err: any) {
			setError("Failed to load todos");
			console.log("Error loading todos:", err.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddTodo = async (data: any) => {
		if (!token) return;
		setIsSaving(true);
		try {
			if (editingId) {
				await updateTodoApi(token, editingId, data);
				setTodos(
					todos.map((t) => (t.id === editingId ? { ...t, ...data } : t)),
				);
				setEditingId(null);
			} else {
				const result = await addTodoApi(token, data);

				setTodos([
					...todos,
					{
						id: result.todo._id,
						title: result.todo.title,
						description: result.todo.description,
						deadline: result.todo.deadline,
						tags: result.todo.tags || [],
						completed: result.todo.completedAt !== null,
					},
				]);
			}
			setShowForm(false);
			setError("");
		} catch (err: any) {
			setError(err.message || "Failed to save todo");
			console.log("Error saving todo:", err.message);
		} finally {
			setIsSaving(false);
		}
	};

	const handleDeleteTodo = async (id: string) => {
		setConfirmDeleteId(id);
	};

	const handleToggleComplete = async (id: string) => {
		if (!token) return;
		try {
			await markTodoCompletedApi(token, id);

			setTodos(todos.map((t) => (t.id === id ? { ...t, completed: true } : t)));
		} catch (err: any) {
			setError("Failed to update todo");
			console.log("Error toggling todo:", err.message);
		}
	};

	const handleEditTodo = (id: string) => {
		setEditingId(id);
		setShowForm(true);
	};

	const handleCancel = () => {
		setShowForm(false);
		setEditingId(null);
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter === "active") return !todo.completed;
		if (filter === "completed") return todo.completed;
		return true;
	});

	const stats = {
		total: todos.length,
		completed: todos.filter((t) => t.completed).length,
		active: todos.filter((t) => !t.completed).length,
		completionRate:
			todos.length > 0
				? Math.round(
						(todos.filter((t) => t.completed).length / todos.length) * 100,
				  )
				: 0,
	};

	return (
		<ProtectedRoute>
			<Navigation />
			<div className='min-h-screen bg-background'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
					{/* Header Section */}
					<div className='flex items-center justify-between mb-8'>
						<div className='flex items-center gap-4'>
							{user?.imageUrl ? (
								<img
									src={user.imageUrl || "/placeholder.svg"}
									alt='Profile'
									className='w-20 h-20 rounded-full object-cover border-2 border-primary'
								/>
							) : (
								<div className='w-20 h-20 rounded-full bg-gray-300 text-3xl font-bold flex items-center justify-center text-white'>
									{/* {user?.name?.charAt(0).toUpperCase() || "U"} */}
                  <span><ImagePlus className="w-9 h-9"/></span>
								</div>
							)}
							<div>
								<h1 className='text-4xl font-bold text-text mb-2'>Dashboard</h1>
								<p className='text-text-muted'>
									Welcome back, {user?.name}! Manage your tasks efficiently.
								</p>
							</div>
						</div>

						<Button
							onClick={() => router.push("/profile")}
							className='flex items-center gap-2 gradient-primary text-white hover:shadow-accent'>
							<Settings className='w-4 h-4' />
							<span className='hidden sm:inline'>Profile Settings</span>
							<span className='sm:hidden'>Profile</span>
						</Button>
					</div>

					{/* Statistics Cards */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
						<div className='bg-surface rounded-lg p-6 border border-border-light shadow-soft'>
							<p className='text-text-muted text-sm mb-2'>Total Tasks</p>
							<p className='text-3xl font-bold text-text'>{stats.total}</p>
						</div>
						<div className='bg-surface rounded-lg p-6 border border-border-light shadow-soft'>
							<p className='text-text-muted text-sm mb-2'>Active</p>
							<p className='text-3xl font-bold text-primary'>{stats.active}</p>
						</div>
						<div className='bg-surface rounded-lg p-6 border border-border-light shadow-soft'>
							<p className='text-text-muted text-sm mb-2'>Completed</p>
							<p className='text-3xl font-bold text-success'>
								{stats.completed}
							</p>
						</div>
						<div className='bg-surface rounded-lg p-6 border border-border-light shadow-soft'>
							<p className='text-text-muted text-sm mb-2'>Completion Rate</p>
							<p className='text-3xl font-bold text-text'>
								{stats.completionRate}%
							</p>
						</div>
					</div>

					{error && (
						<div className='mb-6 p-4 bg-error/10 text-error rounded-lg text-sm'>
							{error}
						</div>
					)}

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
						{/* Todo Form (Sidebar on desktop, above list on mobile) */}
						<div className='lg:col-span-1'>
							{showForm && (
								<div className='bg-surface rounded-xl p-6 border border-border-light shadow-md sticky top-4'>
									<h2 className='text-xl font-bold text-text mb-4'>
										{editingId ? "Edit Todo" : "Create New Todo"}
									</h2>
									<TodoForm
										onSubmit={handleAddTodo}
										initialData={
											editingId ? todos.find((t) => t.id === editingId) : null
										}
										isLoading={isSaving}
										onCancel={handleCancel}
									/>
								</div>
							)}
							{!showForm && (
								<Button
									onClick={() => setShowForm(true)}
									className='w-full lg:w-full gradient-primary text-white font-semibold py-2 rounded-lg hover:shadow-accent flex items-center justify-center gap-2'>
									<Plus className='w-5 h-5' />
									New Task
								</Button>
							)}
						</div>

						{/* Todo List */}
						<div className='lg:col-span-2'>
							{/* Filter Tabs */}
							<div className='flex gap-3 mb-6'>
								{(["all", "active", "completed"] as FilterType[]).map((f) => (
									<button
										key={f}
										onClick={() => setFilter(f)}
										className={`px-4 py-2 rounded-lg font-medium transition-all ${
											filter === f
												? "bg-gradient-primary text-[#db366d] shadow-accent"
												: "bg-surface border border-border-light text-text-muted hover:text-text"
										}`}>
										{f.charAt(0).toUpperCase() + f.slice(1)}
									</button>
								))}
							</div>

							{/* Todos */}
							{isLoading ? (
								<div className='text-center py-12'>
									<div className='w-12 h-12 bg-gradient-primary rounded-full animate-spin mx-auto mb-4'></div>
									<p className='text-text-muted'>Loading tasks...</p>
								</div>
							) : filteredTodos.length === 0 ? (
								<div className='text-center py-12 bg-surface rounded-xl border-2 border-dashed border-border-light'>
									<p className='text-text-muted text-lg mb-2'>
										{filter === "all" &&
											"No tasks yet. Create one to get started!"}
										{filter === "active" && "No active tasks. Great job!"}
										{filter === "completed" && "No completed tasks yet."}
									</p>
								</div>
							) : (
								<div className='space-y-4'>
									{filteredTodos.map((todo) => (
										<TodoCard
											key={todo.id}
											id={todo.id}
											title={todo.title}
											description={todo.description}
											deadline={todo.deadline}
											tags={todo.tags}
											completed={todo.completed}
											onEdit={handleEditTodo}
											onDelete={handleDeleteTodo}
											onToggleComplete={handleToggleComplete}
										/>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<ConfirmModal
				isOpen={!!confirmDeleteId}
				title='Delete this task?'
				message='This action is irreversible. Are you sure you want to permanently delete this task?'
				confirmText='Delete'
				cancelText='Cancel'
				onCancel={() => setConfirmDeleteId(null)}
				onConfirm={async () => {
					if (!confirmDeleteId || !token) return;

					try {
						await deleteTodoApi(token, confirmDeleteId);
						setTodos(todos.filter((t) => t.id !== confirmDeleteId));
					} catch (err: any) {
						setError("Failed to delete todo");
					} finally {
						setConfirmDeleteId(null);
					}
				}}
			/>
		</ProtectedRoute>
	);
}
