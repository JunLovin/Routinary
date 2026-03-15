import { useForm, type SubmitHandler } from 'react-hook-form';
import { accountFormSchema, type AccountFormFields } from './schema/account.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStore } from '@/shared/stores/user.store';
import { useState } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';

export default function Account() {
  const { token } = useAuth();

  const user = useUserStore((state) => state.user);

  const updateUser = useUserStore((state) => state.updateUser);

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AccountFormFields>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const handleEdit = () => setIsEditing(true);

  const onSubmit: SubmitHandler<AccountFormFields> = async (data) => {
    try {
      if (!user) {
        setError('root', {
          message: 'User not found. Please log in again.',
        });
        return;
      }

      if (!token) {
        setError('root', {
          message: 'Authentication token is missing. Please log in again.',
        });
        return;
      }

      await updateUser(user.id, token!, data);

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating account information:', error);
      setError('root', {
        message: (error as Error).message,
      });
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-zinc-100">Account Settings</h2>
        <p className="text-zinc-400">Manage your account information and preferences.</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <div className="flex items-center gap-4 justify-between w-full">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                {...register('name')}
                className="border-b-2 text-white outline-0 w-full focus:border-orange-500 border-neutral-700 read-only:text-neutral-600 px-1 py-2 transition-all duration-300 placeholder:text-neutral-300 bg-transparent"
                placeholder="Your Name"
                autoComplete="off"
                readOnly={!isEditing}
                id="name"
              />
              {errors.name && (
                <span className="text-sm text-red-500 mt-1">{errors.name.message}</span>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                {...register('email')}
                className="border-b-2 outline-0 w-full focus:border-orange-500 border-neutral-700 read-only:text-neutral-600 px-1 py-2 transition-all duration-300 placeholder:text-neutral-300 bg-transparent text-white"
                placeholder="email@example.com"
                autoComplete="off"
                readOnly={!isEditing}
                id="email"
              />
              {errors.email && (
                <span className="text-sm text-red-500 mt-1">{errors.email.message}</span>
              )}
            </div>
          </div>
          {!isEditing ? (
            <button
              type="button"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer transition-colors duration-300 disabled:bg-orange-300"
              onClick={handleEdit}
              disabled={isSubmitting}
            >
            Edit
            </button>
          ) : (
            <div className="flex items-center w-full *:w-1/2 gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer transition-colors duration-300 disabled:bg-orange-300"
                disabled={isSubmitting}
              >
                  Save Changes
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-orange-600 cursor-pointer transition-colors duration-300 disabled:bg-orange-300"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
              >
                  Cancel
              </button>

            </div>
          )}
        </form>
      </div>
    </>
  );
}
