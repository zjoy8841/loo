import { Home, Layers, Dumbbell, User } from 'lucide-react';

interface BottomNavProps {
  activeTab?: string;
}

export function BottomNav({ activeTab = 'home' }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white h-20 flex items-center justify-around px-4 shadow-[0_-2px_16px_rgba(0,0,0,0.06)]">
      <NavItem icon={<Home className="w-6 h-6" />} label="홈" active={activeTab === 'home'} />
      <NavItem icon={<Layers className="w-6 h-6" />} label="장면" active={activeTab === 'scenes'} />

      {/* AI Lion - Center elevated */}
      <div className="relative -top-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5B5FE0] to-[#7C7FE8] flex items-center justify-center shadow-[0_4px_16px_rgba(91,95,224,0.3)]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6B6FE8] to-[#8C8FEE] flex items-center justify-center">
            <span className="text-white text-xl">🦁</span>
          </div>
        </div>
      </div>

      <NavItem icon={<Dumbbell className="w-6 h-6" />} label="코치" active={activeTab === 'coach'} />
      <NavItem icon={<User className="w-6 h-6" />} label="나" active={activeTab === 'profile'} />
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <button className="flex flex-col items-center gap-1 min-w-[48px]">
      <div className={active ? 'text-[#5B5FE0]' : 'text-[#8A93A3]'}>
        {icon}
      </div>
      <span className={`text-xs ${active ? 'text-[#5B5FE0]' : 'text-[#8A93A3]'}`}>
        {label}
      </span>
    </button>
  );
}
