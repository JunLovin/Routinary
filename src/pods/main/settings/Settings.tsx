import { useAuth } from '@/shared/hooks/useAuth';
import { PaletteIcon, Shield, User } from 'lucide-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

interface SettingOption {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  action: () => void;
  active: boolean;
  disabled?: boolean;
}

export default function Settings() {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login', { replace: true });
    }
  }, [user, navigate]);

  const settingsOptions: SettingOption[] = [
    {
      label: 'Account',
      description: 'Manage your account information and preferences.',
      icon: <User />,
      action: () => {
        navigate(`/main/${user?.id}/settings/account`);
      },
      active: true,
    },
    {
      label: 'Appearance',
      description: 'Customize the look and feel of the application.',
      icon: <PaletteIcon />,
      action: () => {
        navigate(`/main/${user?.id}/settings/appearance`);
      },
      active: true,
      disabled: true,
    },
    {
      label: 'Security',
      description: 'Manage your security settings and preferences.',
      icon: <Shield />,
      action: () => {
        navigate(`/main/${user?.id}/settings/security`);
      },
      active: true,
      disabled: true,
    },
  ];

  return (
    <>
      <div className="settings-container w-full h-[92dvh] flex text-zinc-400 rounded-xl">
        <div className="settings-sidenav w-xs h-full flex flex-col gap-3 p-4 border border-zinc-800 rounded-xl bg-zinc-950">
          {settingsOptions.map((o) => (
            <div
              key={o.label}
              title={o.disabled ? 'Coming Soon' : o.description}
              role="button"
              tabIndex={0}
              className={`settings-option select-none w-full hover:bg-zinc-700 rounded-lg p-2.5 gap-2 font-semibold cursor-pointer hover:text-orange-500 hover:border-orange-500/30 transition-all flex items-center ${o.disabled ? '!cursor-not-allowed opacity-50' : ''}`}
              onClick={() => {
                if (o.disabled) return;
                o.action();
              }}
              aria-disabled={o.disabled}
              onKeyDown={(e) => {
                if (o.disabled) return;
                if (e.key === 'Enter' || e.key === ' ') {
                  o.action();
                }
              }}
            >
              <div className="settings-option-icon">{o.icon}</div>
              <div className="settings-option-content">
                <div className="settings-option-label">{o.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
