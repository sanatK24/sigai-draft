import { SVGProps } from 'react';

declare module 'lucide-react' {
  interface SVGPropsWithRef extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
    ref?: React.Ref<SVGSVGElement>;
    'aria-hidden'?: boolean | 'false' | 'true';
  }

  interface LucideIconProps extends SVGPropsWithRef {
    className?: string;
    size?: number | string;
    strokeWidth?: number | string;
  }

  export interface LucideIcon extends React.ForwardRefExoticComponent<LucideIconProps> {}
  
  // Common icons used in the project
  export const ArrowUpRight: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Calendar: LucideIcon;
  export const Clock: LucideIcon;
  export const Home: LucideIcon;
  export const Info: LucideIcon;
  export const Link2: LucideIcon;
  export const MapPin: LucideIcon;
  export const Menu: LucideIcon;
  export const X: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const Mail: LucideIcon;
  export const Phone: LucideIcon;
  export const Instagram: LucideIcon;
  export const Linkedin: LucideIcon;
  export const Twitter: LucideIcon;
  export const Youtube: LucideIcon;
  export const Facebook: LucideIcon;
  export const Github: LucideIcon;
  export const Globe: LucideIcon;
  export const Check: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const Loader2: LucideIcon;
  export const Moon: LucideIcon;
  export const Sun: LucideIcon;
  export const User: LucideIcon;
  export const Users: LucideIcon;
  export const Search: LucideIcon;
  export const Settings: LucideIcon;
  export const Share2: LucideIcon;
  export const Star: LucideIcon;
  export const Tag: LucideIcon;
  export const ThumbsUp: LucideIcon;
  export const Trash2: LucideIcon;
  export const Twitter: LucideIcon;
  export const XCircle: LucideIcon;
  export const Youtube: LucideIcon;
  export const Zap: LucideIcon;
}
