/** @format */

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, Settings, Home } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ConfirmModal } from "./confirm-modal";

export function Navigation() {
	const router = useRouter();
	const { user, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	if (!user) return null;

	return (
		<nav className='bg-surface border-b border-border-light sticky top-0 z-50 shadow-sm'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo/Brand */}
					<Link
						href='/dashboard'
						className='flex items-center gap-2 font-bold text-xl'>
						<div className='w-8 h-8 bg-gradient-to-r from-gray-400 via-gray-300 to-[#d52f68] rounded-lg flex items-center justify-center text-white font-bold text-sm'>
							T
						</div>
						<span className='text-text'>TaskFlow</span>
					</Link>

					{/* Desktop Menu */}
					<div className='hidden md:flex items-center gap-6'>
						<Link
							href='/dashboard'
							className='flex items-center gap-2 text-text-muted hover:text-text transition-colors'>
							<Home className='w-4 h-4' />
							Dashboard
						</Link>
						<Link
							href='/profile'
							className='flex items-center gap-2 text-text-muted hover:text-text transition-colors'>
							<Settings className='w-4 h-4' />
							Profile
						</Link>
						<Button
							onClick={() => setShowLogoutConfirm(true)}
							variant='ghost'
							className='flex items-center gap-2 text-error hover:text-error/80'>
							<LogOut className='w-4 h-4' />
							Logout
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='md:hidden p-2 hover:bg-surface-secondary rounded-lg'>
						<Menu className='w-6 h-6 text-text' />
					</button>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className='md:hidden pb-4 space-y-2 border-t border-border-light pt-4'>
						<Link
							href='/dashboard'
							className='block px-4 py-2 text-text hover:bg-surface-secondary rounded-lg'
							onClick={() => setIsOpen(false)}>
							Dashboard
						</Link>
						<Link
							href='/profile'
							className='block px-4 py-2 text-text hover:bg-surface-secondary rounded-lg'
							onClick={() => setIsOpen(false)}>
							Profile
						</Link>
						<button
							onClick={() => setShowLogoutConfirm(true)}
							className='w-full text-left px-4 py-2 text-error hover:bg-error/5 rounded-lg'>
							Logout
						</button>
					</div>
				)}
			</div>

			<ConfirmModal
				isOpen={showLogoutConfirm}
				title='Logout?'
				message='Are you sure you want to logout? You will need to log in again.'
				confirmText='Logout'
				cancelText='Stay'
				onCancel={() => setShowLogoutConfirm(false)}
				onConfirm={() => {
					logout(); // your auth-context logout function
					setShowLogoutConfirm(false);
				}}
			/>
		</nav>
	);
}
