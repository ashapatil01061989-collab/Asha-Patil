import React from "react";
import {
  Activity,
  Heart,
  ShieldAlert,
  Plane,
  LineChart,
  Users,
  Syringe,
  Video,
  Sparkles,
  Grid,
  Flame,
  Image,
  Droplet,
  Crown,
  Smile,
  TrendingUp,
  Shield,
  Wind,
  Award,
  Brain,
  Frown,
  Zap,
  Layers,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  CreditCard,
  Calendar,
  ArrowRight,
  Check,
  CheckCircle,
  Menu,
  X,
  Search,
  MessageSquare,
  Share2,
  Plus,
  Minus,
  Info,
  Lock,
  Accessibility,
  Coffee,
  Tv,
  Cpu,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CalendarCheck,
  ClipboardCopy,
  Gauge,
  Eye,
  BookOpen
} from "lucide-react";

interface MedicalIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const MedicalIcon: React.FC<MedicalIconProps> = ({ name, className = "w-5 h-5", size }) => {
  const iconProps = { className, size };

  switch (name.toLowerCase()) {
    case "activity":
      return <Activity {...iconProps} />;
    case "heart":
      return <Heart {...iconProps} />;
    case "shieldalert":
      return <ShieldAlert {...iconProps} />;
    case "plane":
      return <Plane {...iconProps} />;
    case "linechart":
      return <LineChart {...iconProps} />;
    case "users":
      return <Users {...iconProps} />;
    case "syringe":
      return <Syringe {...iconProps} />;
    case "video":
      return <Video {...iconProps} />;
    case "sparkles":
      return <Sparkles {...iconProps} />;
    case "grid":
      return <Grid {...iconProps} />;
    case "flame":
      return <Flame {...iconProps} />;
    case "image":
      return <Image {...iconProps} />;
    case "droplet":
      return <Droplet {...iconProps} />;
    case "crown":
      return <Crown {...iconProps} />;
    case "smile":
      return <Smile {...iconProps} />;
    case "trendingup":
      return <TrendingUp {...iconProps} />;
    case "shield":
      return <Shield {...iconProps} />;
    case "wind":
      return <Wind {...iconProps} />;
    case "award":
      return <Award {...iconProps} />;
    case "brain":
      return <Brain {...iconProps} />;
    case "frown":
      return <Frown {...iconProps} />;
    case "zap":
      return <Zap {...iconProps} />;
    case "layers":
      return <Layers {...iconProps} />;
    case "shieldcheck":
      return <ShieldCheck {...iconProps} />;
    case "star":
      return <Star {...iconProps} />;
    case "mappin":
      return <MapPin {...iconProps} />;
    case "phone":
      return <Phone {...iconProps} />;
    case "mail":
      return <Mail {...iconProps} />;
    case "clock":
      return <Clock {...iconProps} />;
    case "creditcard":
      return <CreditCard {...iconProps} />;
    case "calendar":
      return <Calendar {...iconProps} />;
    case "arrowright":
      return <ArrowRight {...iconProps} />;
    case "check":
      return <Check {...iconProps} />;
    case "checkcircle":
      return <CheckCircle {...iconProps} />;
    case "menu":
      return <Menu {...iconProps} />;
    case "x":
      return <X {...iconProps} />;
    case "search":
      return <Search {...iconProps} />;
    case "messagesquare":
      return <MessageSquare {...iconProps} />;
    case "share2":
      return <Share2 {...iconProps} />;
    case "plus":
      return <Plus {...iconProps} />;
    case "minus":
      return <Minus {...iconProps} />;
    case "info":
      return <Info {...iconProps} />;
    case "lock":
      return <Lock {...iconProps} />;
    case "accessibility":
      return <Accessibility {...iconProps} />;
    case "coffee":
      return <Coffee {...iconProps} />;
    case "tv":
      return <Tv {...iconProps} />;
    case "cpu":
      return <Cpu {...iconProps} />;
    case "chevronplay":
      return <PlayIcon {...iconProps} />;
    case "chevronup":
      return <ChevronUp {...iconProps} />;
    case "chevrondown":
      return <ChevronDown {...iconProps} />;
    case "chevronleft":
      return <ChevronLeft {...iconProps} />;
    case "chevronright":
      return <ChevronRight {...iconProps} />;
    case "alertcircle":
      return <AlertCircle {...iconProps} />;
    case "calendarcheck":
      return <CalendarCheck {...iconProps} />;
    case "clipboardcopy":
      return <ClipboardCopy {...iconProps} />;
    case "gauge":
      return <Gauge {...iconProps} />;
    case "eye":
      return <Eye {...iconProps} />;
    case "bookopen":
      return <BookOpen {...iconProps} />;
    default:
      return <Activity {...iconProps} />;
  }
};

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
    {...props}
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);
