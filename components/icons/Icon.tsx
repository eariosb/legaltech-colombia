import type { CSSProperties } from "react";
import {
  SlArrowDown,
  SlArrowLeft,
  SlArrowRight,
  SlArrowRightCircle,
  SlArrowUp,
  SlBadge,
  SlBookOpen,
  SlBriefcase,
  SlBulb,
  SlCalender,
  SlCamera,
  SlChart,
  SlCheck,
  SlChemistry,
  SlClock,
  SlClose,
  SlCompass,
  SlControlPlay,
  SlCursor,
  SlDirections,
  SlDoc,
  SlDocs,
  SlDrawer,
  SlEnergy,
  SlEnvelopeOpen,
  SlExclamation,
  SlEye,
  SlEyeglass,
  SlFlag,
  SlFrame,
  SlGlobe,
  SlGraph,
  SlGrid,
  SlHandbag,
  SlHeart,
  SlHome,
  SlInfo,
  SlKey,
  SlLayers,
  SlLike,
  SlList,
  SlLocationPin,
  SlLock,
  SlLockOpen,
  SlMagnifier,
  SlMap,
  SlMenu,
  SlMinus,
  SlNote,
  SlNotebook,
  SlOrganization,
  SlPeople,
  SlPencil,
  SlPin,
  SlPlus,
  SlPuzzle,
  SlQuestion,
  SlRefresh,
  SlRocket,
  SlScreenDesktop,
  SlSettings,
  SlShield,
  SlSpeech,
  SlStar,
  SlSupport,
  SlTag,
  SlTarget,
  SlUser,
  SlUserFollowing,
  SlWrench,
} from "react-icons/sl";
import type { IconType } from "react-icons";

/**
 * Registro central de íconos Simple Line.
 * Cualquier componente o archivo de datos se refiere a un ícono
 * por su `IconName` (string corto y semántico). El registry lo
 * traduce a un componente SVG de `react-icons/sl`.
 */
export type IconName =
  | "arrow-down"
  | "arrow-left"
  | "arrow-right"
  | "arrow-right-circle"
  | "arrow-up"
  | "badge"
  | "book"
  | "briefcase"
  | "bulb"
  | "calendar"
  | "camera"
  | "chart"
  | "check"
  | "chemistry"
  | "clock"
  | "close"
  | "compass"
  | "control-play"
  | "cursor"
  | "directions"
  | "doc"
  | "docs"
  | "drawer"
  | "energy"
  | "envelope"
  | "exclamation"
  | "eye"
  | "eyeglass"
  | "flag"
  | "frame"
  | "globe"
  | "graph"
  | "grid"
  | "handbag"
  | "heart"
  | "home"
  | "info"
  | "key"
  | "layers"
  | "like"
  | "list"
  | "location"
  | "lock"
  | "lock-open"
  | "magnifier"
  | "map"
  | "menu"
  | "minus"
  | "note"
  | "notebook"
  | "organization"
  | "people"
  | "pencil"
  | "pin"
  | "plus"
  | "puzzle"
  | "question"
  | "refresh"
  | "rocket"
  | "screen"
  | "settings"
  | "shield"
  | "speech"
  | "star"
  | "support"
  | "tag"
  | "target"
  | "user"
  | "user-following"
  | "wrench";

const REGISTRY: Record<IconName, IconType> = {
  "arrow-down": SlArrowDown,
  "arrow-left": SlArrowLeft,
  "arrow-right": SlArrowRight,
  "arrow-right-circle": SlArrowRightCircle,
  "arrow-up": SlArrowUp,
  badge: SlBadge,
  book: SlBookOpen,
  briefcase: SlBriefcase,
  bulb: SlBulb,
  calendar: SlCalender,
  camera: SlCamera,
  chart: SlChart,
  check: SlCheck,
  chemistry: SlChemistry,
  clock: SlClock,
  close: SlClose,
  compass: SlCompass,
  "control-play": SlControlPlay,
  cursor: SlCursor,
  directions: SlDirections,
  doc: SlDoc,
  docs: SlDocs,
  drawer: SlDrawer,
  energy: SlEnergy,
  envelope: SlEnvelopeOpen,
  exclamation: SlExclamation,
  eye: SlEye,
  eyeglass: SlEyeglass,
  flag: SlFlag,
  frame: SlFrame,
  globe: SlGlobe,
  graph: SlGraph,
  grid: SlGrid,
  handbag: SlHandbag,
  heart: SlHeart,
  home: SlHome,
  info: SlInfo,
  key: SlKey,
  layers: SlLayers,
  like: SlLike,
  list: SlList,
  location: SlLocationPin,
  lock: SlLock,
  "lock-open": SlLockOpen,
  magnifier: SlMagnifier,
  map: SlMap,
  menu: SlMenu,
  minus: SlMinus,
  note: SlNote,
  notebook: SlNotebook,
  organization: SlOrganization,
  people: SlPeople,
  pencil: SlPencil,
  pin: SlPin,
  plus: SlPlus,
  puzzle: SlPuzzle,
  question: SlQuestion,
  refresh: SlRefresh,
  rocket: SlRocket,
  screen: SlScreenDesktop,
  settings: SlSettings,
  shield: SlShield,
  speech: SlSpeech,
  star: SlStar,
  support: SlSupport,
  tag: SlTag,
  target: SlTarget,
  user: SlUser,
  "user-following": SlUserFollowing,
  wrench: SlWrench,
};

export interface IconProps {
  name: IconName;
  /** Tamaño en px. Default 16 — tipografía sobria. */
  size?: number;
  /** Color del trazo (monocromo por defecto). */
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** Aria-label opcional; si no viene, el ícono es decorativo. */
  label?: string;
}

/**
 * Renderiza un ícono Simple Line monocromático.
 * El color por defecto hereda del `currentColor` del contenedor;
 * basta con fijar `color` en el padre para teñir todos los íconos.
 */
export function Icon({
  name,
  size = 16,
  color,
  className,
  style,
  label,
}: IconProps) {
  const Component = REGISTRY[name];
  if (!Component) return null;
  return (
    <Component
      size={size}
      color={color}
      className={className}
      style={style}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  );
}
