import GoogleIcon from '@/assets/GoogleIcon';
import { Link } from 'react-router-dom';
import { registerFormSchema, type RegisterFormFields } from './schema/register.schema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Register() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError('root', { type: 'server', message: errorData.message || 'Registration failed' });
        return;
      }

      const responseData = await response.json();
      console.log('Registration successful:', responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="register min-h-screen flex items-center justify-center flex-col gap-6 bg-neutral-50/50">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="register-title text-4xl font-bold bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent leading-normal">
            Create Account
          </h1>
          <p className="text-neutral-500 text-sm">Join us and start your journey today</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="register-form flex w-md flex-col gap-5 items-center justify-center bg-white p-8 rounded-2xl shadow-sm border border-neutral-100"
        >
          <div className="name-input w-full flex flex-col gap-2">
            <label htmlFor="name" className="text-neutral-800 text-sm font-medium ml-1">Full Name</label>
            <input
              {...register('name')}
              id="name"
              type="text"
              className="border-b-2 outline-0 w-full focus:border-orange-500 border-neutral-200 text-neutral-600 px-1 py-2 transition-all duration-300 placeholder:text-neutral-300"
              placeholder="John Doe"
            />
            {errors.name && (
              <span className="text-sm text-red-500 mt-1">{errors.name.message}</span>
            )}
          </div>

          <div className="email-input w-full flex flex-col gap-2">
            <label htmlFor="email" className="text-neutral-800 text-sm font-medium ml-1">Email Address</label>
            <input
              {...register('email')}
              id="email"
              type="email"
              className="border-b-2 outline-0 w-full focus:border-orange-500 border-neutral-200 text-neutral-600 px-1 py-2 transition-all duration-300 placeholder:text-neutral-300"
              placeholder="email@domain.com"
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
            />
            {errors.password && (
              <span className="text-sm text-red-500 mt-1">{errors.password.message}</span>
            )}
          </div>

          <div className="confirm-password-input w-full flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-neutral-800 text-sm font-medium ml-1">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              id="confirmPassword"
              type="password"
              className="border-b-2 outline-0 w-full focus:border-orange-500 border-neutral-200 text-neutral-600 px-1 py-2 transition-all duration-300 placeholder:text-neutral-300"
              placeholder="••••••"
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</span>
            )}
          </div>

          {errors.root && (
            <div className="w-full p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center">
              {errors.root.message}
            </div>
          )}

          <button
            disabled={isSubmitting}
            className="bg-linear-to-r from-orange-400 to-orange-600 text-white font-semibold px-6 py-3 w-full cursor-pointer rounded-xl mt-2 hover:shadow-lg hover:shadow-orange-200 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
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
            <span>Sign up with Google</span>
          </button>

          <p className="text-neutral-500 text-sm mt-4">
            Already have an account? <Link to="/auth/login" className="text-orange-500 font-bold hover:underline">Log In</Link>
          </p>
        </form>
      </section>
    </>
  );
}
