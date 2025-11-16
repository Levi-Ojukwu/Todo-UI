/** @format */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { useAuth } from "@/lib/auth-context";
import { login as loginApi } from "@/lib/api";
import { PublicRoute } from "@/components/public-route";

export default function LoginPage() {
	const router = useRouter();
	const { login } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (data: any) => {
		setIsLoading(true);
		try {
			const result = await loginApi(data.email, data.password);
			login(result.user, result.token);
			router.push("/dashboard");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<PublicRoute>
			<div className='min-h-screen bg-gradient-to-br from-background to-surface flex items-center justify-center p-4'>
				<div className='w-full max-w-md'>
					{/* Header */}
					<div className='text-center mb-8'>
						<h1 className='text-4xl font-bold text-text mb-2'>Welcome Back</h1>
						<p className='text-text-muted'>
							Sign in to your account to continue
						</p>
					</div>

					{/* Card */}
					<div className='bg-surface rounded-2xl shadow-lg p-8 border border-border-light'>
						<AuthForm
							type='login'
							onSubmit={handleLogin}
							isLoading={isLoading}
						/>
					</div>

					{/* Footer */}
					<p className='text-center text-text-muted text-xs mt-6'>
						By signing in, you agree to our Terms of Service
					</p>
				</div>
			</div>
		</PublicRoute>
	);
}
