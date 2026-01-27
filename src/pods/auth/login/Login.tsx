import GoogleIcon from '@/assets/GoogleIcon';
import { Link, useNavigate } from 'react-router-dom';
import { loginFormSchema, type LoginFormFields } from './schema/login.schema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/shared/hooks/useAuth';
import { useEffect } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      await login(data, navigate);
    } catch (error) {
      console.error(error);
      setError('root', {
        message: (error as Error).message,
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/main/${user.id}/dashboard`, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      <section className="login min-h-screen flex items-center justify-center flex-col gap-6 bg-neutral-50/50">
        <div className="flex flex-col items-center gap-2">
          <h1 className="login-title text-4xl font-bold bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent leading-normal">
            Welcome Back
          </h1>
          <p className="text-neutral-500 text-sm">Please enter your details to sign in</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form flex w-md flex-col gap-5 items-center justify-center bg-white p-8 rounded-2xl shadow-sm border border-neutral-100"
        >
          <div className="email-input w-full flex flex-col gap-2">
            <label htmlFor="email" className="text-neutral-800 text-sm font-medium ml-1">Email Address</label>
            <input
              {...register('email')}
              id="email"
              className="border-b-2 outline-0 w-full focus:border-orange-500 border-neutral-200 text-neutral-600 px-1 py-2 transition-all duration-300 placeholder:text-neutral-300"
              placeholder="email@domain.com"
              autoComplete="off"
            />
            {errors.email && (
              <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>
            )}
          </div>

          <div className="password-input w-full flex flex-col gap-2">
            <label htmlFor="password" className="text-neutral-800 text-sm font-medium ml-1">Password</label>
            <input
              {...register('password')}
              id="password"
              type="password"
              className="border-b-2 outline-0 w-full focus:border-orange-500 border-neutral-200 text-neutral-600 px-1 py-2 transition-all duration-300 placeholder:text-neutral-300"
              placeholder="••••••"
              autoComplete="off"
            />
            {errors.password && (
              <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>
            )}
          </div>

          <div className="w-full flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="accent-orange-500 size-4 rounded border-neutral-300 cursor-pointer" />
              <span className="text-sm text-neutral-600 group-hover:text-neutral-800 transition-colors">Remember me</span>
            </label>
            <Link to="/auth/forgot-password" className="text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors">
              Forgot password?
            </Link>
          </div>

          {errors.root && (
            <span className="text-sm text-red-500 mt-1">{errors.root.message}</span>
          )}

          <button
            disabled={isSubmitting}
            className="bg-linear-to-r from-orange-400 to-orange-600 text-white font-semibold px-6 py-3 w-full cursor-pointer rounded-xl mt-2 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>

          <div className="flex items-center w-full gap-4 my-2">
            <div className="h-px bg-neutral-200 grow"></div>
            <span className="text-neutral-400 text-xs uppercase tracking-widest font-medium">or</span>
            <div className="h-px bg-neutral-200 grow"></div>
          </div>

          <button
            type="button"
            className="text-neutral-700 border border-neutral-200 px-6 py-2.5 w-full cursor-pointer rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all flex items-center justify-center gap-3 font-medium"
          >
            <GoogleIcon className="size-5" />
            <span>Sign in with Google</span>
          </button>

          <p className="text-neutral-500 text-sm mt-4">
            New here? <Link to="/auth/register" className="text-orange-500 font-bold hover:underline">Create an account</Link>
          </p>
        </form>
      </section>
    </>
  );
}
