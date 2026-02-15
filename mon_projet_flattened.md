

// path: components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}

```


// path: eslint.config.js
```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);

```


// path: index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/images/logo-wplanner.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>W Planner – Exploiter · Décider · Fiabiliser</title>
    <meta name="description" content="W Planner – Gestion planning CNPE Bugey IEG HABA">
    <meta name="author" content="W Planner" />

    <!-- TODO: Update og:title to match your application name -->
    
    
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/s3yJMwuSG2SXKvlTrO30U4zS1nV2/social-images/social-1769117276857-téléchargement.jfif">

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Lovable" />
    <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/s3yJMwuSG2SXKvlTrO30U4zS1nV2/social-images/social-1769117276857-téléchargement.jfif">
    <meta property="og:title" content="W Planner – Exploiter · Décider · Fiabiliser">
  <meta name="twitter:title" content="W Planner – Exploiter · Décider · Fiabiliser">
  <meta property="og:description" content="W Planner – Gestion planning CNPE Bugey IEG HABA">
  <meta name="twitter:description" content="W Planner – Gestion planning CNPE Bugey IEG HABA">
</head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```


// path: package.json
```json
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toast": "^1.2.14",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@tanstack/react-query": "^5.83.0",
    "@types/dompurify": "^3.2.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "dompurify": "^3.3.1",
    "embla-carousel-react": "^8.6.0",
    "idb": "^8.0.1",
    "input-otp": "^1.4.2",
    "jspdf": "^4.1.0",
    "lucide-react": "^0.462.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.61.1",
    "react-resizable-panels": "^2.1.9",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^22.16.5",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react-swc": "^3.11.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.32.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "lovable-tagger": "^1.1.13",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.38.0",
    "vite": "^5.4.19"
  }
}

```


// path: postcss.config.js
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```


// path: src/App.css
```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```


// path: src/App.tsx
```ts
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

```


// path: src/components/Calendar/ArretBar.tsx
```ts
import { useMemo } from 'react';
import { Arret, CalendarSettings } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  differenceInDays,
  format,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { getArretColor } from '@/lib/trancheColors';
interface ArretBarProps {
  arrets: Arret[];
  currentDate: Date;
  settings: CalendarSettings;
}

export function ArretBar({ arrets, currentDate, settings }: ArretBarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const arretBars = useMemo(() => {
    return arrets
      .filter(arret => arret.startDate <= monthEnd && arret.endDate >= monthStart)
      .map(arret => {
        const displayStart = arret.startDate < monthStart ? monthStart : arret.startDate;
        const displayEnd = arret.endDate > monthEnd ? monthEnd : arret.endDate;
        
        const startDayIndex = differenceInDays(displayStart, monthStart);
        const endDayIndex = differenceInDays(displayEnd, monthStart);
        const width = endDayIndex - startDayIndex + 1;
        
        return {
          ...arret,
          startIndex: startDayIndex,
          width,
        };
      });
  }, [arrets, monthStart, monthEnd]);

  if (arretBars.length === 0) return null;

  return (
    <div className="mb-4 bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-2 bg-arret/10 border-b border-border flex items-center gap-2">
        <span className="text-lg">🔧</span>
        <h3 className="text-sm font-semibold text-foreground">Arrêts de Tranches</h3>
      </div>
      
      <div className="p-4">
        <div className="relative">
          {/* Grid background */}
          <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${daysInMonth.length}, 1fr)` }}>
            {daysInMonth.map((day, index) => (
              <div 
                key={index} 
                className="h-4 bg-muted/30 text-[8px] text-muted-foreground text-center"
              >
                {format(day, 'd')}
              </div>
            ))}
          </div>

          {/* Arret bars */}
          <div className="mt-2 space-y-1">
            {arretBars.map(arret => (
              <div
                key={arret.id}
                className="relative h-7"
              >
                <div
                  className={cn(
                    "absolute h-full rounded-full flex items-center justify-center px-3 text-xs font-medium text-white shadow-sm overflow-hidden",
                    arret.type === 'prepa' && 'pattern-dots'
                  )}
                  style={{
                    left: `${(arret.startIndex / daysInMonth.length) * 100}%`,
                    width: `${(arret.width / daysInMonth.length) * 100}%`,
                    backgroundColor: arret.color || getArretColor(arret, settings),
                  }}
                  title={`${arret.name} (${arret.tranche})`}
                >
                  <span className="truncate text-[11px]">
                    {arret.type === 'prepa' ? '⚙️ ' : ''}{arret.name} ({arret.tranche})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/ArretRow.tsx
```ts
import { useMemo } from 'react';
import { Arret, CalendarSettings } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isWithinInterval,
  differenceInDays,
  format,
} from 'date-fns';
import { cn } from '@/lib/utils';
import { getArretColor } from '@/lib/trancheColors';

interface ArretRowProps {
  arrets: Arret[];
  currentDate: Date;
  settings: CalendarSettings;
}

export function ArretRow({ arrets, currentDate, settings }: ArretRowProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate position and width for each arret
  const arretBars = useMemo(() => {
    return arrets
      .filter(arret => arret.startDate <= monthEnd && arret.endDate >= monthStart)
      .map(arret => {
        const displayStart = arret.startDate < monthStart ? monthStart : arret.startDate;
        const displayEnd = arret.endDate > monthEnd ? monthEnd : arret.endDate;
        
        const startDayIndex = differenceInDays(displayStart, monthStart);
        const endDayIndex = differenceInDays(displayEnd, monthStart);
        const width = endDayIndex - startDayIndex + 1;
        
        return {
          ...arret,
          startIndex: startDayIndex,
          width,
        };
      });
  }, [arrets, monthStart, monthEnd]);

  if (arretBars.length === 0) return null;

  return (
    <div className="mt-4 bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-2 bg-muted border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Arrêts de Tranches</h3>
      </div>
      
      <div className="p-4">
        <div className="relative">
          {/* Grid background */}
          <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${daysInMonth.length}, 1fr)` }}>
            {daysInMonth.map((day, index) => (
              <div 
                key={index} 
                className="h-4 bg-muted/50 text-[8px] text-muted-foreground text-center"
              >
                {format(day, 'd')}
              </div>
            ))}
          </div>

          {/* Arret bars */}
          <div className="mt-2 space-y-2">
            {arretBars.map(arret => (
              <div
                key={arret.id}
                className="relative h-8"
              >
                <div
                  className={cn(
                    'absolute h-full rounded-md flex items-center px-2 text-xs font-medium text-white shadow-sm transition-transform hover:scale-[1.02]',
                    arret.type === 'prepa' && 'pattern-dots'
                  )}
                  style={{
                    left: `${(arret.startIndex / daysInMonth.length) * 100}%`,
                    width: `${(arret.width / daysInMonth.length) * 100}%`,
                    backgroundColor: arret.color || getArretColor(arret, settings),
                  }}
                  title={`${arret.name} (${arret.tranche})`}
                >
                  <span className="truncate">
                    {arret.type === 'prepa' ? '⚙️ ' : '🔧 '}{arret.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/CalendarGrid.tsx
```ts
import { useMemo } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  getWeek,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { DayCell } from './DayCell';
import { WeekHeader } from './WeekHeader';
import { CalendarSettings, Astreinte, Holiday, Vacation, CalendarEvent, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  currentDate: Date;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  arrets: Arret[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  getConflictDetails: (date: Date, astreintes: Astreinte[]) => string[];
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onDayClick?: (date: Date) => void;
}

export function CalendarGrid({
  currentDate,
  settings,
  astreintes,
  arrets,
  isAstreinteDay,
  hasConflict,
  getConflictDetails,
  isHoliday,
  isVacationDay,
  isArretDay,
  getEventsForDate,
  isDateCancelled,
  onDayClick,
}: CalendarGridProps) {
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  // Group days by weeks
  const weeks = useMemo(() => {
    const result: Date[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  return (
    <div className="bg-card rounded-xl border border-border shadow-card-elevated overflow-hidden">
      <WeekHeader settings={settings} />
      
      <div className="divide-y divide-calendar-grid">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex">
            {/* Week number */}
            <div 
              className="w-10 flex items-center justify-center text-xs font-medium border-r border-calendar-grid"
              style={{ backgroundColor: settings.weekNumberBgColor, color: settings.weekNumberTextColor }}
            >
              S{getWeek(week[0], { locale: fr, weekStartsOn: 1 })}
            </div>
            
            {/* Days */}
            <div className="flex-1 grid grid-cols-7">
              {week.map((day, dayIndex) => {
                const isCurrentMonth = isSameMonth(day, currentDate);
                
                if (!isCurrentMonth) {
                  return (
                    <div 
                      key={dayIndex} 
                      className="min-h-[100px] bg-muted/30 border-r border-calendar-grid last:border-r-0"
                      style={{ backgroundColor: settings.dayCellBgColor }}
                    />
                  );
                }

                return (
                  <DayCell
                    key={dayIndex}
                    date={day}
                    events={getEventsForDate(day)}
                    astreinte={isAstreinteDay(day, astreintes)}
                    holiday={isHoliday(day)}
                    vacation={isVacationDay(day)}
                    arret={isArretDay(day)}
                    hasConflict={hasConflict(day, astreintes)}
                    cancelledInfo={isDateCancelled(day)}
                    conflictDetails={getConflictDetails(day, astreintes)}
                    settings={settings}
                    onClick={() => onDayClick?.(day)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/CalendarHeader.tsx
```ts
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  viewMode?: 'year' | 'month';
  onViewModeChange?: (mode: 'year' | 'month') => void;
}

export function CalendarHeader({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth, 
  onToday,
  viewMode = 'year',
  onViewModeChange,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <h1 className="text-lg sm:text-2xl font-bold text-foreground capitalize">
            {viewMode === 'year' 
              ? currentDate.getFullYear()
              : format(currentDate, 'MMMM yyyy', { locale: fr })
            }
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
        {/* View mode toggle */}
        {onViewModeChange && (
          <div className="flex items-center rounded-lg border border-border bg-card mr-1 sm:mr-2">
            <Button 
              variant={viewMode === 'year' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('year')}
              className="rounded-r-none gap-1 text-xs sm:text-sm px-2 sm:px-3 h-8"
            >
              <LayoutGrid className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Année</span>
            </Button>
            <Button 
              variant={viewMode === 'month' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('month')}
              className="rounded-l-none gap-1 text-xs sm:text-sm px-2 sm:px-3 h-8"
            >
              <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Mois</span>
            </Button>
          </div>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToday}
          className="text-xs sm:text-sm font-medium px-2 sm:px-3 h-8"
        >
          <span className="hidden sm:inline">Aujourd'hui</span>
          <span className="sm:hidden">Auj.</span>
        </Button>
        <div className="flex items-center rounded-lg border border-border bg-card">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrevMonth}
            className="rounded-r-none h-8 w-8"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNextMonth}
            className="rounded-l-none h-8 w-8"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```


// path: src/components/Calendar/CollapsibleSection.tsx
```ts
import { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultExpanded = true,
  className,
}: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={cn("bg-card rounded-xl border border-border shadow-sm overflow-hidden", className)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors touch-manipulation"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        expanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        {children}
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/DayCell.tsx
```ts
import { useMemo } from 'react';
import { format, isToday, isWeekend, getDay } from 'date-fns';
import { CalendarEvent, Holiday, Vacation, Astreinte, CalendarSettings, PatternType, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { getArretColor } from '@/lib/trancheColors';
import { AlertTriangle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DayCellProps {
  date: Date;
  events: CalendarEvent[];
  astreinte: Astreinte | null;
  holiday: Holiday | null;
  vacation: Vacation | null;
  arret: Arret | null;
  hasConflict: boolean;
  cancelledInfo: CancelledAstreinteDate | null;
  conflictDetails: string[];
  settings: CalendarSettings;
  onClick?: () => void;
}

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
  diagonal: 'pattern-diagonal',
  grid: 'pattern-grid',
  zigzag: 'pattern-zigzag',
};

export function DayCell({
  date,
  events,
  astreinte,
  holiday,
  vacation,
  arret,
  hasConflict,
  cancelledInfo,
  conflictDetails,
  settings,
  onClick,
}: DayCellProps) {
  const isWeekendDay = isWeekend(date);
  const isTodayDate = isToday(date);
  const dayNumber = format(date, 'd');

  const cellStyle = useMemo(() => {
    // Si la date est annulée spécifiquement
    if (cancelledInfo) {
      return {
        backgroundColor: settings.astreinteCancelledColor,
        color: '#fff',
      };
    }
    if (astreinte && !astreinte.isCancelled) {
      return {
        backgroundColor: astreinte.isPonctuelle 
          ? settings.astreintePonctuelleColor 
          : settings.astreinteColor,
        color: '#fff',
      };
    }
    if (astreinte && astreinte.isCancelled) {
      return {
        backgroundColor: settings.astreinteCancelledColor,
        color: '#fff',
      };
    }
    return {};
  }, [astreinte, cancelledInfo, settings]);

  const patternClass = useMemo(() => {
    if (cancelledInfo || astreinte?.isCancelled) {
      return patternClasses[settings.astreinteCancelledPattern];
    }
    if (holiday) {
      return patternClasses[settings.holidayPattern];
    }
    return '';
  }, [astreinte, cancelledInfo, holiday, settings]);

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative min-h-[100px] p-2 border-r border-b border-calendar-grid cursor-pointer transition-all duration-200',
        'hover:shadow-calendar-hover hover:z-10',
        isWeekendDay && 'bg-calendar-weekend',
        isTodayDate && 'bg-calendar-today ring-2 ring-primary ring-inset',
        patternClass
      )}
      style={cellStyle}
    >
      {/* Vacation indicator - top banner */}
      {vacation && (
        <div 
          className="absolute top-0 left-0 right-0 h-1.5 rounded-b-sm"
          style={{ backgroundColor: settings.vacationColor }}
          title={vacation.name}
        />
      )}

      {/* Arret indicator - second top banner */}
      {arret && (
        <div 
          className={cn(
            "absolute left-0 right-0 h-1.5 rounded-b-sm",
            arret.type === 'prepa' && 'opacity-70'
          )}
          style={{ 
            top: vacation ? '6px' : '0px',
            backgroundColor: arret.color || getArretColor(arret, settings) 
          }}
          title={`${arret.name} (${arret.tranche})`}
        />
      )}

      {/* Day number */}
      <div className={cn(
        'flex items-center justify-between mb-1',
        holiday && 'font-bold',
        (vacation || arret) && 'mt-2'
      )}>
        <span className={cn(
          'text-sm font-medium',
          isTodayDate && 'text-primary',
          holiday && 'text-holiday font-bold',
          astreinte && !astreinte.isCancelled && 'text-white',
          astreinte?.isCancelled && 'text-white/80'
        )}>
          {dayNumber}
        </span>
        
        {/* Conflict warning with popover */}
        {hasConflict && (
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="Voir les détails du conflit"
                onPointerDownCapture={(e) => {
                  e.stopPropagation();
                }}
                onClickCapture={(e) => {
                  e.stopPropagation();
                }}
                onPointerDown={(e) => {
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="animate-pulse-soft hover:scale-110 transition-transform"
              >
                <AlertTriangle className="w-4 h-4 text-destructive drop-shadow-md" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3 bg-destructive/10 border-destructive/30">
              <div className="space-y-2">
                <h4 className="font-semibold text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Conflit détecté !
                </h4>
                <div className="text-sm text-foreground space-y-1">
                  {conflictDetails.length > 0 ? (
                    conflictDetails.map((detail, idx) => (
                      <p key={idx} className="flex items-start gap-2">
                        <span className="text-destructive">•</span>
                        {detail}
                      </p>
                    ))
                  ) : (
                    <p>Un événement est en conflit avec l'astreinte.</p>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Holiday name */}
      {holiday && (
        <div className={cn(
          'font-bold text-holiday mb-1 truncate text-center',
          astreinte && !astreinte.isCancelled && 'text-white/90'
        )} style={{ fontSize: '0.65rem' }}>
          {holiday.name}
        </div>
      )}

      {/* Events */}
      <div className="space-y-1">
        {events.slice(0, 3).map(event => (
          <div
            key={event.id}
            className="px-1 py-0.5 rounded truncate font-bold text-center"
            style={{ 
              backgroundColor: event.color,
              color: '#fff',
              fontSize: '0.65rem',
            }}
            title={event.name}
          >
            {event.name}
          </div>
        ))}
        {events.length > 3 && (
          <div className="text-xs text-muted-foreground">
            +{events.length - 3} autres
          </div>
        )}
      </div>

      {/* Astreinte indicator */}
      {astreinte && !astreinte.isCancelled && (
        <div className={cn(
          'absolute bottom-1 right-1 text-[10px] font-semibold px-1 rounded',
          astreinte.isPonctuelle ? 'bg-white/20' : 'bg-white/20'
        )}>
          {astreinte.isPonctuelle 
            ? (astreinte.name || 'AST.') 
            : 'Astreinte'}
        </div>
      )}

      {/* Cancelled date info */}
      {cancelledInfo && (
        <div className="absolute bottom-1 left-1 right-1 text-[9px] font-semibold px-1 rounded bg-white/20">
          <span className="line-through">Annulée</span>
          {cancelledInfo.name && (
            <span className="block truncate opacity-80">{cancelledInfo.name}</span>
          )}
        </div>
      )}

      {astreinte?.isCancelled && !cancelledInfo && (
        <div className="absolute bottom-1 left-1 right-1 text-[9px] font-semibold px-1 rounded bg-white/20">
          <span className="line-through">Annulée</span>
          {astreinte.name && (
            <span className="block truncate opacity-80">{astreinte.name}</span>
          )}
        </div>
      )}
    </div>
  );
}

```


// path: src/components/Calendar/DayDetails.tsx
```ts
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { X, Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { CalendarEvent, Astreinte, Holiday, Vacation, Arret, CalendarSettings, CancelledAstreinteDate } from '@/types/calendar';
import { DayTimeline } from './DayTimeline';

interface DayDetailsProps {
  date: Date | null;
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: () => void;
  events: CalendarEvent[];
  astreinte: Astreinte | null;
  holiday: Holiday | null;
  vacation: Vacation | null;
  arret: Arret | null;
  arrets?: Arret[];
  cancelled: CancelledAstreinteDate | null;
  settings: CalendarSettings;
  reDay?: CalendarEvent | null;
}

export function DayDetails({
  date,
  isOpen,
  onClose,
  onAddEvent,
  events,
  astreinte,
  holiday,
  vacation,
  arret,
  arrets,
  cancelled,
  settings,
}: DayDetailsProps) {
  if (!date) return null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-border pb-3">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg capitalize">
              {format(date, 'EEEE d MMMM yyyy', { locale: fr })}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <X className="w-5 h-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="p-3 overflow-y-auto flex-1">
          {/* Timeline view 5h-21h */}
          <DayTimeline
            date={date}
            events={events}
            astreinte={astreinte}
            holiday={holiday}
            vacation={vacation}
            arret={arret}
            arrets={arrets}
            cancelled={cancelled}
            settings={settings}
          />

          {/* Add Event Button */}
          <Button 
            onClick={onAddEvent}
            className="w-full h-11 rounded-xl text-base font-medium mt-4"
          >
            Ajouter un événement
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

```


// path: src/components/Calendar/DayTimeline.tsx
```ts
import { useMemo } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Astreinte, Holiday, Vacation, Arret, CalendarSettings, CancelledAstreinteDate } from '@/types/calendar';
import { getArretColor } from '@/lib/trancheColors';
import { isSameDay, isWithinInterval } from 'date-fns';
import { cn } from '@/lib/utils';

interface DayTimelineProps {
  date: Date;
  events: CalendarEvent[];
  astreinte: Astreinte | null;
  holiday: Holiday | null;
  vacation: Vacation | null;
  arret: Arret | null;
  arrets?: Arret[];
  cancelled: CancelledAstreinteDate | null;
  settings: CalendarSettings;
}

const START_HOUR = 5;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR; // 16 hours
const HOUR_HEIGHT = 48; // px per hour

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + (m || 0);
}

function getTopAndHeight(startTime?: string, endTime?: string): { top: number; height: number } {
  const startMinutes = startTime ? timeToMinutes(startTime) : START_HOUR * 60;
  const endMinutes = endTime ? timeToMinutes(endTime) : END_HOUR * 60;
  
  const clampedStart = Math.max(startMinutes, START_HOUR * 60);
  const clampedEnd = Math.min(endMinutes, END_HOUR * 60);
  
  const top = ((clampedStart - START_HOUR * 60) / (TOTAL_HOURS * 60)) * (TOTAL_HOURS * HOUR_HEIGHT);
  const height = Math.max(((clampedEnd - clampedStart) / (TOTAL_HOURS * 60)) * (TOTAL_HOURS * HOUR_HEIGHT), HOUR_HEIGHT / 2);
  
  return { top, height };
}

export function DayTimeline({
  date,
  events,
  astreinte,
  holiday,
  vacation,
  arret,
  arrets = [],
  cancelled,
  settings,
}: DayTimelineProps) {
  const hours = useMemo(() => {
    return Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => START_HOUR + i);
  }, []);

  const hasActiveAstreinte = astreinte && !astreinte.isCancelled && !cancelled;

  // Find prépa modules active on this day
  const prepaModules = useMemo(() => {
    return arrets.filter(a => 
      a.type === 'prepa' && (
        isSameDay(date, a.startDate) || isSameDay(date, a.endDate) ||
        isWithinInterval(date, { start: a.startDate, end: a.endDate })
      )
    );
  }, [arrets, date]);

  // Astreinte positioning (default 8h-8h but clamped to view)
  const astreintePosition = useMemo(() => {
    if (!hasActiveAstreinte) return null;
    // Astreintes run 24h (jeudi 8h → jeudi suivant 7h59), so cover full visible range
    return getTopAndHeight('05:00', '21:00');
  }, [hasActiveAstreinte]);

  return (
    <div className="relative">
      {/* Day header */}
      <div className="flex items-center gap-2 mb-3 px-2">
        <span className="text-lg font-bold text-foreground">
          {format(date, 'EEEE d MMMM yyyy', { locale: fr })}
        </span>
        {holiday && (
          <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive font-medium">
            {holiday.name}
          </span>
        )}
      </div>

      {/* Context badges */}
      <div className="flex gap-2 mb-3 px-2">
        {vacation && (
          <span className="text-xs px-2 py-0.5 rounded font-medium" style={{ backgroundColor: settings.vacationColor, color: settings.vacationTextColor || '#2D2A00' }}>
            {vacation.name}
          </span>
        )}
        {arret && (
          <span className="text-xs px-2 py-0.5 rounded text-white font-medium" style={{ backgroundColor: arret.color || settings.arretTr2Color }}>
            {arret.name} ({arret.tranche})
          </span>
        )}
        {prepaModules.map(prepa => (
          <span key={prepa.id} className="text-xs px-2 py-0.5 rounded text-white font-medium" style={{ backgroundColor: getArretColor(prepa, settings) }}>
            {prepa.module || prepa.name} ({prepa.tranche})
          </span>
        ))}
        {cancelled && (
          <span className="text-xs px-2 py-0.5 rounded text-white font-medium" style={{ backgroundColor: settings.astreinteCancelledColor }}>
            Annulée — {cancelled.name}
          </span>
        )}
      </div>

      {/* Timeline grid */}
      <div className="relative border border-border rounded-lg overflow-hidden bg-card" style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}>
        {/* Hour lines */}
        {hours.map((hour, i) => (
          <div
            key={hour}
            className="absolute left-0 right-0 border-t border-border/40 flex items-start"
            style={{ top: i * HOUR_HEIGHT }}
          >
            <span className="text-[10px] text-muted-foreground font-mono w-10 text-right pr-1 -mt-[7px] bg-card">
              {String(hour).padStart(2, '0')}:00
            </span>
          </div>
        ))}

        {/* Separator lines at 8h, 12h, 12h45, 16h45 */}
        {[
          { time: '08:00', label: '8h', color: 'hsl(var(--primary))', width: 2 },
          { time: '12:00', label: '12h', color: 'hsl(var(--destructive))', width: 1.5 },
          { time: '12:45', label: '12h45', color: 'hsl(var(--destructive))', width: 1.5 },
          { time: '16:45', label: '16h45', color: 'hsl(var(--primary))', width: 2 },
        ].map(({ time, label, color, width }) => {
          const minutes = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
          const top = ((minutes - START_HOUR * 60) / (TOTAL_HOURS * 60)) * (TOTAL_HOURS * HOUR_HEIGHT);
          return (
            <div
              key={time}
              className="absolute left-10 right-0 z-[5] flex items-center"
              style={{ top }}
            >
              <div className="flex-1" style={{ height: width, backgroundColor: color, opacity: 0.5 }} />
              <span className="text-[8px] font-mono ml-1 -mt-[6px]" style={{ color }}>{label}</span>
            </div>
          );
        })}

        {/* Astreinte background band */}
        {astreintePosition && (
          <div
            className="absolute left-10 right-1 rounded opacity-20 border border-current"
            style={{
              top: astreintePosition.top,
              height: astreintePosition.height,
              backgroundColor: astreinte!.isPonctuelle 
                ? settings.astreintePonctuelleColor 
                : settings.astreinteColor,
            }}
          />
        )}

        {/* Events positioned by time */}
        {events.map((event, idx) => {
          const pos = getTopAndHeight(event.startTime, event.endTime);
          const hasTime = event.startTime || event.endTime;
          return (
            <div
              key={event.id || idx}
              className={cn(
                "absolute left-12 right-2 rounded-md px-2 text-white shadow-sm flex flex-col items-center",
                !hasTime && "border-l-4 border-white/50"
              )}
              style={{
                top: pos.top + 1,
                height: pos.height - 2,
                backgroundColor: event.color,
                zIndex: 10 + idx,
                paddingTop: '4px',
              }}
            >
              <span className="truncate font-bold text-center w-full" style={{ fontSize: '0.85rem' }}>{event.name}</span>
              {hasTime && (
                <span className="text-[10px] opacity-80">
                  {event.startTime || '05:00'} — {event.endTime || '21:00'}
                </span>
              )}
            </div>
          );
        })}

        {/* Active astreinte label */}
        {hasActiveAstreinte && astreintePosition && (
          <div
            className="absolute left-12 text-[10px] font-semibold px-1 rounded"
            style={{
              top: astreintePosition.top + 2,
              color: astreinte!.isPonctuelle ? settings.astreintePonctuelleColor : settings.astreinteColor,
            }}
          >
            {astreinte!.isPonctuelle ? 'Astreinte ponctuelle' : 'Astreinte'}
          </div>
        )}
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/Legend.tsx
```ts
import { CalendarSettings } from '@/types/calendar';

interface LegendProps {
  settings: CalendarSettings;
}

export function Legend({ settings }: LegendProps) {
  const items = [
    { label: 'Astreinte', color: settings.astreinteColor, pattern: false },
    { label: 'Astreinte ponctuelle', color: settings.astreintePonctuelleColor, pattern: false },
    { label: 'Astreinte annulée', color: settings.astreinteCancelledColor, pattern: true, patternClass: 'pattern-crosshatch' },
    { label: 'Événement', color: '#00AEEF', pattern: false },
    { label: 'Vacances scolaires', color: settings.vacationColor, pattern: false },
    { label: 'Jour férié', color: settings.holidayPattern === 'none' ? '#ef4444' : '#ef4444', pattern: true, patternClass: 'pattern-stripes' },
    { label: 'Arrêt Tr2', color: settings.arretTr2Color, pattern: false },
    { label: 'Arrêt Tr3', color: settings.arretTr3Color, pattern: false },
    { label: 'Arrêt Tr4', color: settings.arretTr4Color, pattern: false },
    { label: 'Arrêt Tr5', color: settings.arretTr5Color, pattern: false },
    { label: 'Prépa', color: settings.prepaTr2Color, pattern: true, patternClass: 'pattern-dots' },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-4 shadow-calendar">
      <h3 className="text-sm font-semibold text-foreground mb-3">Légende</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <div 
              className={`w-4 h-4 rounded ${item.pattern ? item.patternClass : ''}`}
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/MobileArretBar.tsx
```ts
import { useMemo } from 'react';
import { Arret, CalendarSettings } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  differenceInDays,
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { getArretColor } from '@/lib/trancheColors';

interface MobileArretBarProps {
  arrets: Arret[];
  currentDate: Date;
  settings: CalendarSettings;
  viewMode: 'year' | 'month';
}

export function MobileArretBar({ arrets, currentDate, settings, viewMode }: MobileArretBarProps) {
  const { periodStart, periodEnd, totalDays } = useMemo(() => {
    if (viewMode === 'year') {
      const start = startOfYear(currentDate);
      const end = endOfYear(currentDate);
      return { periodStart: start, periodEnd: end, totalDays: differenceInDays(end, start) + 1 };
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return { periodStart: start, periodEnd: end, totalDays: differenceInDays(end, start) + 1 };
    }
  }, [currentDate, viewMode]);

  const arretBars = useMemo(() => {
    return arrets
      .filter(arret => arret.startDate <= periodEnd && arret.endDate >= periodStart)
      .map(arret => {
        const displayStart = arret.startDate < periodStart ? periodStart : arret.startDate;
        const displayEnd = arret.endDate > periodEnd ? periodEnd : arret.endDate;
        
        const startDayIndex = differenceInDays(displayStart, periodStart);
        const width = differenceInDays(displayEnd, displayStart) + 1;
        
        return {
          ...arret,
          startIndex: startDayIndex,
          width,
        };
      });
  }, [arrets, periodStart, periodEnd]);

  if (arretBars.length === 0) return null;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-3 py-1.5 bg-muted/50 border-b border-border flex items-center gap-2">
        <span className="text-sm">🔧</span>
        <h3 className="text-xs font-semibold text-foreground">Arrêts</h3>
      </div>
      
      <div className="p-2">
        <div className="relative">
          {/* Month markers for year view */}
          {viewMode === 'year' && (
            <div className="flex mb-1">
              {eachMonthOfInterval({ start: periodStart, end: periodEnd }).map((month, index) => (
                <div 
                  key={index} 
                  className="flex-1 text-[8px] text-muted-foreground text-center border-r border-border/30 last:border-r-0"
                >
                  {format(month, 'MMM', { locale: fr })}
                </div>
              ))}
            </div>
          )}

          {/* Arret bars */}
          <div className="space-y-1">
            {arretBars.map(arret => (
              <div
                key={arret.id}
                className="relative h-5"
              >
                <div
                  className={cn(
                    "absolute h-full rounded-full flex items-center justify-center px-2 text-[10px] font-medium text-white shadow-sm overflow-hidden",
                    arret.type === 'prepa' && 'pattern-dots'
                  )}
                  style={{
                    left: `${(arret.startIndex / totalDays) * 100}%`,
                    width: `${(arret.width / totalDays) * 100}%`,
                    backgroundColor: arret.color || getArretColor(arret, settings),
                    minWidth: '20px',
                  }}
                  title={`${arret.name} (${arret.tranche})`}
                >
                  <span className="truncate">
                    {arret.type === 'prepa' ? '⚙️ ' : ''}{arret.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/MobileCalendarGrid.tsx
```ts
import { useMemo } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isWeekend,
  format,
  isSameDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, CalendarEvent, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface MobileCalendarGridProps {
  currentDate: Date;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onDayClick?: (date: Date) => void;
}

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function MobileCalendarGrid({
  currentDate,
  settings,
  astreintes,
  isAstreinteDay,
  hasConflict,
  isHoliday,
  isVacationDay,
  isArretDay,
  getEventsForDate,
  isDateCancelled,
  onDayClick,
}: MobileCalendarGridProps) {
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  // Group days by weeks
  const weeks = useMemo(() => {
    const result: Date[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  return (
    <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 bg-muted/50">
        {WEEKDAYS.map((day, index) => (
          <div 
            key={day} 
            className={cn(
              "py-3 text-center text-xs font-semibold text-muted-foreground",
              index >= 5 && "text-primary/70"
            )}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Days */}
      <div className="divide-y divide-border/50">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((day, dayIndex) => {
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isTodayDate = isToday(day);
              const isWeekendDay = isWeekend(day);
              const astreinte = isAstreinteDay(day, astreintes);
              const holiday = isHoliday(day);
              const vacation = isVacationDay(day);
              const arret = isArretDay(day);
              const events = getEventsForDate(day);
              const cancelled = isDateCancelled(day);
              const conflict = hasConflict(day, astreintes);
              
              const hasIndicator = astreinte || holiday || vacation || arret || events.length > 0;

              return (
                <button
                  key={dayIndex}
                  onClick={() => isCurrentMonth && onDayClick?.(day)}
                  disabled={!isCurrentMonth}
                  className={cn(
                    "relative aspect-square flex flex-col items-center justify-center p-1 transition-all duration-200",
                    "active:scale-95 touch-manipulation",
                    !isCurrentMonth && "opacity-30",
                    isCurrentMonth && "hover:bg-accent/50",
                    isWeekendDay && isCurrentMonth && "bg-muted/30",
                    isTodayDate && "ring-2 ring-primary ring-inset bg-primary/10"
                  )}
                >
                  {/* Day Number */}
                  <span className={cn(
                    "text-sm font-medium z-10",
                    isTodayDate && "text-primary font-bold",
                    holiday && "text-destructive font-bold",
                    !isTodayDate && !holiday && isWeekendDay && "text-muted-foreground",
                    astreinte && !astreinte.isCancelled && !cancelled && "text-white"
                  )}>
                    {format(day, 'd')}
                  </span>

                  {/* Indicators */}
                  {isCurrentMonth && hasIndicator && (
                    <div className="flex gap-0.5 mt-0.5">
                      {/* Astreinte indicator */}
                      {astreinte && !astreinte.isCancelled && !cancelled && (
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: astreinte.isPonctuelle ? settings.astreintePonctuelleColor : settings.astreinteColor }}
                        />
                      )}
                      {/* Cancelled indicator */}
                      {(cancelled || astreinte?.isCancelled) && (
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: settings.astreinteCancelledColor }}
                        />
                      )}
                      {/* Event indicator */}
                      {events.length > 0 && (
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: events[0].color }}
                        />
                      )}
                      {/* Vacation indicator */}
                      {vacation && (
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: settings.vacationColor }}
                        />
                      )}
                      {/* Arret indicator */}
                      {arret && (
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: arret.color || '#22c55e' }}
                        />
                      )}
                    </div>
                  )}

                  {/* Holiday indicator - subtle background */}
                  {holiday && isCurrentMonth && (
                    <div 
                      className="absolute inset-0.5 rounded-lg opacity-20 bg-destructive"
                    />
                  )}

                  {/* Astreinte background */}
                  {astreinte && !astreinte.isCancelled && !cancelled && isCurrentMonth && (
                    <div 
                      className="absolute inset-0.5 rounded-lg opacity-80"
                      style={{ backgroundColor: astreinte.isPonctuelle ? settings.astreintePonctuelleColor : settings.astreinteColor }}
                    />
                  )}

                  {/* Conflict badge */}
                  {conflict && isCurrentMonth && (
                    <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/MobileHeader.tsx
```ts
import { ChevronLeft, ChevronRight, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MobileHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddEvent: () => void;
  onOpenSettings: () => void;
}

export function MobileHeader({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth, 
  onToday,
  onAddEvent,
  onOpenSettings,
}: MobileHeaderProps) {
  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border pb-3">
      {/* Title Row */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold text-foreground capitalize">
          {format(currentDate, 'MMMM yyyy', { locale: fr })}
        </h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onOpenSettings}
            className="h-9 w-9"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Navigation Row */}
      <div className="flex items-center justify-between gap-2">
        {/* Month Navigation */}
        <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrevMonth}
            className="h-9 w-9 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToday}
            className="h-9 px-3 rounded-lg text-sm font-medium"
          >
            Aujourd'hui
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNextMonth}
            className="h-9 w-9 rounded-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Add Event Button */}
        <Button 
          onClick={onAddEvent}
          className="h-9 gap-2 rounded-xl shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">Ajouter</span>
        </Button>
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/MobileLegend.tsx
```ts
import { CalendarSettings } from '@/types/calendar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MobileLegendProps {
  settings: CalendarSettings;
  expanded?: boolean;
}

export function MobileLegend({ settings, expanded: initialExpanded = false }: MobileLegendProps) {
  const [expanded, setExpanded] = useState(initialExpanded);

  const items = [
    { label: 'Astreinte', color: settings.astreinteColor },
    { label: 'Astr. ponctuelle', color: settings.astreintePonctuelleColor },
    { label: 'Astr. annulée', color: settings.astreinteCancelledColor, pattern: true },
    { label: 'Événement', color: '#00AEEF' },
    { label: 'Vacances', color: settings.vacationColor },
    { label: 'Jour férié', color: '#ef4444', pattern: true },
    { label: 'Arrêt Tr2', color: settings.arretTr2Color },
    { label: 'Arrêt Tr3', color: settings.arretTr3Color },
    { label: 'Arrêt Tr4', color: settings.arretTr4Color },
    { label: 'Arrêt Tr5', color: settings.arretTr5Color },
    { label: 'Prépa', color: settings.prepaTr2Color, pattern: true },
  ];

  const visibleItems = expanded ? items : items.slice(0, 6);

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-3 py-2 flex items-center justify-between bg-muted/30 border-b border-border"
      >
        <h3 className="text-xs font-semibold text-foreground">Légende</h3>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      <div className="p-2">
        <div className={cn(
          "grid gap-1.5",
          expanded ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-3"
        )}>
          {visibleItems.map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div 
                className={cn(
                  "w-3 h-3 rounded-sm flex-shrink-0",
                  item.pattern && "pattern-stripes"
                )}
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] text-muted-foreground truncate">{item.label}</span>
            </div>
          ))}
        </div>
        
        {!expanded && items.length > 6 && (
          <button 
            onClick={() => setExpanded(true)}
            className="w-full mt-2 text-[10px] text-primary font-medium"
          >
            +{items.length - 6} autres...
          </button>
        )}
      </div>
    </div>
  );
}
```


// path: src/components/Calendar/MobileToolbar.tsx
```ts
import { ChevronLeft, ChevronRight, Plus, Settings, LayoutGrid, Calendar as CalendarIcon, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MobileToolbarProps {
  currentDate: Date;
  currentYear: number;
  viewMode: 'year' | 'month';
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddEvent: () => void;
  onOpenSettings: () => void;
  onViewModeChange: (mode: 'year' | 'month') => void;
  onYearChange: (year: number) => void;
}

const years = Array.from({ length: 10 }, (_, i) => 2025 + i);

export function MobileToolbar({ 
  currentDate,
  currentYear,
  viewMode,
  onPrevMonth, 
  onNextMonth, 
  onToday,
  onAddEvent,
  onOpenSettings,
  onViewModeChange,
  onYearChange,
}: MobileToolbarProps) {
  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border pb-3 space-y-3">
      {/* Title Row with Year Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <CalendarIcon className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-lg font-bold text-foreground capitalize">
            {viewMode === 'year' 
              ? currentYear
              : format(currentDate, 'MMMM yyyy', { locale: fr })
            }
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onOpenSettings}
            className="h-8 w-8"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
          <Button 
            variant={viewMode === 'year' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => onViewModeChange('year')}
            className="h-7 px-2 text-xs rounded-md gap-1"
          >
            <LayoutGrid className="w-3 h-3" />
            Année
          </Button>
          <Button 
            variant={viewMode === 'month' ? 'secondary' : 'ghost'} 
            size="sm"
            onClick={() => onViewModeChange('month')}
            className="h-7 px-2 text-xs rounded-md gap-1"
          >
            <CalendarIcon className="w-3 h-3" />
            Mois
          </Button>
        </div>

        {/* Year Selector */}
        <Select 
          value={currentYear.toString()} 
          onValueChange={(v) => onYearChange(parseInt(v))}
        >
          <SelectTrigger className="w-20 h-7 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Navigation Row */}
      <div className="flex items-center justify-between gap-2">
        {/* Month/Year Navigation */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onPrevMonth}
            className="h-8 w-8 rounded-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToday}
            className="h-8 px-2 rounded-md text-xs font-medium"
          >
            Auj.
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNextMonth}
            className="h-8 w-8 rounded-md"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Add Event Button */}
        <Button 
          onClick={onAddEvent}
          size="sm"
          className="h-8 gap-1 rounded-lg shadow-sm text-xs"
        >
          <Plus className="w-3 h-3" />
          Ajouter
        </Button>
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/MobileVacationBar.tsx
```ts
import { useMemo } from 'react';
import { Vacation, CalendarSettings } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  differenceInDays,
  format,
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
} from 'date-fns';
import { fr } from 'date-fns/locale';

interface MobileVacationBarProps {
  vacations: Vacation[];
  currentDate: Date;
  settings: CalendarSettings;
  viewMode: 'year' | 'month';
}

export function MobileVacationBar({ vacations, currentDate, settings, viewMode }: MobileVacationBarProps) {
  const { periodStart, periodEnd, totalDays } = useMemo(() => {
    if (viewMode === 'year') {
      const start = startOfYear(currentDate);
      const end = endOfYear(currentDate);
      return { periodStart: start, periodEnd: end, totalDays: differenceInDays(end, start) + 1 };
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return { periodStart: start, periodEnd: end, totalDays: differenceInDays(end, start) + 1 };
    }
  }, [currentDate, viewMode]);

  const vacationBars = useMemo(() => {
    return vacations
      .filter(vac => vac.startDate <= periodEnd && vac.endDate >= periodStart)
      .map(vac => {
        const displayStart = vac.startDate < periodStart ? periodStart : vac.startDate;
        const displayEnd = vac.endDate > periodEnd ? periodEnd : vac.endDate;
        
        const startDayIndex = differenceInDays(displayStart, periodStart);
        const width = differenceInDays(displayEnd, displayStart) + 1;
        
        return {
          ...vac,
          startIndex: startDayIndex,
          width,
        };
      });
  }, [vacations, periodStart, periodEnd]);

  if (vacationBars.length === 0) return null;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-3 py-1.5 bg-vacation/10 border-b border-border flex items-center gap-2">
        <span className="text-sm">🏖️</span>
        <h3 className="text-xs font-semibold text-foreground">Vacances</h3>
      </div>
      
      <div className="p-2">
        <div className="relative">
          {/* Month markers for year view */}
          {viewMode === 'year' && (
            <div className="flex mb-1">
              {eachMonthOfInterval({ start: periodStart, end: periodEnd }).map((month, index) => (
                <div 
                  key={index} 
                  className="flex-1 text-[8px] text-muted-foreground text-center border-r border-border/30 last:border-r-0"
                >
                  {format(month, 'MMM', { locale: fr })}
                </div>
              ))}
            </div>
          )}

          {/* Vacation bars */}
          <div className="space-y-1">
            {vacationBars.map(vac => (
              <div
                key={vac.id}
                className="relative h-5"
              >
                <div
                  className="absolute h-full rounded-full flex items-center justify-center px-2 text-[10px] font-medium text-white shadow-sm overflow-hidden"
                  style={{
                    left: `${(vac.startIndex / totalDays) * 100}%`,
                    width: `${(vac.width / totalDays) * 100}%`,
                    backgroundColor: settings.vacationColor,
                    minWidth: '20px',
                  }}
                  title={vac.name}
                >
                  <span className="truncate">{vac.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/MobileYearView.tsx
```ts
import { useMemo } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
  isSameMonth,
  isToday,
  isWeekend,
  format,
  getDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, CalendarEvent, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface MobileYearViewProps {
  year: number;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onMonthClick?: (date: Date) => void;
}

const WEEKDAYS_MINI = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function MobileYearView({
  year,
  settings,
  astreintes,
  isAstreinteDay,
  hasConflict,
  isHoliday,
  isVacationDay,
  isArretDay,
  getEventsForDate,
  isDateCancelled,
  onMonthClick,
}: MobileYearViewProps) {
  const months = useMemo(() => {
    const yearStart = startOfYear(new Date(year, 0, 1));
    const yearEnd = endOfYear(yearStart);
    return eachMonthOfInterval({ start: yearStart, end: yearEnd });
  }, [year]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {months.map((month, monthIndex) => {
        const monthStart = startOfMonth(month);
        const monthEnd = endOfMonth(month);
        const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
        const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
        const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

        return (
          <button
            key={monthIndex}
            onClick={() => onMonthClick?.(month)}
            className="bg-card rounded-xl border border-border p-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98] touch-manipulation"
          >
            {/* Month Header */}
            <div className="text-xs font-bold text-foreground mb-1 capitalize text-center">
              {format(month, 'MMMM', { locale: fr })}
            </div>

            {/* Mini Weekday Headers */}
            <div className="grid grid-cols-7 mb-0.5">
              {WEEKDAYS_MINI.map((day, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "text-[7px] font-medium text-muted-foreground text-center",
                    index >= 5 && "text-primary/60"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-px">
              {days.map((day, dayIndex) => {
                const isCurrentMonth = isSameMonth(day, month);
                const isTodayDate = isToday(day);
                const isWeekendDay = isWeekend(day);
                const astreinte = isAstreinteDay(day, astreintes);
                const holiday = isHoliday(day);
                const vacation = isVacationDay(day);
                const arret = isArretDay(day);
                const events = getEventsForDate(day);
                const cancelled = isDateCancelled(day);
                const conflict = hasConflict(day, astreintes);

                return (
                  <div
                    key={dayIndex}
                    className={cn(
                      "aspect-square flex items-center justify-center text-[8px] relative rounded-sm",
                      !isCurrentMonth && "opacity-20",
                      isWeekendDay && isCurrentMonth && "bg-muted/30",
                      isTodayDate && "ring-1 ring-primary bg-primary/10 font-bold",
                      astreinte && !astreinte.isCancelled && !cancelled && isCurrentMonth && "text-white",
                    )}
                    style={{
                      backgroundColor: 
                        astreinte && !astreinte.isCancelled && !cancelled && isCurrentMonth
                          ? astreinte.isPonctuelle 
                            ? settings.astreintePonctuelleColor 
                            : settings.astreinteColor
                          : undefined,
                    }}
                  >
                    <span className={cn(
                      holiday && isCurrentMonth && "text-destructive font-bold"
                    )}>
                      {format(day, 'd')}
                    </span>

                    {/* Indicators */}
                    {isCurrentMonth && (vacation || arret || events.length > 0) && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-px">
                        {vacation && (
                          <div 
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: settings.vacationColor }}
                          />
                        )}
                        {arret && (
                          <div 
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: arret.color }}
                          />
                        )}
                        {events.length > 0 && (
                          <div 
                            className="w-1 h-1 rounded-full"
                            style={{ backgroundColor: events[0].color }}
                          />
                        )}
                      </div>
                    )}

                    {/* Conflict indicator */}
                    {conflict && isCurrentMonth && (
                      <div className="absolute top-0 right-0 w-1 h-1 bg-destructive rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>
          </button>
        );
      })}
    </div>
  );
}

```


// path: src/components/Calendar/UnifiedArretBar.tsx
```ts
import { useMemo } from 'react';
import { Arret, CalendarSettings, PatternType } from '@/types/calendar';
import { startOfMonth, endOfMonth, startOfYear, endOfYear, eachMonthOfInterval, differenceInDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { getArretColor, getArretPattern, getModuleLabel } from '@/lib/trancheColors';
import { CollapsibleSection } from './CollapsibleSection';
interface UnifiedArretBarProps {
  arrets: Arret[];
  currentDate: Date;
  settings: CalendarSettings;
  viewMode: 'year' | 'month' | 'week';
  defaultExpanded?: boolean;
}

// Pattern class mappings
const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes-light',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
  diagonal: 'pattern-diagonal',
  grid: 'pattern-grid',
  zigzag: 'pattern-zigzag'
};

// Tranche order for consistent display
const TRANCHE_ORDER = ['Tr2', 'Tr3', 'Tr4', 'Tr5'] as const;
export function UnifiedArretBar({
  arrets,
  currentDate,
  settings,
  viewMode,
  defaultExpanded = true
}: UnifiedArretBarProps) {
  const {
    periodStart,
    periodEnd,
    totalDays
  } = useMemo(() => {
    if (viewMode === 'year') {
      const start = startOfYear(currentDate);
      const end = endOfYear(currentDate);
      return {
        periodStart: start,
        periodEnd: end,
        totalDays: differenceInDays(end, start) + 1
      };
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return {
        periodStart: start,
        periodEnd: end,
        totalDays: differenceInDays(end, start) + 1
      };
    }
  }, [currentDate, viewMode]);

  // Group arrets by tranche - each tranche gets ONE line with all its AT + prépas
  const arretsByTranche = useMemo(() => {
    const visibleArrets = arrets.filter(arret => arret.startDate <= periodEnd && arret.endDate >= periodStart);
    const grouped: Record<string, Array<Arret & {
      startIndex: number;
      width: number;
      leftPercent: number;
      widthPercent: number;
    }>> = {};
    for (const tranche of TRANCHE_ORDER) {
      const trancheArrets = visibleArrets.filter(a => a.tranche === tranche).map(arret => {
        const displayStart = arret.startDate < periodStart ? periodStart : arret.startDate;
        const displayEnd = arret.endDate > periodEnd ? periodEnd : arret.endDate;
        const startDayIndex = differenceInDays(displayStart, periodStart);
        const width = differenceInDays(displayEnd, displayStart) + 1;
        return {
          ...arret,
          startIndex: startDayIndex,
          width,
          leftPercent: startDayIndex / totalDays * 100,
          widthPercent: width / totalDays * 100
        };
      }).sort((a, b) => a.startIndex - b.startIndex);
      if (trancheArrets.length > 0) {
        grouped[tranche] = trancheArrets;
      }
    }
    return grouped;
  }, [arrets, periodStart, periodEnd, totalDays]);
  const hasTranches = Object.keys(arretsByTranche).length > 0;
  if (!hasTranches) return null;
  return <CollapsibleSection title="Arrêts de Tranches" icon="🔧" defaultExpanded={defaultExpanded} className="mb-3">
      <div className="p-3 sm:p-4">
        <div className="relative">
          {/* Month markers for year view */}
          {viewMode === 'year' && <div className="flex mb-2">
              {eachMonthOfInterval({
            start: periodStart,
            end: periodEnd
          }).map((month, index) => <div key={index} className="flex-1 text-[8px] sm:text-[10px] text-muted-foreground text-center border-r border-border/30 last:border-r-0">
                  {format(month, 'MMM', {
              locale: fr
            })}
                </div>)}
            </div>}

          {/* One line per tranche with all AT + preparations */}
          <div className="space-y-2">
            {TRANCHE_ORDER.map(tranche => {
            const trancheArrets = arretsByTranche[tranche];
            if (!trancheArrets) return null;
            const trancheColor = getArretColor({
              tranche,
              type: 'arret'
            } as Arret, settings);
            return <div key={tranche} className="flex items-center gap-2">
                  {/* Tranche label */}
                  <div className="w-10 sm:w-12 flex-shrink-0 text-[10px] sm:text-xs font-semibold text-white rounded px-1 py-0.5 text-center" style={{
                backgroundColor: trancheColor
              }}>
                    {tranche}
                  </div>

                  {/* Timeline for this tranche - single line with all segments */}
                  <div className="flex-1 relative h-6 sm:h-7 bg-muted/20 rounded overflow-visible">
                    {trancheArrets.map(arret => {
                  const pattern = getArretPattern(arret);
                  const isPrepa = arret.type === 'prepa';
                  const moduleLabel = arret.module ? getModuleLabel(arret.module) : '';
                  return <div key={arret.id} className={cn("absolute h-full flex items-center justify-center px-1 sm:px-2 text-[8px] sm:text-[10px] font-medium text-white shadow-sm overflow-hidden transition-all hover:scale-[1.02] hover:z-10", isPrepa ? 'rounded border border-white/40' : 'rounded-full', patternClasses[pattern])} style={{
                    left: `${arret.leftPercent}%`,
                    width: `${arret.widthPercent}%`,
                    backgroundColor: getArretColor(arret, settings),
                    minWidth: '20px'
                  }} title={`${arret.name}${moduleLabel ? ` - ${moduleLabel}` : ''} (${format(arret.startDate, 'dd/MM')} - ${format(arret.endDate, 'dd/MM')})`}>
                          <span className="truncate flex items-center gap-0.5">
                            {isPrepa && arret.module && <span className="bg-white/25 rounded px-0.5 text-[7px] sm:text-[8px] font-bold">
                                {arret.module}
                              </span>}
                            <span className="hidden sm:inline">{arret.name}</span>
                          </span>
                        </div>;
                })}
                  </div>
                </div>;
          })}
          </div>

          {/* Compact legend */}
          
        </div>
      </div>
    </CollapsibleSection>;
}
```


// path: src/components/Calendar/UnifiedCalendarGrid.tsx
```ts
import { useMemo, useState, useEffect } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isWeekend,
  format,
  getWeek,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, CalendarEvent, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { getArretColor, getArretPattern } from '@/lib/trancheColors';
import { AlertTriangle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useOrientation } from '@/hooks/useOrientation';

interface UnifiedCalendarGridProps {
  currentDate: Date;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  getConflictDetails: (date: Date, astreintes: Astreinte[]) => string[];
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  isREDay: (date: Date) => CalendarEvent | null;
  isCPDay: (date: Date) => CalendarEvent | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getNonREEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onDayClick?: (date: Date) => void;
  onWeekNumberClick?: (weekStartDate: Date) => void;
  showWeekNumbers?: boolean;
}

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const WEEKDAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

// Helper to compute bar spans for a week
function computeBarSpans(
  items: Array<{ startDate: Date; endDate: Date; name: string; color: string; id?: string }>,
  weekDays: Date[]
): Array<{ startCol: number; span: number; item: typeof items[0] }> {
  const bars: Array<{ startCol: number; span: number; item: typeof items[0] }> = [];
  
  items.forEach(item => {
    let startCol = -1;
    let span = 0;
    
    weekDays.forEach((day, index) => {
      const isWithin = day >= item.startDate && day <= item.endDate;
      if (isWithin) {
        if (startCol === -1) startCol = index;
        span++;
      }
    });
    
    if (startCol !== -1 && span > 0) {
      bars.push({ startCol, span, item });
    }
  });
  
  return bars;
}

export function UnifiedCalendarGrid({
  currentDate,
  settings,
  astreintes,
  vacations,
  arrets,
  isAstreinteDay,
  hasConflict,
  getConflictDetails,
  isHoliday,
  isVacationDay,
  isArretDay,
  isREDay,
  isCPDay,
  getEventsForDate,
  getNonREEventsForDate,
  isDateCancelled,
  onDayClick,
  onWeekNumberClick,
  showWeekNumbers = true,
}: UnifiedCalendarGridProps) {
  const { isMobileLandscape } = useOrientation();
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  // Group days by weeks
  const weeks = useMemo(() => {
    const result: Date[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  // Compute vacation bars for header
  const vacationBars = useMemo(() => {
    return weeks.map(week => computeBarSpans(
      vacations.map(v => ({ ...v, color: settings.vacationColor })),
      week
    ));
  }, [weeks, vacations, settings.vacationColor]);

  // Compute arret bars for header - resolve tranche colors
  const arretBars = useMemo(() => {
    return weeks.map(week => computeBarSpans(
      arrets.map(a => ({ ...a, color: a.color || getArretColor(a, settings) })),
      week
    ));
  }, [weeks, arrets, settings]);

  // RE/CP are day states, NOT events - they should NOT have header bars
  // They only gray out the day cells (handled below in day rendering)

  return (
    <div className={cn(
      "bg-card rounded-2xl border border-border shadow-lg overflow-hidden",
      isMobileLandscape && "text-xs"
    )}>
      {/* Weekday Headers */}
      <div 
        className={cn(
          "grid",
          showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
        )}
        style={{ backgroundColor: settings.monthHeaderBgColor }}
      >
        {showWeekNumbers && (
          <div className="py-1 sm:py-2 lg:py-3 text-center text-[9px] sm:text-[10px] lg:text-xs font-semibold border-r border-white/20" style={{ color: settings.monthHeaderTextColor }}>
            S.
          </div>
        )}
        {(isMobileView ? WEEKDAYS_SHORT : WEEKDAYS).map((day, index) => (
          <div 
            key={`${day}-${index}`} 
            className="py-1 sm:py-2 lg:py-3 text-center text-[9px] sm:text-[10px] lg:text-xs font-semibold"
            style={{ color: settings.monthHeaderTextColor }}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Weeks */}
      <div className="divide-y divide-border/50">
        {weeks.map((week, weekIndex) => {
          const weekNumber = getWeek(week[0], { locale: fr, weekStartsOn: 1 });
          const weekVacationBars = vacationBars[weekIndex] || [];
          const weekArretBars = arretBars[weekIndex] || [];
          
          // RE/CP are NOT shown as bars - they gray out day cells only
          const hasContextBars = weekVacationBars.length > 0 || weekArretBars.length > 0;
          
          return (
            <div key={weekIndex}>
              {/* Context bars above day cells */}
              {hasContextBars && (
                <div className={cn(
                  "grid bg-muted/20",
                  showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
                )}>
                  {showWeekNumbers && <div className="border-r border-border" style={{ backgroundColor: settings.weekNumberBgColor }} />}
                  <div className="col-span-7 relative py-1 px-0.5 space-y-0.5">
                    {/* Vacation bars */}
                    {weekVacationBars.map((bar, idx) => (
                      <div
                        key={`vac-${idx}`}
                        className="h-3 sm:h-4 rounded text-[8px] sm:text-[10px] text-white font-medium flex items-center justify-center truncate shadow-sm"
                        style={{
                          backgroundColor: bar.item.color,
                          marginLeft: `${(bar.startCol / 7) * 100}%`,
                          width: `${(bar.span / 7) * 100}%`,
                        }}
                        title={bar.item.name}
                      >
                        {bar.span >= 2 && bar.item.name}
                      </div>
                    ))}
                    {/* Arret bars with patterns */}
                    {weekArretBars.map((bar, idx) => {
                      const arret = arrets.find(a => a.id === bar.item.id);
                      const pattern = arret ? getArretPattern(arret) : 'none';
                      const patternClass = pattern !== 'none' ? `pattern-${pattern === 'stripes' ? 'stripes-light' : pattern}` : '';
                      return (
                        <div
                          key={`arret-${idx}`}
                          className={cn(
                            "h-3 sm:h-4 rounded text-[8px] sm:text-[10px] text-white font-medium flex items-center justify-center truncate shadow-sm",
                            patternClass
                          )}
                          style={{
                            backgroundColor: bar.item.color,
                            marginLeft: `${(bar.startCol / 7) * 100}%`,
                            width: `${(bar.span / 7) * 100}%`,
                          }}
                          title={bar.item.name}
                        >
                          {bar.span >= 2 && bar.item.name}
                        </div>
                      );
                    })}
                    {/* RE/CP are NOT displayed as bars - they gray out day cells only */}
                  </div>
                </div>
              )}
              
              {/* Day cells */}
              <div className={cn(
                "grid",
                showWeekNumbers ? "grid-cols-8" : "grid-cols-7"
              )}>
                {/* Week number */}
                {showWeekNumbers && (
                  <button 
                    onClick={() => onWeekNumberClick?.(week[0])}
                    className="flex items-center justify-center text-[8px] sm:text-[10px] lg:text-xs font-medium border-r border-border min-h-[50px] sm:min-h-[60px] lg:min-h-[80px] hover:bg-accent/30 transition-colors cursor-pointer" 
                    style={{ backgroundColor: settings.weekNumberBgColor, color: settings.weekNumberTextColor }}
                  >
                    {weekNumber}
                  </button>
                )}
                
                {week.map((day, dayIndex) => {
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isTodayDate = isToday(day);
                  const isWeekendDay = isWeekend(day);
                  const astreinte = isAstreinteDay(day, astreintes);
                  const holiday = isHoliday(day);
                  const cancelled = isDateCancelled(day);
                  const reDay = isREDay(day);
                  const cpDay = isCPDay(day);
                  const events = getNonREEventsForDate(day);
                  
                  const hasActiveAstreinte = astreinte && !astreinte.isCancelled && !cancelled;
                  
                  const conflict = hasConflict(day, astreintes);
                  // Event+astreinte conflict: active astreinte + non-RE/CP events = conflict
                  const eventAstreinteConflict = hasActiveAstreinte && events.length > 0;
                  const showConflict = (conflict || eventAstreinteConflict) && isCurrentMonth;
                  const conflictDetails = conflict ? getConflictDetails(day, astreintes) : [];
                  if (eventAstreinteConflict) {
                    events.forEach(e => {
                      conflictDetails.push(`${e.name} / Astreinte`);
                    });
                  }
                  
                  const showCPBackground = cpDay && !hasActiveAstreinte;
                  const showREBackground = reDay && !hasActiveAstreinte && !showCPBackground;

                  // Determine background color
                  let cellBgColor = undefined;
                  if (cancelled && isCurrentMonth && !hasActiveAstreinte) {
                    cellBgColor = settings.astreinteCancelledColor;
                  } else if (showCPBackground && isCurrentMonth) {
                    cellBgColor = settings.cpColor;
                  } else if (showREBackground && isCurrentMonth) {
                    cellBgColor = settings.reColor;
                  }

                  return (
                    <button
                      key={dayIndex}
                      onClick={() => isCurrentMonth && onDayClick?.(day)}
                      disabled={!isCurrentMonth}
                      className={cn(
                        "relative min-h-[50px] sm:min-h-[60px] lg:min-h-[80px] flex flex-col p-0.5 sm:p-1 transition-all duration-200 border-r border-border/30 last:border-r-0",
                        "active:scale-[0.98] touch-manipulation",
                        !isCurrentMonth && "opacity-30 bg-muted/20",
                        isCurrentMonth && !showREBackground && !showCPBackground && "hover:bg-accent/30",
                        isTodayDate && "ring-2 ring-primary ring-inset"
                      )}
                      style={{
                        ...(cellBgColor ? { backgroundColor: cellBgColor } : {}),
                        ...((isWeekendDay || holiday) && isCurrentMonth && !showREBackground && !showCPBackground && !cellBgColor
                          ? { backgroundColor: settings.weekendDaysBgColor, color: settings.weekendDaysTextColor }
                          : {}),
                        ...(isCurrentMonth && !isWeekendDay && !holiday && !showREBackground && !showCPBackground && !cellBgColor
                          ? { backgroundColor: settings.dayCellBgColor, color: settings.dayCellTextColor }
                          : {}),
                      }}
                    >
                      {/* Day Number Header */}
                      <div className="flex items-center justify-between w-full mb-0.5">
                        <span className={cn(
                          "text-[9px] sm:text-[10px] lg:text-xs font-medium",
                          isTodayDate && "text-primary font-bold bg-primary/20 rounded-full w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex items-center justify-center",
                          holiday && !isTodayDate && "text-destructive font-bold",
                          !isTodayDate && !holiday && isWeekendDay && "text-muted-foreground"
                        )}>
                          {format(day, 'd')}
                        </span>
                        
                        {/* Conflict indicator */}
                        {showConflict && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-destructive rounded-full flex items-center justify-center cursor-pointer animate-pulse">
                                <AlertTriangle className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 text-white" />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-3 z-50 bg-background">
                              <div className="text-sm font-semibold text-destructive mb-2">{"Conflits détectés"}</div>
                              <ul className="text-xs space-y-1">
                                {conflictDetails.map((detail, i) => (
                                  <li key={i} className="text-muted-foreground">• {detail}</li>
                                ))}
                              </ul>
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>

                      {/* Holiday name */}
                      {holiday && isCurrentMonth && (
                        <div className="text-[7px] sm:text-[8px] lg:text-[10px] text-destructive font-medium truncate w-full mb-0.5">
                          {holiday.name}
                        </div>
                      )}

                      {/* Full cell for astreintes, otherwise event bars */}
                      <div className="flex-1 w-full flex flex-col overflow-hidden">
                        {/* Astreinte - takes full cell */}
                        {hasActiveAstreinte && isCurrentMonth && (
                          <div 
                            className="flex-1 rounded text-[6px] sm:text-[7px] lg:text-[9px] text-white font-medium flex items-center justify-center truncate min-h-[20px] sm:min-h-[24px] lg:min-h-[32px]"
                            style={{ 
                              backgroundColor: astreinte.isPonctuelle 
                                ? settings.astreintePonctuelleColor 
                                : settings.astreinteColor 
                            }}
                          >
                            {astreinte.isPonctuelle ? (isMobileView ? 'P' : 'Ponct.') : (isMobileView ? 'AST' : 'Astreinte')}
                          </div>
                        )}
                        
                        {/* Cancelled astreinte - with pattern AND events on top */}
                        {cancelled && isCurrentMonth && !hasActiveAstreinte && events.length === 0 && (
                          <div 
                            className="flex-1 rounded text-[6px] sm:text-[7px] lg:text-[9px] text-white font-medium flex items-center justify-center truncate min-h-[20px] sm:min-h-[24px] lg:min-h-[32px] pattern-crosshatch"
                            style={{ backgroundColor: settings.astreinteCancelledColor }}
                          >
                            {cancelled.name}
                          </div>
                        )}
                        
                        {/* Cancelled astreinte WITH events - show events on colored background */}
                        {cancelled && isCurrentMonth && !hasActiveAstreinte && events.length > 0 && (
                          <div 
                            className="flex-1 rounded p-0.5 pattern-crosshatch"
                            style={{ backgroundColor: settings.astreinteCancelledColor }}
                          >
                            {events.slice(0, 2).map((event, idx) => (
                              <div 
                                key={event.id || idx}
                                className="h-2.5 sm:h-3 lg:h-4 rounded text-[6px] sm:text-[7px] lg:text-[9px] text-white font-medium flex items-center px-0.5 truncate mb-0.5"
                                style={{ backgroundColor: event.color }}
                              >
                                {event.name}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Event bars (non-RE/CP) - sorted by time for approximate positioning */}
                        {!hasActiveAstreinte && !cancelled && (() => {
                          // Sort events: those with startTime first (by time), then without
                          const sortedEvents = [...events].sort((a, b) => {
                            const aMin = a.startTime ? parseInt(a.startTime.split(':')[0]) * 60 + parseInt(a.startTime.split(':')[1] || '0') : 0;
                            const bMin = b.startTime ? parseInt(b.startTime.split(':')[0]) * 60 + parseInt(b.startTime.split(':')[1] || '0') : 0;
                            return aMin - bMin;
                          });
                          return (
                            <div className="space-y-0.5">
                              {sortedEvents.slice(0, 2).map((event, idx) => (
                                <div 
                                  key={event.id || idx}
                                  className="h-2.5 sm:h-3 lg:h-4 rounded text-[6px] sm:text-[7px] lg:text-[9px] text-white font-medium flex items-center px-0.5 truncate"
                                  style={{ backgroundColor: event.color }}
                                  title={`${event.name}${event.startTime ? ` (${event.startTime}-${event.endTime})` : ''}`}
                                >
                                  {event.startTime && <span className="mr-0.5 opacity-70">{event.startTime}</span>}
                                  {event.name}
                                </div>
                              ))}
                              
                              {/* More events indicator */}
                              {sortedEvents.length > 2 && isCurrentMonth && (
                                <div className="text-[6px] sm:text-[8px] text-muted-foreground">
                                  +{sortedEvents.length - 2} autres
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```


// path: src/components/Calendar/UnifiedLegend.tsx
```ts
import { useMemo } from 'react';
import {
  CalendarSettings,
  modulePatterns,
  PatternType,
  Arret,
  Vacation,
  CalendarEvent,
  Holiday,
  Astreinte,
  CancelledAstreinteDate,
} from '@/types/calendar';
import { CollapsibleSection } from './CollapsibleSection';
import { cn } from '@/lib/utils';
import {
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';

interface UnifiedLegendProps {
  settings: CalendarSettings;
  defaultExpanded?: boolean;
  viewMode?: 'year' | 'month' | 'week';
  currentDate?: Date;
  arrets?: Arret[];
  vacations?: Vacation[];
  events?: CalendarEvent[];
  holidays?: Holiday[];
  astreintes?: Astreinte[];
  ponctualAstreintes?: Astreinte[];
  cancelledAstreinteDates?: CancelledAstreinteDate[];
}

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes-light',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
  diagonal: 'pattern-diagonal',
  grid: 'pattern-grid',
  zigzag: 'pattern-zigzag',
};

export function UnifiedLegend({
  settings,
  defaultExpanded = true,
  viewMode = 'year',
  currentDate,
  arrets = [],
  vacations = [],
  events = [],
  holidays = [],
  astreintes = [],
  ponctualAstreintes = [],
  cancelledAstreinteDates = [],
}: UnifiedLegendProps) {
  const { mainItems, trancheItems, moduleItems } = useMemo(() => {
    let rangeStart: Date;
    let rangeEnd: Date;

    if (currentDate) {
      if (viewMode === 'year') {
        rangeStart = startOfYear(currentDate);
        rangeEnd = endOfYear(currentDate);
      } else {
        rangeStart = startOfMonth(currentDate);
        rangeEnd = endOfMonth(currentDate);
      }
    } else {
      rangeStart = new Date(1900, 0, 1);
      rangeEnd = new Date(2200, 0, 1);
    }

    const inRange = (start: Date, end: Date) =>
      start <= rangeEnd && end >= rangeStart;
    const dateInRange = (d: Date) =>
      d >= rangeStart && d <= rangeEnd;

    const main: Array<{ label: string; color: string; pattern: PatternType }> = [];

    const hasRegularAstreinte = astreintes.some(
      a => !a.isPonctuelle && !a.isCancelled && inRange(a.startDate, a.endDate)
    );
    const hasPonctuelle = ponctualAstreintes.some(a =>
      inRange(a.startDate, a.endDate)
    );
    const hasCancelled = cancelledAstreinteDates.some(c =>
      dateInRange(c.date)
    );
    const hasEvents = events.some(
      e => e.type === 'event' && inRange(e.startDate, e.endDate)
    );
    const hasRE = events.some(
      e => e.type === 're' && inRange(e.startDate, e.endDate)
    );
    const hasCP = events.some(
      e => e.type === 'cp' && inRange(e.startDate, e.endDate)
    );
    const hasVacations = vacations.some(v =>
      inRange(v.startDate, v.endDate)
    );
    const hasHolidays = holidays.some(h =>
      dateInRange(h.date)
    );

    if (hasRegularAstreinte)
      main.push({ label: 'Astreinte', color: settings.astreinteColor, pattern: 'none' });
    if (hasPonctuelle)
      main.push({ label: 'Astr. ponctuelle', color: settings.astreintePonctuelleColor, pattern: 'none' });
    if (hasCancelled)
      main.push({ label: 'Astr. annulée', color: settings.astreinteCancelledColor, pattern: 'crosshatch' });
    if (hasEvents)
      main.push({ label: 'Événement', color: '#00AEEF', pattern: 'none' });
    if (hasRE)
      main.push({ label: 'RE (Repos)', color: settings.reColor, pattern: 'none' });
    if (hasCP)
      main.push({ label: '21 (Congés annuels)', color: settings.cpColor, pattern: 'none' });
    if (hasVacations)
      main.push({ label: 'Vacances', color: settings.vacationColor, pattern: 'none' });
    if (hasHolidays)
      main.push({ label: 'Jour férié', color: '#ef4444', pattern: 'stripes' });

    const visibleArrets = arrets.filter(a =>
      inRange(a.startDate, a.endDate)
    );
    const presentTranches = new Set(visibleArrets.map(a => a.tranche));
    const tranches: Array<{ label: string; color: string }> = [];

    if (presentTranches.has('Tr2')) tranches.push({ label: 'AT Tr2', color: settings.arretTr2Color });
    if (presentTranches.has('Tr3')) tranches.push({ label: 'AT Tr3', color: settings.arretTr3Color });
    if (presentTranches.has('Tr4')) tranches.push({ label: 'AT Tr4', color: settings.arretTr4Color });
    if (presentTranches.has('Tr5')) tranches.push({ label: 'AT Tr5', color: settings.arretTr5Color });

    const presentModules = new Set(
      visibleArrets.filter(a => a.type === 'prepa' && a.module).map(a => a.module!)
    );
    const modules: Array<{ label: string; pattern: PatternType }> = [];

    if (presentModules.has('M0')) modules.push({ label: 'M0', pattern: modulePatterns.M0 });
    if (presentModules.has('M1')) modules.push({ label: 'M1', pattern: modulePatterns.M1 });
    if (presentModules.has('M2A')) modules.push({ label: 'M2A', pattern: modulePatterns.M2A });
    if (presentModules.has('M2B')) modules.push({ label: 'M2B', pattern: modulePatterns.M2B });
    if (presentModules.has('M3')) modules.push({ label: 'M3', pattern: modulePatterns.M3 });
    if (presentModules.has('M4')) modules.push({ label: 'M4', pattern: modulePatterns.M4 });

    return { mainItems: main, trancheItems: tranches, moduleItems: modules };
  }, [
    settings,
    arrets,
    vacations,
    events,
    holidays,
    astreintes,
    ponctualAstreintes,
    cancelledAstreinteDates,
    viewMode,
    currentDate,
  ]);

  if (
    mainItems.length === 0 &&
    trancheItems.length === 0 &&
    moduleItems.length === 0
  )
    return null;

  return (
    <CollapsibleSection
      title="Légende"
      icon="📋"
      defaultExpanded={defaultExpanded}
    >
      {/* ✅ MARQUEUR PDF */}
      <div
        data-calendar-legend
        className="p-3 sm:p-4 space-y-3 print-visible"
      >
        {mainItems.length > 0 && (
          <div>
            <h4 className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-2">
              Événements
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {mainItems.map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-3 h-3 sm:w-4 sm:h-4 rounded flex-shrink-0',
                      item.pattern !== 'none' && patternClasses[item.pattern]
                    )}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {trancheItems.length > 0 && (
          <div>
            <h4 className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-2">
              Arrêts de Tranches
            </h4>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {trancheItems.map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {moduleItems.length > 0 && (
          <div>
            <h4 className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-2">
              Modules de préparation
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {moduleItems.map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className={cn(
                      'w-3 h-3 sm:w-4 sm:h-4 rounded-md flex-shrink-0 bg-muted-foreground/60',
                      patternClasses[item.pattern]
                    )}
                  />
                  <span className="text-[10px] sm:text-xs text-muted-foreground truncate">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
}

```


// path: src/components/Calendar/UnifiedToolbar.tsx
```ts
import { ChevronLeft, ChevronRight, Plus, Settings, LayoutGrid, Calendar as CalendarIcon, List, AlertTriangle, MoreVertical, FileText, Sheet, CalendarPlus, CalendarMinus, ClipboardCheck } from 'lucide-react';
import { useOrientation } from '@/hooks/useOrientation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format, getWeek, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

type ViewMode = 'year' | 'month' | 'week';

interface UnifiedToolbarProps {
  currentDate: Date;
  currentYear: number;
  viewMode: ViewMode;
  activeTab: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddEvent: () => void;
  onOpenSettings: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onYearChange: (year: number) => void;
  onTabChange: (tab: string) => void;
  onExportPDF?: () => void;
  onImport?: () => void;
  onICSImport?: () => void;
  onICSExport?: () => void;
}

const years = Array.from({ length: 10 }, (_, i) => 2025 + i);

export function UnifiedToolbar({ 
  currentDate,
  currentYear,
  viewMode,
  activeTab,
  onPrevMonth, 
  onNextMonth, 
  onToday,
  onAddEvent,
  onOpenSettings,
  onViewModeChange,
  onYearChange,
  onTabChange,
  onExportPDF,
  onImport,
  onICSImport,
  onICSExport,
}: UnifiedToolbarProps) {
  const { isLandscape } = useOrientation();
  const weekNumberStart = getWeek(currentDate, { locale: fr, weekStartsOn: 1 });
  const monthEnd = endOfMonth(currentDate);
  const weekNumberEnd = getWeek(monthEnd, { locale: fr, weekStartsOn: 1 });

  // Always show all 4 tabs
  const showConflitsTab = true;

  return (
    <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border pb-2 space-y-1.5">
      {/* Title Row with Year Selector */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <img src="/images/logo-wplanner.png" alt="W Planner" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-contain flex-shrink-0" />
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold text-foreground capitalize truncate">
              {viewMode === 'year' 
                ? currentYear
                : format(currentDate, 'MMMM yyyy', { locale: fr })
              }
            </h1>
            {viewMode === 'month' && (
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                {weekNumberStart === weekNumberEnd
                  ? `Semaine ${weekNumberStart}`
                  : `Semaines ${weekNumberStart} – ${weekNumberEnd}`
                }
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Mobile: Add Event button at top */}
          <Button onClick={onAddEvent} size="sm" className="sm:hidden h-8 gap-1 rounded-lg shadow-sm text-xs">
            <Plus className="w-3 h-3" />
          </Button>
          <Select 
            value={currentYear.toString()} 
            onValueChange={(v) => onYearChange(parseInt(v))}
          >
            <SelectTrigger className="w-20 sm:w-24 h-8 text-sm font-semibold">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Desktop: Show all buttons */}
          <div className="hidden sm:flex items-center gap-1">
            {onExportPDF && (
              <Button variant="ghost" size="icon" onClick={onExportPDF} className="h-8 w-8" title="Exporter PDF">
                <FileText className="w-4 h-4 text-red-600" />
              </Button>
            )}
            {onImport && (
              <Button variant="ghost" size="icon" onClick={onImport} className="h-8 w-8" title="Importer Excel/CSV">
                <Sheet className="w-4 h-4 text-green-600" />
              </Button>
            )}
            {onICSImport && (
              <Button variant="ghost" size="icon" onClick={onICSImport} className="h-8 w-8" title="Importer ICS">
                <CalendarPlus className="w-4 h-4 text-blue-600" />
              </Button>
            )}
            {onICSExport && (
              <Button variant="ghost" size="icon" onClick={onICSExport} className="h-8 w-8" title="Exporter ICS">
                <CalendarMinus className="w-4 h-4 text-orange-600" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onOpenSettings} className="h-8 w-8" title="Paramètres">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile: Show menu button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover z-50">
              <DropdownMenuItem onClick={() => onTabChange('events')}>
                <List className="w-4 h-4 mr-2" />
                Gestion
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTabChange('conflicts')}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Conflits
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onTabChange('pointage')}>
                <ClipboardCheck className="w-4 h-4 mr-2" />
                Pointage
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onExportPDF}>
                <FileText className="w-4 h-4 mr-2 text-red-600" />
                Exporter PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onImport}>
                <Sheet className="w-4 h-4 mr-2 text-green-600" />
                Importer Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onICSImport}>
                <CalendarPlus className="w-4 h-4 mr-2 text-blue-600" />
                Importer ICS
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onICSExport}>
                <CalendarMinus className="w-4 h-4 mr-2 text-orange-600" />
                Exporter ICS
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onOpenSettings}>
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Tabs - Desktop */}
      <div className="hidden sm:block overflow-x-auto -mx-3 px-3">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className={`h-9 w-full grid ${showConflitsTab ? 'grid-cols-4' : 'grid-cols-3'} sm:w-auto sm:inline-flex`}>
            <TabsTrigger value="calendar" className="gap-1 text-xs px-2 sm:px-3 h-7">
              <CalendarIcon className="h-3 w-3" />
              Calendrier
            </TabsTrigger>
            <TabsTrigger value="pointage" className="gap-1 text-xs px-2 sm:px-3 h-7">
              <ClipboardCheck className="h-3 w-3" />
              Pointage
            </TabsTrigger>
            {showConflitsTab && (
              <TabsTrigger value="conflicts" className="gap-1 text-xs px-2 sm:px-3 h-7">
                <AlertTriangle className="h-3 w-3" />
                Conflits
              </TabsTrigger>
            )}
            <TabsTrigger value="events" className="gap-1 text-xs px-2 sm:px-3 h-7">
              <List className="h-3 w-3" />
              Gestion
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Mobile: 4 tabs always visible */}
      <div className="sm:hidden flex items-center justify-center">
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => onTabChange('calendar')}
            className={`px-2.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'calendar' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <CalendarIcon className="h-3 w-3 inline mr-0.5" />
            <span translate="no">Calendrier</span>
          </button>
          <button
            onClick={() => onTabChange('pointage')}
            className={`px-2.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'pointage' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <ClipboardCheck className="h-3 w-3 inline mr-0.5" />
            Pointage
          </button>
          <button
            onClick={() => onTabChange('conflicts')}
            className={`px-2.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'conflicts' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <AlertTriangle className="h-3 w-3 inline mr-0.5" />
            Conflits
          </button>
          <button
            onClick={() => onTabChange('events')}
            className={`px-2.5 py-1.5 rounded-full transition-colors ${
              activeTab === 'events' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            <List className="h-3 w-3 inline mr-0.5" />
            Gestion
          </button>
        </div>
      </div>

      {/* View Mode Toggle + Navigation */}
      {activeTab === 'calendar' && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center rounded-lg border border-border bg-muted/50 p-0.5">
            <Button 
              variant={viewMode === 'year' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('year')}
              className="h-7 px-2 text-xs rounded-md gap-1"
            >
              <LayoutGrid className="w-3 h-3" />
              <span translate="no">Année</span>
            </Button>
            <Button 
              variant={viewMode === 'month' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('month')}
              className="h-7 px-2 text-xs rounded-md gap-1"
            >
              <CalendarIcon className="w-3 h-3" />
              Mois
            </Button>
            <Button 
              variant={viewMode === 'week' ? 'secondary' : 'ghost'} 
              size="sm"
              onClick={() => onViewModeChange('week')}
              className="h-7 px-2 text-xs rounded-md gap-1"
            >
              <List className="w-3 h-3" />
              Sem.
            </Button>
          </div>

          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
            <Button variant="ghost" size="icon" onClick={onPrevMonth} className="h-8 w-8 rounded-md">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onToday} className="h-8 px-2 rounded-md text-xs font-medium">
              <span className="hidden sm:inline">Aujourd'hui</span>
              <span className="sm:hidden">Auj.</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onNextMonth} className="h-8 w-8 rounded-md">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <Button onClick={onAddEvent} size="sm" className="hidden sm:flex h-8 gap-1 rounded-lg shadow-sm text-xs">
            <Plus className="w-3 h-3" />
            <span>Ajouter</span>
          </Button>
        </div>
      )}
    </div>
  );
}
```


// path: src/components/Calendar/UnifiedVacationBar.tsx
```ts
import { useMemo } from 'react';
import { Vacation, CalendarSettings } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  differenceInDays,
  format,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CollapsibleSection } from './CollapsibleSection';

interface UnifiedVacationBarProps {
  vacations: Vacation[];
  currentDate: Date;
  settings: CalendarSettings;
  viewMode: 'year' | 'month';
  defaultExpanded?: boolean;
}

export function UnifiedVacationBar({ 
  vacations, 
  currentDate, 
  settings, 
  viewMode,
  defaultExpanded = true 
}: UnifiedVacationBarProps) {
  const { periodStart, periodEnd, totalDays } = useMemo(() => {
    if (viewMode === 'year') {
      const start = startOfYear(currentDate);
      const end = endOfYear(currentDate);
      return { periodStart: start, periodEnd: end, totalDays: differenceInDays(end, start) + 1 };
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return { periodStart: start, periodEnd: end, totalDays: differenceInDays(end, start) + 1 };
    }
  }, [currentDate, viewMode]);

  // Create vacation segments for display on a SINGLE line
  const vacationSegments = useMemo(() => {
    return vacations
      .filter(vac => vac.startDate <= periodEnd && vac.endDate >= periodStart)
      .map(vac => {
        const displayStart = vac.startDate < periodStart ? periodStart : vac.startDate;
        const displayEnd = vac.endDate > periodEnd ? periodEnd : vac.endDate;
        
        const startDayIndex = differenceInDays(displayStart, periodStart);
        const width = differenceInDays(displayEnd, displayStart) + 1;
        
        return {
          ...vac,
          startIndex: startDayIndex,
          width,
          leftPercent: (startDayIndex / totalDays) * 100,
          widthPercent: (width / totalDays) * 100,
        };
      })
      .sort((a, b) => a.startIndex - b.startIndex);
  }, [vacations, periodStart, periodEnd, totalDays]);

  if (vacationSegments.length === 0) return null;

  return (
    <CollapsibleSection 
      title="Vacances Scolaires" 
      icon="🏖️"
      defaultExpanded={defaultExpanded}
      className="mb-3"
    >
      <div className="p-3 sm:p-4">
        <div className="relative">
          {/* Month markers for year view */}
          {viewMode === 'year' && (
            <div className="flex mb-1">
              {eachMonthOfInterval({ start: periodStart, end: periodEnd }).map((month, index) => (
                <div 
                  key={index} 
                  className="flex-1 text-[8px] sm:text-[10px] text-muted-foreground text-center border-r border-border/30 last:border-r-0"
                >
                  {format(month, 'MMM', { locale: fr })}
                </div>
              ))}
            </div>
          )}

          {/* Single line with all vacation segments */}
          <div className="relative h-7 sm:h-8 bg-muted/20 rounded-full overflow-hidden">
            {vacationSegments.map(vac => (
              <div
                key={vac.id}
                className="absolute h-full flex items-center justify-center px-1 sm:px-2 text-[9px] sm:text-[11px] font-medium shadow-sm overflow-hidden rounded-full transition-transform hover:scale-[1.02] hover:z-10"
                style={{
                  left: `${vac.leftPercent}%`,
                  width: `${vac.widthPercent}%`,
                  backgroundColor: settings.vacationColor,
                  color: settings.vacationTextColor || '#2D2A00',
                  minWidth: '16px',
                }}
                title={`${vac.name} (${format(vac.startDate, 'dd/MM')} - ${format(vac.endDate, 'dd/MM')})`}
              >
                <span className="truncate">{vac.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
}

```


// path: src/components/Calendar/UnifiedYearView.tsx
```ts
import { useMemo } from 'react';
import { 
  startOfYear,
  endOfYear,
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  eachMonthOfInterval,
  isSameMonth,
  isToday,
  isWeekend,
  format,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, CalendarEvent, CancelledAstreinteDate, Arret } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { useOrientation } from '@/hooks/useOrientation';
import { getArretColor, getArretPattern } from '@/lib/trancheColors';
import { isSameDay, isWithinInterval } from 'date-fns';

interface UnifiedYearViewProps {
  year: number;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  isREDay: (date: Date) => CalendarEvent | null;
  isCPDay: (date: Date) => CalendarEvent | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  getNonREEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onMonthClick?: (date: Date) => void;
  onDayClick?: (date: Date) => void;
}

const WEEKDAYS_SHORT = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function computeWeekBars(
  items: Array<{ startDate: Date; endDate: Date; name: string; color: string }>,
  weekDays: Date[]
): Array<{ startCol: number; span: number; item: typeof items[0] }> {
  const bars: Array<{ startCol: number; span: number; item: typeof items[0] }> = [];
  items.forEach(item => {
    let startCol = -1;
    let span = 0;
    weekDays.forEach((day, index) => {
      if (day >= item.startDate && day <= item.endDate) {
        if (startCol === -1) startCol = index;
        span++;
      }
    });
    if (startCol !== -1 && span > 0) {
      bars.push({ startCol, span, item });
    }
  });
  return bars;
}

export function UnifiedYearView({
  year,
  settings,
  astreintes,
  vacations,
  arrets,
  isAstreinteDay,
  hasConflict,
  isHoliday,
  isREDay,
  isCPDay,
  getNonREEventsForDate,
  isDateCancelled,
  onMonthClick,
  onDayClick,
}: UnifiedYearViewProps) {
  const { isMobileLandscape } = useOrientation();

  const months = useMemo(() => {
    const yearStart = startOfYear(new Date(year, 0, 1));
    const yearEnd = endOfYear(yearStart);
    return eachMonthOfInterval({ start: yearStart, end: yearEnd });
  }, [year]);

  const gridCols = isMobileLandscape 
    ? 'grid-cols-3' 
    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

  if (!months || months.length === 0) return null;

  return (
    <div className={cn("grid gap-2 sm:gap-3 lg:gap-4", gridCols)}>
      {months.map((month) => (
        <MonthMiniCard
          key={month.toString()}
          month={month}
          settings={settings}
          astreintes={astreintes}
          vacations={vacations}
          arrets={arrets}
          isAstreinteDay={isAstreinteDay}
          hasConflict={hasConflict}
          isHoliday={isHoliday}
          isREDay={isREDay}
          isCPDay={isCPDay}
          getNonREEventsForDate={getNonREEventsForDate}
          isDateCancelled={isDateCancelled}
          onMonthClick={onMonthClick}
          onDayClick={onDayClick}
        />
      ))}
    </div>
  );
}

function MonthMiniCard({
  month,
  settings,
  astreintes,
  vacations,
  arrets,
  isAstreinteDay,
  hasConflict,
  isHoliday,
  isREDay,
  isCPDay,
  getNonREEventsForDate,
  isDateCancelled,
  onMonthClick,
  onDayClick,
}: {
  month: Date;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  isHoliday: (date: Date) => Holiday | null;
  isREDay: (date: Date) => CalendarEvent | null;
  isCPDay: (date: Date) => CalendarEvent | null;
  getNonREEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onMonthClick?: (date: Date) => void;
  onDayClick?: (date: Date) => void;
}) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // Vacation bars
  const vacItems = vacations
    .filter(v => v.startDate <= monthEnd && v.endDate >= monthStart)
    .map(v => ({ ...v, color: settings.vacationColor }));

  // Arrêt bars (AT only) - shown as context bars above days
  const arretATItems = arrets
    .filter(a => a.type === 'arret' && a.startDate <= monthEnd && a.endDate >= monthStart)
    .map(a => ({ ...a, color: a.color || getArretColor(a, settings) }));

  // Prépa modules - also shown as context bars above days (half-width, centered, with patterns)
  const prepaItems = arrets
    .filter(a => a.type === 'prepa' && a.startDate <= monthEnd && a.endDate >= monthStart)
    .map(a => ({ ...a, color: a.color || getArretColor(a, settings) }));

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <button
        onClick={() => onMonthClick?.(month)}
        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 hover:opacity-90 transition-colors text-center touch-manipulation"
        style={{ backgroundColor: settings.yearMonthBgColor, color: settings.yearMonthTextColor }}
      >
        <span className="text-xs sm:text-sm font-semibold capitalize">
          {format(month, 'MMMM', { locale: fr })}
        </span>
      </button>

      <div className="grid grid-cols-7 bg-muted/30">
        {WEEKDAYS_SHORT.map((day, index) => (
          <div 
            key={`${month}-${day}-${index}`}
            className={cn(
              "py-0.5 text-center text-[8px] sm:text-[10px] font-medium text-muted-foreground",
              index >= 5 && "text-primary/60"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="p-0.5 sm:p-1">
        {weeks.map((week, weekIndex) => {
          const weekVacBars = computeWeekBars(vacItems, week);
          const weekArretBars = computeWeekBars(arretATItems, week);
          const weekPrepaBars = computeWeekBars(prepaItems, week);
          const hasContextBars = weekVacBars.length > 0 || weekArretBars.length > 0 || weekPrepaBars.length > 0;

          return (
            <div key={weekIndex}>
              {hasContextBars && (
                <div className="relative px-0.5 space-y-px py-px">
                  {weekVacBars.map((bar, idx) => (
                    <div
                      key={`vac-${idx}`}
                      className="h-[5px] sm:h-[6px] rounded-sm text-[5px] text-white flex items-center justify-center truncate"
                      style={{
                        backgroundColor: bar.item.color,
                        marginLeft: `${(bar.startCol / 7) * 100}%`,
                        width: `${(bar.span / 7) * 100}%`,
                      }}
                      title={bar.item.name}
                    />
                  ))}
                  {weekArretBars.map((bar, idx) => (
                    <div
                      key={`arret-${idx}`}
                      className="h-[5px] sm:h-[6px] rounded-sm text-[5px] text-white flex items-center justify-center truncate"
                      style={{
                        backgroundColor: bar.item.color,
                        marginLeft: `${(bar.startCol / 7) * 100}%`,
                        width: `${(bar.span / 7) * 100}%`,
                      }}
                      title={bar.item.name}
                    />
                  ))}
                  {/* Prépa modules: individual half-width centered lines per day */}
                  <div className="grid grid-cols-7 gap-px">
                    {week.map((day, dayIdx) => {
                      const isCurrentMonth = isSameMonth(day, month);
                      if (!isCurrentMonth) return <div key={`prepa-empty-${dayIdx}`} />;
                      
                      // Find all prepa modules active on this day
                      const dayPrepas = prepaItems.filter(p => {
                        const d = day.getTime();
                        return d >= p.startDate.getTime() && d <= p.endDate.getTime();
                      });
                      
                      if (dayPrepas.length === 0) return <div key={`prepa-empty-${dayIdx}`} />;
                      
                      return (
                        <div key={`prepa-day-${dayIdx}`} className="flex flex-col items-center gap-px">
                          {dayPrepas.map((prepa, pIdx) => {
                            const pattern = getArretPattern(prepa);
                            return (
                              <div
                                key={`prepa-${dayIdx}-${pIdx}`}
                                className="h-[4px] sm:h-[5px] rounded-sm relative overflow-hidden"
                                style={{
                                  backgroundColor: prepa.color,
                                  width: '50%',
                                }}
                                title={prepa.name}
                              >
                                {pattern !== 'none' && (
                                  <div className="absolute inset-0 opacity-60" style={{
                                    backgroundImage: pattern === 'stripes'
                                      ? `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)`
                                      : pattern === 'dots'
                                      ? `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`
                                      : pattern === 'crosshatch'
                                      ? `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px), repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)`
                                      : pattern === 'diagonal'
                                      ? `repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)`
                                      : pattern === 'waves'
                                      ? `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)`
                                      : pattern === 'grid'
                                      ? `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)`
                                      : 'none',
                                    backgroundSize: pattern === 'dots' ? '4px 4px' : undefined,
                                  }} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-7 gap-px">
                {week.map((day, dayIndex) => {
                  const isCurrentMonth = isSameMonth(day, month);
                  const isTodayDate = isToday(day);
                  const isWeekendDay = isWeekend(day);
                  const astreinte = isAstreinteDay(day, astreintes);
                  const holiday = isHoliday(day);
                  const cancelled = isDateCancelled(day);
                  const conflict = hasConflict(day, astreintes);
                  const reDay = isREDay(day);
                  const cpDay = isCPDay(day);
                  const events = getNonREEventsForDate(day);
                  
                  const hasActiveAstreinte = astreinte && !astreinte.isCancelled && !cancelled;
                  const showCPBackground = cpDay && !hasActiveAstreinte;
                  const showREBackground = reDay && !hasActiveAstreinte && !showCPBackground;
                  const hasEvents = events.length > 0;

                  // Prépa modules now shown as context bars, not in cells

                  let cellBgColor = undefined;
                  if (hasActiveAstreinte && isCurrentMonth) {
                    cellBgColor = astreinte.isPonctuelle 
                      ? settings.astreintePonctuelleColor 
                      : settings.astreinteColor;
                  } else if (showCPBackground && isCurrentMonth) {
                    cellBgColor = settings.cpColor;
                  } else if (showREBackground && isCurrentMonth) {
                    cellBgColor = settings.reColor;
                  }

                  return (
                    <button
                      key={dayIndex}
                      onClick={() => isCurrentMonth && onDayClick?.(day)}
                      disabled={!isCurrentMonth}
                      className={cn(
                        "relative aspect-square flex flex-col items-center justify-center text-[9px] sm:text-[10px] rounded-sm transition-all",
                        "touch-manipulation active:scale-95",
                        !isCurrentMonth && "opacity-20",
                        isCurrentMonth && !showREBackground && !showCPBackground && !hasActiveAstreinte && "hover:bg-accent/50",
                        isTodayDate && "ring-1 ring-primary font-bold",
                        hasActiveAstreinte && isCurrentMonth && "text-white"
                      )}
                      style={{
                        ...(cellBgColor ? { backgroundColor: cellBgColor } : {}),
                        ...(!cellBgColor && isCurrentMonth && (isWeekendDay || (holiday != null))
                          ? { backgroundColor: settings.weekendDaysBgColor, color: settings.weekendDaysTextColor }
                          : {}),
                        ...(holiday && isCurrentMonth && !hasActiveAstreinte && !cellBgColor
                          ? { color: settings.weekendDaysTextColor }
                          : {}),
                      }}
                    >
                      {format(day, 'd')}

                      {isCurrentMonth && (
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-px pb-0.5">
                          {hasEvents && !hasActiveAstreinte && (
                            <div 
                              className="w-2 h-0.5 rounded-full"
                              style={{ backgroundColor: events[0].color }}
                            />
                          )}
                          {cancelled && (
                            <div 
                              className="w-2 h-0.5 rounded-full"
                              style={{ backgroundColor: settings.astreinteCancelledColor }}
                            />
                          )}
                        </div>
                      )}
                      
                      {conflict && isCurrentMonth && (
                        <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-destructive" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```


// path: src/components/Calendar/VacationBar.tsx
```ts
import { useMemo } from 'react';
import { Vacation, CalendarSettings } from '@/types/calendar';
import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  differenceInDays,
  format,
} from 'date-fns';

interface VacationBarProps {
  vacations: Vacation[];
  currentDate: Date;
  settings: CalendarSettings;
}

export function VacationBar({ vacations, currentDate, settings }: VacationBarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const vacationBars = useMemo(() => {
    return vacations
      .filter(vac => vac.startDate <= monthEnd && vac.endDate >= monthStart)
      .map(vac => {
        const displayStart = vac.startDate < monthStart ? monthStart : vac.startDate;
        const displayEnd = vac.endDate > monthEnd ? monthEnd : vac.endDate;
        
        const startDayIndex = differenceInDays(displayStart, monthStart);
        const endDayIndex = differenceInDays(displayEnd, monthStart);
        const width = endDayIndex - startDayIndex + 1;
        
        return {
          ...vac,
          startIndex: startDayIndex,
          width,
        };
      });
  }, [vacations, monthStart, monthEnd]);

  if (vacationBars.length === 0) return null;

  return (
    <div className="mb-4 bg-card rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-2 bg-vacation/10 border-b border-border flex items-center gap-2">
        <span className="text-lg">🏖️</span>
        <h3 className="text-sm font-semibold text-foreground">Vacances Scolaires</h3>
      </div>
      
      <div className="p-4">
        <div className="relative">
          {/* Grid background */}
          <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${daysInMonth.length}, 1fr)` }}>
            {daysInMonth.map((day, index) => (
              <div 
                key={index} 
                className="h-4 bg-muted/30 text-[8px] text-muted-foreground text-center"
              >
                {format(day, 'd')}
              </div>
            ))}
          </div>

          {/* Vacation bars */}
          <div className="mt-2 space-y-1">
            {vacationBars.map(vac => (
              <div
                key={vac.id}
                className="relative h-7"
              >
                <div
                  className="absolute h-full rounded-full flex items-center justify-center px-3 text-xs font-medium text-white shadow-sm overflow-hidden"
                  style={{
                    left: `${(vac.startIndex / daysInMonth.length) * 100}%`,
                    width: `${(vac.width / daysInMonth.length) * 100}%`,
                    backgroundColor: settings.vacationColor,
                  }}
                  title={vac.name}
                >
                  <span className="truncate text-[11px]">{vac.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/WeekHeader.tsx
```ts
import { CalendarSettings } from '@/types/calendar';

interface WeekHeaderProps {
  settings: CalendarSettings;
}

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export function WeekHeader({ settings }: WeekHeaderProps) {
  return (
    <div className="grid grid-cols-7 border-b border-calendar-grid">
      {weekDays.map((day, index) => (
        <div
          key={day}
          className="py-3 text-center text-sm font-semibold border-r border-calendar-grid last:border-r-0"
          style={{
            backgroundColor: settings.monthHeaderBgColor,
            color: settings.monthHeaderTextColor,
          }}
        >
          {day}
        </div>
      ))}
    </div>
  );
}

```


// path: src/components/Calendar/WeekTimeline.tsx
```ts
import { useMemo } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Astreinte, Holiday, CalendarSettings, CancelledAstreinteDate } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface WeekTimelineProps {
  weekStartDate: Date;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  isHoliday: (date: Date) => Holiday | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  onDayClick?: (date: Date) => void;
}

const START_HOUR = 5;
const END_HOUR = 21;
const TOTAL_HOURS = END_HOUR - START_HOUR;
const HOUR_HEIGHT = 40;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + (m || 0);
}

function getTopAndHeight(startTime?: string, endTime?: string): { top: number; height: number } {
  const startMinutes = startTime ? timeToMinutes(startTime) : START_HOUR * 60;
  const endMinutes = endTime ? timeToMinutes(endTime) : END_HOUR * 60;
  const clampedStart = Math.max(startMinutes, START_HOUR * 60);
  const clampedEnd = Math.min(endMinutes, END_HOUR * 60);
  const top = ((clampedStart - START_HOUR * 60) / (TOTAL_HOURS * 60)) * (TOTAL_HOURS * HOUR_HEIGHT);
  const height = Math.max(((clampedEnd - clampedStart) / (TOTAL_HOURS * 60)) * (TOTAL_HOURS * HOUR_HEIGHT), HOUR_HEIGHT / 2);
  return { top, height };
}

export function WeekTimeline({
  weekStartDate,
  settings,
  astreintes,
  isAstreinteDay,
  isHoliday,
  getEventsForDate,
  isDateCancelled,
  onDayClick,
}: WeekTimelineProps) {
  const weekStart = useMemo(() => startOfWeek(weekStartDate, { weekStartsOn: 1 }), [weekStartDate]);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  const hours = useMemo(() => Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => START_HOUR + i), []);

  return (
    <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
      {/* Week header with day names */}
      <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b border-border" style={{ backgroundColor: settings.monthHeaderBgColor }}>
        <div className="py-2 text-center text-xs font-medium" style={{ color: settings.monthHeaderTextColor }}>
          H.
        </div>
        {weekDays.map((day, i) => {
          const holiday = isHoliday(day);
          return (
            <button
              key={i}
              onClick={() => onDayClick?.(day)}
              className={cn(
                "py-2 text-center text-xs font-semibold hover:opacity-80 transition-opacity",
                holiday && "underline"
              )}
              style={{ color: settings.monthHeaderTextColor }}
            >
              <div>{format(day, 'EEE', { locale: fr })}</div>
              <div className="text-sm">{format(day, 'd')}</div>
              {holiday && <div className="text-[9px] opacity-75">{holiday.name}</div>}
            </button>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="grid grid-cols-[50px_repeat(7,1fr)]" style={{ height: TOTAL_HOURS * HOUR_HEIGHT }}>
        {/* Hour labels column */}
        <div className="relative border-r border-border">
          {hours.map((hour, i) => (
            <div
              key={hour}
              className="absolute left-0 right-0 text-[10px] text-muted-foreground font-mono text-right pr-1"
              style={{ top: i * HOUR_HEIGHT - 7 }}
            >
              {String(hour).padStart(2, '0')}:00
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, dayIdx) => {
          const dayEvents = getEventsForDate(day);
          const astreinte = isAstreinteDay(day, astreintes);
          const cancelled = isDateCancelled(day);
          const hasActiveAstreinte = astreinte && !astreinte.isCancelled && !cancelled;

          return (
            <div
              key={dayIdx}
              className={cn(
                "relative border-r border-border/30 last:border-r-0",
                dayIdx >= 5 && "bg-muted/20"
              )}
              onClick={() => onDayClick?.(day)}
            >
              {/* Hour grid lines */}
              {hours.map((hour, i) => (
                <div
                  key={hour}
                  className="absolute left-0 right-0 border-t border-border/20"
                  style={{ top: i * HOUR_HEIGHT }}
                />
              ))}

              {/* Separator lines at 8h, 12h, 12h45, 16h45 */}
              {[
                { time: '08:00', color: 'hsl(var(--primary))', width: 2 },
                { time: '12:00', color: 'hsl(var(--destructive))', width: 1.5 },
                { time: '12:45', color: 'hsl(var(--destructive))', width: 1.5 },
                { time: '16:45', color: 'hsl(var(--primary))', width: 2 },
              ].map(({ time, color, width }) => {
                const minutes = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
                const top = ((minutes - START_HOUR * 60) / (TOTAL_HOURS * 60)) * (TOTAL_HOURS * HOUR_HEIGHT);
                return (
                  <div
                    key={time}
                    className="absolute left-0 right-0 z-[5]"
                    style={{ top, height: width, backgroundColor: color, opacity: 0.5 }}
                  />
                );
              })}

              {/* Astreinte background */}
              {hasActiveAstreinte && (() => {
                const pos = getTopAndHeight('05:00', '21:00'); // Astreintes are 24h
                return (
                  <div
                    className="absolute inset-x-0.5 rounded-sm opacity-15"
                    style={{
                      top: pos.top,
                      height: pos.height,
                      backgroundColor: astreinte.isPonctuelle
                        ? settings.astreintePonctuelleColor
                        : settings.astreinteColor,
                    }}
                  />
                );
              })()}

              {/* Cancelled background */}
              {cancelled && !hasActiveAstreinte && (() => {
                const pos = getTopAndHeight('05:00', '21:00');
                return (
                  <div
                    className="absolute inset-x-0.5 rounded-sm opacity-20 pattern-crosshatch"
                    style={{
                      top: pos.top,
                      height: pos.height,
                      backgroundColor: settings.astreinteCancelledColor,
                    }}
                  />
                );
              })()}

              {/* Events */}
              {dayEvents.filter(e => e.type !== 're' && e.type !== 'cp').map((event, idx) => {
                const pos = getTopAndHeight(event.startTime, event.endTime);
                return (
                  <div
                    key={event.id || idx}
                    className="absolute left-0.5 right-0.5 rounded text-[9px] text-white font-medium px-1 truncate shadow-sm flex items-center"
                    style={{
                      top: pos.top + 1,
                      height: Math.max(pos.height - 2, 16),
                      backgroundColor: event.color,
                      zIndex: 10 + idx,
                    }}
                    title={`${event.name}${event.startTime ? ` (${event.startTime}-${event.endTime})` : ''}`}
                  >
                    {event.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

```


// path: src/components/Calendar/YearView.tsx
```ts
import { useMemo } from 'react';
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isWeekend,
  format,
  differenceInDays,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarSettings, Astreinte, Holiday, Vacation, Arret, CancelledAstreinteDate, PatternType, CalendarEvent } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { getArretColor } from '@/lib/trancheColors';
import { AlertTriangle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes-mini',
  dots: 'pattern-dots-mini',
  crosshatch: 'pattern-crosshatch-mini',
  waves: 'pattern-waves-mini',
  diagonal: 'pattern-diagonal-mini',
  grid: 'pattern-grid-mini',
  zigzag: 'pattern-zigzag-mini',
};

interface YearViewProps {
  year: number;
  settings: CalendarSettings;
  astreintes: Astreinte[];
  holidays: Holiday[];
  vacations: Vacation[];
  arrets: Arret[];
  onMonthClick: (date: Date) => void;
  onDayClick: (date: Date) => void;
  isAstreinteDay: (date: Date, astreintes: Astreinte[]) => Astreinte | null;
  isDateCancelled: (date: Date) => CancelledAstreinteDate | null;
  isHoliday: (date: Date) => Holiday | null;
  isVacationDay: (date: Date) => Vacation | null;
  isArretDay: (date: Date) => Arret | null;
  getEventsForDate: (date: Date) => CalendarEvent[];
  hasConflict: (date: Date, astreintes: Astreinte[]) => boolean;
  getConflictDetails: (date: Date, astreintes: Astreinte[]) => string[];
}

const MONTHS = Array.from({ length: 12 }, (_, i) => i);
const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function YearView({
  year,
  settings,
  astreintes,
  holidays,
  vacations,
  arrets,
  onMonthClick,
  onDayClick,
  isAstreinteDay,
  isDateCancelled,
  isHoliday,
  isVacationDay,
  isArretDay,
  getEventsForDate,
  hasConflict,
  getConflictDetails,
}: YearViewProps) {
  const monthsData = useMemo(() => {
    return MONTHS.map(month => {
      const date = new Date(year, month, 1);
      const monthStart = startOfMonth(date);
      const monthEnd = endOfMonth(date);
      const calendarStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
      const calendarEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
      const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
      
      // Get arrets for this month
      const monthArrets = arrets.filter(
        arret => arret.startDate <= monthEnd && arret.endDate >= monthStart
      );
      
      // Get vacations for this month
      const monthVacations = vacations.filter(
        vac => vac.startDate <= monthEnd && vac.endDate >= monthStart
      );
      
      return { date, days, monthArrets, monthVacations, monthStart, monthEnd };
    });
  }, [year, arrets, vacations]);

  const getAstreinteForDate = (date: Date) => {
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);
    
    // Filter relevant astreintes
    const relevantAstreintes = astreintes.filter(a => 
      a.startDate <= yearEnd && a.endDate >= yearStart
    );
    
    return isAstreinteDay(date, relevantAstreintes);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
      {monthsData.map(({ date, days, monthArrets, monthVacations, monthStart, monthEnd }) => {
        // Calculate vacation bars for mini display
        const vacationBars = monthVacations.map(vac => {
          const displayStart = vac.startDate < monthStart ? monthStart : vac.startDate;
          const displayEnd = vac.endDate > monthEnd ? monthEnd : vac.endDate;
          const daysInMonth = differenceInDays(monthEnd, monthStart) + 1;
          const startDayIndex = differenceInDays(displayStart, monthStart);
          const width = differenceInDays(displayEnd, displayStart) + 1;
          
          return {
            ...vac,
            left: (startDayIndex / daysInMonth) * 100,
            width: (width / daysInMonth) * 100,
          };
        });
        
        // Calculate arret bars for mini display - group by row for multi-line support
        const arretBars = monthArrets.map(arret => {
          const displayStart = arret.startDate < monthStart ? monthStart : arret.startDate;
          const displayEnd = arret.endDate > monthEnd ? monthEnd : arret.endDate;
          const daysInMonth = differenceInDays(monthEnd, monthStart) + 1;
          const startDayIndex = differenceInDays(displayStart, monthStart);
          const width = differenceInDays(displayEnd, displayStart) + 1;
          
          return {
            ...arret,
            left: (startDayIndex / daysInMonth) * 100,
            width: (width / daysInMonth) * 100,
            displayColor: arret.color || getArretColor(arret, settings),
          };
        });
        
        // Sort bars and assign to rows (up to 3 rows)
        const sortedBars = [...arretBars].sort((a, b) => a.left - b.left);
        const rows: typeof arretBars[] = [[], [], []];
        
        sortedBars.forEach(bar => {
          // Find the first row where this bar fits (no overlap)
          for (let i = 0; i < 3; i++) {
            const rowBars = rows[i];
            const overlaps = rowBars.some(existing => 
              !(bar.left + bar.width <= existing.left || bar.left >= existing.left + existing.width)
            );
            if (!overlaps) {
              rows[i].push(bar);
              break;
            }
          }
        });
        
        // Filter out empty rows
        const activeRows = rows.filter(row => row.length > 0);
        
        return (
          <div
            key={date.getMonth()}
            className="bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            onClick={() => onMonthClick(date)}
          >
            {/* Month header */}
            <div 
              className="px-2 sm:px-3 py-1.5 sm:py-2 text-center font-semibold text-white text-xs sm:text-sm"
              style={{ backgroundColor: settings.yearMonthBgColor, color: settings.yearMonthTextColor }}
            >
              {format(date, 'MMM', { locale: fr })}
              <span className="hidden sm:inline">{format(date, 'MMM', { locale: fr }).length < 4 ? '' : ''}</span>
            </div>
            
            {/* Vacation indicator bar with day numbers */}
            <div className="relative h-5 bg-muted/20">
              {/* Day numbers grid overlay */}
              <div className="absolute inset-0 grid grid-cols-31 pointer-events-none">
                {Array.from({ length: differenceInDays(monthEnd, monthStart) + 1 }, (_, i) => (
                  <div 
                    key={i} 
                    className="text-[7px] text-center text-muted-foreground/60 leading-5 font-medium"
                    style={{ width: `${100 / (differenceInDays(monthEnd, monthStart) + 1)}%` }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              {/* Vacation bars */}
              {vacationBars.map(vac => (
                <div
                  key={vac.id}
                  className="absolute h-full flex items-center justify-center"
                  style={{ 
                    left: `${vac.left}%`,
                    width: `${vac.width}%`,
                    backgroundColor: settings.vacationColor,
                  }}
                  title={vac.name}
                >
                  <span className="text-[7px] text-white font-medium truncate px-1">{vac.name}</span>
                </div>
              ))}
            </div>
            
            {/* Arret indicator bars - up to 3 rows for overlapping */}
            {activeRows.length > 0 && (
              <div className="space-y-0.5">
                {activeRows.map((rowBars, rowIndex) => (
                  <div key={rowIndex} className="relative h-4 bg-muted/20">
                    {rowBars.map(arret => (
                      <div
                        key={arret.id}
                        className={cn(
                          "absolute h-full flex items-center justify-center",
                          arret.type === 'prepa' && 'opacity-80',
                          arret.pattern && arret.pattern !== 'none' && patternClasses[arret.pattern]
                        )}
                        style={{ 
                          left: `${arret.left}%`,
                          width: `${arret.width}%`,
                          backgroundColor: arret.displayColor,
                        }}
                        title={`${arret.name} (${arret.tranche})`}
                      >
                        <span className="text-[7px] text-white font-medium truncate px-1">{arret.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            
            {/* Weekday headers */}
            <div className="grid grid-cols-7 bg-muted/30">
              {WEEKDAYS.map((day, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "text-[10px] text-center py-0.5 font-medium",
                    i >= 5 ? "text-muted-foreground" : "text-foreground/70"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>
            
            {/* Days grid */}
            <div className="grid grid-cols-7 gap-px p-0.5 sm:p-1">
              {days.map((day, index) => {
                const inMonth = isSameMonth(day, date);
                const todayDate = isToday(day);
                const weekend = isWeekend(day);
                const astreinte = inMonth ? getAstreinteForDate(day) : null;
                const cancelledInfo = inMonth ? isDateCancelled(day) : null;
                const holiday = inMonth ? isHoliday(day) : null;
                const vacation = inMonth ? isVacationDay(day) : null;
                const arret = inMonth ? isArretDay(day) : null;
                const dayEvents = inMonth ? getEventsForDate(day) : [];
                const conflict = inMonth ? hasConflict(day, astreintes) : false;
                const conflictDetails = conflict ? getConflictDetails(day, astreintes) : [];

                // Determine background color and pattern
                let bgColor: string | undefined;
                let patternClass = '';

                if (cancelledInfo) {
                  bgColor = settings.astreinteCancelledColor;
                  patternClass = patternClasses[settings.astreinteCancelledPattern];
                } else if (astreinte && !astreinte.isCancelled) {
                  bgColor = astreinte.isPonctuelle
                    ? settings.astreintePonctuelleColor
                    : settings.astreinteColor;
                }

                return (
                  <div
                    key={index}
                    className={cn(
                      "relative text-[7px] sm:text-[9px] h-5 sm:h-7 rounded-sm cursor-pointer hover:ring-1 hover:ring-primary/50 overflow-hidden",
                      !inMonth && "text-muted-foreground/30 pointer-events-none",
                      inMonth && weekend && "text-muted-foreground bg-muted/30",
                      inMonth && todayDate && "ring-1 ring-primary font-bold",
                      inMonth && holiday && !todayDate && "text-holiday font-bold",
                      patternClass
                    )}
                    style={
                      inMonth && bgColor && !todayDate
                        ? { backgroundColor: bgColor, color: '#fff' }
                        : undefined
                    }
                    onClick={(e) => {
                      if (inMonth) {
                        e.stopPropagation();
                        onDayClick(day);
                      }
                    }}
                  >
                    {/* Vacation bar - top (larger) */}
                    {vacation && inMonth && (
                      <div 
                        className="absolute top-0 left-0 right-0 h-[3px]"
                        style={{ backgroundColor: settings.vacationColor }}
                      />
                    )}

                    {/* Arret bar - below vacation (larger) */}
                    {arret && inMonth && (
                      <div 
                        className={cn(
                          "absolute left-0 right-0 h-[3px]",
                          arret.type === 'prepa' && 'opacity-70',
                          arret.pattern && arret.pattern !== 'none' && patternClasses[arret.pattern]
                        )}
                        style={{ 
                          top: vacation ? '3px' : '0px',
                          backgroundColor: arret.color || getArretColor(arret, settings),
                        }}
                      />
                    )}

                    {/* Day number (top-left like month view) */}
                    <span className={cn(
                      "absolute left-[3px] top-[3px] leading-none",
                      (vacation || arret) && "top-[5px]"
                    )}>
                      {inMonth ? format(day, 'd') : ''}
                    </span>

                    {/* Event band (middle of cell) */}
                    {inMonth && dayEvents.length > 0 && (
                      <div 
                        className="absolute left-0 right-0 h-[3px] top-1/2 -translate-y-1/2 z-10"
                        style={{ backgroundColor: dayEvents[0].color }}
                        title={dayEvents.map(ev => ev.name).join(', ')}
                      />
                    )}

                    {/* Conflict indicator + message box */}
                    {conflict && inMonth && (
                      <div className="absolute top-0 right-0 z-20">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              type="button"
                              aria-label="Voir les détails du conflit"
                              onPointerDownCapture={(e) => {
                                e.stopPropagation();
                              }}
                              onClickCapture={(e) => {
                                e.stopPropagation();
                              }}
                              onPointerDown={(e) => {
                                e.stopPropagation();
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              className="hover:scale-110 transition-transform"
                            >
                              <AlertTriangle className="w-2.5 h-2.5 text-destructive" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 p-3">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-destructive flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Conflit détecté !
                              </h4>
                              <div className="text-sm text-foreground space-y-1">
                                {conflictDetails.length > 0 ? (
                                  conflictDetails.map((detail, idx) => (
                                    <p key={idx} className="flex items-start gap-2">
                                      <span className="text-destructive">•</span>
                                      {detail}
                                    </p>
                                  ))
                                ) : (
                                  <p>Un événement est en conflit.</p>
                                )}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

```


// path: src/components/Conflicts/ConflictsList.tsx
```ts
import { useMemo } from 'react';
import { format, eachDayOfInterval, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Astreinte, CalendarSettings, CancelledAstreinteDate } from '@/types/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle } from 'lucide-react';

interface ConflictsListProps {
  events: CalendarEvent[];
  astreintes: Astreinte[];
  settings: CalendarSettings;
  year: number;
  cancelledDates?: CancelledAstreinteDate[];
}

interface ConflictItem {
  date: Date;
  astreinte: Astreinte;
  eventName: string;
}

export function ConflictsList({
  events,
  astreintes,
  year,
  cancelledDates = [],
}: ConflictsListProps) {
  const conflicts = useMemo(() => {
    const result: ConflictItem[] = [];
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31);

    // For each astreinte period - only check events (not vacations, holidays, arrets, RE, or CP)
    // Also exclude cancelled dates
    astreintes.forEach(astreinte => {
      if (astreinte.isCancelled) return;
      
      const astreinteStart = astreinte.startDate < yearStart ? yearStart : astreinte.startDate;
      const astreinteEnd = astreinte.endDate > yearEnd ? yearEnd : astreinte.endDate;
      
      if (astreinteStart > yearEnd || astreinteEnd < yearStart) return;

      const days = eachDayOfInterval({ start: astreinteStart, end: astreinteEnd });

      days.forEach(day => {
        // Skip if this date is cancelled
        const isCancelledDate = cancelledDates.some(c => isSameDay(c.date, day));
        if (isCancelledDate) return;

        // Check all events including RE and CP
        events.forEach(event => {
          
          if (day >= event.startDate && day <= event.endDate) {
            const label = event.type === 'cp' ? '21 (Congés annuels)' : event.type === 're' ? 'RE' : event.name;
            result.push({
              date: day,
              astreinte,
              eventName: label,
            });
          }
        });
      });
    });

    // Sort by date
    return result.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events, astreintes, year, cancelledDates]);

  if (conflicts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium">{"Aucun conflit détecté"}</p>
        <p className="text-sm">{"Tous les événements sont compatibles avec les astreintes."}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-destructive">
        <AlertTriangle className="w-5 h-5" />
        <h3 className="font-semibold">{conflicts.length} {"conflit(s) détecté(s) en"} {year}</h3>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Conflit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conflicts.map((conflict, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {format(conflict.date, 'd MMMM yyyy', { locale: fr })}
              </TableCell>
            <TableCell>
                <span className="text-primary font-medium">{conflict.eventName || 'Événement'}</span>
                <span className="text-muted-foreground mx-2">/</span>
                <span className="text-orange-600 font-medium">{"Astreinte"}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

```


// path: src/components/Dashboard/SoldesCounters.tsx
```ts
/**
 * Compteurs permanents RH — W Planner
 * Visibles en haut de l'application, mobile inclus.
 * RC total avec ventilation RC-HS / RC-Autres / RCO.
 */

import { RHState } from '@/stores/rhStore';
import { CalendarDays, Clock, Hash } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SoldesCountersProps {
  rhState: RHState;
}

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d MMMM yyyy", { locale: fr });
  } catch {
    return dateStr;
  }
}

function CounterCard({ icon, label, soldeH, dateStr, colorClass, children }: {
  icon: React.ReactNode;
  label: string;
  soldeH: number;
  dateStr: string;
  colorClass?: string;
  children?: React.ReactNode;
}) {
  const soldeJ = (soldeH / 8).toFixed(1);
  return (
    <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-border bg-card shadow-sm min-w-0">
      <div className={`flex-shrink-0 ${colorClass || ''}`}>{icon}</div>
      <div className="min-w-0">
        <span className="text-[10px] text-muted-foreground block leading-tight" translate="no">{label}</span>
        <span className="font-mono font-semibold text-foreground text-xs">
          {soldeH.toFixed(0)}h
          <span className="text-muted-foreground font-normal"> ({soldeJ}j)</span>
        </span>
        <span className="text-[9px] text-muted-foreground block leading-tight">au {formatDate(dateStr)}</span>
        {children}
      </div>
    </div>
  );
}

export function SoldesCounters({ rhState }: SoldesCountersProps) {
  const rcTotal = rhState.soldeRC011 + rhState.soldeRC012;
  const latestRCDate = rhState.dateSoldeRC011 > rhState.dateSoldeRC012 ? rhState.dateSoldeRC011 : rhState.dateSoldeRC012;

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs">
      <CounterCard
        icon={<CalendarDays className="w-3.5 h-3.5" />}
        label="21 (Congés)"
        soldeH={rhState.solde21}
        dateStr={rhState.dateSolde21}
        colorClass="text-muted-foreground"
      />
      <CounterCard
        icon={<Clock className="w-3.5 h-3.5" />}
        label="RE"
        soldeH={rhState.soldeRE}
        dateStr={rhState.dateSoldeRE}
        colorClass="text-muted-foreground"
      />
      <CounterCard
        icon={<Hash className="w-3.5 h-3.5" />}
        label="RC"
        soldeH={rcTotal}
        dateStr={latestRCDate}
        colorClass="text-muted-foreground"
      >
        <div className="flex gap-1.5 text-[8px] text-muted-foreground leading-tight">
          <span>HS:{rhState.soldeRC011.toFixed(0)}h</span>
          <span>Autres:{rhState.soldeRC012.toFixed(0)}h</span>
        </div>
      </CounterCard>
    </div>
  );
}

```


// path: src/components/Dialogs/AddEventDialog.tsx
```ts
import React, { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type EventTypeOption = 'event' | 'astreinte-ponctuelle' | 'astreinte-cancelled' | 're' | 'cp';

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: {
    type: EventTypeOption;
    name: string;
    startDate: Date;
    endDate: Date;
    startTime?: string;
    endTime?: string;
    color: string;
    excludeWeekends?: boolean;
  }) => void;
  initialDate?: Date;
  existingEvents?: Array<{ name: string; startDate: Date; endDate: Date }>;
}

export function AddEventDialog({ isOpen, onClose, onAdd, initialDate, existingEvents = [] }: AddEventDialogProps) {
  const [type, setType] = useState<EventTypeOption>('event');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(initialDate || new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(initialDate || new Date());
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [color, setColor] = useState('#00AEEF');
  const [startPopoverOpen, setStartPopoverOpen] = useState(false);
  const [endPopoverOpen, setEndPopoverOpen] = useState(false);
  const [excludeWeekends, setExcludeWeekends] = useState(false);

  // Synchronize dates when initialDate changes or dialog opens
  useEffect(() => {
    if (isOpen && initialDate) {
      setStartDate(initialDate);
      setEndDate(initialDate);
    }
  }, [isOpen, initialDate]);

  // Auto-fill end date when start date changes
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    // Auto-fill end date with start date (user can still modify it)
    if (date) {
      setEndDate(date);
    }
    setStartPopoverOpen(false);
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    setEndPopoverOpen(false);
  };

  // Auto-set name and times for specific types
  useEffect(() => {
    if (type === 're' && name === '') {
      setName('RE');
    } else if (type === 'cp' && name === '') {
      setName('21 (Congés annuels)');
    }
    // Default times for cancellations
    if (type === 'astreinte-cancelled') {
      setStartTime('00:00');
      setEndTime('23:59');
    } else if (type === 'event' || type === 'astreinte-ponctuelle') {
      setStartTime('08:00');
      setEndTime('17:00');
    }
  }, [type]);

  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

  const checkForDuplicates = (): boolean => {
    if (!startDate || !endDate) return false;
    return existingEvents.some(e => {
      const overlap = e.startDate <= endDate && e.endDate >= startDate;
      return overlap;
    });
  };

  const handleSubmit = () => {
    if (!startDate || !endDate || !name.trim()) return;
    
    if (!showDuplicateWarning && checkForDuplicates()) {
      setShowDuplicateWarning(true);
      return;
    }
    
    onAdd({
      type,
      name: name.trim(),
      startDate,
      endDate,
      startTime: showTimePicker ? startTime : undefined,
      endTime: showTimePicker ? endTime : undefined,
      color,
      excludeWeekends: excludeWeekends || undefined,
    });
    
    // Reset form
    setName('');
    setType('event');
    setColor('#00AEEF');
    setStartTime('08:00');
    setEndTime('17:00');
    setShowDuplicateWarning(false);
    setExcludeWeekends(false);
    onClose();
  };

  const getTypeDescription = () => {
    switch (type) {
      case 'event':
        return 'Créez un nouvel événement sur le calendrier.';
      case 'astreinte-ponctuelle':
        return 'Ajoutez une astreinte supplémentaire pour les dates sélectionnées.';
      case 'astreinte-cancelled':
        return 'Annulez votre astreinte UNIQUEMENT pour les jours sélectionnés (le remplaçant prend ces jours).';
      case 're':
        return 'Marquez les jours comme RE (Repos/Récupération). La case sera grisée.';
      case 'cp':
        return 'Marquez les jours comme 21 (Congés annuels). La case sera grisée (plus foncée que RE).';
    }
  };

  // RE and CP don't need color picker - they use settings colors
  const showColorPicker = type === 'event';
  // Show time picker for events, astreintes, and cancellations
  const showTimePicker = type === 'event' || type === 'astreinte-ponctuelle' || type === 'astreinte-cancelled';
  // Show exclude weekends for multi-day events
  const isMultiDay = startDate && endDate && startDate.getTime() !== endDate.getTime();
  const showExcludeWeekends = isMultiDay && (type === 'event' || type === 're' || type === 'cp');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un événement</DialogTitle>
          <DialogDescription>
            {getTypeDescription()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as EventTypeOption)}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background z-50" position="popper" sideOffset={4}>
                <SelectItem value="event">Événement</SelectItem>
                <SelectItem value="re">RE (Repos/Récupération)</SelectItem>
                <SelectItem value="cp">21 (Congés annuels)</SelectItem>
                <SelectItem value="astreinte-ponctuelle">Astreinte ponctuelle</SelectItem>
                <SelectItem value="astreinte-cancelled">Annulation d'astreinte (jours spécifiques)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="name">
              {type === 'astreinte-cancelled' ? 'Nom du remplaçant' : 'Nom'}
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                type === 'astreinte-cancelled' 
                  ? 'Nom du remplaçant' 
                  : type === 're' 
                    ? 'RE' 
                    : type === 'cp' 
                      ? '21 (Congés annuels)' 
                      : "Nom de l'événement"
              }
            />
          </div>
          
          {showDuplicateWarning && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
              ⚠️ Un événement existe déjà sur cette période. Voulez-vous quand même ajouter ?
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="destructive" onClick={() => {
                  setShowDuplicateWarning(false);
                  if (startDate && endDate && name.trim()) {
                    onAdd({ type, name: name.trim(), startDate, endDate, color });
                    setName(''); setType('event'); setColor('#00AEEF'); setShowDuplicateWarning(false); onClose();
                  }
                }}>Valider quand même</Button>
                <Button size="sm" variant="outline" onClick={() => setShowDuplicateWarning(false)}>Modifier</Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="hidden sm:block">{"Date de début"}</Label>
              <Label className="sm:hidden">Début</Label>
              <Popover open={startPopoverOpen} onOpenChange={setStartPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'dd/MM/yyyy', { locale: fr }) : "Sélectionner"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-background" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateChange}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label className="hidden sm:block">{"Date de fin"}</Label>
              <Label className="sm:hidden">Fin</Label>
              <Popover open={endPopoverOpen} onOpenChange={setEndPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'dd/MM/yyyy', { locale: fr }) : "Sélectionner"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-background" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateChange}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {showTimePicker && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Heure début</Label>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  min={type === 'astreinte-cancelled' ? '00:00' : '05:00'}
                  max={type === 'astreinte-cancelled' ? '23:59' : '21:00'}
                  className="h-9"
                />
              </div>
              <div className="grid gap-2">
                <Label>Heure fin</Label>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  min={type === 'astreinte-cancelled' ? '00:00' : '05:00'}
                  max={type === 'astreinte-cancelled' ? '23:59' : '21:00'}
                  className="h-9"
                />
              </div>
            </div>
          )}

          {showExcludeWeekends && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="excludeWeekends"
                checked={excludeWeekends}
                onCheckedChange={(checked) => setExcludeWeekends(checked === true)}
              />
              <Label htmlFor="excludeWeekends" className="text-sm cursor-pointer">
                Exclure les week-ends (sam/dim)
              </Label>
            </div>
          )}
          
          {showColorPicker && (
            <div className="grid gap-2">
              <Label htmlFor="color">Couleur</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1 font-mono text-sm"
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim() || !startDate || !endDate}>
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

```


// path: src/components/ErrorBoundary.tsx
```ts
import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    if (prevState.hasError && this.state.hasError) {
      // Auto-recover after a brief moment
      setTimeout(() => this.setState({ hasError: false, error: null }), 100);
    }
  }

  render() {
    if (this.state.hasError) {
      // Silently retry rendering instead of showing error UI
      return this.props.children;
    }
    return this.props.children;
  }
}

```


// path: src/components/Events/EventsManager.tsx
```ts
import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarEvent, Vacation, Arret, Holiday, Astreinte, CancelledAstreinteDate, PatternType } from '@/types/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { isWeekend, eachDayOfInterval } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Trash2, X, Check, Plus, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sort types
type SortField = 'date' | 'name' | 'tranche' | 'module';
type SortDirection = 'asc' | 'desc';

type NewEventType = 'event' | 're' | 'cp';

const patterns: { value: PatternType; label: string }[] = [
  { value: 'none', label: 'Aucun' },
  { value: 'stripes', label: 'Rayures' },
  { value: 'dots', label: 'Points' },
  { value: 'crosshatch', label: 'Croisillons' },
  { value: 'waves', label: 'Lignes' },
  { value: 'diagonal', label: 'Diagonales' },
  { value: 'grid', label: 'Grille' },
  { value: 'zigzag', label: 'Zigzag' },
];

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
  diagonal: 'pattern-diagonal',
  grid: 'pattern-grid',
  zigzag: 'pattern-zigzag',
};

interface EventsManagerProps {
  events: CalendarEvent[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  ponctualAstreintes: Astreinte[];
  cancelledAstreinteDates: CancelledAstreinteDate[];
  onUpdateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  onDeleteEvent: (id: string) => void;
  onUpdateVacation: (id: string, updates: Partial<Vacation>) => void;
  onDeleteVacation: (id: string) => void;
  onUpdateArret: (id: string, updates: Partial<Arret>) => void;
  onDeleteArret: (id: string) => void;
  onUpdateHoliday: (date: Date, updates: Partial<Holiday>) => void;
  onDeleteHoliday: (date: Date) => void;
  onRemovePonctualAstreinte: (id: string) => void;
  onUpdatePonctualAstreinte: (id: string, updates: Partial<Astreinte>) => void;
  onRestoreCancelledDate: (id: string) => void;
  onAddVacation: (vacation: Omit<Vacation, 'id'>) => void;
  onAddArret: (arret: Omit<Arret, 'id'>) => void;
  onAddHoliday: (holiday: Holiday) => void;
  onAddPonctualAstreinte: (startDate: Date, endDate: Date, name?: string) => void;
  onCancelAstreinteDates: (startDate: Date, endDate: Date, name: string, startTime?: string, endTime?: string) => void;
  onAddEvent?: (event: Omit<CalendarEvent, 'id'>) => void;
}

interface EditingState {
  id: string;
  field: string;
  value: any;
}

export function EventsManager({
  events,
  vacations,
  arrets,
  holidays,
  ponctualAstreintes,
  cancelledAstreinteDates,
  onUpdateEvent,
  onDeleteEvent,
  onUpdateVacation,
  onDeleteVacation,
  onUpdateArret,
  onDeleteArret,
  onUpdateHoliday,
  onDeleteHoliday,
  onRemovePonctualAstreinte,
  onUpdatePonctualAstreinte,
  onRestoreCancelledDate,
  onAddVacation,
  onAddArret,
  onAddHoliday,
  onAddPonctualAstreinte,
  onCancelAstreinteDates,
  onAddEvent,
}: EventsManagerProps) {
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [addingNew, setAddingNew] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<any>({});
  
  // Sorting states for different tabs
  const [arretSort, setArretSort] = useState<{ field: SortField; direction: SortDirection }>({ field: 'date', direction: 'asc' });
  const [eventSort, setEventSort] = useState<{ field: SortField; direction: SortDirection }>({ field: 'date', direction: 'asc' });
  const [vacationSort, setVacationSort] = useState<{ field: SortField; direction: SortDirection }>({ field: 'date', direction: 'asc' });

  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy', { locale: fr });

  // Sorted arrets
  const sortedArrets = useMemo(() => {
    return [...arrets].sort((a, b) => {
      const direction = arretSort.direction === 'asc' ? 1 : -1;
      switch (arretSort.field) {
        case 'date':
          return direction * (a.startDate.getTime() - b.startDate.getTime());
        case 'name':
          return direction * a.name.localeCompare(b.name);
        case 'tranche':
          return direction * a.tranche.localeCompare(b.tranche);
        case 'module':
          return direction * (a.module || '').localeCompare(b.module || '');
        default:
          return 0;
      }
    });
  }, [arrets, arretSort]);

  // Sorted events (excluding RE/CP)
  const sortedEvents = useMemo(() => {
    const filteredEvents = events.filter(e => e.type !== 're' && e.type !== 'cp');
    return [...filteredEvents].sort((a, b) => {
      const direction = eventSort.direction === 'asc' ? 1 : -1;
      switch (eventSort.field) {
        case 'date':
          return direction * (a.startDate.getTime() - b.startDate.getTime());
        case 'name':
          return direction * a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [events, eventSort]);

  // Sorted vacations
  const sortedVacations = useMemo(() => {
    return [...vacations].sort((a, b) => {
      const direction = vacationSort.direction === 'asc' ? 1 : -1;
      switch (vacationSort.field) {
        case 'date':
          return direction * (a.startDate.getTime() - b.startDate.getTime());
        case 'name':
          return direction * a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [vacations, vacationSort]);

  // Sorted absences (RE + CP)
  const [absenceSort, setAbsenceSort] = useState<{ field: SortField; direction: SortDirection }>({ field: 'date', direction: 'asc' });
  const sortedAbsences = useMemo(() => {
    return events.filter(e => e.type === 're' || e.type === 'cp').sort((a, b) => {
      const direction = absenceSort.direction === 'asc' ? 1 : -1;
      switch (absenceSort.field) {
        case 'date':
          return direction * (a.startDate.getTime() - b.startDate.getTime());
        case 'name':
          return direction * a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [events, absenceSort]);

  // Toggle sort helper
  const toggleSort = (
    currentSort: { field: SortField; direction: SortDirection },
    setSort: (s: { field: SortField; direction: SortDirection }) => void,
    field: SortField
  ) => {
    if (currentSort.field === field) {
      setSort({ field, direction: currentSort.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ field, direction: 'asc' });
    }
  };

  // Sort button component
  const SortButton = ({ 
    field, 
    label, 
    currentSort, 
    setSort 
  }: { 
    field: SortField; 
    label: string; 
    currentSort: { field: SortField; direction: SortDirection };
    setSort: (s: { field: SortField; direction: SortDirection }) => void;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-8 px-2 text-xs font-medium",
        currentSort.field === field && "text-primary"
      )}
      onClick={() => toggleSort(currentSort, setSort, field)}
    >
      {label}
      <ArrowUpDown className="ml-1 h-3 w-3" />
      {currentSort.field === field && (
        <span className="ml-1 text-[10px]">
          {currentSort.direction === 'asc' ? '↑' : '↓'}
        </span>
      )}
    </Button>
  );

  const handleAddNew = (type: string) => {
    if (type === 'vacation') {
      onAddVacation({
        name: newItem.name || 'Nouvelle période',
        startDate: newItem.startDate || new Date(),
        endDate: newItem.endDate || new Date(),
        color: newItem.color || '#a855f7',
      });
    } else if (type === 'arret') {
      onAddArret({
        type: newItem.arretType || 'arret',
        name: newItem.name || 'Nouvel arrêt',
        startDate: newItem.startDate || new Date(),
        endDate: newItem.endDate || new Date(),
        pattern: newItem.pattern || 'none',
        tranche: newItem.tranche || 'Tr2',
        module: newItem.module,
      });
    } else if (type === 'holiday') {
      onAddHoliday({
        date: newItem.date || new Date(),
        name: newItem.name || 'Nouveau férié',
      });
    } else if (type === 'ponctual') {
      onAddPonctualAstreinte(
        newItem.startDate || new Date(),
        newItem.endDate || new Date(),
        newItem.name || 'Astreinte ponctuelle'
      );
    } else if (type === 'cancelled') {
      if (newItem.startDate && newItem.endDate && newItem.name) {
        onCancelAstreinteDates(newItem.startDate, newItem.endDate, newItem.name, newItem.startTime || '00:00', newItem.endTime || '23:59');
      }
    } else if (type === 'event' && onAddEvent) {
      const eventType = (newItem.eventType as 'event' | 're' | 'cp') || 'event';
      const eventName = newItem.name || 'Nouvel événement';
      const startDate = newItem.startDate || new Date();
      const endDate = newItem.endDate || new Date();
      const color = newItem.color || '#0ea5e9';
      
      if (newItem.excludeWeekends && startDate.getTime() !== endDate.getTime()) {
        const days = eachDayOfInterval({ start: startDate, end: endDate });
        const weekdays = days.filter(d => !isWeekend(d));
        let rangeStart: Date | null = null;
        let rangeEnd: Date | null = null;
        weekdays.forEach((day, i) => {
          if (!rangeStart) { rangeStart = day; rangeEnd = day; return; }
          const prevDay = weekdays[i - 1];
          const diff = (day.getTime() - prevDay.getTime()) / (1000 * 60 * 60 * 24);
          if (diff === 1) { rangeEnd = day; } else {
            onAddEvent({ type: eventType, name: eventName, startDate: rangeStart, endDate: rangeEnd!, color, startTime: newItem.startTime, endTime: newItem.endTime });
            rangeStart = day; rangeEnd = day;
          }
        });
        if (rangeStart && rangeEnd) {
          onAddEvent({ type: eventType, name: eventName, startDate: rangeStart, endDate: rangeEnd, color, startTime: newItem.startTime, endTime: newItem.endTime });
        }
      } else {
        onAddEvent({ type: eventType, name: eventName, startDate, endDate, color, startTime: newItem.startTime, endTime: newItem.endTime });
      }
    }
    setAddingNew(null);
    setNewItem({});
  };

  // Group cancelled dates by name for display
  const groupedCancelledDates = cancelledAstreinteDates.reduce((acc, item) => {
    const key = item.name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, CancelledAstreinteDate[]>);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">Gestion des Événements</h2>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="events" className="text-xs sm:text-sm">Événements</TabsTrigger>
          <TabsTrigger value="absences" className="text-xs sm:text-sm">Absences</TabsTrigger>
          <TabsTrigger value="astreintes" className="text-xs sm:text-sm">Astreintes</TabsTrigger>
          <TabsTrigger value="vacations" className="text-xs sm:text-sm">Vacances</TabsTrigger>
          <TabsTrigger value="arrets" className="text-xs sm:text-sm">Arrêts</TabsTrigger>
          <TabsTrigger value="holidays" className="text-xs sm:text-sm">Fériés</TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events" className="mt-4">
          {/* Add event button */}
          {onAddEvent && (
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <Button size="sm" onClick={() => setAddingNew('event')}>
                <Plus className="h-4 w-4 mr-2" /> {"Ajouter un événement"}
              </Button>
            </div>
          )}
          
          {addingNew === 'event' && onAddEvent && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <div className="flex gap-4 flex-wrap">
                <Input
                  placeholder="Nom de l'événement"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="flex-1 min-w-[200px]"
                />
                <Select 
                  value={newItem.eventType || 'event'} 
                  onValueChange={(v) => setNewItem({ ...newItem, eventType: v })}
                >
                  <SelectTrigger className="w-32 bg-background">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background">
                    <SelectItem value="event">{"Événement"}</SelectItem>
                    <SelectItem value="re">RE</SelectItem>
                    <SelectItem value="cp">21 (Congés annuels)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.startDate}
                      onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.endDate}
                      onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
                {newItem.eventType !== 're' && newItem.eventType !== 'cp' && (
                  <Input
                    type="color"
                    value={newItem.color || '#0ea5e9'}
                    onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                    className="w-12 h-9 p-1 cursor-pointer"
                  />
                )}
              </div>
              {newItem.eventType !== 're' && newItem.eventType !== 'cp' && (
                <div className="flex gap-4 flex-wrap items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground whitespace-nowrap">Début</label>
                    <Input
                      type="time"
                      value={newItem.startTime || ''}
                      onChange={(e) => setNewItem({ ...newItem, startTime: e.target.value })}
                      className="w-28 h-8 text-sm"
                      placeholder="HH:mm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground whitespace-nowrap">Fin</label>
                    <Input
                      type="time"
                      value={newItem.endTime || ''}
                      onChange={(e) => setNewItem({ ...newItem, endTime: e.target.value })}
                      className="w-28 h-8 text-sm"
                      placeholder="HH:mm"
                    />
                  </div>
                </div>
              )}
              {/* Weekend exclusion checkbox */}
              {newItem.startDate && newItem.endDate && newItem.startDate.getTime() !== newItem.endDate.getTime() && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="exclude-weekends-event"
                    checked={newItem.excludeWeekends || false}
                    onCheckedChange={(checked) => setNewItem({ ...newItem, excludeWeekends: !!checked })}
                  />
                  <label htmlFor="exclude-weekends-event" className="text-sm text-muted-foreground cursor-pointer">
                    Exclure les week-ends
                  </label>
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddNew('event')}>{"Ajouter"}</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
              </div>
            </div>
          )}
          
          {/* Sort controls */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs text-muted-foreground">{"Trier par:"}</span>
            <SortButton field="date" label="Date" currentSort={eventSort} setSort={setEventSort} />
            <SortButton field="name" label="Nom" currentSort={eventSort} setSort={setEventSort} />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Horaires</TableHead>
                <TableHead>Couleur</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.map(event => (
                <TableRow key={event.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {event.readonly ? (
                        <>
                          <span>{event.name}</span>
                          <Badge variant="outline" className="text-[10px] px-1 py-0">
                            {event.source || 'ext'}
                          </Badge>
                        </>
                      ) : (
                        <EditableText
                          value={event.name}
                          onSave={(name) => onUpdateEvent(event.id, { name })}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {event.readonly ? (
                      formatDate(event.startDate)
                    ) : (
                      <DateEditor
                        date={event.startDate}
                        onSave={(date) => onUpdateEvent(event.id, { startDate: date })}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {event.readonly ? (
                      formatDate(event.endDate)
                    ) : (
                      <DateEditor
                        date={event.endDate}
                        onSave={(date) => onUpdateEvent(event.id, { endDate: date })}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {event.readonly ? (
                      <span className="text-xs text-muted-foreground">
                        {event.startTime && event.endTime ? `${event.startTime} — ${event.endTime}` : '—'}
                      </span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Input
                          type="time"
                          value={event.startTime || ''}
                          onChange={(e) => onUpdateEvent(event.id, { startTime: e.target.value || undefined })}
                          className="w-24 h-7 text-xs"
                        />
                        <span className="text-xs text-muted-foreground">—</span>
                        <Input
                          type="time"
                          value={event.endTime || ''}
                          onChange={(e) => onUpdateEvent(event.id, { endTime: e.target.value || undefined })}
                          className="w-24 h-7 text-xs"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div 
                      className="w-6 h-6 rounded-full border cursor-pointer"
                      style={{ backgroundColor: event.color }}
                      onClick={() => {
                        if (event.readonly) return;
                        const color = prompt('Nouvelle couleur (hex):', event.color);
                        if (color) onUpdateEvent(event.id, { color });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {sortedEvents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Aucun événement (RE et CP sont gérés dans les paramètres)
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Absences Tab (RE/CP) */}
        <TabsContent value="absences" className="mt-4">
          {onAddEvent && (
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <Button size="sm" onClick={() => setAddingNew('absence')}>
                <Plus className="h-4 w-4 mr-2" /> Ajouter une absence
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Trier par:</span>
                <SortButton field="date" label="Date" currentSort={absenceSort} setSort={setAbsenceSort} />
                <SortButton field="name" label="Nom" currentSort={absenceSort} setSort={setAbsenceSort} />
              </div>
            </div>
          )}
          
          {addingNew === 'absence' && onAddEvent && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <div className="flex gap-4 flex-wrap">
                <Input
                  placeholder="Nom (optionnel)"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="flex-1 min-w-[200px]"
                />
                <Select value={newItem.absenceType || 're'} onValueChange={(v) => setNewItem({ ...newItem, absenceType: v })}>
                  <SelectTrigger className="w-32 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background">
                    <SelectItem value="re">RE (Repos)</SelectItem>
                    <SelectItem value="cp">21 (Congés annuels)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar mode="single" selected={newItem.startDate} onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })} />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar mode="single" selected={newItem.endDate} onSelect={(date) => setNewItem({ ...newItem, endDate: date })} />
                  </PopoverContent>
                </Popover>
              </div>
              {/* Weekend exclusion for absences */}
              {newItem.startDate && newItem.endDate && newItem.startDate.getTime() !== newItem.endDate.getTime() && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="exclude-weekends-absence"
                    checked={newItem.excludeWeekends || false}
                    onCheckedChange={(checked) => setNewItem({ ...newItem, excludeWeekends: !!checked })}
                  />
                  <label htmlFor="exclude-weekends-absence" className="text-sm text-muted-foreground cursor-pointer">
                    Exclure les week-ends
                  </label>
                </div>
              )}
              <div className="flex gap-2">
                <Button size="sm" onClick={() => {
                  if (onAddEvent) {
                    const type = (newItem.absenceType || 're') as 're' | 'cp';
                    const name = newItem.name || (type === 're' ? 'RE' : '21 (Congés annuels)');
                    const startDate = newItem.startDate || new Date();
                    const endDate = newItem.endDate || new Date();
                    const color = type === 're' ? '#d1d5db' : '#9ca3af';
                    
                    if (newItem.excludeWeekends && startDate.getTime() !== endDate.getTime()) {
                      const days = eachDayOfInterval({ start: startDate, end: endDate });
                      const weekdays = days.filter(d => !isWeekend(d));
                      let rangeStart: Date | null = null;
                      let rangeEnd: Date | null = null;
                      weekdays.forEach((day, i) => {
                        if (!rangeStart) { rangeStart = day; rangeEnd = day; return; }
                        const prevDay = weekdays[i - 1];
                        const diff = (day.getTime() - prevDay.getTime()) / (1000 * 60 * 60 * 24);
                        if (diff === 1) { rangeEnd = day; } else {
                          onAddEvent({ type, name, startDate: rangeStart, endDate: rangeEnd!, color });
                          rangeStart = day; rangeEnd = day;
                        }
                      });
                      if (rangeStart && rangeEnd) {
                        onAddEvent({ type, name, startDate: rangeStart, endDate: rangeEnd, color });
                      }
                    } else {
                      onAddEvent({ type, name, startDate, endDate, color });
                    }
                    setAddingNew(null);
                    setNewItem({});
                  }
                }}>Ajouter</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>Annuler</Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAbsences.map(absence => (
                <TableRow key={absence.id}>
                  <TableCell>
                    <Badge variant={absence.type === 'cp' ? 'default' : 'secondary'}>
                      {absence.type === 'cp' ? '21 (Congés)' : 'RE'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <EditableText value={absence.name} onSave={(name) => onUpdateEvent(absence.id, { name })} />
                  </TableCell>
                  <TableCell>
                    <DateEditor date={absence.startDate} onSave={(date) => onUpdateEvent(absence.id, { startDate: date })} />
                  </TableCell>
                  <TableCell>
                    <DateEditor date={absence.endDate} onSave={(date) => onUpdateEvent(absence.id, { endDate: date })} />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteEvent(absence.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {sortedAbsences.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Aucune absence (RE ou CP)
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Astreintes Tab */}
        <TabsContent value="astreintes" className="mt-4">
          <div className="space-y-6">
            {/* Ponctual Astreintes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm text-muted-foreground">Astreintes ponctuelles</h3>
                <Button size="sm" onClick={() => setAddingNew('ponctual')}>
                  <Plus className="h-4 w-4 mr-2" /> Ajouter
                </Button>
              </div>
              
              {addingNew === 'ponctual' && (
                <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
                  <Input
                    placeholder="Nom (ex: Remplacement Jean)"
                    value={newItem.name || ''}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {newItem.startDate ? formatDate(newItem.startDate) : 'Début'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newItem.startDate}
                          onSelect={(date) => setNewItem({ ...newItem, startDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {newItem.endDate ? formatDate(newItem.endDate) : 'Fin'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newItem.endDate}
                          onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAddNew('ponctual')}>Ajouter</Button>
                    <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>Annuler</Button>
                  </div>
                </div>
              )}
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Début</TableHead>
                    <TableHead>Fin</TableHead>
                    <TableHead>Horaires</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ponctualAstreintes.map(astreinte => (
                    <TableRow key={astreinte.id}>
                      <TableCell>
                        <EditableText
                          value={astreinte.name || 'Astreinte ponctuelle'}
                          onSave={(name) => onUpdatePonctualAstreinte(astreinte.id, { name })}
                        />
                      </TableCell>
                      <TableCell>
                        <DateEditor
                          date={astreinte.startDate}
                          onSave={(date) => onUpdatePonctualAstreinte(astreinte.id, { startDate: date })}
                        />
                      </TableCell>
                      <TableCell>
                        <DateEditor
                          date={astreinte.endDate}
                          onSave={(date) => onUpdatePonctualAstreinte(astreinte.id, { endDate: date })}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground font-mono">
                          {format(astreinte.startDate, 'EEEE', { locale: fr })} 08:00 → {format(astreinte.endDate, 'EEEE', { locale: fr })} 07:59
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => onRemovePonctualAstreinte(astreinte.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {ponctualAstreintes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        Aucune astreinte ponctuelle
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Cancelled Dates */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm text-muted-foreground">Jours d'astreinte annulés</h3>
                <Button size="sm" onClick={() => setAddingNew('cancelled')}>
                  <Plus className="h-4 w-4 mr-2" /> Annuler des jours
                </Button>
              </div>
              
              {addingNew === 'cancelled' && (
                <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
                  <Input
                    placeholder="Nom du remplaçant"
                    value={newItem.name || ''}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-background">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-50 bg-background">
                        <Calendar
                          mode="single"
                          selected={newItem.startDate}
                          onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="bg-background">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-50 bg-background">
                        <Calendar
                          mode="single"
                          selected={newItem.endDate}
                          onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex gap-4 flex-wrap items-center">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-muted-foreground whitespace-nowrap">De</label>
                      <Input
                        type="time"
                        value={newItem.startTime ?? '00:00'}
                        onChange={(e) => setNewItem({ ...newItem, startTime: e.target.value })}
                        className="w-28 h-8 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-muted-foreground whitespace-nowrap">À</label>
                      <Input
                        type="time"
                        value={newItem.endTime ?? '23:59'}
                        onChange={(e) => setNewItem({ ...newItem, endTime: e.target.value })}
                        className="w-28 h-8 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAddNew('cancelled')}>{"Annuler ces jours"}</Button>
                    <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
                  </div>
                </div>
              )}
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Remplaçant</TableHead>
                    <TableHead>Date(s)</TableHead>
                    <TableHead>Horaires</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(groupedCancelledDates).map(([name, dates]) => (
                    <TableRow key={name}>
                      <TableCell>
                        <Badge variant="secondary">{name}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-mono text-muted-foreground">
                          {dates[0]?.startTime || '00:00'} — {dates[0]?.endTime || '23:59'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {dates.map(d => (
                            <span key={d.id} className="text-sm bg-muted px-2 py-0.5 rounded">
                              {formatDate(d.date)}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => dates.forEach(d => onRestoreCancelledDate(d.id))}
                          title="Restaurer ces jours"
                        >
                          <Check className="h-4 w-4 text-primary" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {cancelledAstreinteDates.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        Aucun jour annulé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Vacations Tab */}
        <TabsContent value="vacations" className="mt-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <Button size="sm" onClick={() => setAddingNew('vacation')}>
              <Plus className="h-4 w-4 mr-2" /> {"Ajouter une période"}
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{"Trier par:"}</span>
              <SortButton field="date" label="Date" currentSort={vacationSort} setSort={setVacationSort} />
              <SortButton field="name" label="Nom" currentSort={vacationSort} setSort={setVacationSort} />
            </div>
          </div>
          {addingNew === 'vacation' && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <Input
                placeholder={"Nom de la période"}
                value={newItem.name || ''}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.startDate}
                      onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.endDate}
                      onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddNew('vacation')}>{"Ajouter"}</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
              </div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedVacations.map(vacation => (
                <TableRow key={vacation.id}>
                  <TableCell>
                    <EditableText
                      value={vacation.name}
                      onSave={(name) => onUpdateVacation(vacation.id, { name })}
                    />
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={vacation.startDate}
                      onSave={(date) => onUpdateVacation(vacation.id, { startDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={vacation.endDate}
                      onSave={(date) => onUpdateVacation(vacation.id, { endDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteVacation(vacation.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Arrets Tab */}
        <TabsContent value="arrets" className="mt-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <Button size="sm" onClick={() => setAddingNew('arret')}>
              <Plus className="h-4 w-4 mr-2" /> Ajouter un arrêt
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Trier par:</span>
              <SortButton field="date" label="Date" currentSort={arretSort} setSort={setArretSort} />
              <SortButton field="name" label="Nom" currentSort={arretSort} setSort={setArretSort} />
              <SortButton field="tranche" label="Tranche" currentSort={arretSort} setSort={setArretSort} />
              <SortButton field="module" label="Module" currentSort={arretSort} setSort={setArretSort} />
            </div>
          </div>
          {addingNew === 'arret' && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <div className="flex gap-4">
                <Input
                  placeholder="Nom"
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="flex-1"
                />
                <Select 
                  value={newItem.tranche || 'Tr2'} 
                  onValueChange={(v) => setNewItem({ ...newItem, tranche: v })}
                >
                  <SelectTrigger className="w-24 bg-background">
                    <SelectValue placeholder={"Tranche"} />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-background">
                    <SelectItem value="Tr2">{"Tr2"}</SelectItem>
                    <SelectItem value="Tr3">{"Tr3"}</SelectItem>
                    <SelectItem value="Tr4">{"Tr4"}</SelectItem>
                    <SelectItem value="Tr5">{"Tr5"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4 flex-wrap items-center">
                <select
                  className="px-3 py-2 border rounded-md bg-background text-sm"
                  value={newItem.arretType || 'arret'}
                  onChange={(e) => setNewItem({ ...newItem, arretType: e.target.value })}
                >
                  <option value="arret">{"Arrêt (AT)"}</option>
                  <option value="prepa">{"Préparation"}</option>
                </select>
                {newItem.arretType === 'prepa' && (
                  <Select 
                    value={newItem.module || 'M0'} 
                    onValueChange={(v) => setNewItem({ ...newItem, module: v })}
                  >
                    <SelectTrigger className="w-24 bg-background">
                      <SelectValue placeholder={"Module"} />
                    </SelectTrigger>
                    <SelectContent className="z-50 bg-background">
                      <SelectItem value="M0">{"M0"}</SelectItem>
                      <SelectItem value="M1">{"M1"}</SelectItem>
                      <SelectItem value="M2A">{"M2A"}</SelectItem>
                      <SelectItem value="M2B">{"M2B"}</SelectItem>
                      <SelectItem value="M3">{"M3"}</SelectItem>
                      <SelectItem value="M4">{"M4"}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.startDate ? formatDate(newItem.startDate) : "Début"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.startDate}
                      onSelect={(date) => setNewItem({ ...newItem, startDate: date, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-background">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {newItem.endDate ? formatDate(newItem.endDate) : "Fin"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 z-50 bg-background">
                    <Calendar
                      mode="single"
                      selected={newItem.endDate}
                      onSelect={(date) => setNewItem({ ...newItem, endDate: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddNew('arret')}>{"Ajouter"}</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
              </div>
            </div>
          )}
          
          {/* Info about patterns */}
          <div className="mb-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
            Les patterns de préparation (M0-M4) sont définis automatiquement selon le module.
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Tranche</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedArrets.map(arret => (
                <TableRow key={arret.id}>
                  <TableCell>
                    <Badge variant={arret.type === 'prepa' ? 'secondary' : 'default'}>
                      {arret.type === 'prepa' ? 'Prépa' : 'AT'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <EditableText
                      value={arret.name}
                      onSave={(name) => onUpdateArret(arret.id, { name })}
                    />
                  </TableCell>
                  <TableCell>
                    <Select 
                      value={arret.tranche} 
                      onValueChange={(v) => onUpdateArret(arret.id, { tranche: v as 'Tr2' | 'Tr3' | 'Tr4' | 'Tr5' })}
                    >
                      <SelectTrigger className="w-20 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tr2">Tr2</SelectItem>
                        <SelectItem value="Tr3">Tr3</SelectItem>
                        <SelectItem value="Tr4">Tr4</SelectItem>
                        <SelectItem value="Tr5">Tr5</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {arret.type === 'prepa' ? (
                      <Badge variant="outline" className="text-xs">
                        {arret.module || '-'}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={arret.startDate}
                      onSave={(date) => onUpdateArret(arret.id, { startDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <DateEditor
                      date={arret.endDate}
                      onSave={(date) => onUpdateArret(arret.id, { endDate: date })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteArret(arret.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* Holidays Tab */}
        <TabsContent value="holidays" className="mt-4">
          <div className="mb-4">
            <Button size="sm" onClick={() => setAddingNew('holiday')}>
              <Plus className="h-4 w-4 mr-2" /> Ajouter un jour férié
            </Button>
          </div>
          {addingNew === 'holiday' && (
            <div className="mb-4 p-4 border rounded-lg bg-muted/50 space-y-3">
              <Input
                placeholder="Nom du jour férié"
                value={newItem.name || ''}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-background">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {newItem.date ? formatDate(newItem.date) : "Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-background">
                  <Calendar
                    mode="single"
                    selected={newItem.date}
                    onSelect={(date) => setNewItem({ ...newItem, date })}
                  />
                </PopoverContent>
              </Popover>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAddNew('holiday')}>{"Ajouter"}</Button>
                <Button size="sm" variant="outline" onClick={() => { setAddingNew(null); setNewItem({}); }}>{"Annuler"}</Button>
              </div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead className="w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((holiday, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <DateEditor
                      date={holiday.date}
                      onSave={(date) => onUpdateHoliday(holiday.date, { date })}
                    />
                  </TableCell>
                  <TableCell>
                    <EditableText
                      value={holiday.name}
                      onSave={(name) => onUpdateHoliday(holiday.date, { name })}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => onDeleteHoliday(holiday.date)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components
function EditableText({ value, onSave }: { value: string; onSave: (value: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  if (editing) {
    return (
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-8"
          autoFocus
        />
        <Button size="sm" variant="ghost" onClick={() => { onSave(text); setEditing(false); }}>
          <Check className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => { setText(value); setEditing(false); }}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <span 
      className="cursor-pointer hover:underline"
      onClick={() => setEditing(true)}
    >
      {value}
    </span>
  );
}

function DateEditor({ date, onSave }: { date: Date; onSave: (date: Date) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2 font-normal bg-background">
          {format(date, 'dd/MM/yyyy', { locale: fr })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-50 bg-background" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate) {
              onSave(newDate);
              setIsOpen(false);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

```


// path: src/components/Export/AnnualPrintLayout.ts
```ts
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isWeekend, isSameMonth, getWeek, isSameDay,
  isWithinInterval, startOfDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret,
  Holiday, CancelledAstreinteDate, PatternType, modulePatterns,
} from '@/types/calendar';
import { getArretColor, getArretPattern } from '@/lib/trancheColors';

interface AnnualPrintData {
  year: number;
  settings: CalendarSettings;
  events: CalendarEvent[];
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  cancelledDates: CancelledAstreinteDate[];
}

function isHolidayDate(date: Date, holidays: Holiday[]): Holiday | null {
  return holidays.find(h => isSameDay(startOfDay(new Date(h.date)), startOfDay(date))) || null;
}

function isVacationDate(date: Date, vacations: Vacation[]): Vacation | null {
  const d = startOfDay(date);
  return vacations.find(v => {
    const s = startOfDay(new Date(v.startDate));
    const e = startOfDay(new Date(v.endDate));
    return d >= s && d <= e;
  }) || null;
}

function isAstreinteDate(date: Date, astreintes: Astreinte[]): Astreinte | null {
  const d = startOfDay(date);
  return astreintes.find(a => {
    if (a.isCancelled) return false;
    const s = startOfDay(new Date(a.startDate));
    const e = startOfDay(new Date(a.endDate));
    return d >= s && d <= e;
  }) || null;
}

function getEventsOnDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
  const d = startOfDay(date);
  return events.filter(ev => {
    const s = startOfDay(new Date(ev.startDate));
    const e = startOfDay(new Date(ev.endDate));
    return d >= s && d <= e;
  });
}

function isPrepaOnDate(date: Date, arrets: Arret[]): Arret | null {
  const d = startOfDay(date);
  return arrets.find(a => {
    if (a.type !== 'prepa') return false;
    const s = startOfDay(new Date(a.startDate));
    const e = startOfDay(new Date(a.endDate));
    return d >= s && d <= e;
  }) || null;
}

function isCancelledDate(date: Date, cancelled: CancelledAstreinteDate[]): boolean {
  return cancelled.some(c => isSameDay(new Date(c.date), date));
}

/** Generate an SVG pattern fill for arrêt bars */
function getPatternSVG(pattern: PatternType, color: string, id: string): string {
  switch (pattern) {
    case 'stripes':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><line x1="0" y1="0" x2="4" y2="4" stroke="#fff" stroke-width="0.8" opacity="0.6"/></pattern>`;
    case 'dots':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><circle cx="2" cy="2" r="0.8" fill="#fff" opacity="0.6"/></pattern>`;
    case 'crosshatch':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><line x1="0" y1="0" x2="4" y2="4" stroke="#fff" stroke-width="0.6" opacity="0.5"/><line x1="4" y1="0" x2="0" y2="4" stroke="#fff" stroke-width="0.6" opacity="0.5"/></pattern>`;
    case 'diagonal':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><line x1="0" y1="4" x2="4" y2="0" stroke="#fff" stroke-width="0.8" opacity="0.6"/></pattern>`;
    case 'waves':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="8" height="4"><rect width="8" height="4" fill="${color}"/><path d="M0 2 Q2 0 4 2 Q6 4 8 2" stroke="#fff" stroke-width="0.6" fill="none" opacity="0.6"/></pattern>`;
    case 'grid':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${color}"/><line x1="2" y1="0" x2="2" y2="4" stroke="#fff" stroke-width="0.5" opacity="0.5"/><line x1="0" y1="2" x2="4" y2="2" stroke="#fff" stroke-width="0.5" opacity="0.5"/></pattern>`;
    default:
      return '';
  }
}

// Build context bars (vacations + arrets) for a given week row
function buildContextBarsForWeek(week: Date[], monthDate: Date, data: AnnualPrintData): string {
  const s = data.settings;
  const bars: string[] = [];
  const svgDefs: string[] = [];
  let patternCounter = 0;

  // Vacation bars - always use settings.vacationColor to match legend
  for (const vac of data.vacations) {
    const vacStart = startOfDay(new Date(vac.startDate));
    const vacEnd = startOfDay(new Date(vac.endDate));
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = startOfDay(day);
      if (d >= vacStart && d <= vacEnd) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      const left = ((firstCol + 1) / 8 * 100);
      const width = ((lastCol - firstCol + 1) / 8 * 100);
      bars.push(`<div style="position:absolute;top:0;left:${left}%;width:${width}%;height:2px;background:${s.vacationColor};border-radius:1px;z-index:1;"></div>`);
    }
  }

  // Arret bars (AT only) - each on its own vertical slot to avoid overlap
  const arretSlots: { arret: Arret; firstCol: number; lastCol: number }[] = [];
  const processedArrets = new Set<string>();
  for (const arret of data.arrets) {
    if (arret.type !== 'arret') continue;
    if (processedArrets.has(arret.id)) continue;
    const arretStart = startOfDay(new Date(arret.startDate));
    const arretEnd = startOfDay(new Date(arret.endDate));
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = startOfDay(day);
      if (d >= arretStart && d <= arretEnd) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      processedArrets.add(arret.id);
      arretSlots.push({ arret, firstCol, lastCol });
    }
  }

  // Prépa module bars - half-width, centered, with patterns
  const prepaSlots: { arret: Arret; firstCol: number; lastCol: number }[] = [];
  const processedPrepas = new Set<string>();
  for (const arret of data.arrets) {
    if (arret.type !== 'prepa') continue;
    if (processedPrepas.has(arret.id)) continue;
    const arretStart = startOfDay(new Date(arret.startDate));
    const arretEnd = startOfDay(new Date(arret.endDate));
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = startOfDay(day);
      if (d >= arretStart && d <= arretEnd) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      processedPrepas.add(arret.id);
      prepaSlots.push({ arret, firstCol, lastCol });
    }
  }

  // Each arrêt gets its own row offset: vacation=0-2px, then gap 1px, then arrêts stack at 3px each
  const arretBarHeight = 3;
  const arretStartY = 3; // after vacation bar (2px) + 1px gap
  for (let idx = 0; idx < arretSlots.length; idx++) {
    const { arret, firstCol, lastCol } = arretSlots[idx];
    const color = getArretColor(arret, s);
    const pattern = getArretPattern(arret);
    const left = ((firstCol + 1) / 8 * 100);
    const width = ((lastCol - firstCol + 1) / 8 * 100);
    const top = arretStartY + idx * (arretBarHeight + 1);

    if (pattern !== 'none') {
      const patId = `ap_${monthDate.getMonth()}_${patternCounter++}`;
      const patSvg = getPatternSVG(pattern, color, patId);
      if (patSvg) {
        svgDefs.push(patSvg);
        bars.push(`<svg style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${arretBarHeight}px;z-index:2;"><defs>${patSvg}</defs><rect width="100%" height="100%" fill="url(#${patId})" rx="1"/></svg>`);
        continue;
      }
    }
    bars.push(`<div style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${arretBarHeight}px;background:${color};border-radius:1px;z-index:2;"></div>`);
  }

  // Prépa modules: individual half-width centered lines per day cell (not continuous bars)
  // Group prepas by their id to stack different modules
  const prepaStartY = arretSlots.length > 0 ? arretStartY + arretSlots.length * (arretBarHeight + 1) : arretStartY;
  const prepaBarHeight = 3;
  for (let idx = 0; idx < prepaSlots.length; idx++) {
    const { arret, firstCol, lastCol } = prepaSlots[idx];
    const color = getArretColor(arret, s);
    const pattern = getArretPattern(arret);
    const top = prepaStartY + idx * (prepaBarHeight + 1);

    // Render individual half-width centered line per day cell
    for (let col = firstCol; col <= lastCol; col++) {
      const cellLeft = ((col + 1) / 8 * 100);
      const cellWidth = (1 / 8 * 100);
      const left = cellLeft + cellWidth * 0.25;
      const width = cellWidth * 0.5;

      if (pattern !== 'none') {
        const patId = `pp_${monthDate.getMonth()}_${patternCounter++}`;
        const patSvg = getPatternSVG(pattern, color, patId);
        if (patSvg) {
          bars.push(`<svg style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${prepaBarHeight}px;z-index:2;"><defs>${patSvg}</defs><rect width="100%" height="100%" fill="url(#${patId})" rx="1"/></svg>`);
          continue;
        }
      }
      bars.push(`<div style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${prepaBarHeight}px;background:${color};border-radius:1px;z-index:2;"></div>`);
    }
  }

  if (bars.length === 0) return '';
  const allSlots = arretSlots.length + prepaSlots.length;
  const totalHeight = allSlots > 0 ? prepaStartY + prepaSlots.length * (prepaBarHeight + 1) : 3;
  return `<tr><td class="wk-col" style="background:${s.weekNumberBgColor};padding:0;border:none;"></td><td colspan="7" style="position:relative;height:${totalHeight}px;padding:0;border:none;">${bars.join('')}</td></tr>`;
}

function buildMonthHTML(year: number, month: number, data: AnnualPrintData): string {
  const monthDate = new Date(year, month, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const calStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const s = data.settings;

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const monthName = format(monthDate, 'MMMM', { locale: fr });

  let html = `<div class="month-block">`;
  html += `<div class="month-title" style="background:${s.yearMonthBgColor};color:${s.yearMonthTextColor}">${monthName}</div>`;
  html += `<table class="month-table"><thead><tr><th class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">S</th>`;
  ['L','M','M','J','V','S','D'].forEach(d => {
    html += `<th style="background:${s.monthHeaderBgColor};color:${s.monthHeaderTextColor}">${d}</th>`;
  });
  html += `</tr></thead><tbody>`;

  for (const week of weeks) {
    html += buildContextBarsForWeek(week, monthDate, data);

    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });
    html += `<tr><td class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">${wn}</td>`;

    for (const day of week) {
      if (!isSameMonth(day, monthDate)) {
        html += `<td class="day empty" style="background:${s.weekNumberBgColor}"></td>`;
        continue;
      }

      const we = isWeekend(day);
      const hol = isHolidayDate(day, data.holidays);
      const ast = isAstreinteDate(day, data.astreintes);
      const cancelled = isCancelledDate(day, data.cancelledDates);
      const evts = getEventsOnDate(day, data.events);
      const reEvt = evts.find(e => e.type === 're');
      const cpEvt = evts.find(e => e.type === 'cp');

      let bg = s.dayCellBgColor;
      let fg = s.dayCellTextColor;

      if (we || hol) { bg = s.weekendDaysBgColor; fg = s.weekendDaysTextColor; }
      if (reEvt) { bg = s.reColor; fg = '#333'; }
      if (cpEvt) { bg = s.cpColor; fg = '#FFF'; }
      if (ast && !cancelled) { bg = s.astreinteColor; fg = '#333'; }

      let linesHTML = '';
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      for (const evt of otherEvts.slice(0, 2)) {
        // Calculate dynamic width based on event duration relative to cell
        const evtStart = startOfDay(new Date(evt.startDate));
        const evtEnd = startOfDay(new Date(evt.endDate));
        const totalDays = Math.max(1, Math.round((evtEnd.getTime() - evtStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);
        const widthPct = Math.min(100, Math.max(30, totalDays <= 1 ? 40 : totalDays <= 3 ? 60 : totalDays <= 7 ? 80 : 100));
        const safeName = (evt.name || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        linesHTML += `<span class="ev-line" style="background:${evt.color};width:${widthPct}%" title="${safeName}"></span>`;
      }

      const safeDay = day.getDate();
      html += `<td class="day" style="background:${bg};color:${fg}"><span class="day-num">${safeDay}</span>${linesHTML ? `<div class="ev-lines">${linesHTML}</div>` : ''}</td>`;
    }
    html += `</tr>`;
  }
  html += `</tbody></table></div>`;
  return html;
}

/** Collect unique event types for legend (excluding RE/CP which are already listed) */
function collectEventLegendItems(data: AnnualPrintData): { label: string; bg: string }[] {
  const seen = new Map<string, string>();
  for (const evt of data.events) {
    if (evt.type === 're' || evt.type === 'cp') continue;
    const key = evt.name || evt.type;
    if (!seen.has(key)) seen.set(key, evt.color);
  }
  return Array.from(seen.entries()).map(([label, bg]) => ({ label, bg }));
}

function buildLegendHTML(data: AnnualPrintData): string {
  const s = data.settings;
  const items: { label: string; bg: string; border?: string }[] = [
    { label: 'Astreinte', bg: s.astreinteColor },
    { label: 'RE', bg: s.reColor, border: '#999' },
    { label: '21 (Congés)', bg: s.cpColor },
  ];

  if (data.vacations.length > 0) {
    items.push({ label: 'Vacances scolaires', bg: s.vacationColor });
  }

  // Add event types
  const eventItems = collectEventLegendItems(data);
  for (const ei of eventItems) {
    items.push({ label: ei.label, bg: ei.bg });
  }

  let html = `<div class="legend">`;
  items.forEach(it => {
    html += `<div class="legend-item"><span class="legend-swatch" style="background:${it.bg};${it.border ? `border:1px solid ${it.border}` : ''}"></span><span class="legend-label">${it.label}</span></div>`;
  });
  html += `</div>`;
  return html;
}

function buildArretBarHTML(data: AnnualPrintData): string {
  if (data.arrets.length === 0) return '';
  const s = data.settings;

  let html = `<div class="arret-bar"><div class="arret-bar-title">Planning Arrêts</div><div class="arret-items">`;

  const byTranche = new Map<string, Arret[]>();
  data.arrets.forEach(a => {
    const list = byTranche.get(a.tranche) || [];
    list.push(a);
    byTranche.set(a.tranche, list);
  });

  const trancheSwatches: string[] = [];
  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    trancheSwatches.push(`<div class="legend-item"><span class="legend-swatch" style="background:${color}"></span><span class="legend-label">${tranche}</span></div>`);
  });

  const chips: string[] = [];
  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    let trancheHTML = `<div class="arret-tranche"><span class="arret-tranche-label" style="background:${color};color:#FFF">${tranche}</span>`;
    arretList.forEach(a => {
      const start = format(new Date(a.startDate), 'dd/MM', { locale: fr });
      const end = format(new Date(a.endDate), 'dd/MM', { locale: fr });
      const label = a.type === 'prepa' && a.module ? `${a.module}` : 'AT';
      trancheHTML += `<span class="arret-chip" style="border-color:${color}">${label}: ${start}–${end}</span>`;
    });
    trancheHTML += `</div>`;
    chips.push(trancheHTML);
  });

  html += chips.join('');
  html += `</div></div>`;

  return `<div class="arret-legend-line">${trancheSwatches.join('')}</div>${html}`;
}

export function generateAnnualPrintHTML(data: AnnualPrintData): string {
  const { year } = data;
  let months = '';
  for (let m = 0; m < 12; m++) months += buildMonthHTML(year, m, data);

  const legend = buildLegendHTML(data);
  const arretSection = buildArretBarHTML(data);

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/>
<title>Calendrier ${year}</title>
<style>
  @page { size: A4 landscape; margin: 5mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 297mm; height: 210mm; overflow: hidden; font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; background: #fff; color: #111;
    font-weight: 400; letter-spacing: 0.2px;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { position: relative; width: 297mm; height: 210mm; padding: 3mm; display: flex; flex-direction: column; transform: scale(0.95); transform-origin: top center; margin: 0 auto; }

  /* Watermark */
  .watermark {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-35deg);
    font-size: 110pt; font-weight: 900; color: #003A8F; opacity: 0.10;
    letter-spacing: 14px; white-space: nowrap; z-index: 0; pointer-events: none;
  }

  .header-logo {
    position: absolute; top: 2mm; right: 3mm;
    width: 20mm; height: auto; opacity: 0.7;
    z-index: 2;
  }

  .page-title { text-align: center; font-size: 11pt; font-weight: 600; letter-spacing: 0.8px; margin-bottom: 1mm; }

  /* Legend */
  .legend { display: flex; flex-wrap: wrap; gap: 1.5mm 4mm; justify-content: center; margin-bottom: 1mm; }
  .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 6pt; line-height: 1; }
  .legend-swatch { width: 12px; height: 8px; border-radius: 1px; flex-shrink: 0; }
  .legend-label { white-space: nowrap; font-weight: 500; line-height: 1; }

  /* Arret legend line */
  .arret-legend-line { display: flex; flex-wrap: wrap; gap: 1.5mm 4mm; justify-content: center; margin-bottom: 1mm; }
  .arret-legend-line .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 6pt; }
  .arret-legend-line .legend-swatch { width: 12px; height: 8px; border-radius: 1px; flex-shrink: 0; }

  /* Grid 4x3 */
  .months-grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr);
    gap: 3.5mm; flex: 1; min-height: 0; }

  /* Month block premium */
  .month-block { display: flex; flex-direction: column; min-height: 0;
    border: 0.6px solid #d8d8d8; border-radius: 4px; background: #ffffff; box-shadow: 0 0.5px 2px rgba(0,0,0,0.04); overflow: hidden; }
  .month-title { text-align: center; font-size: 8pt; font-weight: 700; letter-spacing: 0.6px; padding: 0; height: 16px; line-height: 16px;
    text-transform: capitalize; vertical-align: middle; }

  /* Table */
  .month-table { width: 100%; border-collapse: collapse; table-layout: fixed; flex: 1; }
  .month-table th, .month-table td { font-size: 6pt; text-align: center; padding: 0; height: 14px; vertical-align: middle; border: 0.3px solid ${data.settings.weekNumberBgColor}; }
  .month-table th { font-weight: 600; font-size: 5pt; line-height: 14px; }
  .wk-col { width: 14px; font-size: 5pt !important; line-height: 14px; }

  /* Day cells */
  .day { position: relative; vertical-align: middle; line-height: 14px; }
  .day.empty { }
  .day-num { position: relative; z-index: 1; font-weight: 600; line-height: 14px; vertical-align: middle; }

  /* Footer signature */
  .footer-signature { position: absolute; bottom: 3mm; left: 0; width: 100%; text-align: center;
    font-size: 5pt; color: rgba(0,0,0,0.45); letter-spacing: 1px; font-weight: 500; }
  .footer-signature .separator { margin: 0 4px; opacity: 0.4; }

  /* Prépa module: centered half-width line */
  .prepa-line { position: absolute; top: 50%; left: 25%; width: 50%; height: 2px; border-radius: 1px; transform: translateY(2px); z-index: 1; }

   /* Event lines centered in cell */
   .ev-lines { position: absolute; bottom: 1px; left: 1px; right: 1px; display: flex; flex-direction: column; align-items: center; gap: 1px; }
   .ev-line { display: block; height: 2px; border-radius: 0.5px; }

  /* Arret bar */
  .arret-bar { margin-top: 1mm; border: 0.5px solid #ccc; border-radius: 2px; padding: 1mm 2mm; }
  .arret-bar-title { font-size: 6.5pt; font-weight: 700; margin-bottom: 1mm; }
  .arret-items { display: flex; flex-wrap: wrap; gap: 1mm 3mm; }
  .arret-tranche { display: flex; align-items: center; gap: 1mm; }
  .arret-tranche-label { font-size: 5.5pt; font-weight: 700; padding: 0.5mm 1.5mm; border-radius: 2px; }
  .arret-chip { font-size: 5pt; border: 0.5px solid; border-radius: 2px; padding: 0.3mm 1mm; white-space: nowrap; }
</style>
</head><body>
<div class="page">
  <div class="watermark">W planner</div>
  <img src="/images/logo-calendar.png" class="header-logo" alt="" />
  <div class="page-title">Calendrier ${year}</div>
  ${legend}
  ${arretSection}
  <div class="months-grid">${months}</div>
  <div class="footer-signature">
    <span>W Planner</span>
    <span class="separator">•</span>
    <span>Planning professionnel</span>
    <span class="separator">•</span>
    <span>${year}</span>
  </div>
</div>
<div class="print-btn-bar" style="position:fixed;top:8px;right:8px;z-index:999;display:flex;gap:6px;">
  <button onclick="window.print()" style="display:flex;align-items:center;gap:4px;padding:6px 14px;background:#111;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
    Imprimer
  </button>
</div>
<style>@media print { .print-btn-bar { display: none !important; } }</style>
</body></html>`;
}

```


// path: src/components/Export/DirectPDFExport.ts
```ts
/**
 * Direct jsPDF rendering — no HTML, no html2canvas.
 * Draws calendar grids natively for instant PDF generation.
 */
import jsPDF from 'jspdf';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isWeekend, isSameMonth, getWeek, isSameDay,
  startOfDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret,
  Holiday, CancelledAstreinteDate,
} from '@/types/calendar';
import { getArretColor } from '@/lib/trancheColors';

// ─── Shared helpers ───

function isHolidayDate(date: Date, holidays: Holiday[]): Holiday | null {
  return holidays.find(h => isSameDay(startOfDay(new Date(h.date)), startOfDay(date))) || null;
}

function isAstreinteDate(date: Date, astreintes: Astreinte[]): Astreinte | null {
  const d = startOfDay(date);
  return astreintes.find(a => {
    if (a.isCancelled) return false;
    return d >= startOfDay(new Date(a.startDate)) && d <= startOfDay(new Date(a.endDate));
  }) || null;
}

function isCancelledDate(date: Date, cancelled: CancelledAstreinteDate[]): boolean {
  return cancelled.some(c => isSameDay(new Date(c.date), date));
}

function getEventsOnDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
  const d = startOfDay(date);
  return events.filter(ev => d >= startOfDay(new Date(ev.startDate)) && d <= startOfDay(new Date(ev.endDate)));
}

function hexToRGB(hex: string): [number, number, number] {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  return [parseInt(hex.substring(0,2),16), parseInt(hex.substring(2,4),16), parseInt(hex.substring(4,6),16)];
}

function textColor(hex: string): [number, number, number] {
  const [r,g,b] = hexToRGB(hex);
  const lum = (0.299*r + 0.587*g + 0.114*b);
  return lum > 160 ? [0,0,0] : [255,255,255];
}

export interface PDFExportData {
  year: number;
  month?: number;
  settings: CalendarSettings;
  events: CalendarEvent[];
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  cancelledDates: CancelledAstreinteDate[];
}

// ─── ANNUAL PDF ───

export function generateAnnualPDFDirect(data: PDFExportData) {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const s = data.settings;
  const W = 297, H = 210;
  const margin = 5;

  // Watermark - simple centered text with low opacity
  const cx = W/2, cy = H/2;
  pdf.setTextColor(0, 58, 143);
  pdf.setFontSize(80);
  // Use GState for opacity
  try {
    // @ts-ignore
    const gState = new (pdf as any).GState({ opacity: 0.07 });
    pdf.saveGraphicsState();
    // @ts-ignore
    pdf.setGState(gState);
    pdf.text('W planner', cx, cy, { align: 'center', baseline: 'middle', angle: 35 });
    pdf.restoreGraphicsState();
  } catch {
    // Fallback: skip watermark if GState not available
  }

  // Title
  pdf.setTextColor(17, 17, 17);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Calendrier ${data.year}`, W/2, margin + 3, { align: 'center' });

  // Legend
  const legendY = margin + 7;
  drawLegend(pdf, data, W/2, legendY);

  // Grid 4×3
  const gridTop = legendY + 5;
  const gridLeft = margin;
  const gridW = W - 2*margin;
  const gridH = H - gridTop - 12; // leave room for footer
  const cols = 4, rows = 3;
  const gapX = 2.5, gapY = 2;
  const cellW = (gridW - (cols-1)*gapX) / cols;
  const cellH = (gridH - (rows-1)*gapY) / rows;

  for (let m = 0; m < 12; m++) {
    const col = m % 4;
    const row = Math.floor(m / 4);
    const x = gridLeft + col * (cellW + gapX);
    const y = gridTop + row * (cellH + gapY);
    drawMonth(pdf, data, data.year, m, x, y, cellW, cellH);
  }

  // Arret bar
  if (data.arrets.length > 0) {
    drawArretBar(pdf, data, margin, H - 11, gridW);
  }

  // Footer
  pdf.setFontSize(5);
  pdf.setTextColor(120, 120, 120);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`W Planner • Planning professionnel • ${data.year}`, W/2, H - 3, { align: 'center' });

  pdf.save(`Calendrier_${data.year}.pdf`);
}

function drawMonth(pdf: jsPDF, data: PDFExportData, year: number, month: number, x: number, y: number, w: number, h: number) {
  const s = data.settings;
  const monthDate = new Date(year, month, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const calStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  // Border
  pdf.setDrawColor(216, 216, 216);
  pdf.setLineWidth(0.2);
  pdf.roundedRect(x, y, w, h, 1, 1, 'S');

  // Month title bar
  const titleH = 4;
  pdf.setFillColor(...hexToRGB(s.yearMonthBgColor));
  pdf.rect(x, y, w, titleH, 'F');
  pdf.setFontSize(6);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...hexToRGB(s.yearMonthTextColor));
  const monthName = format(monthDate, 'MMMM', { locale: fr });
  pdf.text(monthName.charAt(0).toUpperCase() + monthName.slice(1), x + w/2, y + titleH/2, { align: 'center', baseline: 'middle' });

  // Header row
  const headerY = y + titleH;
  const wkW = 4;
  const dayW = (w - wkW) / 7;
  const rowH = (h - titleH - 3) / (weeks.length + 1); // +1 for header
  const headerH = Math.min(rowH, 3);

  // Week col header
  pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
  pdf.rect(x, headerY, wkW, headerH, 'F');
  pdf.setFontSize(4);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...hexToRGB(s.weekNumberTextColor));
  pdf.text('S', x + wkW/2, headerY + headerH/2, { align: 'center', baseline: 'middle' });

  // Day headers
  const dayLabels = ['L','M','M','J','V','S','D'];
  pdf.setFillColor(...hexToRGB(s.monthHeaderBgColor));
  pdf.rect(x + wkW, headerY, w - wkW, headerH, 'F');
  pdf.setTextColor(...hexToRGB(s.monthHeaderTextColor));
  pdf.setFontSize(4);
  for (let d = 0; d < 7; d++) {
    pdf.text(dayLabels[d], x + wkW + d*dayW + dayW/2, headerY + headerH/2, { align: 'center', baseline: 'middle' });
  }

  // Week rows
  const dataRowH = (h - titleH - headerH) / weeks.length;
  for (let wi = 0; wi < weeks.length; wi++) {
    const week = weeks[wi];
    const ry = headerY + headerH + wi * dataRowH;
    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });

    // Week number
    pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
    pdf.rect(x, ry, wkW, dataRowH, 'F');
    pdf.setFontSize(4);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...hexToRGB(s.weekNumberTextColor));
    pdf.text(String(wn), x + wkW/2, ry + dataRowH/2, { align: 'center', baseline: 'middle' });

    for (let di = 0; di < 7; di++) {
      const day = week[di];
      const dx = x + wkW + di * dayW;

      if (!isSameMonth(day, monthDate)) {
        pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
        pdf.rect(dx, ry, dayW, dataRowH, 'F');
        continue;
      }

      const we = isWeekend(day);
      const hol = isHolidayDate(day, data.holidays);
      const ast = isAstreinteDate(day, data.astreintes);
      const cancelled = isCancelledDate(day, data.cancelledDates);
      const evts = getEventsOnDate(day, data.events);
      const reEvt = evts.find(e => e.type === 're');
      const cpEvt = evts.find(e => e.type === 'cp');

      let bg = s.dayCellBgColor;
      if (we || hol) bg = s.weekendDaysBgColor;
      if (reEvt) bg = s.reColor;
      if (cpEvt) bg = s.cpColor;
      if (ast && !cancelled) bg = s.astreinteColor;

      pdf.setFillColor(...hexToRGB(bg));
      pdf.rect(dx, ry, dayW, dataRowH, 'F');

      // Border
      pdf.setDrawColor(...hexToRGB(s.weekNumberBgColor));
      pdf.setLineWidth(0.1);
      pdf.rect(dx, ry, dayW, dataRowH, 'S');

      // Day number
      const tc = textColor(bg);
      pdf.setTextColor(...tc);
      pdf.setFontSize(5);
      pdf.setFont('helvetica', 'bold');
      pdf.text(String(day.getDate()), dx + dayW/2, ry + dataRowH/2 - 0.5, { align: 'center', baseline: 'middle' });

      // Event lines (max 2)
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      for (let ei = 0; ei < Math.min(otherEvts.length, 2); ei++) {
        const evt = otherEvts[ei];
        pdf.setFillColor(...hexToRGB(evt.color));
        const lineY = ry + dataRowH - 1.5 - ei * 1;
        pdf.rect(dx + dayW*0.15, lineY, dayW*0.7, 0.6, 'F');
      }
    }
  }
}

function drawLegend(pdf: jsPDF, data: PDFExportData, cx: number, y: number) {
  const s = data.settings;
  const items: { label: string; color: string }[] = [
    { label: 'Astreinte', color: s.astreinteColor },
    { label: 'RE', color: s.reColor },
    { label: '21 (Congés)', color: s.cpColor },
  ];
  if (data.vacations.length > 0) items.push({ label: 'Vacances scolaires', color: s.vacationColor });

  // Unique events
  const seen = new Set<string>();
  for (const evt of data.events) {
    if (evt.type === 're' || evt.type === 'cp') continue;
    const key = evt.name || evt.type;
    if (!seen.has(key)) { seen.add(key); items.push({ label: key, color: evt.color }); }
  }

  const swatchW = 3, swatchH = 2, gap = 1.5, itemGap = 4;
  pdf.setFontSize(5);
  pdf.setFont('helvetica', 'normal');

  // Measure total width
  let totalW = 0;
  for (const it of items) {
    totalW += swatchW + gap + pdf.getTextWidth(it.label) + itemGap;
  }
  totalW -= itemGap;

  let ix = cx - totalW/2;
  for (const it of items) {
    pdf.setFillColor(...hexToRGB(it.color));
    pdf.rect(ix, y - swatchH/2, swatchW, swatchH, 'F');
    ix += swatchW + gap;
    pdf.setTextColor(60, 60, 60);
    pdf.text(it.label, ix, y, { baseline: 'middle' });
    ix += pdf.getTextWidth(it.label) + itemGap;
  }
}

function drawArretBar(pdf: jsPDF, data: PDFExportData, x: number, y: number, w: number) {
  const s = data.settings;
  pdf.setFontSize(5);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(40, 40, 40);
  pdf.text('Planning Arrêts', x, y);

  const byTranche = new Map<string, Arret[]>();
  data.arrets.forEach(a => {
    const list = byTranche.get(a.tranche) || [];
    list.push(a);
    byTranche.set(a.tranche, list);
  });

  let cx = x;
  const chipY = y + 2;
  pdf.setFontSize(4);
  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    // Tranche label
    pdf.setFillColor(...hexToRGB(color));
    const labelW = pdf.getTextWidth(tranche) + 2;
    pdf.roundedRect(cx, chipY, labelW, 3, 0.5, 0.5, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.text(tranche, cx + labelW/2, chipY + 1.5, { align: 'center', baseline: 'middle' });
    cx += labelW + 1;

    // Chips
    pdf.setFont('helvetica', 'normal');
    for (const a of arretList) {
      const start = format(new Date(a.startDate), 'dd/MM', { locale: fr });
      const end = format(new Date(a.endDate), 'dd/MM', { locale: fr });
      const label = a.type === 'prepa' && a.module ? a.module : 'AT';
      const txt = `${label}: ${start}–${end}`;
      const tw = pdf.getTextWidth(txt) + 2;
      pdf.setDrawColor(...hexToRGB(color));
      pdf.setLineWidth(0.2);
      pdf.roundedRect(cx, chipY, tw, 3, 0.5, 0.5, 'S');
      pdf.setTextColor(60, 60, 60);
      pdf.text(txt, cx + tw/2, chipY + 1.5, { align: 'center', baseline: 'middle' });
      cx += tw + 1;
      if (cx > x + w - 10) { cx = x; /* wrap would need new line - simplified */ }
    }
    cx += 2;
  });
}

// ─── MONTHLY PDF ───

export function generateMonthlyPDFDirect(data: PDFExportData) {
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const s = data.settings;
  const W = 210, H = 297;
  const margin = 6;
  const month = data.month ?? 0;

  // Title
  const m1Name = format(new Date(data.year, month, 1), 'MMMM yyyy', { locale: fr });
  const nextM = month + 1 > 11 ? 0 : month + 1;
  const nextY = month + 1 > 11 ? data.year + 1 : data.year;
  const m2Name = format(new Date(nextY, nextM, 1), 'MMMM yyyy', { locale: fr });
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(17, 17, 17);
  pdf.text(`${cap(m1Name)} — ${cap(m2Name)}`, W/2, margin + 4, { align: 'center' });

  // Legend
  drawLegend(pdf, data, W/2, margin + 9);

  // Draw two months
  const tableTop = margin + 14;
  const tableH = (H - tableTop - 15) / 2 - 3;
  drawMonthlyTable(pdf, data, data.year, month, margin, tableTop, W - 2*margin, tableH);
  drawMonthlyTable(pdf, data, nextY, nextM, margin, tableTop + tableH + 6, W - 2*margin, tableH);

  // Arret bar
  if (data.arrets.length > 0) {
    drawArretBar(pdf, data, margin, H - 12, W - 2*margin);
  }

  // Footer
  pdf.setFontSize(5);
  pdf.setTextColor(120, 120, 120);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`W Planner • Planning professionnel • ${data.year}`, W/2, H - 4, { align: 'center' });

  const monthNames = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'];
  pdf.save(`${monthNames[month]}_${data.year}.pdf`);
}

function drawMonthlyTable(pdf: jsPDF, data: PDFExportData, year: number, month: number, x: number, y: number, w: number, h: number) {
  const s = data.settings;
  const monthDate = new Date(year, month, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const calStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  // Title bar
  const titleH = 5;
  pdf.setFillColor(...hexToRGB(s.yearMonthBgColor));
  pdf.roundedRect(x, y, w, titleH, 1, 1, 'F');
  // Fill bottom corners
  pdf.rect(x, y + titleH - 1, w, 1, 'F');
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...hexToRGB(s.yearMonthTextColor));
  const mName = format(monthDate, 'MMMM yyyy', { locale: fr });
  pdf.text(mName.charAt(0).toUpperCase() + mName.slice(1), x + w/2, y + titleH/2, { align: 'center', baseline: 'middle' });

  // Header row
  const headerY = y + titleH;
  const wkW = 7;
  const dayW = (w - wkW) / 7;
  const headerH = 4;

  pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
  pdf.rect(x, headerY, wkW, headerH, 'F');
  pdf.setFontSize(5);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...hexToRGB(s.weekNumberTextColor));
  pdf.text('Sem', x + wkW/2, headerY + headerH/2, { align: 'center', baseline: 'middle' });

  const dayLabels = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  pdf.setFillColor(...hexToRGB(s.monthHeaderBgColor));
  pdf.rect(x + wkW, headerY, w - wkW, headerH, 'F');
  pdf.setTextColor(...hexToRGB(s.monthHeaderTextColor));
  for (let d = 0; d < 7; d++) {
    pdf.text(dayLabels[d], x + wkW + d*dayW + dayW/2, headerY + headerH/2, { align: 'center', baseline: 'middle' });
  }

  // Data rows
  const dataH = h - titleH - headerH;
  const rowH = dataH / weeks.length;

  for (let wi = 0; wi < weeks.length; wi++) {
    const week = weeks[wi];
    const ry = headerY + headerH + wi * rowH;
    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });

    // Week number
    pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
    pdf.rect(x, ry, wkW, rowH, 'F');
    pdf.setFontSize(5);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...hexToRGB(s.weekNumberTextColor));
    pdf.text(String(wn), x + wkW/2, ry + rowH/2, { align: 'center', baseline: 'middle' });

    for (let di = 0; di < 7; di++) {
      const day = week[di];
      const dx = x + wkW + di * dayW;

      if (!isSameMonth(day, monthDate)) {
        pdf.setFillColor(...hexToRGB(s.weekNumberBgColor));
        pdf.rect(dx, ry, dayW, rowH, 'F');
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.1);
        pdf.rect(dx, ry, dayW, rowH, 'S');
        continue;
      }

      const we = isWeekend(day);
      const hol = isHolidayDate(day, data.holidays);
      const ast = isAstreinteDate(day, data.astreintes);
      const cancelled = isCancelledDate(day, data.cancelledDates);
      const evts = getEventsOnDate(day, data.events);
      const reEvt = evts.find(e => e.type === 're');
      const cpEvt = evts.find(e => e.type === 'cp');

      let bg = s.dayCellBgColor;
      if (we || hol) bg = s.weekendDaysBgColor;
      if (reEvt) bg = s.reColor;
      if (cpEvt) bg = s.cpColor;
      if (ast && !cancelled) bg = s.astreinteColor;

      pdf.setFillColor(...hexToRGB(bg));
      pdf.rect(dx, ry, dayW, rowH, 'F');
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.1);
      pdf.rect(dx, ry, dayW, rowH, 'S');

      // Day number
      const tc = textColor(bg);
      pdf.setTextColor(...tc);
      pdf.setFontSize(6);
      pdf.setFont('helvetica', 'bold');
      pdf.text(String(day.getDate()), dx + 1.5, ry + 3.5);

      // State label
      if (cpEvt) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('21', dx + dayW/2, ry + rowH/2 + 1, { align: 'center', baseline: 'middle' });
      } else if (reEvt) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('RE', dx + dayW/2, ry + rowH/2 + 1, { align: 'center', baseline: 'middle' });
      } else if (hol) {
        pdf.setFontSize(4);
        pdf.setFont('helvetica', 'normal');
        pdf.text(hol.name, dx + dayW/2, ry + rowH/2 + 1, { align: 'center', baseline: 'middle', maxWidth: dayW - 1 });
      }

      // Event blocks (max 3)
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      for (let ei = 0; ei < Math.min(otherEvts.length, 3); ei++) {
        const evt = otherEvts[ei];
        const blockH = Math.min(rowH * 0.2, 3);
        const blockY = ry + rowH - 2 - ei * (blockH + 0.5);
        pdf.setFillColor(...hexToRGB(evt.color));
        pdf.roundedRect(dx + 0.5, blockY, dayW - 1, blockH, 0.3, 0.3, 'F');
        pdf.setFontSize(3.5);
        pdf.setTextColor(255, 255, 255);
        pdf.setFont('helvetica', 'bold');
        const evtName = (evt.name || '').substring(0, 12);
        pdf.text(evtName, dx + dayW/2, blockY + blockH/2, { align: 'center', baseline: 'middle' });
      }
    }
  }
}

```


// path: src/components/Export/ExportPDF.tsx
```ts
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret, Holiday, CancelledAstreinteDate } from '@/types/calendar';
import { generateAnnualPDFDirect, generateMonthlyPDFDirect, PDFExportData } from './DirectPDFExport';

export interface AnnualExportData {
  year: number;
  settings: CalendarSettings;
  events: CalendarEvent[];
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  cancelledDates: CancelledAstreinteDate[];
}

export interface MonthlyExportData {
  year: number;
  month: number;
  settings: CalendarSettings;
  events: CalendarEvent[];
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  cancelledDates: CancelledAstreinteDate[];
}

// Annual PDF — direct jsPDF rendering (no HTML/canvas)
export function exportAnnualPDF(data: AnnualExportData) {
  generateAnnualPDFDirect(data as PDFExportData);
}

// Monthly PDF — direct jsPDF rendering (no HTML/canvas)
export function exportMonthlyPDF(data: MonthlyExportData) {
  generateMonthlyPDFDirect({ ...data, month: data.month } as PDFExportData);
}

// Week PDF: clone screen (fallback)
export function exportPDF(viewMode: 'year' | 'month' | 'week') {
  const calendar = document.querySelector('[data-calendar-print]');
  const legend = document.querySelector('[data-legend-print]');
  const arretBar = document.querySelector('[data-arret-print]');
  if (!calendar) { alert('Calendrier introuvable pour export PDF.'); return; }

  const title = `Calendrier`;
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><title>${title}</title>
    <style>
      @page { size: A4 landscape; margin: 8mm; }
      body { font-family: system-ui, sans-serif; background: white; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      h1 { text-align: center; margin-bottom: 8px; font-size: 16px; }
      .print-wrapper { display: flex; flex-direction: column; gap: 8px; }
      * { box-sizing: border-box; }
      [style*="overflow"] { overflow: visible !important; }
    </style></head><body>
    <h1>${title}</h1>
    <div class="print-wrapper">
      ${legend ? legend.outerHTML : ''}
      ${calendar.outerHTML}
      ${arretBar ? arretBar.outerHTML : ''}
    </div>
    <script>window.onload=()=>{setTimeout(()=>{window.print();window.close();},300);};<\/script>
    </body></html>`);
  printWindow.document.close();
}

// Component version (kept for compatibility)
interface ExportPDFProps {
  viewMode: 'year' | 'month';
  year: number;
  month?: number;
}

export function ExportPDF({ viewMode }: ExportPDFProps) {
  return (
    <Button variant="outline" size="sm" onClick={() => exportPDF(viewMode)}>
      <FileDown className="h-4 w-4 mr-2" />
      Exporter PDF
    </Button>
  );
}

```


// path: src/components/Export/ICSExportDialog.tsx
```ts
import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Download } from 'lucide-react';
import { CalendarEvent } from '@/types/calendar';
import { downloadICS } from '@/lib/icsUtils';

interface ICSExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  events: CalendarEvent[];
}

export function ICSExportDialog({ open, onOpenChange, events }: ICSExportDialogProps) {
  const [includeExternal, setIncludeExternal] = useState(false);

  const internalEvents = useMemo(() => events.filter(e => !e.source || e.source === 'internal'), [events]);
  const externalEvents = useMemo(() => events.filter(e => e.source && e.source !== 'internal'), [events]);

  const eventsToExport = includeExternal ? events : internalEvents;

  const handleExport = () => {
    downloadICS(eventsToExport, 'calendrier.ics');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Exporter vers calendrier externe
          </DialogTitle>
          <DialogDescription>
            Génère un fichier .ics importable dans Outlook, Apple Calendar, Google Calendar, etc.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <p className="text-sm font-medium">Événements à exporter :</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">{internalEvents.length} interne(s)</Badge>
              {externalEvents.length > 0 && (
                <Badge variant="secondary">{externalEvents.length} externe(s)</Badge>
              )}
            </div>
          </div>

          {externalEvents.length > 0 && (
            <div className="flex items-center gap-2">
              <Checkbox
                id="include-external"
                checked={includeExternal}
                onCheckedChange={(checked) => setIncludeExternal(!!checked)}
              />
              <label htmlFor="include-external" className="text-sm text-muted-foreground cursor-pointer">
                Inclure les événements externes
              </label>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button onClick={handleExport} disabled={eventsToExport.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Exporter ({eventsToExport.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

```


// path: src/components/Export/MonthlyPrintLayout.ts
```ts
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isWeekend, isSameMonth, getWeek, isSameDay,
  startOfDay,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  CalendarSettings, CalendarEvent, Astreinte, Vacation, Arret,
  Holiday, CancelledAstreinteDate, PatternType,
} from '@/types/calendar';
import { getArretColor, getArretPattern } from '@/lib/trancheColors';

interface MonthlyPrintData {
  year: number;
  month: number;
  settings: CalendarSettings;
  events: CalendarEvent[];
  astreintes: Astreinte[];
  vacations: Vacation[];
  arrets: Arret[];
  holidays: Holiday[];
  cancelledDates: CancelledAstreinteDate[];
}

function isHolidayDate(date: Date, holidays: Holiday[]): Holiday | null {
  return holidays.find(h => isSameDay(startOfDay(new Date(h.date)), startOfDay(date))) || null;
}

function isVacationDate(date: Date, vacations: Vacation[]): Vacation | null {
  const d = startOfDay(date);
  return vacations.find(v => {
    const s = startOfDay(new Date(v.startDate));
    const e = startOfDay(new Date(v.endDate));
    return d >= s && d <= e;
  }) || null;
}

function isAstreinteDate(date: Date, astreintes: Astreinte[]): Astreinte | null {
  const d = startOfDay(date);
  return astreintes.find(a => {
    if (a.isCancelled) return false;
    const s = startOfDay(new Date(a.startDate));
    const e = startOfDay(new Date(a.endDate));
    return d >= s && d <= e;
  }) || null;
}

function getEventsOnDate(date: Date, events: CalendarEvent[]): CalendarEvent[] {
  const d = startOfDay(date);
  return events.filter(ev => {
    const s = startOfDay(new Date(ev.startDate));
    const e = startOfDay(new Date(ev.endDate));
    return d >= s && d <= e;
  });
}

function isCancelledDate(date: Date, cancelled: CancelledAstreinteDate[]): boolean {
  return cancelled.some(c => isSameDay(startOfDay(new Date(c.date)), startOfDay(date)));
}

function getPatternSVG(pattern: PatternType, color: string, id: string): string {
  switch (pattern) {
    case 'stripes':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><line x1="0" y1="0" x2="6" y2="6" stroke="#fff" stroke-width="1" opacity="0.6"/></pattern>`;
    case 'dots':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><circle cx="3" cy="3" r="1.2" fill="#fff" opacity="0.6"/></pattern>`;
    case 'crosshatch':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><line x1="0" y1="0" x2="6" y2="6" stroke="#fff" stroke-width="0.8" opacity="0.5"/><line x1="6" y1="0" x2="0" y2="6" stroke="#fff" stroke-width="0.8" opacity="0.5"/></pattern>`;
    case 'diagonal':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><line x1="0" y1="6" x2="6" y2="0" stroke="#fff" stroke-width="1" opacity="0.6"/></pattern>`;
    case 'waves':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="10" height="6"><rect width="10" height="6" fill="${color}"/><path d="M0 3 Q2.5 0 5 3 Q7.5 6 10 3" stroke="#fff" stroke-width="0.8" fill="none" opacity="0.6"/></pattern>`;
    case 'grid':
      return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="6" height="6"><rect width="6" height="6" fill="${color}"/><line x1="3" y1="0" x2="3" y2="6" stroke="#fff" stroke-width="0.6" opacity="0.5"/><line x1="0" y1="3" x2="6" y2="3" stroke="#fff" stroke-width="0.6" opacity="0.5"/></pattern>`;
    default:
      return '';
  }
}

function buildContextBarsForWeek(week: Date[], monthDate: Date, data: MonthlyPrintData): string {
  const s = data.settings;
  const bars: string[] = [];
  let patternCounter = 0;

  // Vacation bars
  for (const vac of data.vacations) {
    const vacStart = startOfDay(new Date(vac.startDate));
    const vacEnd = startOfDay(new Date(vac.endDate));
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = startOfDay(day);
      if (d >= vacStart && d <= vacEnd) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      const left = ((firstCol + 1) / 8 * 100);
      const width = ((lastCol - firstCol + 1) / 8 * 100);
      bars.push(`<div style="position:absolute;top:0;left:${left}%;width:${width}%;height:4px;background:${s.vacationColor};border-radius:1px;z-index:1;"></div>`);
    }
  }

  // AT bars
  const arretSlots: { arret: Arret; firstCol: number; lastCol: number }[] = [];
  const processedArrets = new Set<string>();
  for (const arret of data.arrets) {
    if (arret.type !== 'arret') continue;
    if (processedArrets.has(arret.id)) continue;
    const arretStart = startOfDay(new Date(arret.startDate));
    const arretEnd = startOfDay(new Date(arret.endDate));
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = startOfDay(day);
      if (d >= arretStart && d <= arretEnd) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      processedArrets.add(arret.id);
      arretSlots.push({ arret, firstCol, lastCol });
    }
  }

  // Prépa bars (half-width centered)
  const prepaSlots: { arret: Arret; firstCol: number; lastCol: number }[] = [];
  const processedPrepas = new Set<string>();
  for (const arret of data.arrets) {
    if (arret.type !== 'prepa') continue;
    if (processedPrepas.has(arret.id)) continue;
    const arretStart = startOfDay(new Date(arret.startDate));
    const arretEnd = startOfDay(new Date(arret.endDate));
    let firstCol = -1, lastCol = -1;
    for (let i = 0; i < 7; i++) {
      const day = week[i];
      if (!isSameMonth(day, monthDate)) continue;
      const d = startOfDay(day);
      if (d >= arretStart && d <= arretEnd) {
        if (firstCol === -1) firstCol = i;
        lastCol = i;
      }
    }
    if (firstCol !== -1) {
      processedPrepas.add(arret.id);
      prepaSlots.push({ arret, firstCol, lastCol });
    }
  }

  const arretBarHeight = 4;
  const arretStartY = 5;
  for (let idx = 0; idx < arretSlots.length; idx++) {
    const { arret, firstCol, lastCol } = arretSlots[idx];
    const color = getArretColor(arret, s);
    const pattern = getArretPattern(arret);
    const left = ((firstCol + 1) / 8 * 100);
    const width = ((lastCol - firstCol + 1) / 8 * 100);
    const top = arretStartY + idx * (arretBarHeight + 1);
    if (pattern !== 'none') {
      const patId = `mp_${monthDate.getMonth()}_a${patternCounter++}`;
      const patSvg = getPatternSVG(pattern, color, patId);
      if (patSvg) {
        bars.push(`<svg style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${arretBarHeight}px;z-index:2;"><defs>${patSvg}</defs><rect width="100%" height="100%" fill="url(#${patId})" rx="1"/></svg>`);
        continue;
      }
    }
    bars.push(`<div style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${arretBarHeight}px;background:${color};border-radius:1px;z-index:2;"></div>`);
  }

  const prepaStartY = arretSlots.length > 0 ? arretStartY + arretSlots.length * (arretBarHeight + 1) : arretStartY;
  const prepaBarHeight = 4;
  for (let idx = 0; idx < prepaSlots.length; idx++) {
    const { arret, firstCol, lastCol } = prepaSlots[idx];
    const color = getArretColor(arret, s);
    const pattern = getArretPattern(arret);
    const top = prepaStartY + idx * (prepaBarHeight + 1);

    // Individual half-width centered line per day cell
    for (let col = firstCol; col <= lastCol; col++) {
      const cellLeft = ((col + 1) / 8 * 100);
      const cellWidth = (1 / 8 * 100);
      const left = cellLeft + cellWidth * 0.25;
      const width = cellWidth * 0.5;

      if (pattern !== 'none') {
        const patId = `mp_${monthDate.getMonth()}_p${patternCounter++}`;
        const patSvg = getPatternSVG(pattern, color, patId);
        if (patSvg) {
          bars.push(`<svg style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${prepaBarHeight}px;z-index:2;"><defs>${patSvg}</defs><rect width="100%" height="100%" fill="url(#${patId})" rx="1"/></svg>`);
          continue;
        }
      }
      bars.push(`<div style="position:absolute;top:${top}px;left:${left}%;width:${width}%;height:${prepaBarHeight}px;background:${color};border-radius:1px;z-index:2;"></div>`);
    }
  }

  if (bars.length === 0) return '';
  const allSlots = arretSlots.length + prepaSlots.length;
  const totalHeight = allSlots > 0 ? prepaStartY + prepaSlots.length * (prepaBarHeight + 1) : 5;
  return `<tr><td class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor};padding:0;border:none;"></td><td colspan="7" style="position:relative;height:${totalHeight}px;padding:0;border:none;">${bars.join('')}</td></tr>`;
}

function collectEventLegendItems(data: MonthlyPrintData): { label: string; bg: string }[] {
  const seen = new Map<string, string>();
  for (const evt of data.events) {
    if (evt.type === 're' || evt.type === 'cp') continue;
    const key = evt.name || evt.type;
    if (!seen.has(key)) seen.set(key, evt.color);
  }
  return Array.from(seen.entries()).map(([label, bg]) => ({ label, bg }));
}

function buildLegendHTML(data: MonthlyPrintData): string {
  const s = data.settings;
  const items: { label: string; bg: string; border?: string }[] = [
    { label: 'Astreinte', bg: s.astreinteColor },
    { label: 'RE', bg: s.reColor, border: '#999' },
    { label: '21 (Congés)', bg: s.cpColor },
  ];
  if (data.vacations.length > 0) {
    items.push({ label: 'Vacances scolaires', bg: s.vacationColor });
  }
  const eventItems = collectEventLegendItems(data);
  for (const ei of eventItems) {
    items.push({ label: ei.label, bg: ei.bg });
  }

  let html = `<div class="legend">`;
  items.forEach(it => {
    html += `<div class="legend-item"><span class="legend-swatch" style="background:${it.bg};${it.border ? `border:1px solid ${it.border}` : ''}"></span><span class="legend-label">${it.label}</span></div>`;
  });
  html += `</div>`;
  return html;
}

function buildArretBarHTML(data: MonthlyPrintData): string {
  if (data.arrets.length === 0) return '';
  const s = data.settings;

  const byTranche = new Map<string, Arret[]>();
  data.arrets.forEach(a => {
    const list = byTranche.get(a.tranche) || [];
    list.push(a);
    byTranche.set(a.tranche, list);
  });

  const trancheSwatches: string[] = [];
  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    trancheSwatches.push(`<div class="legend-item"><span class="legend-swatch" style="background:${color}"></span><span class="legend-label">${tranche}</span></div>`);
  });

  let html = `<div class="arret-bar"><div class="arret-bar-title">Planning Arrêts</div><div class="arret-items">`;
  byTranche.forEach((arretList, tranche) => {
    const color = getArretColor(arretList[0], s);
    html += `<div class="arret-tranche"><span class="arret-tranche-label" style="background:${color};color:#FFF">${tranche}</span>`;
    arretList.forEach(a => {
      const start = format(new Date(a.startDate), 'dd/MM', { locale: fr });
      const end = format(new Date(a.endDate), 'dd/MM', { locale: fr });
      const label = a.type === 'prepa' && a.module ? `${a.module}` : 'AT';
      html += `<span class="arret-chip" style="border-color:${color}">${label}: ${start}–${end}</span>`;
    });
    html += `</div>`;
  });
  html += `</div></div>`;

  return `<div class="arret-legend-line">${trancheSwatches.join('')}</div>${html}`;
}

function buildMonthTableHTML(year: number, month: number, data: MonthlyPrintData): { monthName: string; tableHTML: string } {
  const monthDate = new Date(year, month, 1);
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const calStart = startOfWeek(monthStart, { locale: fr, weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { locale: fr, weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: calStart, end: calEnd });
  const s = data.settings;

  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const monthName = format(monthDate, 'MMMM yyyy', { locale: fr });

  // Build data object scoped to this month for context bars
  const monthData: MonthlyPrintData = { ...data, year, month };

  let tableHTML = `<div class="month-section"><div class="month-section-title" style="background:${s.yearMonthBgColor};color:${s.yearMonthTextColor}">${monthName}</div>`;
  tableHTML += `<table class="month-table"><thead><tr>
    <th class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">Sem</th>`;
  ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].forEach(d => {
    tableHTML += `<th style="background:${s.monthHeaderBgColor};color:${s.monthHeaderTextColor}">${d}</th>`;
  });
  tableHTML += `</tr></thead><tbody>`;

  const cellHeight = 70;

  for (const week of weeks) {
    tableHTML += buildContextBarsForWeek(week, monthDate, monthData);

    const wn = getWeek(week[0], { locale: fr, weekStartsOn: 1 });
    tableHTML += `<tr><td class="wk-col" style="background:${s.weekNumberBgColor};color:${s.weekNumberTextColor}">${wn}</td>`;

    for (const day of week) {
      if (!isSameMonth(day, monthDate)) {
        tableHTML += `<td class="day empty" style="background:${s.weekNumberBgColor};height:${cellHeight}px"></td>`;
        continue;
      }

      const we = isWeekend(day);
      const hol = isHolidayDate(day, data.holidays);
      const ast = isAstreinteDate(day, data.astreintes);
      const cancelled = isCancelledDate(day, data.cancelledDates);
      const evts = getEventsOnDate(day, data.events);
      const reEvt = evts.find(e => e.type === 're');
      const cpEvt = evts.find(e => e.type === 'cp');

      let bg = s.dayCellBgColor;
      let fg = s.dayCellTextColor;

      if (we || hol) { bg = s.weekendDaysBgColor; fg = s.weekendDaysTextColor; }
      if (reEvt) { bg = s.reColor; fg = '#333'; }
      if (cpEvt) { bg = s.cpColor; fg = '#FFF'; }
      if (ast && !cancelled) { bg = s.astreinteColor; fg = '#333'; }

      // State labels (CP, RE, holiday) - big, bold, centered
      let stateLabel = '';
      if (cpEvt) {
        stateLabel = `<div class="state-label">CP</div>`;
      } else if (reEvt) {
        stateLabel = `<div class="state-label">RE</div>`;
      } else if (hol) {
        stateLabel = `<div class="state-label">${hol.name}</div>`;
      }

      // Timed events positioned vertically
      const otherEvts = evts.filter(e => e.type !== 're' && e.type !== 'cp');
      let eventsHTML = '';
      for (const evt of otherEvts.slice(0, 3)) {
        const safeName = (evt.name || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        const startMinutes = evt.startTime ? (parseInt(evt.startTime.split(':')[0]) * 60 + parseInt(evt.startTime.split(':')[1] || '0')) : 5 * 60;
        const endMinutes = evt.endTime ? (parseInt(evt.endTime.split(':')[0]) * 60 + parseInt(evt.endTime.split(':')[1] || '0')) : 21 * 60;
        const clampedStart = Math.max(startMinutes, 5 * 60);
        const clampedEnd = Math.min(endMinutes, 21 * 60);
        const topPct = ((clampedStart - 5 * 60) / (16 * 60)) * 100;
        const heightPct = Math.max(((clampedEnd - clampedStart) / (16 * 60)) * 100, 12);
        eventsHTML += `<div class="ev-block" style="top:${16 + topPct * 0.64}%;height:${heightPct * 0.64}%;background:${evt.color}">
          <span class="ev-name">${safeName}</span>
          ${evt.startTime ? `<span class="ev-time">${evt.startTime}</span>` : ''}
        </div>`;
      }

      tableHTML += `<td class="day" style="background:${bg};color:${fg};height:${cellHeight}px">
        <span class="day-num">${day.getDate()}</span>
        ${stateLabel}
        ${eventsHTML}
      </td>`;
    }
    tableHTML += `</tr>`;
  }
  tableHTML += `</tbody></table></div>`;

  return { monthName, tableHTML };
}

export function generateMonthlyPrintHTML(data: MonthlyPrintData): string {
  const { year, month } = data;
  const s = data.settings;
  
  // Build 2 months: current + next
  const month1 = buildMonthTableHTML(year, month, data);
  const nextMonth = month + 1;
  const nextYear = nextMonth > 11 ? year + 1 : year;
  const nextMonthIdx = nextMonth > 11 ? 0 : nextMonth;
  const month2 = buildMonthTableHTML(nextYear, nextMonthIdx, data);

  const legend = buildLegendHTML(data);
  const arretSection = buildArretBarHTML(data);

  const title = `${month1.monthName} — ${month2.monthName}`;

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/>
<title>${title}</title>
<style>
  @page { size: A4 portrait; margin: 6mm; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 210mm; height: 297mm;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: #ffffff; color: #111;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
    overflow: hidden;
  }

  .page {
    position: relative; z-index: 1;
    width: 198mm; margin: 0 auto;
    padding: 3mm 4mm;
    display: flex; flex-direction: column; align-items: center;
    transform: scale(0.87); transform-origin: top center;
  }

  /* Watermark */
  .watermark {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-35deg);
    font-size: 90pt; font-weight: 900; color: #003A8F; opacity: 0.10;
    letter-spacing: 12px; white-space: nowrap; z-index: 0; pointer-events: none;
  }

  .header-logo {
    position: absolute; top: 3mm; right: 4mm;
    width: 18mm; height: auto; opacity: 0.7;
    z-index: 2;
  }

  /* Footer signature */
  .footer-signature { position: absolute; bottom: 3mm; left: 0; width: 100%; text-align: center;
    font-size: 5pt; color: rgba(0,0,0,0.45); letter-spacing: 1px; font-weight: 500; }
  .footer-signature .separator { margin: 0 4px; opacity: 0.4; }

  .page-title {
    text-align: center;
    font-size: 13pt; font-weight: 600;
    letter-spacing: 0.4px; color: #111;
    margin-bottom: 2mm;
    text-transform: capitalize;
    width: 100%;
  }

  /* Legend */
  .legend { display: flex; flex-wrap: wrap; gap: 1mm 3mm; justify-content: center; margin-bottom: 1.5mm; width: 100%; }
  .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 5.5pt; line-height: 1; }
  .legend-swatch { width: 12px; height: 7px; border-radius: 1px; flex-shrink: 0; }
  .legend-label { white-space: nowrap; line-height: 1; }

  .arret-legend-line { display: flex; flex-wrap: wrap; gap: 1mm 3mm; justify-content: center; margin-bottom: 1.5mm; width: 100%; }
  .arret-legend-line .legend-item { display: flex; align-items: center; gap: 1mm; font-size: 5.5pt; }
  .arret-legend-line .legend-swatch { width: 12px; height: 7px; border-radius: 1px; flex-shrink: 0; }

  /* Month sections - premium card style */
  .month-section {
    width: 100%; margin-bottom: 5mm;
    border: 1px solid #d0d0d0; border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
  .month-section-title {
    text-align: center; font-size: 10pt; font-weight: 700;
    text-transform: capitalize; margin-bottom: 0;
    padding: 0; height: 24px; line-height: 24px;
    letter-spacing: 0.3px;
  }

  /* Table */
  .month-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  .month-table th, .month-table td { text-align: center; padding: 0; vertical-align: middle; border: 0.5px solid ${s.weekNumberBgColor}; }
  .month-table th { font-size: 5.5pt; font-weight: 600; height: 16px; line-height: 16px; }
  .month-table td { font-size: 7pt; }
  .wk-col { width: 18px; font-size: 5.5pt !important; font-weight: 600; line-height: 16px; }

  .day { position: relative; vertical-align: middle; }
  .day-num { position: relative; z-index: 1; font-size: 6.5pt; font-weight: 600; vertical-align: middle; }
  .state-label { font-size: 12pt; font-weight: 800; text-align: center; width: 100%; margin-top: 2px; line-height: 1; }

  .ev-block { position: absolute; left: 1px; right: 1px; border-radius: 1.5px; color: #fff; overflow: hidden; z-index: 2; display: flex; flex-direction: column; align-items: center; padding-top: 1px; }
  .ev-name { font-size: 7pt; font-weight: 800; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; }
  .ev-time { font-size: 5pt; opacity: 0.8; }

  /* Arret bar */
  .arret-bar { margin-top: 1.5mm; border: 0.5px solid #d0d0d0; border-radius: 3px; padding: 1.5mm 2mm; width: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .arret-bar-title { font-size: 6pt; font-weight: 700; margin-bottom: 0.5mm; }
  .arret-items { display: flex; flex-wrap: wrap; gap: 0.5mm 2mm; }
  .arret-tranche { display: flex; align-items: center; gap: 0.5mm; }
  .arret-tranche-label { font-size: 5pt; font-weight: 700; padding: 0.3mm 1mm; border-radius: 2px; }
  .arret-chip { font-size: 4.5pt; border: 0.5px solid; border-radius: 2px; padding: 0.2mm 0.8mm; white-space: nowrap; }

  /* Print button */
  .print-btn {
    position: fixed; top: 12px; right: 12px; z-index: 9999;
    padding: 10px 22px; background: #111; color: #fff; border: none; border-radius: 8px;
    font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .print-btn:hover { background: #333; }
  @media print { .print-btn { display: none !important; } }
</style>
</head><body>
<button class="print-btn" onclick="window.print()">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
  Imprimer
</button>
<div class="page">
  <div class="watermark">W planner</div>
  <img src="/images/logo-calendar.png" class="header-logo" alt="" />
  <div class="page-title">${title}</div>
  ${legend}
  ${arretSection}
  ${month1.tableHTML}
  ${month2.tableHTML}
  <div class="footer-signature">
    <span>W Planner</span>
    <span class="separator">•</span>
    <span>Planning professionnel</span>
    <span class="separator">•</span>
    <span>${year}</span>
  </div>
</div>
</body></html>`
}

```


// path: src/components/Import/ExcelImport.tsx
```ts
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type ImportType = 'events' | 'vacations' | 'arrets' | 'holidays';

interface ExcelImportProps {
  onImportEvents: (data: any[]) => void;
  onImportVacations: (data: any[]) => void;
  onImportArrets: (data: any[]) => void;
  onImportHolidays: (data: any[]) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ExcelImport({
  onImportEvents,
  onImportVacations,
  onImportArrets,
  onImportHolidays,
  open: controlledOpen,
  onOpenChange,
}: ExcelImportProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v);
    if (!isControlled) setInternalOpen(v);
  };
  const [importType, setImportType] = useState<ImportType>('events');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseDate = (value: any): Date | null => {
    if (!value) return null;
    
    // If it's already a Date
    if (value instanceof Date) return value;
    
    // If it's a number (Excel serial date)
    if (typeof value === 'number') {
      const excelEpoch = new Date(1899, 11, 30);
      return new Date(excelEpoch.getTime() + value * 86400000);
    }
    
    // If it's a string, try parsing
    if (typeof value === 'string') {
      // Try DD/MM/YYYY format
      const parts = value.split('/');
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
      
      // Try standard date parsing
      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    
    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);

    try {
      // Read file as text (CSV) or use FileReader for Excel
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setError('Le fichier est vide ou ne contient pas de données.');
        return;
      }

      const headers = lines[0].split(/[,;\t]/).map(h => h.trim().toLowerCase());
      const data: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(/[,;\t]/).map(v => v.trim());
        const row: Record<string, any> = {};
        
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });

        // Parse based on import type
        switch (importType) {
          case 'events':
            if (row.nom || row.name) {
              data.push({
                type: 'event',
                name: row.nom || row.name || 'Événement',
                startDate: parseDate(row.debut || row.start || row.datedebut),
                endDate: parseDate(row.fin || row.end || row.datefin),
                color: row.couleur || row.color || '#0ea5e9',
              });
            }
            break;
            
          case 'vacations':
            if (row.nom || row.name) {
              data.push({
                name: row.nom || row.name || 'Vacances',
                startDate: parseDate(row.debut || row.start || row.datedebut),
                endDate: parseDate(row.fin || row.end || row.datefin),
                color: row.couleur || row.color || '#a855f7',
              });
            }
            break;
            
          case 'arrets':
            if (row.nom || row.name) {
              data.push({
                type: row.type === 'prepa' ? 'prepa' : 'arret',
                name: row.nom || row.name || 'Arrêt',
                startDate: parseDate(row.debut || row.start || row.datedebut),
                endDate: parseDate(row.fin || row.end || row.datefin),
                color: row.couleur || row.color || '#22c55e',
                pattern: row.motif || row.pattern || 'none',
                tranche: row.tranche || 'Tr2',
              });
            }
            break;
            
          case 'holidays':
            if (row.nom || row.name) {
              data.push({
                name: row.nom || row.name || 'Férié',
                date: parseDate(row.date),
              });
            }
            break;
        }
      }

      // Filter out invalid entries
      const validData = data.filter(item => {
        if (importType === 'holidays') {
          return item.date !== null;
        }
        return item.startDate !== null && item.endDate !== null;
      });

      if (validData.length === 0) {
        setError('Aucune donnée valide trouvée. Vérifiez le format du fichier.');
        return;
      }

      // Call appropriate import function
      switch (importType) {
        case 'events':
          onImportEvents(validData);
          break;
        case 'vacations':
          onImportVacations(validData);
          break;
        case 'arrets':
          onImportArrets(validData);
          break;
        case 'holidays':
          onImportHolidays(validData);
          break;
      }

      setSuccess(`${validData.length} élément(s) importé(s) avec succès.`);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Erreur lors de la lecture du fichier. Utilisez un fichier CSV.');
    }
  };

  const getExpectedFormat = () => {
    switch (importType) {
      case 'events':
        return 'nom; debut; fin; couleur';
      case 'vacations':
        return 'nom; debut; fin; couleur';
      case 'arrets':
        return 'nom; type; tranche; debut; fin; couleur; motif';
      case 'holidays':
        return 'nom; date';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3">
          <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Importer Excel/CSV</span>
          <span className="sm:hidden">Import</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Importer des données
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Type de données à importer</label>
            <Select value={importType} onValueChange={(v) => setImportType(v as ImportType)}>
              <SelectTrigger className="bg-background" onPointerDown={(e) => e.stopPropagation()}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-[100]" position="popper" sideOffset={4}>
                <SelectItem value="events">Événements</SelectItem>
                <SelectItem value="vacations">Vacances scolaires</SelectItem>
                <SelectItem value="arrets">Arrêts de tranches</SelectItem>
                <SelectItem value="holidays">Jours fériés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            <p className="font-medium mb-1">Format attendu (CSV avec séparateur ; ou ,):</p>
            <code className="text-xs">{getExpectedFormat()}</code>
            <p className="mt-2 text-xs">Dates au format DD/MM/YYYY</p>
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt,.xls,.xlsx"
              onChange={handleFileChange}
              className="block w-full text-sm text-muted-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-primary-foreground
                hover:file:bg-primary/90
                cursor-pointer"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription className="text-green-600">{success}</AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

```


// path: src/components/Import/ICSImportDialog.tsx
```ts
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, AlertTriangle } from 'lucide-react';
import { parseICSToEvents, mergeICSEvents } from '@/lib/icsUtils';
import { CalendarEvent } from '@/types/calendar';
import { toast } from 'sonner';

interface ICSImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingEvents: CalendarEvent[];
  onImportEvents: (events: CalendarEvent[]) => void;
  onUpdateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  onDeleteEvent: (id: string) => void;
}

export function ICSImportDialog({
  open,
  onOpenChange,
  existingEvents,
  onImportEvents,
  onUpdateEvent,
  onDeleteEvent,
}: ICSImportDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedEvents, setParsedEvents] = useState<CalendarEvent[]>([]);
  const [fileName, setFileName] = useState('');
  const [removeAbsent, setRemoveAbsent] = useState(false);
  const [preview, setPreview] = useState<{
    toAdd: number;
    toUpdate: number;
    toRemove: number;
  } | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const text = await file.text();
    
    try {
      const events = parseICSToEvents(text);
      setParsedEvents(events);
      
      const { toAdd, toUpdate, toRemove } = mergeICSEvents(existingEvents, events, removeAbsent);
      setPreview({
        toAdd: toAdd.length,
        toUpdate: toUpdate.length,
        toRemove: toRemove.length,
      });
    } catch (err) {
      toast.error('Erreur lors de la lecture du fichier ICS');
      setParsedEvents([]);
      setPreview(null);
    }
  };

  const handleImport = () => {
    if (parsedEvents.length === 0) return;

    const { toAdd, toUpdate, toRemove } = mergeICSEvents(existingEvents, parsedEvents, removeAbsent);

    // Add new events
    if (toAdd.length > 0) onImportEvents(toAdd);

    // Update existing events
    for (const { id, updates } of toUpdate) {
      onUpdateEvent(id, updates);
    }

    // Remove absent events
    for (const id of toRemove) {
      onDeleteEvent(id);
    }

    const parts: string[] = [];
    if (toAdd.length) parts.push(`${toAdd.length} ajouté(s)`);
    if (toUpdate.length) parts.push(`${toUpdate.length} mis à jour`);
    if (toRemove.length) parts.push(`${toRemove.length} supprimé(s)`);

    toast.success(`Import ICS : ${parts.join(', ')}`);
    handleClose();
  };

  const handleClose = () => {
    setParsedEvents([]);
    setFileName('');
    setPreview(null);
    setRemoveAbsent(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importer un calendrier externe (ICS)
          </DialogTitle>
          <DialogDescription>
            Importez un fichier .ics depuis Outlook, Apple Calendar ou tout autre calendrier compatible.
            Les événements importés seront en lecture seule.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* File input */}
          <div
            className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".ics,.ical"
              onChange={handleFileSelect}
              className="hidden"
            />
            {fileName ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{fileName}</span>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Cliquez pour sélectionner un fichier .ics
                </p>
              </div>
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <p className="text-sm font-medium">Aperçu de l'import :</p>
              <div className="flex flex-wrap gap-2">
                {preview.toAdd > 0 && (
                  <Badge variant="default" className="bg-green-600">
                    +{preview.toAdd} nouveau(x)
                  </Badge>
                )}
                {preview.toUpdate > 0 && (
                  <Badge variant="secondary">
                    ↻ {preview.toUpdate} mis à jour
                  </Badge>
                )}
                {removeAbsent && preview.toRemove > 0 && (
                  <Badge variant="destructive">
                    −{preview.toRemove} supprimé(s)
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Remove absent option */}
          {parsedEvents.length > 0 && (
            <div className="flex items-start gap-2">
              <Checkbox
                id="remove-absent"
                checked={removeAbsent}
                onCheckedChange={(checked) => {
                  setRemoveAbsent(!!checked);
                  if (parsedEvents.length > 0) {
                    const { toAdd, toUpdate, toRemove } = mergeICSEvents(existingEvents, parsedEvents, !!checked);
                    setPreview({ toAdd: toAdd.length, toUpdate: toUpdate.length, toRemove: toRemove.length });
                  }
                }}
              />
              <label htmlFor="remove-absent" className="text-sm text-muted-foreground cursor-pointer leading-tight">
                <AlertTriangle className="h-3 w-3 inline mr-1 text-orange-500" />
                Supprimer les événements ICS absents du fichier
              </label>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Annuler</Button>
          <Button onClick={handleImport} disabled={parsedEvents.length === 0}>
            Importer {parsedEvents.length > 0 && `(${parsedEvents.length})`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

```


// path: src/components/NavLink.tsx
```ts
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };

```


// path: src/components/Pointage/DayEntryForm.tsx
```ts
/**
 * Module 2 – Day Entry Form (CNPE Bugey)
 * Saisie journée : heures, habillage manuel optionnel, poste matin/AM,
 * FPC, astreinte 4 types, suppression midi, notes.
 */

import { useState } from 'react';
import { TimeEntry, NoteTag, NOTE_TAG_LABELS, AstreinteType, PosteType } from '@/types/pointage';
import { coversMidi } from '@/lib/complianceEngine';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Check, MessageSquare, Utensils, Car } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DayEntryFormProps {
  date: string;
  entries: TimeEntry[];
  onAdd: (entry: Omit<TimeEntry, 'id' | 'autoComments'>) => void;
  onUpdate: (id: string, patch: Partial<TimeEntry>) => void;
  onDelete: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
  posteMatinDebut?: string;
  posteMatinFin?: string;
  posteAMDebut?: string;
  posteAMFin?: string;
}

const ASTREINTE_OPTIONS: { value: AstreinteType; label: string; badge: string }[] = [
  { value: 'PLANIFIEE_SANS', label: 'Astreinte planifiée sans intervention', badge: '🔵' },
  { value: 'INTERVENTION_PLANIFIEE', label: 'Intervention astreinte planifiée', badge: '🟠' },
  { value: 'INTERVENTION_APPEL', label: 'Intervention sur appel (pendant tour)', badge: '🟣' },
  { value: 'HORS_TOUR', label: 'Intervention hors tour d\'astreinte', badge: '⚫' },
];

export function DayEntryForm({ date, entries, onAdd, onUpdate, onDelete, isOpen, onClose, posteMatinDebut = '05:00', posteMatinFin = '13:00', posteAMDebut = '13:00', posteAMFin = '21:00' }: DayEntryFormProps) {
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:45');
  const [isFormation, setIsFormation] = useState(false);
  const [isFPC, setIsFPC] = useState(false);
  const [fpcHeures, setFpcHeures] = useState<7 | 8>(7);
  const [typeAstreinte, setTypeAstreinte] = useState<AstreinteType>(null);
  const [isJourFerie, setIsJourFerie] = useState(false);
  const [astreinteCompensee, setAstreinteCompensee] = useState(false);
  const [suppressionMidi, setSuppressionMidi] = useState(true);
  const [habillageManuel, setHabillageManuel] = useState(false);
  const [habillageMinutes, setHabillageMinutes] = useState(60);
  const [poste, setPoste] = useState<PosteType>('AUCUN');
  const [noteEntryId, setNoteEntryId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [noteTags, setNoteTags] = useState<NoteTag[]>([]);

  const dayLabel = (() => {
    try { return format(parseISO(date), 'EEEE d MMMM yyyy', { locale: fr }); }
    catch { return date; }
  })();

  // Apply poste times
  const applyPoste = (p: PosteType) => {
    setPoste(p);
    if (p === 'MATIN') { setStartTime(posteMatinDebut); setEndTime(posteMatinFin); }
    else if (p === 'APRES_MIDI') { setStartTime(posteAMDebut); setEndTime(posteAMFin); }
  };

  const showMidiOption = !isFPC && coversMidi(startTime, endTime);
  const isAstreinte = typeAstreinte !== null;
  const isIntervention = typeAstreinte === 'INTERVENTION_PLANIFIEE' || typeAstreinte === 'INTERVENTION_APPEL' || typeAstreinte === 'HORS_TOUR';
  const isSansIntervention = typeAstreinte === 'PLANIFIEE_SANS';

  const handleAdd = () => {
    onAdd({
      date,
      startTime: isFPC ? '08:00' : startTime,
      endTime: isFPC ? (fpcHeures === 7 ? '15:00' : '16:00') : endTime,
      isFormation: isFormation || isFPC,
      isInterventionAstreinte: isIntervention,
      isAstreinteSansIntervention: isSansIntervention,
      suppressionMidi: isFPC ? false : (showMidiOption ? suppressionMidi : false),
      isFPC,
      fpcHeures: isFPC ? fpcHeures : undefined,
      estAstreinte: isAstreinte,
      typeAstreinte,
      isJourFerie: isAstreinte ? isJourFerie : undefined,
      astreinteCompensee: isAstreinte && isJourFerie ? astreinteCompensee : undefined,
      habillageManuel: isFPC ? false : habillageManuel,
      habillageMinutes: isFPC ? undefined : (habillageManuel ? habillageMinutes : undefined),
      poste: poste !== 'AUCUN' ? poste : undefined,
    });
    // Reset
    setStartTime('08:00');
    setEndTime('16:45');
    setIsFormation(false);
    setIsFPC(false);
    setTypeAstreinte(null);
    setIsJourFerie(false);
    setAstreinteCompensee(false);
    setSuppressionMidi(true);
    setHabillageManuel(false);
    setHabillageMinutes(60);
    setPoste('AUCUN');
  };

  const openNote = (entry: TimeEntry) => {
    setNoteEntryId(entry.id);
    setNoteText(entry.note || '');
    setNoteTags(entry.noteTags || []);
  };

  const saveNote = () => {
    if (noteEntryId) {
      onUpdate(noteEntryId, { note: noteText || undefined, noteTags: noteTags.length > 0 ? noteTags : undefined });
      setNoteEntryId(null);
    }
  };

  const toggleTag = (tag: NoteTag) => {
    setNoteTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const getAstreinteBadge = (entry: TimeEntry) => {
    if (!entry.estAstreinte && !entry.isAstreinteSansIntervention && !entry.isInterventionAstreinte) return null;
    const t = entry.typeAstreinte;
    if (t === 'PLANIFIEE_SANS' || entry.isAstreinteSansIntervention) {
      return <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-400 text-blue-700 bg-blue-50">🔵 Planifiée</Badge>;
    }
    if (t === 'INTERVENTION_PLANIFIEE') {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-800">🟠 Intervention planifiée</Badge>;
    }
    if (t === 'INTERVENTION_APPEL') {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-purple-100 text-purple-800">🟣 Intervention sur appel</Badge>;
    }
    if (t === 'HORS_TOUR') {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-gray-200 text-gray-800">⚫ Hors tour</Badge>;
    }
    if (entry.isInterventionAstreinte) {
      return <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-amber-100 text-amber-800">🟠 Intervention</Badge>;
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize text-sm">{dayLabel}</DialogTitle>
        </DialogHeader>

        {/* Existing entries */}
        {entries.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Saisies existantes</p>
            {entries.map(entry => (
              <div key={entry.id} className="p-2 rounded-lg border border-border bg-card text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="font-mono font-medium">{entry.startTime} – {entry.endTime}</span>
                    {entry.suppressionMidi && <span className="ml-1 text-muted-foreground">(-45min midi)</span>}
                    {entry.habillageManuel && entry.habillageMinutes && (
                      <span className="ml-1 text-muted-foreground">(hab. {entry.habillageMinutes}min)</span>
                    )}
                  </div>
                  <button
                    onClick={() => openNote(entry)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      entry.note
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-primary/40 text-primary/40 hover:border-primary hover:text-primary'
                    }`}
                    title="Note / Prime"
                  >
                    {entry.note ? <Check className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                  </button>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => onDelete(entry.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {entry.isFPC && <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-indigo-100 text-indigo-800">FPC {entry.fpcHeures}h</Badge>}
                  {entry.isFormation && !entry.isFPC && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Formation</Badge>}
                  {entry.poste === 'MATIN' && <Badge variant="outline" className="text-[10px] px-1.5 py-0">Poste matin</Badge>}
                  {entry.poste === 'APRES_MIDI' && <Badge variant="outline" className="text-[10px] px-1.5 py-0">Poste AM</Badge>}
                  {getAstreinteBadge(entry)}
                  {entry.isJourFerie && <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-red-300 text-red-700">Jour férié</Badge>}
                  {entry.astreinteCompensee && <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-green-400 text-green-700">RCA → RCO 012</Badge>}
                  {entry.noteTags?.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{NOTE_TAG_LABELS[tag]}</Badge>
                  ))}
                </div>
                {entry.autoComments && entry.autoComments.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {entry.autoComments.map((c, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] px-1.5 py-0 border-amber-400 text-amber-700">
                        {c.includes('repas') ? <Utensils className="w-2.5 h-2.5 mr-0.5" /> : <Car className="w-2.5 h-2.5 mr-0.5" />}
                        {c}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Note editing */}
        {noteEntryId && (
          <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
            <p className="text-xs font-medium">Note / Commentaire</p>
            <Textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Commentaire libre…"
              className="text-xs min-h-[60px]"
            />
            <div className="flex gap-1 flex-wrap">
              {(Object.keys(NOTE_TAG_LABELS) as NoteTag[]).map(tag => (
                <Badge
                  key={tag}
                  variant={noteTags.includes(tag) ? 'default' : 'outline'}
                  className="text-[10px] cursor-pointer select-none"
                  onClick={() => toggleTag(tag)}
                >
                  {NOTE_TAG_LABELS[tag]}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="h-7 text-xs" onClick={saveNote}>Enregistrer</Button>
              <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setNoteEntryId(null)}>Annuler</Button>
            </div>
          </div>
        )}

        {/* New entry form */}
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground">Nouvelle saisie</p>

          {/* Poste selection */}
          {!isFPC && (
            <div className="space-y-1">
              <Label className="text-xs font-medium">Type de poste</Label>
              <Select value={poste} onValueChange={(v) => applyPoste(v as PosteType)}>
                <SelectTrigger className="h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="AUCUN" className="text-xs">Aucun (horaires libres)</SelectItem>
                  <SelectItem value="MATIN" className="text-xs">Poste matin ({posteMatinDebut}–{posteMatinFin})</SelectItem>
                  <SelectItem value="APRES_MIDI" className="text-xs">Poste après-midi ({posteAMDebut}–{posteAMFin})</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {!isFPC && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Début</Label>
                <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="h-8 text-xs" />
              </div>
              <div>
                <Label className="text-xs">Fin</Label>
                <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="h-8 text-xs" />
              </div>
            </div>
          )}

          {/* Suppression midi */}
          {showMidiOption && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
              <Checkbox
                id="suppressionMidi"
                checked={suppressionMidi}
                onCheckedChange={v => setSuppressionMidi(!!v)}
              />
              <Label htmlFor="suppressionMidi" className="text-xs cursor-pointer text-amber-800">
                Suppression travaux midi (retire 45 min)
              </Label>
            </div>
          )}
          {showMidiOption && !suppressionMidi && (
            <p className="text-[10px] text-amber-700 flex items-center gap-1">
              <Utensils className="w-3 h-3" />
              Repas sans déplacement
            </p>
          )}

          {/* Habillage manuel */}
          {!isFPC && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Checkbox id="habillage" checked={habillageManuel} onCheckedChange={v => setHabillageManuel(!!v)} />
                <Label htmlFor="habillage" className="text-xs cursor-pointer">Habillage (durée libre)</Label>
              </div>
              {habillageManuel && (
                <div className="ml-6 flex items-center gap-2">
                  <Input
                    type="number"
                    min={1}
                    max={120}
                    value={habillageMinutes}
                    onChange={e => setHabillageMinutes(parseInt(e.target.value) || 60)}
                    className="h-7 text-xs w-20"
                  />
                  <span className="text-[10px] text-muted-foreground">minutes</span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            {/* FPC */}
            <div className="flex items-center gap-2">
              <Checkbox id="fpc" checked={isFPC} onCheckedChange={v => {
                setIsFPC(!!v);
                if (v) { setIsFormation(false); setTypeAstreinte(null); setHabillageManuel(false); setPoste('AUCUN'); }
              }} />
              <Label htmlFor="fpc" className="text-xs cursor-pointer">FPC (Formation Professionnelle Continue)</Label>
            </div>
            {isFPC && (
              <div className="ml-6">
                <Select value={fpcHeures.toString()} onValueChange={v => setFpcHeures(parseInt(v) as 7 | 8)}>
                  <SelectTrigger className="h-7 text-xs w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="7" className="text-xs">7h / jour</SelectItem>
                    <SelectItem value="8" className="text-xs">8h / jour</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground mt-1">Travail effectif, pas de HS, pas de RE généré, pas d'habillage</p>
              </div>
            )}

            {!isFPC && (
              <>
                <div className="flex items-center gap-2">
                  <Checkbox id="formation" checked={isFormation} onCheckedChange={v => { setIsFormation(!!v); if (v) setTypeAstreinte(null); }} />
                  <Label htmlFor="formation" className="text-xs cursor-pointer">Formation (= travail effectif)</Label>
                </div>

                {/* Type d'astreinte — 4 options */}
                <div className="space-y-1">
                  <Label className="text-xs font-medium">Type d'astreinte</Label>
                  <Select value={typeAstreinte || 'AUCUNE'} onValueChange={v => {
                    const val = v === 'AUCUNE' ? null : v as AstreinteType;
                    setTypeAstreinte(val);
                    if (val) { setIsFormation(false); setIsFPC(false); }
                    if (!val) { setIsJourFerie(false); setAstreinteCompensee(false); }
                  }}>
                    <SelectTrigger className="h-7 text-xs">
                      <SelectValue placeholder="Aucune" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50">
                      <SelectItem value="AUCUNE" className="text-xs">Aucune</SelectItem>
                      {ASTREINTE_OPTIONS.map(opt => (
                        <SelectItem key={opt.value!} value={opt.value!} className="text-xs">
                          {opt.badge} {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Jour férié + compensation (RCO) — uniquement si astreinte */}
                {isAstreinte && (
                  <div className="ml-4 space-y-2 p-2 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Checkbox id="jourFerie" checked={isJourFerie} onCheckedChange={v => { setIsJourFerie(!!v); if (!v) setAstreinteCompensee(false); }} />
                      <Label htmlFor="jourFerie" className="text-xs cursor-pointer">Jour férié</Label>
                    </div>
                    {isJourFerie && (
                      <div className="flex items-center gap-2 ml-4">
                        <Checkbox id="compensee" checked={astreinteCompensee} onCheckedChange={v => setAstreinteCompensee(!!v)} />
                        <Label htmlFor="compensee" className="text-xs cursor-pointer">Astreinte compensée (RCA → RCO 012)</Label>
                      </div>
                    )}
                    {!isJourFerie && (
                      <p className="text-[10px] text-muted-foreground">Pas de RCO si repos 11h respecté (règle locale)</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <Button onClick={handleAdd} size="sm" className="h-8 text-xs gap-1">
            <Plus className="w-3 h-3" />
            Ajouter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

```


// path: src/components/Pointage/PointageModule.tsx
```ts
/**
 * Module 2 – Conformité & Pointage CNPE Bugey
 * Vue calendrier hebdomadaire dimanche–samedi avec saisie, conformité, HS et notes.
 */

import { useState, useCallback } from 'react';
import { usePointage } from '@/hooks/usePointage';
import { WeeklySummaryTable } from './WeeklySummary';
import { DayEntryForm } from './DayEntryForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Check, Clock, Utensils, Car, RotateCcw } from 'lucide-react';
import { format, parseISO, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { getWeekDates } from '@/lib/complianceEngine';

export function PointageModule() {
  const {
    entries,
    currentWeekStart,
    weekSummary,
    pointageSettings,
    addEntry,
    updateEntry,
    deleteEntry,
    deleteWeekEntries,
    getEntriesForDate,
    goToNextWeek,
    goToPrevWeek,
    goToCurrentWeek,
  } = usePointage();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showRAZConfirm, setShowRAZConfirm] = useState(false);
  const weekDates = getWeekDates(currentWeekStart);

  const handleDayClick = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const handleRAZ = () => {
    deleteWeekEntries(weekDates);
    setShowRAZConfirm(false);
  };

  const weekLabel = `${format(currentWeekStart, 'd MMM', { locale: fr })} – ${format(addDays(currentWeekStart, 6), 'd MMM yyyy', { locale: fr })}`;
  const weekHasEntries = weekDates.some(d => getEntriesForDate(d).length > 0);

  return (
    <div className="space-y-4">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          <Button variant="ghost" size="icon" onClick={goToPrevWeek} className="h-8 w-8 rounded-md">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={goToCurrentWeek} className="h-8 px-2 rounded-md text-xs font-medium">
            Cette semaine
          </Button>
          <Button variant="ghost" size="icon" onClick={goToNextWeek} className="h-8 w-8 rounded-md">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground">{weekLabel}</span>
          {weekHasEntries && (
            <Button variant="ghost" size="icon" onClick={() => setShowRAZConfirm(true)} className="h-7 w-7 text-destructive" title="RAZ semaine">
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Weekly Summary */}
      <WeeklySummaryTable summary={weekSummary} pointageSettings={pointageSettings} />

      {/* Day cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
        {weekDates.map((dateStr, index) => {
          const daySummary = weekSummary.days[index];
          const dayEntries = getEntriesForDate(dateStr);
          const isToday = dateStr === format(new Date(), 'yyyy-MM-dd');
          const hasAlerts = daySummary.alerts.length > 0;
          const hasNote = dayEntries.some(e => !!e.note);

          return (
            <button
              key={dateStr}
              onClick={() => handleDayClick(dateStr)}
              className={`relative p-2 sm:p-3 rounded-lg border text-left transition-all hover:shadow-md ${
                isToday
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  : hasAlerts
                    ? 'border-red-300 bg-red-50/50'
                    : 'border-border bg-card hover:bg-accent/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] sm:text-xs font-medium text-muted-foreground capitalize">
                  {format(parseISO(dateStr), 'EEE', { locale: fr })}
                </span>
                <span className={`text-xs sm:text-sm font-bold ${isToday ? 'text-primary' : 'text-foreground'}`}>
                  {format(parseISO(dateStr), 'd')}
                </span>
              </div>

              {daySummary.totalHours > 0 ? (
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs font-mono font-semibold">{daySummary.totalHours.toFixed(2)}h</span>
                </div>
              ) : (
                <p className="text-[10px] text-muted-foreground mt-1">—</p>
              )}

              {dayEntries.length > 0 && (
                <div className="mt-1 space-y-0.5">
                  {dayEntries.slice(0, 2).map(e => (
                    <p key={e.id} className="text-[9px] sm:text-[10px] text-muted-foreground font-mono truncate">
                      {e.startTime}–{e.endTime}
                      {e.isFPC && ` FPC${e.fpcHeures}h`}
                      {e.isFormation && !e.isFPC && ' 📚'}
                      {e.typeAstreinte === 'PLANIFIEE_SANS' && ' 🔵'}
                      {e.typeAstreinte === 'INTERVENTION_PLANIFIEE' && ' 🟠'}
                      {e.typeAstreinte === 'INTERVENTION_APPEL' && ' 🟣'}
                      {e.typeAstreinte === 'HORS_TOUR' && ' ⚫'}
                      {!e.typeAstreinte && e.isInterventionAstreinte && ' ⚡'}
                    </p>
                  ))}
                  {dayEntries.length > 2 && (
                    <p className="text-[9px] text-muted-foreground">+{dayEntries.length - 2}</p>
                  )}
                </div>
              )}

              {/* Indicators */}
              <div className="absolute top-1 right-1 flex gap-0.5">
                {hasNote && (
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                )}
                {daySummary.primeRepas && (
                  <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center" title="Prime repas">
                    <Utensils className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
                {daySummary.ikAlert && (
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center" title="IK à vérifier">
                    <Car className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>

              {hasAlerts && (
                <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Real-time counters */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground p-2 rounded-lg bg-muted/50 border border-border flex-wrap">
        <span>Effectif : <strong className="text-foreground">{weekSummary.days.reduce((s, d) => s + d.hoursWorked, 0).toFixed(2)}h</strong></span>
        <span>Habillage : <strong className="text-foreground">{weekSummary.days.reduce((s, d) => s + d.habillageHours, 0).toFixed(2)}h</strong></span>
        <span>Trajet : <strong className="text-foreground">{weekSummary.days.reduce((s, d) => s + d.trajetHeures, 0).toFixed(2)}h</strong></span>
        <span>Total pointé : <strong className="text-foreground">{weekSummary.totalHours.toFixed(2)}h</strong></span>
        <span>Restant : <strong className={weekSummary.heuresRestantes <= 8 ? 'text-destructive' : weekSummary.heuresRestantes <= 16 ? 'text-amber-600' : 'text-emerald-600'}>{weekSummary.heuresRestantes.toFixed(2)}h</strong></span>
      </div>

      {/* Overtime details */}
      {weekSummary.overtimeDetails.length > 0 && (
        <div className="space-y-1 p-2 rounded-lg border border-border bg-card">
          <p className="text-xs font-medium text-muted-foreground">Heures supplémentaires</p>
          {weekSummary.overtimeDetails.map((ot, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{format(parseISO(ot.date), 'EEE d', { locale: fr })}</span>
              <span className="font-mono">{ot.hours.toFixed(2)}h</span>
              <span className="font-medium text-amber-700">{ot.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Day Entry Dialog */}
      {selectedDate && (
        <DayEntryForm
          date={selectedDate}
          entries={getEntriesForDate(selectedDate)}
          onAdd={addEntry}
          onUpdate={updateEntry}
          onDelete={deleteEntry}
          isOpen={!!selectedDate}
          onClose={() => setSelectedDate(null)}
          posteMatinDebut={pointageSettings.posteMatinDebut}
          posteMatinFin={pointageSettings.posteMatinFin}
          posteAMDebut={pointageSettings.posteAMDebut}
          posteAMFin={pointageSettings.posteAMFin}
        />
      )}

      {/* RAZ Confirmation */}
      <Dialog open={showRAZConfirm} onOpenChange={setShowRAZConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm">Réinitialiser la semaine ?</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground">
            Toutes les saisies de la semaine ({weekLabel}) seront supprimées définitivement.
          </p>
          <DialogFooter className="gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowRAZConfirm(false)}>Annuler</Button>
            <Button variant="destructive" size="sm" onClick={handleRAZ}>Supprimer tout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

```


// path: src/components/Pointage/WeeklySummary.tsx
```ts
/**
 * Module 2 – Weekly Summary (CNPE Bugey)
 * Badge hebdo, carte heures restantes, alertes, HS, conformité.
 */

import { WeekSummary, AlertLevel, PointageSettings } from '@/types/pointage';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Clock, TrendingDown } from 'lucide-react';

interface WeeklySummaryProps {
  summary: WeekSummary;
  pointageSettings?: PointageSettings;
}

const statusBg: Record<AlertLevel, string> = {
  vert: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  orange: 'bg-amber-100 text-amber-800 border-amber-300',
  rouge: 'bg-red-100 text-red-800 border-red-300',
};

const statusLabels: Record<AlertLevel, string> = {
  vert: 'Conforme',
  orange: 'Vigilance',
  rouge: 'Non conforme',
};

function StatusIcon({ ok }: { ok: boolean }) {
  return ok
    ? <CheckCircle className="w-4 h-4 text-emerald-600" />
    : <XCircle className="w-4 h-4 text-red-600" />;
}

function getHeuresRestantesColor(heuresRestantes: number, plafond: number): string {
  const ratio = heuresRestantes / plafond;
  if (ratio <= 0.15) return 'text-red-600';
  if (ratio <= 0.3) return 'text-amber-600';
  return 'text-emerald-600';
}

export function WeeklySummaryTable({ summary, pointageSettings }: WeeklySummaryProps) {
  const hrColor = getHeuresRestantesColor(summary.heuresRestantes, summary.plafondAutorise);

  return (
    <div className="space-y-3">
      {/* Status banner with badge */}
      <div className={`flex items-center justify-between p-3 rounded-lg border ${statusBg[summary.overallStatus]}`}>
        <div className="flex items-center gap-2">
          {summary.overallStatus === 'rouge' && <XCircle className="w-5 h-5" />}
          {summary.overallStatus === 'orange' && <AlertTriangle className="w-5 h-5" />}
          {summary.overallStatus === 'vert' && <CheckCircle className="w-5 h-5" />}
          <span className="font-semibold text-sm">{statusLabels[summary.overallStatus]}</span>
        </div>
        {/* Badge hebdo */}
        <Badge variant="outline" className="font-mono text-sm px-3 py-1 border-current">
          {summary.totalHours.toFixed(2)}h / {summary.plafondAutorise}h
        </Badge>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <MetricCard
          label="Heures restantes"
          value={`${summary.heuresRestantes.toFixed(2)}h`}
          icon={<TrendingDown className={`w-4 h-4 ${hrColor}`} />}
          valueClass={hrColor}
        />
        <MetricCard label="Jours travaillés" value={`${summary.daysWorkedCount}`} icon={<Clock className="w-4 h-4 text-muted-foreground" />} />
        <MetricCard
          label="Repos quotidien"
          value={summary.reposQuotidienOk ? '✓' : '✗'}
          icon={<StatusIcon ok={summary.reposQuotidienOk} />}
        />
        <MetricCard
          label="Repos hebdo"
          value={summary.reposHebdoOk ? '✓' : '✗'}
          icon={<StatusIcon ok={summary.reposHebdoOk} />}
        />
      </div>

      {/* Alerts */}
      {summary.alerts.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Alertes</p>
          {summary.alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 p-2 rounded text-xs ${
                alert.level === 'rouge' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {alert.level === 'rouge' ? <XCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />}
              <span>{alert.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value, icon, valueClass }: { label: string; value: string; icon?: React.ReactNode; valueClass?: string }) {
  return (
    <div className="p-2 rounded-lg border border-border bg-card text-center">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <div className="flex items-center justify-center gap-1 mt-0.5">
        {icon}
        <span className={`text-sm font-semibold ${valueClass || ''}`}>{icon && !valueClass ? '' : value}</span>
      </div>
    </div>
  );
}

```


// path: src/components/Settings/AdvancedSettingsPanel.tsx
```ts
/**
 * Advanced settings panel — hidden from UI for now.
 * Will be surfaced when the feature is ready.
 */

import { AdvancedSettings } from '@/types/advancedSettings';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Settings, X, RotateCcw } from 'lucide-react';

interface AdvancedSettingsPanelProps {
  settings: AdvancedSettings;
  onUpdate: (patch: Partial<AdvancedSettings>) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

interface FieldDef {
  key: keyof AdvancedSettings;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
}

const FIELDS: FieldDef[] = [
  { key: 'compteurREHeures', label: 'Compteur RE', unit: 'heures', min: 0, max: 9999, step: 0.5 },
  { key: 'compteurCPJours', label: 'Compteur CP', unit: 'jours', min: 0, max: 365, step: 0.5 },
  { key: 'nombreSemainesHautesObligatoires', label: 'Semaines hautes obligatoires', unit: 'semaines', min: 0, max: 52, step: 1 },
  { key: 'limiteHebdo5j', label: 'Limite hebdo (5j)', unit: 'heures', min: 0, max: 168, step: 0.5 },
  { key: 'limiteHebdo6j', label: 'Limite hebdo (6j)', unit: 'heures', min: 0, max: 168, step: 0.5 },
  { key: 'limiteJour', label: 'Limite journalière', unit: 'heures', min: 0, max: 24, step: 0.5 },
  { key: 'reposMinimumHeures', label: 'Repos minimum inter-poste', unit: 'heures', min: 0, max: 48, step: 0.5 },
];

export function AdvancedSettingsPanel({ settings, onUpdate, onReset, isOpen, onClose }: AdvancedSettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-80 max-w-[90vw] bg-card border-l border-border shadow-card-elevated z-50 animate-slide-in">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Paramètres avancés</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-4 space-y-4">
          {FIELDS.map(({ key, label, unit, min, max, step }) => (
            <div key={key} className="space-y-1">
              <Label className="text-sm">{label}</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={settings[key]}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    if (!isNaN(v)) onUpdate({ [key]: v });
                  }}
                  className="h-8 text-sm flex-1"
                />
                <span className="text-xs text-muted-foreground w-16">{unit}</span>
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" className="w-full mt-4" onClick={onReset}>
            <RotateCcw className="w-3 h-3 mr-1" /> Réinitialiser
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
}

```


// path: src/components/Settings/ColorPicker.tsx
```ts
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm text-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-8 p-1 cursor-pointer border-border"
        />
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 h-8 text-xs font-mono"
        />
      </div>
    </div>
  );
}

```


// path: src/components/Settings/PatternPicker.tsx
```ts
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PatternType } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface PatternPickerProps {
  label: string;
  value: PatternType;
  onChange: (value: PatternType) => void;
}

const patterns: { value: PatternType; label: string }[] = [
  { value: 'none', label: 'Aucun' },
  { value: 'stripes', label: 'Rayures' },
  { value: 'dots', label: 'Points' },
  { value: 'crosshatch', label: 'Croisillons' },
  { value: 'waves', label: 'Lignes' },
  { value: 'diagonal', label: 'Diagonales' },
  { value: 'grid', label: 'Grille' },
  { value: 'zigzag', label: 'Zigzag' },
];

const patternClasses: Record<PatternType, string> = {
  none: '',
  stripes: 'pattern-stripes',
  dots: 'pattern-dots',
  crosshatch: 'pattern-crosshatch',
  waves: 'pattern-waves',
  diagonal: 'pattern-diagonal',
  grid: 'pattern-grid',
  zigzag: 'pattern-zigzag',
};

export function PatternPicker({ label, value, onChange }: PatternPickerProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm text-foreground">{label}</Label>
      <Select value={value} onValueChange={(v) => onChange(v as PatternType)}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {patterns.map(pattern => (
            <SelectItem key={pattern.value} value={pattern.value}>
              <div className="flex items-center gap-2">
                <div 
                  className={cn(
                    'w-4 h-4 rounded bg-muted-foreground/60',
                    patternClasses[pattern.value]
                  )}
                />
                <span>{pattern.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

```


// path: src/components/Settings/SettingsPanel.tsx
```ts
import { useState } from 'react';
import { CalendarSettings } from '@/types/calendar';
import { PointageSettings, defaultPointageSettings } from '@/types/pointage';
import { usePointage } from '@/hooks/usePointage';
import { useRHStore, RHBalanceType } from '@/stores/rhStore';
import { getAllCommuneNames } from '@/lib/communeService';
import { ColorPicker } from './ColorPicker';
import { PatternPicker } from './PatternPicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Settings, X, Lock, Unlock, KeyRound, ChevronDown, Users, Clock, Zap, Coins, Shield, Palette } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface SettingsPanelProps {
  settings: CalendarSettings;
  onUpdateSettings: (settings: Partial<CalendarSettings>) => void;
  isOpen: boolean;
  onClose: () => void;
}

function SectionHeader({ icon, label, color, open, onToggle, locked }: { icon: React.ReactNode; label: string; color: string; open: boolean; onToggle: () => void; locked?: boolean }) {
  return (
    <button onClick={onToggle} className={`flex items-center justify-between w-full p-2.5 rounded-lg border transition-colors ${open ? 'bg-accent/50 border-border' : 'bg-muted/30 border-transparent hover:bg-muted/50'}`}>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        {icon}
        <span className="text-xs font-semibold text-foreground">{label}</span>
        {locked && <Lock className="w-3 h-3 text-muted-foreground" />}
      </div>
      <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
    </button>
  );
}

export function SettingsPanel({ settings, onUpdateSettings, isOpen, onClose }: SettingsPanelProps) {
  const { pointageSettings, updatePointageSettings: onUpdatePointageSettings } = usePointage();
  const { rhState, setRHBalance } = useRHStore();
  const [pinInput, setPinInput] = useState('');
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [showPinChange, setShowPinChange] = useState(false);
  const [newStartDate, setNewStartDate] = useState('');
  const [newCycleWeeks, setNewCycleWeeks] = useState<number>(6);
  const [rhDates, setRhDates] = useState<Record<string, string>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const toggleSection = (key: string) => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const getRHDate = (type: RHBalanceType) => rhDates[type] || '';
  const setRHDate = (type: RHBalanceType, date: string) => setRhDates(prev => ({ ...prev, [type]: date }));

  const handleRHChange = (type: RHBalanceType, valeur: number) => {
    const dateEffet = getRHDate(type);
    if (!dateEffet) return;
    setRHBalance(type, valeur, dateEffet);
  };

  if (!isOpen) return null;

  const handlePinSubmit = () => {
    if (pinInput === (settings.settingsPin || '0000')) {
      setPinUnlocked(true);
      setPinError(false);
      const d = new Date(settings.astreinteStartDate);
      setNewStartDate(format(d, 'yyyy-MM-dd'));
      setNewCycleWeeks(settings.astreinteCycleWeeks || 6);
    } else {
      setPinError(true);
    }
  };

  const handleDateChange = () => {
    if (!newStartDate) return;
    const d = new Date(newStartDate);
    if (!isNaN(d.getTime())) {
      onUpdateSettings({ astreinteStartDate: d.toISOString() });
    }
  };

  const handlePinChange = () => {
    if (newPin.length === 4) {
      onUpdateSettings({ settingsPin: newPin });
      setShowPinChange(false);
      setNewPin('');
      setPinUnlocked(false);
      setPinInput('');
    }
  };

  const astreinteDate = new Date(settings.astreinteStartDate || '2026-02-05T00:00:00.000Z');
  const isValidDate = !isNaN(astreinteDate.getTime());

  const pinLockUI = (
    <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
      <div className="flex items-center gap-2">
        <Lock className="w-4 h-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">Sections protégées par code PIN</span>
      </div>
      <div className="flex gap-2">
        <Input
          type="password"
          maxLength={4}
          placeholder="Code PIN (4 chiffres)"
          value={pinInput}
          onChange={(e) => { setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError(false); }}
          onKeyDown={(e) => { if (e.key === 'Enter') handlePinSubmit(); }}
          className="h-8 text-sm flex-1"
        />
        <Button size="sm" className="h-8" onClick={handlePinSubmit}>
          <Unlock className="w-3 h-3" />
        </Button>
      </div>
      {pinError && <p className="text-xs text-destructive">Code incorrect</p>}
    </div>
  );

  const lockedMessage = <p className="text-xs text-muted-foreground italic p-2">Déverrouillez le PIN pour modifier</p>;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-80 max-w-[90vw] bg-card border-l border-border shadow-card-elevated z-50 animate-slide-in">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">Paramètres</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-65px)]">
        <div className="p-4 space-y-2">

          {/* PIN Lock */}
          {!pinUnlocked && pinLockUI}
          {pinUnlocked && (
            <div className="p-2 bg-primary/5 rounded-lg border border-primary/20 flex items-center gap-2">
              <Unlock className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-medium">Déverrouillé</span>
            </div>
          )}

          {/* ====== 1. 🎨 Apparence (NON protégé) ====== */}
          <Collapsible open={openSections['apparence']} onOpenChange={() => toggleSection('apparence')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Palette className="w-3.5 h-3.5 text-muted-foreground" />} label="Apparence" color="bg-gray-400" open={!!openSections['apparence']} onToggle={() => {}} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-4 border border-border rounded-b-lg -mt-0.5">
                <section>
                  <h4 className="text-xs font-semibold mb-2">Vue annuelle — Bandeau mois</h4>
                  <div className="space-y-2">
                    <ColorPicker label="Fond" value={settings.yearMonthBgColor} onChange={(v) => onUpdateSettings({ yearMonthBgColor: v })} />
                    <ColorPicker label="Texte" value={settings.yearMonthTextColor} onChange={(v) => onUpdateSettings({ yearMonthTextColor: v })} />
                  </div>
                </section>
                <section>
                  <h4 className="text-xs font-semibold mb-2">Vue mensuelle — Bandeau Lun-Dim</h4>
                  <div className="space-y-2">
                    <ColorPicker label="Fond" value={settings.monthHeaderBgColor} onChange={(v) => onUpdateSettings({ monthHeaderBgColor: v })} />
                    <ColorPicker label="Texte" value={settings.monthHeaderTextColor} onChange={(v) => onUpdateSettings({ monthHeaderTextColor: v })} />
                  </div>
                </section>
                <section>
                  <h4 className="text-xs font-semibold mb-2">Vue mensuelle — N° semaine</h4>
                  <div className="space-y-2">
                    <ColorPicker label="Fond" value={settings.weekNumberBgColor} onChange={(v) => onUpdateSettings({ weekNumberBgColor: v })} />
                    <ColorPicker label="Texte" value={settings.weekNumberTextColor} onChange={(v) => onUpdateSettings({ weekNumberTextColor: v })} />
                  </div>
                </section>
                <section>
                  <h4 className="text-xs font-semibold mb-2">Vue mensuelle — Cases jours</h4>
                  <div className="space-y-2">
                    <ColorPicker label="Fond semaine" value={settings.dayCellBgColor} onChange={(v) => onUpdateSettings({ dayCellBgColor: v })} />
                    <ColorPicker label="Texte semaine" value={settings.dayCellTextColor} onChange={(v) => onUpdateSettings({ dayCellTextColor: v })} />
                    <ColorPicker label="Fond week-end" value={settings.weekendDaysBgColor} onChange={(v) => onUpdateSettings({ weekendDaysBgColor: v })} />
                    <ColorPicker label="Texte week-end" value={settings.weekendDaysTextColor} onChange={(v) => onUpdateSettings({ weekendDaysTextColor: v })} />
                  </div>
                </section>
                <section>
                  <h4 className="text-xs font-semibold mb-2">Événements & états</h4>
                  <div className="space-y-2">
                    <ColorPicker label="RE (Repos)" value={settings.reColor} onChange={(v) => onUpdateSettings({ reColor: v })} />
                    <ColorPicker label="21 (Congés annuels)" value={settings.cpColor} onChange={(v) => onUpdateSettings({ cpColor: v })} />
                    <ColorPicker label="Vacances scolaires (fond)" value={settings.vacationColor} onChange={(v) => onUpdateSettings({ vacationColor: v })} />
                    <ColorPicker label="Vacances scolaires (texte)" value={settings.vacationTextColor} onChange={(v) => onUpdateSettings({ vacationTextColor: v })} />
                  </div>
                </section>
                {pinUnlocked && (
                  <section>
                    <h4 className="text-xs font-semibold mb-2">Arrêts par tranche</h4>
                    <div className="space-y-2">
                      <ColorPicker label="Arrêt Tr2" value={settings.arretTr2Color} onChange={(v) => onUpdateSettings({ arretTr2Color: v })} />
                      <ColorPicker label="Arrêt Tr3" value={settings.arretTr3Color} onChange={(v) => onUpdateSettings({ arretTr3Color: v })} />
                      <ColorPicker label="Arrêt Tr4" value={settings.arretTr4Color} onChange={(v) => onUpdateSettings({ arretTr4Color: v })} />
                      <ColorPicker label="Arrêt Tr5" value={settings.arretTr5Color} onChange={(v) => onUpdateSettings({ arretTr5Color: v })} />
                    </div>
                  </section>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 2. 🔵 RH (protégé) ====== */}
          <Collapsible open={openSections['rh']} onOpenChange={() => toggleSection('rh')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Users className="w-3.5 h-3.5 text-muted-foreground" />} label="RH" color="bg-blue-500" open={!!openSections['rh']} onToggle={() => {}} locked={!pinUnlocked} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? lockedMessage : (
                  <>
                    {/* 21 (Congés annuels) */}
                    <div>
                      <Label className="text-xs font-semibold" translate="no">21 (Congés annuels)</Label>
                      <p className="text-[10px] text-muted-foreground">Dotation annuelle : 189h · Actuel : {rhState.solde21.toFixed(0)}h ({(rhState.solde21 / 8).toFixed(1)}j)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Date effet</Label>
                        <Input type="date" value={getRHDate('21')} onChange={e => setRHDate('21', e.target.value)} className="h-7 text-xs flex-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Solde (h)</Label>
                        <Input type="number" min={0} value={rhState.solde21} onChange={e => { const v = parseFloat(e.target.value) || 0; if (getRHDate('21')) handleRHChange('21', v); }} className="h-7 text-xs w-20" disabled={!getRHDate('21')} />
                        <span className="text-[10px] text-muted-foreground">= {(rhState.solde21 / 8).toFixed(1)}j</span>
                      </div>
                      {!getRHDate('21') && <p className="text-[10px] text-destructive">Date d'effet obligatoire pour modifier</p>}
                    </div>

                    {/* RE */}
                    <div>
                      <Label className="text-xs font-semibold">RE (Repos Équivalent)</Label>
                      <p className="text-[10px] text-muted-foreground">Dotation fixe : 312h (39j × 8h) · Actuel : {rhState.soldeRE.toFixed(0)}h ({(rhState.soldeRE / 8).toFixed(1)}j)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Date effet</Label>
                        <Input type="date" value={getRHDate('RE')} onChange={e => setRHDate('RE', e.target.value)} className="h-7 text-xs flex-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Solde (h)</Label>
                        <Input type="number" min={0} value={rhState.soldeRE} onChange={e => { const v = parseFloat(e.target.value) || 0; if (getRHDate('RE')) handleRHChange('RE', v); }} className="h-7 text-xs w-20" disabled={!getRHDate('RE')} />
                        <span className="text-[10px] text-muted-foreground">= {(rhState.soldeRE / 8).toFixed(1)}j</span>
                      </div>
                      {!getRHDate('RE') && <p className="text-[10px] text-destructive">Date d'effet obligatoire pour modifier</p>}
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Seuil alerte</Label>
                        <Input type="number" min={0} value={pointageSettings.seuilAlerteRE} onChange={e => onUpdatePointageSettings({ seuilAlerteRE: parseInt(e.target.value) || 14 })} className="h-7 text-xs w-20" />
                        <span className="text-[10px] text-muted-foreground">h</span>
                      </div>
                    </div>

                    {/* RC 011 */}
                    <div>
                      <Label className="text-xs font-semibold">RC 011 (RC-HS)</Label>
                      <p className="text-[10px] text-muted-foreground">Comptes 926 / 935 / 9S0T–9S4T · Actuel : {rhState.soldeRC011.toFixed(0)}h ({(rhState.soldeRC011 / 8).toFixed(1)}j)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Date effet</Label>
                        <Input type="date" value={getRHDate('RC011')} onChange={e => setRHDate('RC011', e.target.value)} className="h-7 text-xs flex-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Solde (h)</Label>
                        <Input type="number" min={0} value={rhState.soldeRC011} onChange={e => { const v = parseFloat(e.target.value) || 0; if (getRHDate('RC011')) handleRHChange('RC011', v); }} className="h-7 text-xs w-20" disabled={!getRHDate('RC011')} />
                        <span className="text-[10px] text-muted-foreground">= {(rhState.soldeRC011 / 8).toFixed(1)}j</span>
                      </div>
                      {!getRHDate('RC011') && <p className="text-[10px] text-destructive">Date d'effet obligatoire</p>}
                    </div>

                    {/* RC 012 + RCO */}
                    <div>
                      <Label className="text-xs font-semibold">RC 012 (RC-Autres + RCO)</Label>
                      <p className="text-[10px] text-muted-foreground">Comptes 817 / 934 / 980 / 968 · RCO obligatoire (JF, non perdable) · Actuel : {rhState.soldeRC012.toFixed(0)}h ({(rhState.soldeRC012 / 8).toFixed(1)}j)</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Date effet</Label>
                        <Input type="date" value={getRHDate('RC012')} onChange={e => setRHDate('RC012', e.target.value)} className="h-7 text-xs flex-1" />
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Label className="text-[10px] w-16">Solde (h)</Label>
                        <Input type="number" min={0} value={rhState.soldeRC012} onChange={e => { const v = parseFloat(e.target.value) || 0; if (getRHDate('RC012')) handleRHChange('RC012', v); }} className="h-7 text-xs w-20" disabled={!getRHDate('RC012')} />
                        <span className="text-[10px] text-muted-foreground">= {(rhState.soldeRC012 / 8).toFixed(1)}j</span>
                      </div>
                      {!getRHDate('RC012') && <p className="text-[10px] text-destructive">Date d'effet obligatoire</p>}
                    </div>

                    {/* RC Total summary */}
                    <div className="p-2 rounded-lg bg-muted/50 border border-border">
                      <p className="text-xs font-semibold">RC total : {(rhState.soldeRC011 + rhState.soldeRC012).toFixed(0)}h ({((rhState.soldeRC011 + rhState.soldeRC012) / 8).toFixed(1)}j)</p>
                      <div className="text-[10px] text-muted-foreground space-y-0.5 mt-1">
                        <p>RC-HS (011) : {rhState.soldeRC011.toFixed(0)}h</p>
                        <p>RC-Autres + RCO (012) : {rhState.soldeRC012.toFixed(0)}h</p>
                      </div>
                    </div>

                    {/* Stage long primes */}
                    <div>
                      <Label className="text-xs font-semibold">Stage long (FPC multi-jours)</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Label className="text-[10px]">Prime hebdo (€)</Label>
                          <Input type="number" min={0} step={0.01} value={pointageSettings.montantPrimeHebdo ?? 0} onChange={e => onUpdatePointageSettings({ montantPrimeHebdo: parseFloat(e.target.value) || 0 })} className="h-7 text-xs" />
                        </div>
                        <div>
                          <Label className="text-[10px]">Prime mensuelle (€)</Label>
                          <Input type="number" min={0} step={0.01} value={pointageSettings.montantPrimeMensuelle ?? 0} onChange={e => onUpdatePointageSettings({ montantPrimeMensuelle: parseFloat(e.target.value) || 0 })} className="h-7 text-xs" />
                        </div>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">{'≤ 3 mois → prime hebdo · > 3 mois → prime mensuelle'}</p>
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 3. 🟠 Temps de travail (protégé) ====== */}
          <Collapsible open={openSections['temps']} onOpenChange={() => toggleSection('temps')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Clock className="w-3.5 h-3.5 text-muted-foreground" />} label="Temps de travail" color="bg-orange-500" open={!!openSections['temps']} onToggle={() => {}} locked={!pinUnlocked} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? lockedMessage : (
                  <>
                    <div>
                      <Label className="text-xs font-semibold">Régime</Label>
                      <Select value={pointageSettings.regime || 'HABA'} onValueChange={v => onUpdatePointageSettings({ regime: v as 'HABA' | 'NORMAL' })}>
                        <SelectTrigger className="h-7 text-xs mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover z-50">
                          <SelectItem value="HABA" className="text-xs">HABA (40h haute / 32h basse)</SelectItem>
                          <SelectItem value="NORMAL" className="text-xs">Normal</SelectItem>
                        </SelectContent>
                      </Select>
                      {pointageSettings.regime === 'HABA' && (
                        <p className="text-[10px] text-muted-foreground mt-1">40h semaines hautes, 32h semaines basses, RE fixe 312h</p>
                      )}
                    </div>

                    {/* Postes */}
                    <div>
                      <Label className="text-xs font-semibold">Postes</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Label className="text-[10px]">Matin début</Label>
                          <Input type="time" value={pointageSettings.posteMatinDebut || '05:00'} onChange={e => onUpdatePointageSettings({ posteMatinDebut: e.target.value })} className="h-7 text-xs" />
                        </div>
                        <div>
                          <Label className="text-[10px]">Matin fin</Label>
                          <Input type="time" value={pointageSettings.posteMatinFin || '13:00'} onChange={e => onUpdatePointageSettings({ posteMatinFin: e.target.value })} className="h-7 text-xs" />
                        </div>
                        <div>
                          <Label className="text-[10px]">AM début</Label>
                          <Input type="time" value={pointageSettings.posteAMDebut || '13:00'} onChange={e => onUpdatePointageSettings({ posteAMDebut: e.target.value })} className="h-7 text-xs" />
                        </div>
                        <div>
                          <Label className="text-[10px]">AM fin</Label>
                          <Input type="time" value={pointageSettings.posteAMFin || '21:00'} onChange={e => onUpdatePointageSettings({ posteAMFin: e.target.value })} className="h-7 text-xs" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Alertes activées</Label>
                      <Switch checked={pointageSettings.alertesActives} onCheckedChange={v => onUpdatePointageSettings({ alertesActives: v })} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[10px]">Seuil orange (h)</Label>
                        <Input type="number" min={1} max={30} value={pointageSettings.seuilOrangeHeures} onChange={e => onUpdatePointageSettings({ seuilOrangeHeures: parseInt(e.target.value) || 16 })} className="h-7 text-xs" />
                      </div>
                      <div>
                        <Label className="text-[10px]">Seuil rouge (h)</Label>
                        <Input type="number" min={1} max={20} value={pointageSettings.seuilRougeHeures} onChange={e => onUpdatePointageSettings({ seuilRougeHeures: parseInt(e.target.value) || 8 })} className="h-7 text-xs" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 4. 🟣 Astreintes (protégé) ====== */}
          <Collapsible open={openSections['astreintes']} onOpenChange={() => toggleSection('astreintes')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Zap className="w-3.5 h-3.5 text-muted-foreground" />} label="Astreintes" color="bg-purple-500" open={!!openSections['astreintes']} onToggle={() => {}} locked={!pinUnlocked} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? lockedMessage : (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Récurrence</Label>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Date initiale</Label>
                        <span className="text-xs font-mono text-muted-foreground">
                          {isValidDate ? format(astreinteDate, 'dd/MM/yyyy', { locale: fr }) : '05/02/2026'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Cycle actuel</Label>
                        <span className="text-xs font-mono text-muted-foreground">
                          {settings.astreinteCycleWeeks || 6} semaines
                        </span>
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label className="text-xs">Nouvelle date</Label>
                          <Input type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} className="h-8 text-sm" />
                        </div>
                        <Button size="sm" className="h-8" onClick={handleDateChange}>OK</Button>
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label className="text-xs">Cycle (semaines)</Label>
                          <Input type="number" min={1} max={52} value={newCycleWeeks} onChange={(e) => { const v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= 1 && v <= 52) setNewCycleWeeks(v); }} className="h-8 text-sm" />
                        </div>
                        <Button size="sm" className="h-8" onClick={() => onUpdateSettings({ astreinteCycleWeeks: newCycleWeeks })}>OK</Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Couleurs</Label>
                      <ColorPicker label="Astreinte" value={settings.astreinteColor} onChange={(v) => onUpdateSettings({ astreinteColor: v })} />
                      <ColorPicker label="Astreinte ponctuelle" value={settings.astreintePonctuelleColor} onChange={(v) => onUpdateSettings({ astreintePonctuelleColor: v })} />
                      <ColorPicker label="Annulation" value={settings.astreinteCancelledColor} onChange={(v) => onUpdateSettings({ astreinteCancelledColor: v })} />
                      <PatternPicker label="Motif annulation" value={settings.astreinteCancelledPattern} onChange={(v) => onUpdateSettings({ astreinteCancelledPattern: v })} />
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 5. 🟢 Indemnités (protégé) ====== */}
          <Collapsible open={openSections['indemnites']} onOpenChange={() => toggleSection('indemnites')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Coins className="w-3.5 h-3.5 text-muted-foreground" />} label="Indemnités" color="bg-green-500" open={!!openSections['indemnites']} onToggle={() => {}} locked={!pinUnlocked} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? lockedMessage : (
                  <>
                    <div>
                      <Label className="text-[10px]">Prime repas (€)</Label>
                      <Input type="number" min={0} step={0.01} value={pointageSettings.primeRepasValeur} onChange={e => onUpdatePointageSettings({ primeRepasValeur: parseFloat(e.target.value) || 9.26 })} className="h-7 text-xs w-24" />
                    </div>
                    <div>
                      <Label className="text-[10px]">Commune de départ (IK)</Label>
                      <Select value={pointageSettings.communeDepart} onValueChange={v => onUpdatePointageSettings({ communeDepart: v })}>
                        <SelectTrigger className="h-7 text-xs">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60 bg-popover z-50">
                          {getAllCommuneNames().map(name => (
                            <SelectItem key={name} value={name} className="text-xs">{name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ====== 6. 🔴 Sécurité (NON protégé) ====== */}
          <Collapsible open={openSections['securite']} onOpenChange={() => toggleSection('securite')}>
            <CollapsibleTrigger asChild>
              <div><SectionHeader icon={<Shield className="w-3.5 h-3.5 text-muted-foreground" />} label="Sécurité" color="bg-red-500" open={!!openSections['securite']} onToggle={() => {}} /></div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 space-y-3 border border-border rounded-b-lg -mt-0.5">
                {!pinUnlocked ? (
                  <p className="text-xs text-muted-foreground italic">Déverrouillez le PIN ci-dessus pour changer le code</p>
                ) : (
                  <>
                    {!showPinChange ? (
                      <Button variant="outline" size="sm" className="w-full h-7 text-xs" onClick={() => setShowPinChange(true)}>
                        <KeyRound className="w-3 h-3 mr-1" /> Changer le code PIN
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Input type="password" maxLength={4} placeholder="Nouveau PIN" value={newPin} onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))} className="h-8 text-sm flex-1" />
                        <Button size="sm" className="h-8" onClick={handlePinChange} disabled={newPin.length !== 4}>OK</Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Info */}
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <strong>RE</strong> et <strong>21 (Congés annuels)</strong> grisent la case jour entière. 
              Les astreintes actives restent prioritaires sur le grisage.
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

```


// path: src/components/Toolbar/Toolbar.tsx
```ts
import { Button } from '@/components/ui/button';
import { Settings, Plus, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ToolbarProps {
  currentYear: number;
  onOpenSettings: () => void;
  onAddEvent: () => void;
  onYearChange: (year: number) => void;
}

const years = Array.from({ length: 10 }, (_, i) => 2025 + i);

export function Toolbar({ currentYear, onOpenSettings, onAddEvent, onYearChange }: ToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-2 sm:mb-4 flex-wrap gap-2">
      <div className="flex items-center gap-2 sm:gap-3">
        <Select 
          value={currentYear.toString()} 
          onValueChange={(v) => onYearChange(parseInt(v))}
        >
          <SelectTrigger className="w-20 sm:w-28 h-8 text-xs sm:text-sm">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center gap-1 sm:gap-2">
        <Button onClick={onAddEvent} className="gap-1 sm:gap-2 h-8 text-xs sm:text-sm px-2 sm:px-3">
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Ajouter</span>
        </Button>
        <Button variant="outline" size="icon" onClick={onOpenSettings} className="h-8 w-8">
          <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  );
}

```


// path: src/components/ui/accordion.tsx
```ts
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

```


// path: src/components/ui/alert-dialog.tsx
```ts
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

```


// path: src/components/ui/alert.tsx
```ts
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

```


// path: src/components/ui/aspect-ratio.tsx
```ts
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };

```


// path: src/components/ui/avatar.tsx
```ts
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

```


// path: src/components/ui/badge.tsx
```ts
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

```


// path: src/components/ui/breadcrumb.tsx
```ts
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <Comp ref={ref} className={cn("transition-colors hover:text-foreground", className)} {...props} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

```


// path: src/components/ui/button.tsx
```ts
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

```


// path: src/components/ui/calendar.tsx
```ts
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(buttonVariants({ variant: "ghost" }), "h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

```


// path: src/components/ui/card.tsx
```ts
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

```


// path: src/components/ui/carousel.tsx
```ts
import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };

```


// path: src/components/ui/chart.tsx
```ts
import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([_, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || item.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>;
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                            "h-2.5 w-2.5": indicator === "dot",
                            "w-1": indicator === "line",
                            "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                            "my-0.5": nestLabel && indicator === "dashed",
                          })}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-center gap-4", verticalAlign === "top" ? "pb-3" : "pt-3", className)}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div
            key={item.value}
            className={cn("flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground")}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };

```


// path: src/components/ui/checkbox.tsx
```ts
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

```


// path: src/components/ui/collapsible.tsx
```ts
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

```


// path: src/components/ui/command.tsx
```ts
import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

```


// path: src/components/ui/context-menu.tsx
```ts
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

```


// path: src/components/ui/dialog.tsx
```ts
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

```


// path: src/components/ui/drawer.tsx
```ts
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

```


// path: src/components/ui/dropdown-menu.tsx
```ts
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent focus:bg-accent",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

```


// path: src/components/ui/form.tsx
```ts
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return <p ref={ref} id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />;
  },
);
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p ref={ref} id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };

```


// path: src/components/ui/hover-card.tsx
```ts
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };

```


// path: src/components/ui/input-otp.tsx
```ts
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, React.ComponentPropsWithoutRef<typeof OTPInput>>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  ),
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ ...props }, ref) => (
    <div ref={ref} role="separator" {...props}>
      <Dot />
    </div>
  ),
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

```


// path: src/components/ui/input.tsx
```ts
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

```


// path: src/components/ui/label.tsx
```ts
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

```


// path: src/components/ui/menubar.tsx
```ts
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props} />;
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};

```


// path: src/components/ui/navigation-menu.tsx
```ts
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

```


// path: src/components/ui/pagination.tsx
```ts
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn("gap-1 pl-2.5", className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn("gap-1 pr-2.5", className)} {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

```


// path: src/components/ui/popover.tsx
```ts
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };

```


// path: src/components/ui/progress.tsx
```ts
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

```


// path: src/components/ui/radio-group.tsx
```ts
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

```


// path: src/components/ui/resizable.tsx
```ts
import { GripVertical } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

```


// path: src/components/ui/scroll-area.tsx
```ts
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">{children}</ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

```


// path: src/components/ui/select.tsx
```ts
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    onPointerDown={(e) => {
      // Fix iOS Safari freeze: prevent Radix pointer capture on touch
      if (e.pointerType === 'touch') {
        e.preventDefault();
      }
    }}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

```


// path: src/components/ui/separator.tsx
```ts
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

```


// path: src/components/ui/sheet.tsx
```ts
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-secondary hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};

```


// path: src/components/ui/sidebar.tsx
```ts
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", className)}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        className={cn("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
        >
          {children}
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<React.ElementRef<typeof Button>, React.ComponentProps<typeof Button>>(
  ({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <Button
        ref={ref}
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", className)}
        onClick={(event) => {
          onClick?.(event);
          toggleSidebar();
        }}
        {...props}
      >
        <PanelLeft />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 hover:after:bg-sidebar-border sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-sidebar="input"
        className={cn(
          "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} data-sidebar="footer" className={cn("flex flex-col gap-2 p-2", className)} {...props} />;
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return (
      <Separator
        ref={ref}
        data-sidebar="separator"
        className={cn("mx-2 w-auto bg-sidebar-border", className)}
        {...props}
      />
    );
  },
);
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-label"
        className={cn(
          "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-sidebar="group-action"
        className={cn(
          "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          // Increases the hit area of the button on mobile.
          "after:absolute after:-inset-2 after:md:hidden",
          "group-data-[collapsible=icon]:hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-sidebar="group-content" className={cn("w-full text-sm", className)} {...props} />
  ),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} data-sidebar="menu" className={cn("flex w-full min-w-0 flex-col gap-1", className)} {...props} />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center" hidden={state !== "collapsed" || isMobile} {...tooltip} />
    </Tooltip>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ ...props }, ref) => (
  <li ref={ref} {...props} />
));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring aria-disabled:pointer-events-none aria-disabled:opacity-50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

```


// path: src/components/ui/skeleton.tsx
```ts
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}

export { Skeleton };

```


// path: src/components/ui/slider.tsx
```ts
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

```


// path: src/components/ui/sonner.tsx
```ts
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };

```


// path: src/components/ui/switch.tsx
```ts
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

```


// path: src/components/ui/table.tsx
```ts
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />,
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className)}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  ),
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

```


// path: src/components/ui/tabs.tsx
```ts
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

```


// path: src/components/ui/textarea.tsx
```ts
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

```


// path: src/components/ui/toast.tsx
```ts
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToastPrimitives.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />;
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};

```


// path: src/components/ui/toaster.tsx
```ts
import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

```


// path: src/components/ui/toggle-group.tsx
```ts
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };

```


// path: src/components/ui/toggle.tsx
```ts
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(toggleVariants({ variant, size, className }))} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

```


// path: src/components/ui/tooltip.tsx
```ts
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

```


// path: src/components/ui/use-toast.ts
```ts
import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };

```


// path: src/data/communes_bugey_dataset.ts
```ts
export interface CommuneTrajet {
  localite: string;
  // kilomètres
  distanceAR_km: number | null;
  trajetPlafonne_km: number | null;
  plafondZHA_km: number | null;
  // temps
  tempsSimple_min: number | null;
  // temps valorisé en heures décimales
  valorise_jour_semaine_150: number | null;
  valorise_nuit_semaine_200: number | null;
  valorise_jour_dimanche_175: number | null;
  valorise_nuit_dimanche_225: number | null;
}

export const COMMUNES_BUGEY: CommuneTrajet[] = [
  {
    localite: "AMBERIEU",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "AMBLERIEU",
    distanceAR_km: 38,
    trajetPlafonne_km: 28,
    plafondZHA_km: 38,
    tempsSimple_min: 22,
    valorise_jour_semaine_150: 0.55,
    valorise_nuit_semaine_200: 0.73,
    valorise_jour_dimanche_175: 0.64,
    valorise_nuit_dimanche_225: 0.82
  },
  {
    localite: "AMBRONAY",
    distanceAR_km: 58,
    trajetPlafonne_km: 48,
    plafondZHA_km: 58,
    tempsSimple_min: 33,
    valorise_jour_semaine_150: 0.84,
    valorise_nuit_semaine_200: 1.12,
    valorise_jour_dimanche_175: 0.98,
    valorise_nuit_dimanche_225: 1.25
  },
  {
    localite: "AMBUTRIX",
    distanceAR_km: 40,
    trajetPlafonne_km: 30,
    plafondZHA_km: 40,
    tempsSimple_min: 23,
    valorise_jour_semaine_150: 0.58,
    valorise_nuit_semaine_200: 0.77,
    valorise_jour_dimanche_175: 0.67,
    valorise_nuit_dimanche_225: 0.87
  },
  {
    localite: "ANNOISIN CHATELANS",
    distanceAR_km: 46,
    trajetPlafonne_km: 36,
    plafondZHA_km: 46,
    tempsSimple_min: 27,
    valorise_jour_semaine_150: 0.66,
    valorise_nuit_semaine_200: 0.88,
    valorise_jour_dimanche_175: 0.77,
    valorise_nuit_dimanche_225: 1.0
  },
  {
    localite: "ANTHON",
    distanceAR_km: 24,
    trajetPlafonne_km: 14,
    plafondZHA_km: 24,
    tempsSimple_min: 14,
    valorise_jour_semaine_150: 0.35,
    valorise_nuit_semaine_200: 0.46,
    valorise_jour_dimanche_175: 0.4,
    valorise_nuit_dimanche_225: 0.52
  },
  {
    localite: "ARANDON",
    distanceAR_km: 74,
    trajetPlafonne_km: 53,
    plafondZHA_km: 74,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ARTEMARE",
    distanceAR_km: 120,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "BALAN",
    distanceAR_km: 40,
    trajetPlafonne_km: 30,
    plafondZHA_km: 40,
    tempsSimple_min: 23,
    valorise_jour_semaine_150: 0.58,
    valorise_nuit_semaine_200: 0.77,
    valorise_jour_dimanche_175: 0.67,
    valorise_nuit_dimanche_225: 0.87
  },
  {
    localite: "BARENS",
    distanceAR_km: 24,
    trajetPlafonne_km: 14,
    plafondZHA_km: 24,
    tempsSimple_min: 14,
    valorise_jour_semaine_150: 0.35,
    valorise_nuit_semaine_200: 0.46,
    valorise_jour_dimanche_175: 0.4,
    valorise_nuit_dimanche_225: 0.52
  },
  {
    localite: "BELIGNEUX",
    distanceAR_km: 36,
    trajetPlafonne_km: 26,
    plafondZHA_km: 36,
    tempsSimple_min: 21,
    valorise_jour_semaine_150: 0.52,
    valorise_nuit_semaine_200: 0.69,
    valorise_jour_dimanche_175: 0.61,
    valorise_nuit_dimanche_225: 0.78
  },
  {
    localite: "BELLEY",
    distanceAR_km: 110,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "BETTANT",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "BEYNOST",
    distanceAR_km: 72,
    trajetPlafonne_km: 53,
    plafondZHA_km: 72,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "BLYES",
    distanceAR_km: 18,
    trajetPlafonne_km: 8,
    plafondZHA_km: 18,
    tempsSimple_min: 10,
    valorise_jour_semaine_150: 0.26,
    valorise_nuit_semaine_200: 0.35,
    valorise_jour_dimanche_175: 0.3,
    valorise_nuit_dimanche_225: 0.39
  },
  {
    localite: "BOURG EN BRESSE",
    distanceAR_km: 124,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "BOURG ST CHRISTOPHE",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "BOURGOIN JALLIEU",
    distanceAR_km: 72,
    trajetPlafonne_km: 53,
    plafondZHA_km: 72,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "BOUVESSE QUIRIEU",
    distanceAR_km: 54,
    trajetPlafonne_km: 44,
    plafondZHA_km: 54,
    tempsSimple_min: 31,
    valorise_jour_semaine_150: 0.78,
    valorise_nuit_semaine_200: 1.04,
    valorise_jour_dimanche_175: 0.91,
    valorise_nuit_dimanche_225: 1.17
  },
  {
    localite: "BOYEUX SAINT JEROME",
    distanceAR_km: 78,
    trajetPlafonne_km: 53,
    plafondZHA_km: 78,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "BRANGUES",
    distanceAR_km: 84,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "BRESSOLLES",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "BRIORD",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "CAMP DE LA VALBONNE",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "CHALAMONT",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "CHAMAGNIEU",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "CHAMPDOR-CORCELLES",
    distanceAR_km: 118,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "CHANES",
    distanceAR_km: 30,
    trajetPlafonne_km: 20,
    plafondZHA_km: 30,
    tempsSimple_min: 17,
    valorise_jour_semaine_150: 0.43,
    valorise_nuit_semaine_200: 0.58,
    valorise_jour_dimanche_175: 0.5,
    valorise_nuit_dimanche_225: 0.65
  },
  {
    localite: "CHARETTE",
    distanceAR_km: 48,
    trajetPlafonne_km: 38,
    plafondZHA_km: 48,
    tempsSimple_min: 28,
    valorise_jour_semaine_150: 0.69,
    valorise_nuit_semaine_200: 0.92,
    valorise_jour_dimanche_175: 0.81,
    valorise_nuit_dimanche_225: 1.04
  },
  {
    localite: "CHARNOZ SUR AIN",
    distanceAR_km: 28,
    trajetPlafonne_km: 18,
    plafondZHA_km: 28,
    tempsSimple_min: 16,
    valorise_jour_semaine_150: 0.4,
    valorise_nuit_semaine_200: 0.54,
    valorise_jour_dimanche_175: 0.47,
    valorise_nuit_dimanche_225: 0.61
  },
  {
    localite: "CHARVIEU CHAVAGNEUX",
    distanceAR_km: 30,
    trajetPlafonne_km: 20,
    plafondZHA_km: 30,
    tempsSimple_min: 17,
    valorise_jour_semaine_150: 0.43,
    valorise_nuit_semaine_200: 0.58,
    valorise_jour_dimanche_175: 0.5,
    valorise_nuit_dimanche_225: 0.65
  },
  {
    localite: "CHASSIEU",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "CHATEAU GAILLARD",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "CHATENAY (01)",
    distanceAR_km: 72,
    trajetPlafonne_km: 53,
    plafondZHA_km: 72,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "CHATILLON LA PALUD",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "CHATILLON SUR CHALARONNE",
    distanceAR_km: 106,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "CHAVANOZ",
    distanceAR_km: 22,
    trajetPlafonne_km: 12,
    plafondZHA_km: 22,
    tempsSimple_min: 13,
    valorise_jour_semaine_150: 0.32,
    valorise_nuit_semaine_200: 0.42,
    valorise_jour_dimanche_175: 0.37,
    valorise_nuit_dimanche_225: 0.48
  },
  {
    localite: "CHAZEY SUR AIN",
    distanceAR_km: 28,
    trajetPlafonne_km: 18,
    plafondZHA_km: 28,
    tempsSimple_min: 16,
    valorise_jour_semaine_150: 0.4,
    valorise_nuit_semaine_200: 0.54,
    valorise_jour_dimanche_175: 0.47,
    valorise_nuit_dimanche_225: 0.61
  },
  {
    localite: "CHOZEAU",
    distanceAR_km: 36,
    trajetPlafonne_km: 26,
    plafondZHA_km: 36,
    tempsSimple_min: 21,
    valorise_jour_semaine_150: 0.52,
    valorise_nuit_semaine_200: 0.69,
    valorise_jour_dimanche_175: 0.61,
    valorise_nuit_dimanche_225: 0.78
  },
  {
    localite: "CLEYZIEU",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "COLOMBIER SAUGNIEU",
    distanceAR_km: 40,
    trajetPlafonne_km: 30,
    plafondZHA_km: 40,
    tempsSimple_min: 23,
    valorise_jour_semaine_150: 0.58,
    valorise_nuit_semaine_200: 0.77,
    valorise_jour_dimanche_175: 0.67,
    valorise_nuit_dimanche_225: 0.87
  },
  {
    localite: "COLOMIEU",
    distanceAR_km: 116,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "COMMUNAY",
    distanceAR_km: 150,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "CONAND",
    distanceAR_km: 78,
    trajetPlafonne_km: 53,
    plafondZHA_km: 78,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "CONILIEU",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "CORDIEUX",
    distanceAR_km: 68,
    trajetPlafonne_km: 53,
    plafondZHA_km: 68,
    tempsSimple_min: 39,
    valorise_jour_semaine_150: 0.98,
    valorise_nuit_semaine_200: 1.31,
    valorise_jour_dimanche_175: 1.14,
    valorise_nuit_dimanche_225: 1.47
  },
  {
    localite: "COTE DE CONILIEU",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "COURTENAY",
    distanceAR_km: 66,
    trajetPlafonne_km: 53,
    plafondZHA_km: 66,
    tempsSimple_min: 38,
    valorise_jour_semaine_150: 0.95,
    valorise_nuit_semaine_200: 1.27,
    valorise_jour_dimanche_175: 1.11,
    valorise_nuit_dimanche_225: 1.43
  },
  {
    localite: "COUZON AU MONT D'OR",
    distanceAR_km: 106,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "CRANS",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "CREMIEU",
    distanceAR_km: 28,
    trajetPlafonne_km: 18,
    plafondZHA_km: 28,
    tempsSimple_min: 16,
    valorise_jour_semaine_150: 0.4,
    valorise_nuit_semaine_200: 0.54,
    valorise_jour_dimanche_175: 0.47,
    valorise_nuit_dimanche_225: 0.61
  },
  {
    localite: "CREYS MEPIEU",
    distanceAR_km: 74,
    trajetPlafonne_km: 53,
    plafondZHA_km: 74,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "DAGNEUX",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "DARDILLY",
    distanceAR_km: 58,
    trajetPlafonne_km: 48,
    plafondZHA_km: 58,
    tempsSimple_min: 33,
    valorise_jour_semaine_150: 0.84,
    valorise_nuit_semaine_200: 1.12,
    valorise_jour_dimanche_175: 0.98,
    valorise_nuit_dimanche_225: 1.25
  },
  {
    localite: "DECINES CHARPIEU",
    distanceAR_km: 58,
    trajetPlafonne_km: 48,
    plafondZHA_km: 58,
    tempsSimple_min: 33,
    valorise_jour_semaine_150: 0.84,
    valorise_nuit_semaine_200: 1.12,
    valorise_jour_dimanche_175: 0.98,
    valorise_nuit_dimanche_225: 1.25
  },
  {
    localite: "DEMPTEZIEU",
    distanceAR_km: 70,
    trajetPlafonne_km: 53,
    plafondZHA_km: 70,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "DIEMOZ",
    distanceAR_km: 72,
    trajetPlafonne_km: 53,
    plafondZHA_km: 72,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "DIZIMIEU",
    distanceAR_km: 38,
    trajetPlafonne_km: 28,
    plafondZHA_km: 38,
    tempsSimple_min: 22,
    valorise_jour_semaine_150: 0.55,
    valorise_nuit_semaine_200: 0.73,
    valorise_jour_dimanche_175: 0.64,
    valorise_nuit_dimanche_225: 0.82
  },
  {
    localite: "DOMARIN",
    distanceAR_km: 66,
    trajetPlafonne_km: 53,
    plafondZHA_km: 66,
    tempsSimple_min: 38,
    valorise_jour_semaine_150: 0.95,
    valorise_nuit_semaine_200: 1.27,
    valorise_jour_dimanche_175: 1.11,
    valorise_nuit_dimanche_225: 1.43
  },
  {
    localite: "DOMPIERRE SUR VEYLE",
    distanceAR_km: 74,
    trajetPlafonne_km: 53,
    plafondZHA_km: 74,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "DOUVRES",
    distanceAR_km: 55,
    trajetPlafonne_km: 45,
    plafondZHA_km: 55,
    tempsSimple_min: 32,
    valorise_jour_semaine_150: 0.79,
    valorise_nuit_semaine_200: 1.06,
    valorise_jour_dimanche_175: 0.93,
    valorise_nuit_dimanche_225: 1.19
  },
  {
    localite: "DRUILLAT",
    distanceAR_km: 70,
    trajetPlafonne_km: 53,
    plafondZHA_km: 70,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "FARAMANS",
    distanceAR_km: 46,
    trajetPlafonne_km: 36,
    plafondZHA_km: 46,
    tempsSimple_min: 27,
    valorise_jour_semaine_150: 0.66,
    valorise_nuit_semaine_200: 0.88,
    valorise_jour_dimanche_175: 0.77,
    valorise_nuit_dimanche_225: 1.0
  },
  {
    localite: "FOUR",
    distanceAR_km: 66,
    trajetPlafonne_km: 53,
    plafondZHA_km: 66,
    tempsSimple_min: 38,
    valorise_jour_semaine_150: 0.95,
    valorise_nuit_semaine_200: 1.27,
    valorise_jour_dimanche_175: 1.11,
    valorise_nuit_dimanche_225: 1.43
  },
  {
    localite: "FRETIGNIER",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "FRONTONAS",
    distanceAR_km: 48,
    trajetPlafonne_km: 38,
    plafondZHA_km: 48,
    tempsSimple_min: 28,
    valorise_jour_semaine_150: 0.69,
    valorise_nuit_semaine_200: 0.92,
    valorise_jour_dimanche_175: 0.81,
    valorise_nuit_dimanche_225: 1.04
  },
  {
    localite: "GENAS",
    distanceAR_km: 58,
    trajetPlafonne_km: 48,
    plafondZHA_km: 58,
    tempsSimple_min: 33,
    valorise_jour_semaine_150: 0.84,
    valorise_nuit_semaine_200: 1.12,
    valorise_jour_dimanche_175: 0.98,
    valorise_nuit_dimanche_225: 1.25
  },
  {
    localite: "GRENAY",
    distanceAR_km: 64,
    trajetPlafonne_km: 53,
    plafondZHA_km: 64,
    tempsSimple_min: 37,
    valorise_jour_semaine_150: 0.92,
    valorise_nuit_semaine_200: 1.23,
    valorise_jour_dimanche_175: 1.08,
    valorise_nuit_dimanche_225: 1.38
  },
  {
    localite: "GRENOBLE",
    distanceAR_km: 97,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "HEYRIEUX",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "HIERES S/AMBY",
    distanceAR_km: 35,
    trajetPlafonne_km: 25,
    plafondZHA_km: 35,
    tempsSimple_min: 20,
    valorise_jour_semaine_150: 0.5,
    valorise_nuit_semaine_200: 0.67,
    valorise_jour_dimanche_175: 0.59,
    valorise_nuit_dimanche_225: 0.76
  },
  {
    localite: "INNIMOND",
    distanceAR_km: 89,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "JANNEYRIAS",
    distanceAR_km: 39,
    trajetPlafonne_km: 29,
    plafondZHA_km: 39,
    tempsSimple_min: 23,
    valorise_jour_semaine_150: 0.56,
    valorise_nuit_semaine_200: 0.75,
    valorise_jour_dimanche_175: 0.66,
    valorise_nuit_dimanche_225: 0.84
  },
  {
    localite: "JONAGE",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "JONS",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "JOYEUX",
    distanceAR_km: 56,
    trajetPlafonne_km: 46,
    plafondZHA_km: 56,
    tempsSimple_min: 32,
    valorise_jour_semaine_150: 0.81,
    valorise_nuit_semaine_200: 1.08,
    valorise_jour_dimanche_175: 0.94,
    valorise_nuit_dimanche_225: 1.21
  },
  {
    localite: "JUJURIEUX",
    distanceAR_km: 68,
    trajetPlafonne_km: 53,
    plafondZHA_km: 68,
    tempsSimple_min: 39,
    valorise_jour_semaine_150: 0.98,
    valorise_nuit_semaine_200: 1.31,
    valorise_jour_dimanche_175: 1.14,
    valorise_nuit_dimanche_225: 1.47
  },
  {
    localite: "L'ABERGEMENT DE VAREY",
    distanceAR_km: 70,
    trajetPlafonne_km: 53,
    plafondZHA_km: 70,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "L'ISLE D'ABEAU",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "LA BALME (01450)",
    distanceAR_km: 102,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "LA BALME LES GROTTES",
    distanceAR_km: 35,
    trajetPlafonne_km: 25,
    plafondZHA_km: 35,
    tempsSimple_min: 20,
    valorise_jour_semaine_150: 0.5,
    valorise_nuit_semaine_200: 0.67,
    valorise_jour_dimanche_175: 0.59,
    valorise_nuit_dimanche_225: 0.76
  },
  {
    localite: "LA BATIE MONTGASCON",
    distanceAR_km: 114,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "LA BOISSE",
    distanceAR_km: 48,
    trajetPlafonne_km: 38,
    plafondZHA_km: 48,
    tempsSimple_min: 28,
    valorise_jour_semaine_150: 0.69,
    valorise_nuit_semaine_200: 0.92,
    valorise_jour_dimanche_175: 0.81,
    valorise_nuit_dimanche_225: 1.04
  },
  {
    localite: "LA BROSSE",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "LA CHAPELLE DE LA TOUR",
    distanceAR_km: 124,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "LA TOUR DU PIN",
    distanceAR_km: 88,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "LA VERPILLERE",
    distanceAR_km: 56,
    trajetPlafonne_km: 46,
    plafondZHA_km: 56,
    tempsSimple_min: 32,
    valorise_jour_semaine_150: 0.81,
    valorise_nuit_semaine_200: 1.08,
    valorise_jour_dimanche_175: 0.94,
    valorise_nuit_dimanche_225: 1.21
  },
  {
    localite: "LAGNIEU",
    distanceAR_km: 35,
    trajetPlafonne_km: 25,
    plafondZHA_km: 35,
    tempsSimple_min: 20,
    valorise_jour_semaine_150: 0.5,
    valorise_nuit_semaine_200: 0.67,
    valorise_jour_dimanche_175: 0.59,
    valorise_nuit_dimanche_225: 0.76
  },
  {
    localite: "LE BOUCHAGE",
    distanceAR_km: 88,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "LE CHAFFARD",
    distanceAR_km: 52,
    trajetPlafonne_km: 42,
    plafondZHA_km: 52,
    tempsSimple_min: 30,
    valorise_jour_semaine_150: 0.75,
    valorise_nuit_semaine_200: 1.0,
    valorise_jour_dimanche_175: 0.88,
    valorise_nuit_dimanche_225: 1.13
  },
  {
    localite: "LE GUILLON (RIGNIEUX)",
    distanceAR_km: 53,
    trajetPlafonne_km: 43,
    plafondZHA_km: 53,
    tempsSimple_min: 31,
    valorise_jour_semaine_150: 0.76,
    valorise_nuit_semaine_200: 1.02,
    valorise_jour_dimanche_175: 0.89,
    valorise_nuit_dimanche_225: 1.15
  },
  {
    localite: "LE MONTELLIER (01)",
    distanceAR_km: 54,
    trajetPlafonne_km: 44,
    plafondZHA_km: 54,
    tempsSimple_min: 31,
    valorise_jour_semaine_150: 0.78,
    valorise_nuit_semaine_200: 1.04,
    valorise_jour_dimanche_175: 0.91,
    valorise_nuit_dimanche_225: 1.17
  },
  {
    localite: "LE PLANTAY",
    distanceAR_km: 72,
    trajetPlafonne_km: 53,
    plafondZHA_km: 72,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "LE TROLLIET (STE JULIE)",
    distanceAR_km: 14,
    trajetPlafonne_km: 4,
    plafondZHA_km: 14,
    tempsSimple_min: 8,
    valorise_jour_semaine_150: 0.2,
    valorise_nuit_semaine_200: 0.27,
    valorise_jour_dimanche_175: 0.24,
    valorise_nuit_dimanche_225: 0.3
  },
  {
    localite: "LES ALLYMES",
    distanceAR_km: 56,
    trajetPlafonne_km: 46,
    plafondZHA_km: 56,
    tempsSimple_min: 32,
    valorise_jour_semaine_150: 0.81,
    valorise_nuit_semaine_200: 1.08,
    valorise_jour_dimanche_175: 0.94,
    valorise_nuit_dimanche_225: 1.21
  },
  {
    localite: "LES AVENIERES",
    distanceAR_km: 104,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "LES CARRONNIERES (01)",
    distanceAR_km: 66,
    trajetPlafonne_km: 53,
    plafondZHA_km: 66,
    tempsSimple_min: 38,
    valorise_jour_semaine_150: 0.95,
    valorise_nuit_semaine_200: 1.27,
    valorise_jour_dimanche_175: 1.11,
    valorise_nuit_dimanche_225: 1.43
  },
  {
    localite: "LEYMENT",
    distanceAR_km: 32,
    trajetPlafonne_km: 22,
    plafondZHA_km: 32,
    tempsSimple_min: 18,
    valorise_jour_semaine_150: 0.46,
    valorise_nuit_semaine_200: 0.62,
    valorise_jour_dimanche_175: 0.54,
    valorise_nuit_dimanche_225: 0.69
  },
  {
    localite: "LEYRIEU",
    distanceAR_km: 26,
    trajetPlafonne_km: 16,
    plafondZHA_km: 26,
    tempsSimple_min: 15,
    valorise_jour_semaine_150: 0.38,
    valorise_nuit_semaine_200: 0.5,
    valorise_jour_dimanche_175: 0.44,
    valorise_nuit_dimanche_225: 0.56
  },
  {
    localite: "LHUIS",
    distanceAR_km: 74,
    trajetPlafonne_km: 53,
    plafondZHA_km: 74,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "LOYES",
    distanceAR_km: 38,
    trajetPlafonne_km: 28,
    plafondZHA_km: 38,
    tempsSimple_min: 22,
    valorise_jour_semaine_150: 0.55,
    valorise_nuit_semaine_200: 0.73,
    valorise_jour_dimanche_175: 0.64,
    valorise_nuit_dimanche_225: 0.82
  },
  {
    localite: "LOYETTES",
    distanceAR_km: 15,
    trajetPlafonne_km: 5,
    plafondZHA_km: 15,
    tempsSimple_min: 9,
    valorise_jour_semaine_150: 0.22,
    valorise_nuit_semaine_200: 0.29,
    valorise_jour_dimanche_175: 0.25,
    valorise_nuit_dimanche_225: 0.32
  },
  {
    localite: "MARCHAMP",
    distanceAR_km: 84,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MARENNES",
    distanceAR_km: 90,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MARIEU",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "MARLIEUX",
    distanceAR_km: 84,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MASSIEUX",
    distanceAR_km: 100,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MAUBEC",
    distanceAR_km: 72,
    trajetPlafonne_km: 53,
    plafondZHA_km: 72,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MEPIEU",
    distanceAR_km: 68,
    trajetPlafonne_km: 53,
    plafondZHA_km: 68,
    tempsSimple_min: 39,
    valorise_jour_semaine_150: 0.98,
    valorise_nuit_semaine_200: 1.31,
    valorise_jour_dimanche_175: 1.14,
    valorise_nuit_dimanche_225: 1.47
  },
  {
    localite: "MERLAND",
    distanceAR_km: 62,
    trajetPlafonne_km: 52,
    plafondZHA_km: 62,
    tempsSimple_min: 36,
    valorise_jour_semaine_150: 0.89,
    valorise_nuit_semaine_200: 1.19,
    valorise_jour_dimanche_175: 1.04,
    valorise_nuit_dimanche_225: 1.34
  },
  {
    localite: "MEXIMIEUX",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "MEYRIE",
    distanceAR_km: 92,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MEYRIEU LES ETANGS",
    distanceAR_km: 45,
    trajetPlafonne_km: 35,
    plafondZHA_km: 45,
    tempsSimple_min: 26,
    valorise_jour_semaine_150: 0.65,
    valorise_nuit_semaine_200: 0.87,
    valorise_jour_dimanche_175: 0.76,
    valorise_nuit_dimanche_225: 0.97
  },
  {
    localite: "MEYZIEU",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "MILLERY",
    distanceAR_km: 122,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MIONNAY PAR AUTOROUTE",
    distanceAR_km: 96,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MOIDIEU DETOURBE",
    distanceAR_km: 92,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MOLLON",
    distanceAR_km: 47,
    trajetPlafonne_km: 37,
    plafondZHA_km: 47,
    tempsSimple_min: 27,
    valorise_jour_semaine_150: 0.68,
    valorise_nuit_semaine_200: 0.9,
    valorise_jour_dimanche_175: 0.79,
    valorise_nuit_dimanche_225: 1.02
  },
  {
    localite: "MONTAGNAT",
    distanceAR_km: 100,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MONTAGNIEU",
    distanceAR_km: 58,
    trajetPlafonne_km: 48,
    plafondZHA_km: 58,
    tempsSimple_min: 33,
    valorise_jour_semaine_150: 0.84,
    valorise_nuit_semaine_200: 1.12,
    valorise_jour_dimanche_175: 0.98,
    valorise_nuit_dimanche_225: 1.25
  },
  {
    localite: "MONTALIEU VERCIEU",
    distanceAR_km: 52,
    trajetPlafonne_km: 42,
    plafondZHA_km: 52,
    tempsSimple_min: 30,
    valorise_jour_semaine_150: 0.75,
    valorise_nuit_semaine_200: 1.0,
    valorise_jour_dimanche_175: 0.88,
    valorise_nuit_dimanche_225: 1.13
  },
  {
    localite: "MONTANAY",
    distanceAR_km: 96,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MONTCARRA ST CHEF",
    distanceAR_km: 70,
    trajetPlafonne_km: 53,
    plafondZHA_km: 70,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MONTLUEL",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "MONTMERLE SUR SAONE",
    distanceAR_km: 172,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MONTRACOL",
    distanceAR_km: 120,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "MORAS (38)",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "MORESTEL",
    distanceAR_km: 80,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "NEUVILLE SUR AIN",
    distanceAR_km: 82,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "NIEVROZ",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "OPTEVOZ",
    distanceAR_km: 46,
    trajetPlafonne_km: 36,
    plafondZHA_km: 46,
    tempsSimple_min: 27,
    valorise_jour_semaine_150: 0.66,
    valorise_nuit_semaine_200: 0.88,
    valorise_jour_dimanche_175: 0.77,
    valorise_nuit_dimanche_225: 1.0
  },
  {
    localite: "OULLINS",
    distanceAR_km: 98,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "PANOSSAS (38)",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "PARMILIEU",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "PASSINS (38)",
    distanceAR_km: 70,
    trajetPlafonne_km: 53,
    plafondZHA_km: 70,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "PERONNAS",
    distanceAR_km: 102,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "PEROUGES",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "PEYRIEU (01)",
    distanceAR_km: 124,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "PEYRIEU (38)",
    distanceAR_km: 38,
    trajetPlafonne_km: 28,
    plafondZHA_km: 38,
    tempsSimple_min: 22,
    valorise_jour_semaine_150: 0.55,
    valorise_nuit_semaine_200: 0.73,
    valorise_jour_dimanche_175: 0.64,
    valorise_nuit_dimanche_225: 0.82
  },
  {
    localite: "PIERRE BENITE",
    distanceAR_km: 114,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "PIZAY",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "POLLET",
    distanceAR_km: 26,
    trajetPlafonne_km: 16,
    plafondZHA_km: 26,
    tempsSimple_min: 15,
    valorise_jour_semaine_150: 0.38,
    valorise_nuit_semaine_200: 0.5,
    valorise_jour_dimanche_175: 0.44,
    valorise_nuit_dimanche_225: 0.56
  },
  {
    localite: "POMMIERS",
    distanceAR_km: 136,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "PONCIN",
    distanceAR_km: 82,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "PONT D'AIN",
    distanceAR_km: 66,
    trajetPlafonne_km: 53,
    plafondZHA_km: 66,
    tempsSimple_min: 38,
    valorise_jour_semaine_150: 0.95,
    valorise_nuit_semaine_200: 1.27,
    valorise_jour_dimanche_175: 1.11,
    valorise_nuit_dimanche_225: 1.43
  },
  {
    localite: "PONT DE CHERUY",
    distanceAR_km: 23,
    trajetPlafonne_km: 13,
    plafondZHA_km: 23,
    tempsSimple_min: 13,
    valorise_jour_semaine_150: 0.33,
    valorise_nuit_semaine_200: 0.44,
    valorise_jour_dimanche_175: 0.39,
    valorise_nuit_dimanche_225: 0.5
  },
  {
    localite: "PORCIEU AMBLAGNIEU",
    distanceAR_km: 46,
    trajetPlafonne_km: 36,
    plafondZHA_km: 46,
    tempsSimple_min: 27,
    valorise_jour_semaine_150: 0.66,
    valorise_nuit_semaine_200: 0.88,
    valorise_jour_dimanche_175: 0.77,
    valorise_nuit_dimanche_225: 1.0
  },
  {
    localite: "POSAFOL",
    distanceAR_km: 26,
    trajetPlafonne_km: 16,
    plafondZHA_km: 26,
    tempsSimple_min: 15,
    valorise_jour_semaine_150: 0.38,
    valorise_nuit_semaine_200: 0.5,
    valorise_jour_dimanche_175: 0.44,
    valorise_nuit_dimanche_225: 0.56
  },
  {
    localite: "PRIAY",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "PROULIEU",
    distanceAR_km: 20,
    trajetPlafonne_km: 10,
    plafondZHA_km: 20,
    tempsSimple_min: 12,
    valorise_jour_semaine_150: 0.29,
    valorise_nuit_semaine_200: 0.38,
    valorise_jour_dimanche_175: 0.34,
    valorise_nuit_dimanche_225: 0.43
  },
  {
    localite: "PUSIGNAN",
    distanceAR_km: 45,
    trajetPlafonne_km: 35,
    plafondZHA_km: 45,
    tempsSimple_min: 26,
    valorise_jour_semaine_150: 0.65,
    valorise_nuit_semaine_200: 0.87,
    valorise_jour_dimanche_175: 0.76,
    valorise_nuit_dimanche_225: 0.97
  },
  {
    localite: "QUINCIEUX",
    distanceAR_km: 112,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "RIGNIEU LE DESERT",
    distanceAR_km: 30,
    trajetPlafonne_km: 20,
    plafondZHA_km: 30,
    tempsSimple_min: 17,
    valorise_jour_semaine_150: 0.43,
    valorise_nuit_semaine_200: 0.58,
    valorise_jour_dimanche_175: 0.5,
    valorise_nuit_dimanche_225: 0.65
  },
  {
    localite: "RIGNIEUX LE FRANC",
    distanceAR_km: 48,
    trajetPlafonne_km: 38,
    plafondZHA_km: 48,
    tempsSimple_min: 28,
    valorise_jour_semaine_150: 0.69,
    valorise_nuit_semaine_200: 0.92,
    valorise_jour_dimanche_175: 0.81,
    valorise_nuit_dimanche_225: 1.04
  },
  {
    localite: "RIVES (38)",
    distanceAR_km: 152,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ROCHE",
    distanceAR_km: 72,
    trajetPlafonne_km: 53,
    plafondZHA_km: 72,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ROCHETOIRIN",
    distanceAR_km: 82,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ROMAGNIEU",
    distanceAR_km: 130,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "RUY",
    distanceAR_km: 72,
    trajetPlafonne_km: 53,
    plafondZHA_km: 72,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "SALAGNON",
    distanceAR_km: 58,
    trajetPlafonne_km: 48,
    plafondZHA_km: 58,
    tempsSimple_min: 33,
    valorise_jour_semaine_150: 0.84,
    valorise_nuit_semaine_200: 1.12,
    valorise_jour_dimanche_175: 0.98,
    valorise_nuit_dimanche_225: 1.25
  },
  {
    localite: "SATOLAS ET BONCE",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "SAULT BRENAZ",
    distanceAR_km: 40,
    trajetPlafonne_km: 30,
    plafondZHA_km: 40,
    tempsSimple_min: 23,
    valorise_jour_semaine_150: 0.58,
    valorise_nuit_semaine_200: 0.77,
    valorise_jour_dimanche_175: 0.67,
    valorise_nuit_dimanche_225: 0.87
  },
  {
    localite: "SERMERIEU",
    distanceAR_km: 66,
    trajetPlafonne_km: 53,
    plafondZHA_km: 66,
    tempsSimple_min: 38,
    valorise_jour_semaine_150: 0.95,
    valorise_nuit_semaine_200: 1.27,
    valorise_jour_dimanche_175: 1.11,
    valorise_nuit_dimanche_225: 1.43
  },
  {
    localite: "SERRIERES DE BRIORD",
    distanceAR_km: 52,
    trajetPlafonne_km: 42,
    plafondZHA_km: 52,
    tempsSimple_min: 30,
    valorise_jour_semaine_150: 0.75,
    valorise_nuit_semaine_200: 1.0,
    valorise_jour_dimanche_175: 0.88,
    valorise_nuit_dimanche_225: 1.13
  },
  {
    localite: "SICCIEU ST JULIEN ET CARISIEU",
    distanceAR_km: 52,
    trajetPlafonne_km: 42,
    plafondZHA_km: 52,
    tempsSimple_min: 30,
    valorise_jour_semaine_150: 0.75,
    valorise_nuit_semaine_200: 1.0,
    valorise_jour_dimanche_175: 0.88,
    valorise_nuit_dimanche_225: 1.13
  },
  {
    localite: "SOLEYMIEU",
    distanceAR_km: 52,
    trajetPlafonne_km: 42,
    plafondZHA_km: 52,
    tempsSimple_min: 30,
    valorise_jour_semaine_150: 0.75,
    valorise_nuit_semaine_200: 1.0,
    valorise_jour_dimanche_175: 0.88,
    valorise_nuit_dimanche_225: 1.13
  },
  {
    localite: "SOUCLIN",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "SOUDON",
    distanceAR_km: 48,
    trajetPlafonne_km: 38,
    plafondZHA_km: 48,
    tempsSimple_min: 28,
    valorise_jour_semaine_150: 0.69,
    valorise_nuit_semaine_200: 0.92,
    valorise_jour_dimanche_175: 0.81,
    valorise_nuit_dimanche_225: 1.04
  },
  {
    localite: "ST ALBAN DE ROCHE (38)",
    distanceAR_km: 66,
    trajetPlafonne_km: 53,
    plafondZHA_km: 66,
    tempsSimple_min: 38,
    valorise_jour_semaine_150: 0.95,
    valorise_nuit_semaine_200: 1.27,
    valorise_jour_dimanche_175: 1.11,
    valorise_nuit_dimanche_225: 1.43
  },
  {
    localite: "ST ANDRE DE CORCY",
    distanceAR_km: 72,
    trajetPlafonne_km: 53,
    plafondZHA_km: 72,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ST BAUDILLE DE LA TOUR",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "ST BONNET DE MURE",
    distanceAR_km: 66,
    trajetPlafonne_km: 53,
    plafondZHA_km: 66,
    tempsSimple_min: 38,
    valorise_jour_semaine_150: 0.95,
    valorise_nuit_semaine_200: 1.27,
    valorise_jour_dimanche_175: 1.11,
    valorise_nuit_dimanche_225: 1.43
  },
  {
    localite: "ST CHEF",
    distanceAR_km: 68,
    trajetPlafonne_km: 53,
    plafondZHA_km: 68,
    tempsSimple_min: 39,
    valorise_jour_semaine_150: 0.98,
    valorise_nuit_semaine_200: 1.31,
    valorise_jour_dimanche_175: 1.14,
    valorise_nuit_dimanche_225: 1.47
  },
  {
    localite: "ST CLAIR DE LA TOUR",
    distanceAR_km: 92,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ST CYR AU MT D'OR",
    distanceAR_km: 110,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ST DENIS EN BUGEY",
    distanceAR_km: 45,
    trajetPlafonne_km: 35,
    plafondZHA_km: 45,
    tempsSimple_min: 26,
    valorise_jour_semaine_150: 0.65,
    valorise_nuit_semaine_200: 0.87,
    valorise_jour_dimanche_175: 0.76,
    valorise_nuit_dimanche_225: 0.97
  },
  {
    localite: "ST ELOI",
    distanceAR_km: 48,
    trajetPlafonne_km: 38,
    plafondZHA_km: 48,
    tempsSimple_min: 28,
    valorise_jour_semaine_150: 0.69,
    valorise_nuit_semaine_200: 0.92,
    valorise_jour_dimanche_175: 0.81,
    valorise_nuit_dimanche_225: 1.04
  },
  {
    localite: "ST ETIENNE DU BOIS",
    distanceAR_km: 130,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ST GEORGES D'ESPERANCHE",
    distanceAR_km: 76,
    trajetPlafonne_km: 53,
    plafondZHA_km: 76,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ST HILAIRE DE BRENS",
    distanceAR_km: 46,
    trajetPlafonne_km: 36,
    plafondZHA_km: 46,
    tempsSimple_min: 27,
    valorise_jour_semaine_150: 0.66,
    valorise_nuit_semaine_200: 0.88,
    valorise_jour_dimanche_175: 0.77,
    valorise_nuit_dimanche_225: 1.0
  },
  {
    localite: "ST JEAN DE NIOST",
    distanceAR_km: 24,
    trajetPlafonne_km: 14,
    plafondZHA_km: 24,
    tempsSimple_min: 14,
    valorise_jour_semaine_150: 0.35,
    valorise_nuit_semaine_200: 0.46,
    valorise_jour_dimanche_175: 0.4,
    valorise_nuit_dimanche_225: 0.52
  },
  {
    localite: "ST JEAN LE VIEUX (01)",
    distanceAR_km: 64,
    trajetPlafonne_km: 53,
    plafondZHA_km: 64,
    tempsSimple_min: 37,
    valorise_jour_semaine_150: 0.92,
    valorise_nuit_semaine_200: 1.23,
    valorise_jour_dimanche_175: 1.08,
    valorise_nuit_dimanche_225: 1.38
  },
  {
    localite: "ST LAURENT DE MURE",
    distanceAR_km: 67,
    trajetPlafonne_km: 53,
    plafondZHA_km: 67,
    tempsSimple_min: 39,
    valorise_jour_semaine_150: 0.97,
    valorise_nuit_semaine_200: 1.29,
    valorise_jour_dimanche_175: 1.13,
    valorise_nuit_dimanche_225: 1.45
  },
  {
    localite: "ST MARCEL BEL ACCUEIL",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "ST MAURICE DE BEYNOST",
    distanceAR_km: 58,
    trajetPlafonne_km: 48,
    plafondZHA_km: 58,
    tempsSimple_min: 33,
    valorise_jour_semaine_150: 0.84,
    valorise_nuit_semaine_200: 1.12,
    valorise_jour_dimanche_175: 0.98,
    valorise_nuit_dimanche_225: 1.25
  },
  {
    localite: "ST MAURICE DE GOURDANS",
    distanceAR_km: 18,
    trajetPlafonne_km: 8,
    plafondZHA_km: 18,
    tempsSimple_min: 10,
    valorise_jour_semaine_150: 0.26,
    valorise_nuit_semaine_200: 0.35,
    valorise_jour_dimanche_175: 0.3,
    valorise_nuit_dimanche_225: 0.39
  },
  {
    localite: "ST MAURICE DE REMENS",
    distanceAR_km: 42,
    trajetPlafonne_km: 32,
    plafondZHA_km: 42,
    tempsSimple_min: 24,
    valorise_jour_semaine_150: 0.61,
    valorise_nuit_semaine_200: 0.81,
    valorise_jour_dimanche_175: 0.71,
    valorise_nuit_dimanche_225: 0.91
  },
  {
    localite: "ST NIZIER LE DESERT",
    distanceAR_km: 74,
    trajetPlafonne_km: 53,
    plafondZHA_km: 74,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ST RAMBERT EN BUGEY",
    distanceAR_km: 64,
    trajetPlafonne_km: 53,
    plafondZHA_km: 64,
    tempsSimple_min: 37,
    valorise_jour_semaine_150: 0.92,
    valorise_nuit_semaine_200: 1.23,
    valorise_jour_dimanche_175: 1.08,
    valorise_nuit_dimanche_225: 1.38
  },
  {
    localite: "ST ROMAIN DE JALIONAS",
    distanceAR_km: 20,
    trajetPlafonne_km: 10,
    plafondZHA_km: 20,
    tempsSimple_min: 12,
    valorise_jour_semaine_150: 0.29,
    valorise_nuit_semaine_200: 0.38,
    valorise_jour_dimanche_175: 0.34,
    valorise_nuit_dimanche_225: 0.43
  },
  {
    localite: "ST SAVIN",
    distanceAR_km: 58,
    trajetPlafonne_km: 48,
    plafondZHA_km: 58,
    tempsSimple_min: 33,
    valorise_jour_semaine_150: 0.84,
    valorise_nuit_semaine_200: 1.12,
    valorise_jour_dimanche_175: 0.98,
    valorise_nuit_dimanche_225: 1.25
  },
  {
    localite: "ST SORLIN EN BUGEY",
    distanceAR_km: 30,
    trajetPlafonne_km: 20,
    plafondZHA_km: 30,
    tempsSimple_min: 17,
    valorise_jour_semaine_150: 0.43,
    valorise_nuit_semaine_200: 0.58,
    valorise_jour_dimanche_175: 0.5,
    valorise_nuit_dimanche_225: 0.65
  },
  {
    localite: "ST TRIVIER SUR MOIGNANS",
    distanceAR_km: 116,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ST VICTOR DE CESSIEU",
    distanceAR_km: 98,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ST VICTOR DE MORESTEL",
    distanceAR_km: 84,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "ST VULBAS",
    distanceAR_km: 6,
    trajetPlafonne_km: -4,
    plafondZHA_km: 6,
    tempsSimple_min: 3,
    valorise_jour_semaine_150: 0.09,
    valorise_nuit_semaine_200: 0.12,
    valorise_jour_dimanche_175: 0.1,
    valorise_nuit_dimanche_225: 0.13
  },
  {
    localite: "STE CROIX",
    distanceAR_km: 56,
    trajetPlafonne_km: 46,
    plafondZHA_km: 56,
    tempsSimple_min: 32,
    valorise_jour_semaine_150: 0.81,
    valorise_nuit_semaine_200: 1.08,
    valorise_jour_dimanche_175: 0.94,
    valorise_nuit_dimanche_225: 1.21
  },
  {
    localite: "STE FOY LES LYON",
    distanceAR_km: 114,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "STE JULIE",
    distanceAR_km: 24,
    trajetPlafonne_km: 14,
    plafondZHA_km: 24,
    tempsSimple_min: 14,
    valorise_jour_semaine_150: 0.35,
    valorise_nuit_semaine_200: 0.46,
    valorise_jour_dimanche_175: 0.4,
    valorise_nuit_dimanche_225: 0.52
  },
  {
    localite: "TENAY",
    distanceAR_km: 88,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "THIL",
    distanceAR_km: 68,
    trajetPlafonne_km: 53,
    plafondZHA_km: 68,
    tempsSimple_min: 39,
    valorise_jour_semaine_150: 0.98,
    valorise_nuit_semaine_200: 1.31,
    valorise_jour_dimanche_175: 1.14,
    valorise_nuit_dimanche_225: 1.47
  },
  {
    localite: "TIGNIEU JAMEYZIEU",
    distanceAR_km: 26,
    trajetPlafonne_km: 16,
    plafondZHA_km: 26,
    tempsSimple_min: 15,
    valorise_jour_semaine_150: 0.38,
    valorise_nuit_semaine_200: 0.5,
    valorise_jour_dimanche_175: 0.44,
    valorise_nuit_dimanche_225: 0.56
  },
  {
    localite: "TORCIEU",
    distanceAR_km: 60,
    trajetPlafonne_km: 50,
    plafondZHA_km: 60,
    tempsSimple_min: 35,
    valorise_jour_semaine_150: 0.87,
    valorise_nuit_semaine_200: 1.15,
    valorise_jour_dimanche_175: 1.01,
    valorise_nuit_dimanche_225: 1.3
  },
  {
    localite: "TORJONAS (38)",
    distanceAR_km: 46,
    trajetPlafonne_km: 36,
    plafondZHA_km: 46,
    tempsSimple_min: 27,
    valorise_jour_semaine_150: 0.66,
    valorise_nuit_semaine_200: 0.88,
    valorise_jour_dimanche_175: 0.77,
    valorise_nuit_dimanche_225: 1.0
  },
  {
    localite: "TOSSIAT",
    distanceAR_km: 92,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "TREPT",
    distanceAR_km: 44,
    trajetPlafonne_km: 34,
    plafondZHA_km: 44,
    tempsSimple_min: 25,
    valorise_jour_semaine_150: 0.63,
    valorise_nuit_semaine_200: 0.85,
    valorise_jour_dimanche_175: 0.74,
    valorise_nuit_dimanche_225: 0.95
  },
  {
    localite: "VARAMBON",
    distanceAR_km: 64,
    trajetPlafonne_km: 53,
    plafondZHA_km: 64,
    tempsSimple_min: 37,
    valorise_jour_semaine_150: 0.92,
    valorise_nuit_semaine_200: 1.23,
    valorise_jour_dimanche_175: 1.08,
    valorise_nuit_dimanche_225: 1.38
  },
  {
    localite: "VASSIEU (38)",
    distanceAR_km: 50,
    trajetPlafonne_km: 40,
    plafondZHA_km: 50,
    tempsSimple_min: 29,
    valorise_jour_semaine_150: 0.72,
    valorise_nuit_semaine_200: 0.96,
    valorise_jour_dimanche_175: 0.84,
    valorise_nuit_dimanche_225: 1.08
  },
  {
    localite: "VAUX EN BUGEY",
    distanceAR_km: 40,
    trajetPlafonne_km: 30,
    plafondZHA_km: 40,
    tempsSimple_min: 23,
    valorise_jour_semaine_150: 0.58,
    valorise_nuit_semaine_200: 0.77,
    valorise_jour_dimanche_175: 0.67,
    valorise_nuit_dimanche_225: 0.87
  },
  {
    localite: "VENERIEU",
    distanceAR_km: 53,
    trajetPlafonne_km: 43,
    plafondZHA_km: 53,
    tempsSimple_min: 31,
    valorise_jour_semaine_150: 0.76,
    valorise_nuit_semaine_200: 1.02,
    valorise_jour_dimanche_175: 0.89,
    valorise_nuit_dimanche_225: 1.15
  },
  {
    localite: "VERNAS",
    distanceAR_km: 26,
    trajetPlafonne_km: 16,
    plafondZHA_km: 26,
    tempsSimple_min: 15,
    valorise_jour_semaine_150: 0.38,
    valorise_nuit_semaine_200: 0.5,
    valorise_jour_dimanche_175: 0.44,
    valorise_nuit_dimanche_225: 0.56
  },
  {
    localite: "VERSAILLEUX",
    distanceAR_km: 62,
    trajetPlafonne_km: 52,
    plafondZHA_km: 62,
    tempsSimple_min: 36,
    valorise_jour_semaine_150: 0.89,
    valorise_nuit_semaine_200: 1.19,
    valorise_jour_dimanche_175: 1.04,
    valorise_nuit_dimanche_225: 1.34
  },
  {
    localite: "VERTRIEU",
    distanceAR_km: 30,
    trajetPlafonne_km: 20,
    plafondZHA_km: 30,
    tempsSimple_min: 17,
    valorise_jour_semaine_150: 0.43,
    valorise_nuit_semaine_200: 0.58,
    valorise_jour_dimanche_175: 0.5,
    valorise_nuit_dimanche_225: 0.65
  },
  {
    localite: "VEYRIN",
    distanceAR_km: 122,
    trajetPlafonne_km: 53,
    plafondZHA_km: 80,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "VEYSSILLIEU",
    distanceAR_km: 46,
    trajetPlafonne_km: 36,
    plafondZHA_km: 46,
    tempsSimple_min: 27,
    valorise_jour_semaine_150: 0.66,
    valorise_nuit_semaine_200: 0.88,
    valorise_jour_dimanche_175: 0.77,
    valorise_nuit_dimanche_225: 1.0
  },
  {
    localite: "VILLARS LES DOMBES",
    distanceAR_km: 76,
    trajetPlafonne_km: 53,
    plafondZHA_km: 76,
    tempsSimple_min: 40,
    valorise_jour_semaine_150: 1.0,
    valorise_nuit_semaine_200: 1.33,
    valorise_jour_dimanche_175: 1.17,
    valorise_nuit_dimanche_225: 1.5
  },
  {
    localite: "VILLEBOIS",
    distanceAR_km: 46,
    trajetPlafonne_km: 36,
    plafondZHA_km: 46,
    tempsSimple_min: 27,
    valorise_jour_semaine_150: 0.66,
    valorise_nuit_semaine_200: 0.88,
    valorise_jour_dimanche_175: 0.77,
    valorise_nuit_dimanche_225: 1.0
  },
  {
    localite: "VILLEFONTAINE",
    distanceAR_km: 66,
    trajetPlafonne_km: 53,
    plafondZHA_km: 66,
    tempsSimple_min: 38,
    valorise_jour_semaine_150: 0.95,
    valorise_nuit_semaine_200: 1.27,
    valorise_jour_dimanche_175: 1.11,
    valorise_nuit_dimanche_225: 1.43
  },
  {
    localite: "VILLEMOIRIEU",
    distanceAR_km: 28,
    trajetPlafonne_km: 18,
    plafondZHA_km: 28,
    tempsSimple_min: 16,
    valorise_jour_semaine_150: 0.4,
    valorise_nuit_semaine_200: 0.54,
    valorise_jour_dimanche_175: 0.47,
    valorise_nuit_dimanche_225: 0.61
  },
  {
    localite: "VILLETTE D'ANTHON",
    distanceAR_km: 33,
    trajetPlafonne_km: 23,
    plafondZHA_km: 33,
    tempsSimple_min: 19,
    valorise_jour_semaine_150: 0.48,
    valorise_nuit_semaine_200: 0.63,
    valorise_jour_dimanche_175: 0.56,
    valorise_nuit_dimanche_225: 0.71
  },
  {
    localite: "VILLETTE SUR AIN",
    distanceAR_km: 58,
    trajetPlafonne_km: 48,
    plafondZHA_km: 58,
    tempsSimple_min: 33,
    valorise_jour_semaine_150: 0.84,
    valorise_nuit_semaine_200: 1.12,
    valorise_jour_dimanche_175: 0.98,
    valorise_nuit_dimanche_225: 1.25
  },
  {
    localite: "VILLIEU",
    distanceAR_km: 40,
    trajetPlafonne_km: 30,
    plafondZHA_km: 40,
    tempsSimple_min: 23,
    valorise_jour_semaine_150: 0.58,
    valorise_nuit_semaine_200: 0.77,
    valorise_jour_dimanche_175: 0.67,
    valorise_nuit_dimanche_225: 0.87
  },
];

```


// path: src/data/initialData.ts
```ts
import { Vacation, Holiday, Arret, CalendarEvent, TRANCHE_COLORS } from '@/types/calendar';

// Initial astreinte start date from the Excel file
export const ASTREINTE_START_DATE = new Date(2026, 1, 5); // February 5, 2026 (Thursday)
export const ASTREINTE_CYCLE_WEEKS = 6;

// Vacances scolaires from the Excel file
export const initialVacations: Vacation[] = [
  {
    id: 'vac-1',
    name: 'Noël',
    startDate: new Date(2025, 11, 21),
    endDate: new Date(2026, 0, 4),
    color: '#a855f7',
  },
  {
    id: 'vac-2',
    name: 'Hiver',
    startDate: new Date(2026, 1, 7),
    endDate: new Date(2026, 1, 22),
    color: '#a855f7',
  },
  {
    id: 'vac-3',
    name: 'Printemps',
    startDate: new Date(2026, 3, 4),
    endDate: new Date(2026, 3, 19),
    color: '#a855f7',
  },
  {
    id: 'vac-4',
    name: 'Pont Ascension',
    startDate: new Date(2026, 4, 14),
    endDate: new Date(2026, 4, 17),
    color: '#a855f7',
  },
  {
    id: 'vac-5',
    name: 'Vacances été',
    startDate: new Date(2026, 6, 4),
    endDate: new Date(2026, 7, 30),
    color: '#a855f7',
  },
];

// Jours fériés from the Excel file
export const initialHolidays: Holiday[] = [
  { date: new Date(2026, 0, 1), name: "Jour de l'An" },
  { date: new Date(2026, 3, 6), name: "Lundi de Pâques" },
  { date: new Date(2026, 4, 1), name: "Fête du Travail" },
  { date: new Date(2026, 4, 8), name: "Victoire 1945" },
  { date: new Date(2026, 4, 14), name: "Ascension" },
  { date: new Date(2026, 4, 25), name: "Lundi de Pentecôte" },
  { date: new Date(2026, 6, 14), name: "Fête nationale" },
  { date: new Date(2026, 7, 15), name: "Assomption" },
  { date: new Date(2026, 10, 1), name: "Toussaint" },
  { date: new Date(2026, 10, 11), name: "Armistice 1918" },
  { date: new Date(2026, 11, 25), name: "Jour de Noël" },
  { date: new Date(2027, 0, 1), name: "Jour de l'An" },
  { date: new Date(2027, 2, 29), name: "Lundi de Pâques" },
  { date: new Date(2027, 4, 1), name: "Fête du Travail" },
  { date: new Date(2027, 4, 6), name: "Ascension" },
  { date: new Date(2027, 4, 8), name: "Victoire 1945" },
  { date: new Date(2027, 4, 17), name: "Lundi de Pentecôte" },
  { date: new Date(2027, 6, 14), name: "Fête nationale" },
  { date: new Date(2027, 7, 15), name: "Assomption" },
  { date: new Date(2027, 10, 1), name: "Toussaint" },
  { date: new Date(2027, 10, 11), name: "Armistice 1918" },
  { date: new Date(2027, 11, 25), name: "Jour de Noël" },
];

// Arrêts de tranches from the Excel file
export const initialArrets: Arret[] = [
  // AT Tr2 avec ses modules de préparation
  {
    id: 'prepa-m0-2p37',
    type: 'prepa',
    name: 'M0 2P37',
    startDate: new Date(2025, 10, 1),
    endDate: new Date(2025, 11, 15),
    tranche: 'Tr2',
    module: 'M0',
    parentArretId: 'arret-2p37',
  },
  {
    id: 'prepa-m1-2p37',
    type: 'prepa',
    name: 'M1 2P37',
    startDate: new Date(2025, 11, 16),
    endDate: new Date(2026, 0, 31),
    tranche: 'Tr2',
    module: 'M1',
    parentArretId: 'arret-2p37',
  },
  {
    id: 'prepa-m2a-2p37',
    type: 'prepa',
    name: 'M2A 2P37',
    startDate: new Date(2026, 1, 1),
    endDate: new Date(2026, 2, 15),
    tranche: 'Tr2',
    module: 'M2A',
    parentArretId: 'arret-2p37',
  },
  {
    id: 'prepa-m3-2p37',
    type: 'prepa',
    name: 'M3 2P37',
    startDate: new Date(2026, 2, 16),
    endDate: new Date(2026, 3, 30),
    tranche: 'Tr2',
    module: 'M3',
    parentArretId: 'arret-2p37',
  },
  {
    id: 'arret-2p37',
    type: 'arret',
    name: '2P37',
    startDate: new Date(2026, 4, 2),
    endDate: new Date(2026, 6, 14),
    tranche: 'Tr2',
  },
  // AT Tr3 avec préparations
  {
    id: 'prepa-m0-3p35',
    type: 'prepa',
    name: 'M0 3P35',
    startDate: new Date(2025, 11, 1),
    endDate: new Date(2026, 2, 31),
    tranche: 'Tr3',
    module: 'M0',
    parentArretId: 'arret-3p35',
  },
  {
    id: 'prepa-m1-3p35',
    type: 'prepa',
    name: 'M1 3P35',
    startDate: new Date(2026, 3, 1),
    endDate: new Date(2026, 6, 31),
    tranche: 'Tr3',
    module: 'M1',
    parentArretId: 'arret-3p35',
  },
  {
    id: 'prepa-m2b-3p35',
    type: 'prepa',
    name: 'M2B 3P35',
    startDate: new Date(2026, 7, 1),
    endDate: new Date(2026, 9, 31),
    tranche: 'Tr3',
    module: 'M2B',
    parentArretId: 'arret-3p35',
  },
  {
    id: 'arret-3p35',
    type: 'arret',
    name: '3P35',
    startDate: new Date(2026, 10, 7),
    endDate: new Date(2027, 0, 28),
    tranche: 'Tr3',
  },
  // AT Tr5
  {
    id: 'arret-5r34',
    type: 'arret',
    name: '5R34',
    startDate: new Date(2026, 1, 28),
    endDate: new Date(2026, 3, 11),
    tranche: 'Tr5',
  },
  // AT Tr4
  {
    id: 'prepa-m4-4p37',
    type: 'prepa',
    name: 'M4 4P37',
    startDate: new Date(2026, 11, 1),
    endDate: new Date(2027, 1, 19),
    tranche: 'Tr4',
    module: 'M4',
    parentArretId: 'arret-4p37',
  },
  {
    id: 'arret-4p37',
    type: 'arret',
    name: '4P37',
    startDate: new Date(2027, 1, 20),
    endDate: new Date(2027, 4, 4),
    tranche: 'Tr4',
  },
];

// Events from the Excel file
export const initialEvents: CalendarEvent[] = [
  // RE events (day state - grays out the cell)
  {
    id: 'evt-re-1',
    type: 're',
    name: 'RE',
    startDate: new Date(2025, 11, 20),
    endDate: new Date(2026, 0, 4),
    color: '#d1d5db', // Uses settings.reColor in practice
  },
  // CP events (day state - darker gray)
  {
    id: 'evt-cp-1',
    type: 'cp',
    name: 'CP',
    startDate: new Date(2026, 1, 9),
    endDate: new Date(2026, 1, 13),
    color: '#9ca3af', // Uses settings.cpColor in practice
  },
  {
    id: 'evt-2',
    type: 'event',
    name: 'AKSC 53',
    startDate: new Date(2026, 0, 5),
    endDate: new Date(2026, 0, 29),
    color: '#8b5cf6',
  },
  {
    id: 'evt-3',
    type: 'event',
    name: 'AKSC 53',
    startDate: new Date(2026, 1, 3),
    endDate: new Date(2026, 1, 5),
    color: '#8b5cf6',
  },
  {
    id: 'evt-4',
    type: 'event',
    name: 'RPAD',
    startDate: new Date(2026, 2, 9),
    endDate: new Date(2026, 2, 13),
    color: '#06b6d4',
  },
];

// Cancelled astreintes
export const initialCancelledAstreintes: string[] = [];

// Ponctual astreintes
export const initialPonctualAstreintes: Array<{ startDate: Date; endDate: Date }> = [
  {
    startDate: new Date(2026, 3, 10),
    endDate: new Date(2026, 3, 17),
  },
];

```


// path: src/hooks/use-mobile.tsx
```ts
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

```


// path: src/hooks/use-toast.ts
```ts
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t,
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };

```


// path: src/hooks/useAdvancedSettings.ts
```ts
/**
 * Hook for advanced work-regulation settings.
 * Persists to localStorage (will migrate to IndexedDB later).
 */

import { useState, useCallback, useEffect } from 'react';
import { AdvancedSettings, defaultAdvancedSettings } from '@/types/advancedSettings';

const STORAGE_KEY = 'wplanner-advanced-settings';

function loadSettings(): AdvancedSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...defaultAdvancedSettings, ...parsed };
    }
  } catch {
    // ignore
  }
  return { ...defaultAdvancedSettings };
}

export function useAdvancedSettings() {
  const [settings, setSettings] = useState<AdvancedSettings>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateAdvancedSettings = useCallback((patch: Partial<AdvancedSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetAdvancedSettings = useCallback(() => {
    setSettings({ ...defaultAdvancedSettings });
  }, []);

  return {
    advancedSettings: settings,
    updateAdvancedSettings,
    resetAdvancedSettings,
  };
}

```


// path: src/hooks/useCalendar.ts
```ts
import { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  CalendarEvent, 
  Vacation, 
  Holiday, 
  Arret, 
  CalendarSettings,
  defaultSettings,
  Astreinte,
  CancelledAstreinteDate
} from '@/types/calendar';
import {
  initialVacations,
  initialHolidays,
  initialArrets,
  initialEvents,
  ASTREINTE_START_DATE,
} from '@/data/initialData';
import { 
  addDays, 
  addWeeks, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  differenceInWeeks,
  format,
} from 'date-fns';

// Helper to parse dates from localStorage
const parseStoredData = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item, (k, v) => {
      if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(v)) {
        return new Date(v);
      }
      return v;
    });
  } catch {
    return fallback;
  }
};

export function useCalendar() {
  // Initialize from localStorage or fallback to initial data
  const [currentDate, setCurrentDate] = useState(() => {
    const stored = localStorage.getItem('calendar-current-date');
    if (stored) {
      const date = new Date(stored);
      if (!isNaN(date.getTime())) return date;
    }
    return new Date(2026, 0, 1);
  });
  
  const [settings, setSettings] = useState<CalendarSettings>(() => {
    const stored = parseStoredData<Partial<CalendarSettings>>('calendar-settings', {});
    // Merge with defaults so new keys are never missing
    return { ...defaultSettings, ...stored };
  });
  
  const [events, setEvents] = useState<CalendarEvent[]>(() => 
    parseStoredData('calendar-events', initialEvents)
  );
  
  const [vacations, setVacations] = useState<Vacation[]>(() => 
    parseStoredData('calendar-vacations', initialVacations)
  );
  
  const [holidays, setHolidays] = useState<Holiday[]>(() => 
    parseStoredData('calendar-holidays', initialHolidays)
  );
  
  const [arrets, setArrets] = useState<Arret[]>(() => 
    parseStoredData('calendar-arrets', initialArrets)
  );
  
  const [ponctualAstreintes, setPonctualAstreintes] = useState<Astreinte[]>(() => 
    parseStoredData('calendar-ponctual-astreintes', [])
  );
  
  const [cancelledAstreinteDates, setCancelledAstreinteDates] = useState<CancelledAstreinteDate[]>(() => 
    parseStoredData('calendar-cancelled-dates', [])
  );

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('calendar-current-date', currentDate.toISOString());
  }, [currentDate]);
  
  useEffect(() => {
    localStorage.setItem('calendar-settings', JSON.stringify(settings));
  }, [settings]);
  
  useEffect(() => {
    localStorage.setItem('calendar-events', JSON.stringify(events));
  }, [events]);
  
  useEffect(() => {
    localStorage.setItem('calendar-vacations', JSON.stringify(vacations));
  }, [vacations]);
  
  useEffect(() => {
    localStorage.setItem('calendar-holidays', JSON.stringify(holidays));
  }, [holidays]);
  
  useEffect(() => {
    localStorage.setItem('calendar-arrets', JSON.stringify(arrets));
  }, [arrets]);
  
  useEffect(() => {
    localStorage.setItem('calendar-ponctual-astreintes', JSON.stringify(ponctualAstreintes));
  }, [ponctualAstreintes]);
  
  useEffect(() => {
    localStorage.setItem('calendar-cancelled-dates', JSON.stringify(cancelledAstreinteDates));
  }, [cancelledAstreinteDates]);

  /* 🔒 Sécurisation centrale des dates */
  const safeSetDate = useCallback((date: Date) => {
    if (!(date instanceof Date)) return;
    if (isNaN(date.getTime())) return;
    setCurrentDate(date);
  }, []);

  /* ================= ASTREINTES ================= */

  // Check if a date is a holiday
  const isHolidayDate = useCallback((date: Date): boolean => {
    return holidays.some(h => isSameDay(date, h.date));
  }, [holidays]);

  const generateAstreintes = useCallback((startDate: Date, endDate: Date): Astreinte[] => {
    const astreintes: Astreinte[] = [];
    const astreinteStartDate = new Date(settings.astreinteStartDate || '2026-02-05T00:00:00.000Z');
    if (isNaN(astreinteStartDate.getTime())) return astreintes;
    const cycleWeeks = settings.astreinteCycleWeeks || 6;
    
    let currentStart = astreinteStartDate;

    const weeksDiff = differenceInWeeks(startDate, astreinteStartDate);
    const cyclesBefore = Math.floor(weeksDiff / cycleWeeks);
    if (cyclesBefore > 0) {
      currentStart = addWeeks(astreinteStartDate, cyclesBefore * cycleWeeks);
    }

    currentStart = addWeeks(currentStart, -cycleWeeks);

    while (currentStart <= endDate) {
      let astStart = new Date(currentStart);
      let astEnd = addDays(currentStart, 7);

      // Holiday boundary rule:
      // If start Thursday is a holiday, start one day earlier (Wednesday)
      if (isHolidayDate(astStart)) {
        astStart = addDays(astStart, -1);
      }
      // If end Thursday is a holiday, end one day earlier (Wednesday)
      if (isHolidayDate(astEnd)) {
        astEnd = addDays(astEnd, -1);
      }

      astreintes.push({
        id: `astreinte-${format(currentStart, 'yyyy-MM-dd')}`,
        startDate: astStart,
        endDate: astEnd,
        isCancelled: false,
        isPonctuelle: false,
      });
      currentStart = addWeeks(currentStart, cycleWeeks);
    }

    ponctualAstreintes.forEach(pa => {
      if (pa.startDate <= endDate && pa.endDate >= startDate) {
        astreintes.push(pa);
      }
    });

    return astreintes;
  }, [ponctualAstreintes, settings.astreinteStartDate, isHolidayDate]);

  /* ================= NAVIGATION ================= */

  const goToNextMonth = useCallback(() => {
    safeSetDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  }, [currentDate, safeSetDate]);

  const goToPrevMonth = useCallback(() => {
    safeSetDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  }, [currentDate, safeSetDate]);

  const goToToday = useCallback(() => {
    safeSetDate(new Date());
  }, [safeSetDate]);

  const goToDate = useCallback((date: Date) => {
    safeSetDate(date);
  }, [safeSetDate]);

  const goToYear = useCallback((year: number) => {
    if (isNaN(year)) return;
    const month = Math.min(Math.max(currentDate.getMonth(), 0), 11);
    safeSetDate(new Date(year, month, 1));
  }, [currentDate, safeSetDate]);

  /* ================= COMPUTED ================= */

  const monthDays = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });
  }, [currentDate]);

  const currentAstreintes = useMemo(() => {
    return generateAstreintes(startOfMonth(currentDate), endOfMonth(currentDate));
  }, [currentDate, generateAstreintes]);

  const getAstreintesForYear = useCallback((year: number) => {
    return generateAstreintes(new Date(year, 0, 1), new Date(year, 11, 31));
  }, [generateAstreintes]);

  /* ================= EVENTS ================= */

  const addEvent = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
    };
    setEvents(prev => [...prev, newEvent]);
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, []);

  const removeEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  }, []);

  const getEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return events.filter(event => 
      isWithinInterval(date, { start: event.startDate, end: event.endDate }) ||
      isSameDay(date, event.startDate) ||
      isSameDay(date, event.endDate)
    );
  }, [events]);

  const getNonRECPEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return getEventsForDate(date).filter(e => e.type !== 're' && e.type !== 'cp');
  }, [getEventsForDate]);

  // Alias for backwards compatibility
  const getNonREEventsForDate = getNonRECPEventsForDate;

  const isREDay = useCallback((date: Date): CalendarEvent | null => {
    const reEvents = events.filter(e => 
      e.type === 're' && (
        isWithinInterval(date, { start: e.startDate, end: e.endDate }) ||
        isSameDay(date, e.startDate) ||
        isSameDay(date, e.endDate)
      )
    );
    return reEvents.length > 0 ? reEvents[0] : null;
  }, [events]);

  const isCPDay = useCallback((date: Date): CalendarEvent | null => {
    const cpEvents = events.filter(e => 
      e.type === 'cp' && (
        isWithinInterval(date, { start: e.startDate, end: e.endDate }) ||
        isSameDay(date, e.startDate) ||
        isSameDay(date, e.endDate)
      )
    );
    return cpEvents.length > 0 ? cpEvents[0] : null;
  }, [events]);

  /* ================= ASTREINTE MANAGEMENT ================= */

  const isAstreinteDay = useCallback((date: Date, astreintes: Astreinte[]): Astreinte | null => {
    for (const astreinte of astreintes) {
      if (
        isWithinInterval(date, { start: astreinte.startDate, end: astreinte.endDate }) ||
        isSameDay(date, astreinte.startDate) ||
        isSameDay(date, astreinte.endDate)
      ) {
        return astreinte;
      }
    }
    return null;
  }, []);

  const isDateCancelled = useCallback((date: Date): CancelledAstreinteDate | null => {
    for (const cancelled of cancelledAstreinteDates) {
      if (isSameDay(date, cancelled.date)) {
        return cancelled;
      }
    }
    return null;
  }, [cancelledAstreinteDates]);

  const hasConflict = useCallback((date: Date, astreintes: Astreinte[]): boolean => {
    // Check if the date is cancelled - if so, no conflict
    const isCancelled = cancelledAstreinteDates.some(c => isSameDay(c.date, date));
    if (isCancelled) return false;
    
    const activeAstreinte = astreintes.find(a => 
      !a.isCancelled && (
        isWithinInterval(date, { start: a.startDate, end: a.endDate }) ||
        isSameDay(date, a.startDate) ||
        isSameDay(date, a.endDate)
      )
    );
    if (!activeAstreinte) return false;

    // Multiple astreintes = conflict
    const multipleAstreintes = astreintes.filter(a => 
      !a.isCancelled && (
        isWithinInterval(date, { start: a.startDate, end: a.endDate }) ||
        isSameDay(date, a.startDate) ||
        isSameDay(date, a.endDate)
      )
    ).length > 1;
    if (multipleAstreintes) return true;

    // Any event (including CP/RE) overlapping an active astreinte = conflict
    const dayEvents = events.filter(e =>
      isWithinInterval(date, { start: e.startDate, end: e.endDate }) ||
      isSameDay(date, e.startDate) ||
      isSameDay(date, e.endDate)
    );
    return dayEvents.length > 0;
  }, [cancelledAstreinteDates, events]);

  const getConflictDetails = useCallback((date: Date, astreintes: Astreinte[]): string[] => {
    // Check if the date is cancelled - if so, no conflict details
    const isCancelled = cancelledAstreinteDates.some(c => isSameDay(c.date, date));
    if (isCancelled) return [];
    
    const details: string[] = [];
    
    const activeAstreintes = astreintes.filter(a => 
      !a.isCancelled && (
        isWithinInterval(date, { start: a.startDate, end: a.endDate }) ||
        isSameDay(date, a.startDate) ||
        isSameDay(date, a.endDate)
      )
    );
    
    if (activeAstreintes.length > 1) {
      activeAstreintes.forEach(a => details.push(a.name || `Astreinte ${format(a.startDate, 'dd/MM')}`));
    }

    if (activeAstreintes.length > 0) {
      const dayEvents = events.filter(e =>
        isWithinInterval(date, { start: e.startDate, end: e.endDate }) ||
        isSameDay(date, e.startDate) ||
        isSameDay(date, e.endDate)
      );
      dayEvents.forEach(e => {
        const label = e.type === 'cp' ? 'CP' : e.type === 're' ? 'RE' : e.name;
        details.push(`${label} / Astreinte`);
      });
    }

    return details;
  }, [cancelledAstreinteDates, events]);

  const cancelAstreinteDates = useCallback((startDate: Date, endDate: Date, name: string, startTime?: string, endTime?: string) => {
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const newCancellations: CancelledAstreinteDate[] = days.map((day, index) => ({
      id: `cancelled-${Date.now()}-${index}`,
      date: day,
      name,
      astreinteId: '',
      startTime: startTime || '00:00',
      endTime: endTime || '23:59',
    }));
    setCancelledAstreinteDates(prev => [...prev, ...newCancellations]);
  }, []);

  const restoreCancelledDate = useCallback((id: string) => {
    setCancelledAstreinteDates(prev => prev.filter(c => c.id !== id));
  }, []);

  const addPonctualAstreinte = useCallback((startDate: Date, endDate: Date, name?: string) => {
    const newAstreinte: Astreinte = {
      id: `ponctual-${Date.now()}`,
      name,
      startDate,
      endDate,
      isCancelled: false,
      isPonctuelle: true,
    };
    setPonctualAstreintes(prev => [...prev, newAstreinte]);
  }, []);

  const updatePonctualAstreinte = useCallback((id: string, updates: Partial<Astreinte>) => {
    setPonctualAstreintes(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const removePonctualAstreinte = useCallback((id: string) => {
    setPonctualAstreintes(prev => prev.filter(a => a.id !== id));
  }, []);

  /* ================= HOLIDAYS ================= */

  const isHoliday = useCallback((date: Date): Holiday | null => {
    for (const holiday of holidays) {
      if (isSameDay(date, holiday.date)) {
        return holiday;
      }
    }
    return null;
  }, [holidays]);

  const addHoliday = useCallback((holiday: Omit<Holiday, 'id'>) => {
    setHolidays(prev => [...prev, holiday as Holiday]);
  }, []);

  const updateHoliday = useCallback((date: Date, updates: Partial<Holiday>) => {
    setHolidays(prev => prev.map(h => 
      isSameDay(h.date, date) ? { ...h, ...updates } : h
    ));
  }, []);

  const deleteHoliday = useCallback((date: Date) => {
    setHolidays(prev => prev.filter(h => !isSameDay(h.date, date)));
  }, []);

  /* ================= VACATIONS ================= */

  const isVacationDay = useCallback((date: Date): Vacation | null => {
    for (const vacation of vacations) {
      if (
        isWithinInterval(date, { start: vacation.startDate, end: vacation.endDate }) ||
        isSameDay(date, vacation.startDate) ||
        isSameDay(date, vacation.endDate)
      ) {
        return vacation;
      }
    }
    return null;
  }, [vacations]);

  const addVacation = useCallback((vacation: Omit<Vacation, 'id'>) => {
    const newVacation: Vacation = {
      ...vacation,
      id: `vacation-${Date.now()}`,
    };
    setVacations(prev => [...prev, newVacation]);
  }, []);

  const updateVacation = useCallback((id: string, updates: Partial<Vacation>) => {
    setVacations(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  }, []);

  const deleteVacation = useCallback((id: string) => {
    setVacations(prev => prev.filter(v => v.id !== id));
  }, []);

  /* ================= ARRETS ================= */

  const isArretDay = useCallback((date: Date): Arret | null => {
    for (const arret of arrets) {
      if (
        isWithinInterval(date, { start: arret.startDate, end: arret.endDate }) ||
        isSameDay(date, arret.startDate) ||
        isSameDay(date, arret.endDate)
      ) {
        return arret;
      }
    }
    return null;
  }, [arrets]);

  const addArret = useCallback((arret: Omit<Arret, 'id'>) => {
    const newArret: Arret = {
      ...arret,
      id: `arret-${Date.now()}`,
    };
    setArrets(prev => [...prev, newArret]);
  }, []);

  const updateArret = useCallback((id: string, updates: Partial<Arret>) => {
    setArrets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const deleteArret = useCallback((id: string) => {
    setArrets(prev => prev.filter(a => a.id !== id));
  }, []);

  const getArretsForPeriod = useCallback((start: Date, end: Date): Arret[] => {
    return arrets.filter(a => 
      (a.startDate <= end && a.endDate >= start)
    );
  }, [arrets]);

  /* ================= IMPORT ================= */

  const importEvents = useCallback((newEvents: CalendarEvent[]) => {
    setEvents(prev => [...prev, ...newEvents]);
  }, []);

  const importVacations = useCallback((newVacations: Vacation[]) => {
    setVacations(prev => [...prev, ...newVacations]);
  }, []);

  const importArrets = useCallback((newArrets: Arret[]) => {
    setArrets(prev => [...prev, ...newArrets]);
  }, []);

  const importHolidays = useCallback((newHolidays: Holiday[]) => {
    setHolidays(prev => [...prev, ...newHolidays]);
  }, []);

  /* ================= RETURN ================= */

  return {
    currentDate,
    settings,
    events,
    vacations,
    holidays,
    arrets,
    ponctualAstreintes,
    cancelledAstreinteDates,
    monthDays,
    currentAstreintes,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate,
    goToYear,
    updateSettings: (s: Partial<CalendarSettings>) => setSettings(p => ({ ...p, ...s })),
    generateAstreintes,
    getAstreintesForYear,
    // Events
    addEvent,
    updateEvent,
    removeEvent,
    getEventsForDate,
    getNonREEventsForDate,
    getNonRECPEventsForDate,
    isREDay,
    isCPDay,
    // Astreintes
    isAstreinteDay,
    isDateCancelled,
    hasConflict,
    getConflictDetails,
    cancelAstreinteDates,
    restoreCancelledDate,
    addPonctualAstreinte,
    updatePonctualAstreinte,
    removePonctualAstreinte,
    // Holidays
    isHoliday,
    addHoliday,
    updateHoliday,
    deleteHoliday,
    // Vacations
    isVacationDay,
    addVacation,
    updateVacation,
    deleteVacation,
    // Arrets
    isArretDay,
    addArret,
    updateArret,
    deleteArret,
    getArretsForPeriod,
    // Import
    importEvents,
    importVacations,
    importArrets,
    importHolidays,
  };
}

```


// path: src/hooks/useLocalStorage.ts
```ts
 import { useState, useEffect, useCallback } from 'react';
 
 export function useLocalStorage<T>(key: string, initialValue: T) {
   // State to store our value
   // Pass initial state function to useState so logic is only executed once
   const [storedValue, setStoredValue] = useState<T>(() => {
     if (typeof window === 'undefined') {
       return initialValue;
     }
     try {
       const item = window.localStorage.getItem(key);
       if (item) {
         const parsed = JSON.parse(item, (k, v) => {
           // Convert date strings back to Date objects
           if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(v)) {
             return new Date(v);
           }
           return v;
         });
         return parsed;
       }
       return initialValue;
     } catch (error) {
       console.warn(`Error reading localStorage key "${key}":`, error);
       return initialValue;
     }
   });
 
   // Return a wrapped version of useState's setter function that persists to localStorage
   const setValue = useCallback((value: T | ((val: T) => T)) => {
     try {
       // Allow value to be a function so we have same API as useState
       const valueToStore = value instanceof Function ? value(storedValue) : value;
       setStoredValue(valueToStore);
       if (typeof window !== 'undefined') {
         window.localStorage.setItem(key, JSON.stringify(valueToStore));
       }
     } catch (error) {
       console.warn(`Error setting localStorage key "${key}":`, error);
     }
   }, [key, storedValue]);
 
   return [storedValue, setValue] as const;
 }
 
 // Helper to clear all calendar data from localStorage
 export function clearCalendarStorage() {
   const keys = [
     'calendar-events',
     'calendar-vacations', 
     'calendar-holidays',
     'calendar-arrets',
     'calendar-ponctual-astreintes',
     'calendar-cancelled-dates',
     'calendar-settings',
   ];
   keys.forEach(key => localStorage.removeItem(key));
 }
```


// path: src/hooks/useOrientation.ts
```ts
import { useState, useEffect } from 'react';

export function useOrientation() {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isLand = window.innerWidth > window.innerHeight;
      const isMobile = window.innerWidth < 1024;
      // For iPhone 15 Pro: viewport is 393x852 portrait, ~852x393 landscape
      // We consider mobile landscape when height is less than 500
      
      setIsLandscape(isLand);
      setIsMobileLandscape(isLand && isMobile && window.innerHeight < 600);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return { isLandscape, isMobileLandscape };
}

```


// path: src/hooks/usePointage.ts
```ts
/**
 * Hook for Module 2 – Conformité & Pointage (CNPE Bugey)
 * Manages time entries + pointage settings with localStorage persistence.
 * Habillage fixe = 1h/jour travaillé (auto, not per-entry).
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { TimeEntry, PointageSettings, defaultPointageSettings } from '@/types/pointage';
import { computeWeekSummary, getWeekSunday, computeAutoComments } from '@/lib/complianceEngine';
import { addDays, format } from 'date-fns';

const ENTRIES_KEY = 'wplanner-pointage-entries';
const SETTINGS_KEY = 'wplanner-pointage-settings';

function loadEntries(): TimeEntry[] {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [];
}

function saveEntries(entries: TimeEntry[]) {
  localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
}

function loadPointageSettings(): PointageSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...defaultPointageSettings, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...defaultPointageSettings };
}

function savePointageSettings(s: PointageSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

let idCounter = Date.now();
function newId(): string {
  return (idCounter++).toString(36);
}

export function usePointage() {
  const [entries, setEntries] = useState<TimeEntry[]>(loadEntries);
  const [pointageSettings, setPointageSettings] = useState<PointageSettings>(loadPointageSettings);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getWeekSunday(format(new Date(), 'yyyy-MM-dd')));

  useEffect(() => { saveEntries(entries); }, [entries]);
  useEffect(() => { savePointageSettings(pointageSettings); }, [pointageSettings]);

  const addEntry = useCallback((entry: Omit<TimeEntry, 'id' | 'autoComments'>) => {
    const autoComments = computeAutoComments(entry as TimeEntry, pointageSettings.primeRepasValeur, pointageSettings.communeDepart);
    setEntries(prev => [...prev, { ...entry, id: newId(), autoComments }]);
  }, [pointageSettings.primeRepasValeur, pointageSettings.communeDepart]);

  const updateEntry = useCallback((id: string, patch: Partial<TimeEntry>) => {
    setEntries(prev => prev.map(e => {
      if (e.id !== id) return e;
      const updated = { ...e, ...patch };
      updated.autoComments = computeAutoComments(updated, pointageSettings.primeRepasValeur, pointageSettings.communeDepart);
      return updated;
    }));
  }, [pointageSettings.primeRepasValeur, pointageSettings.communeDepart]);

  const deleteEntry = useCallback((id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  }, []);

  const deleteWeekEntries = useCallback((weekDates: string[]) => {
    setEntries(prev => prev.filter(e => !weekDates.includes(e.date)));
  }, []);

  const getEntriesForDate = useCallback((date: string) => {
    return entries.filter(e => e.date === date);
  }, [entries]);

  const weekSummary = useMemo(() => {
    return computeWeekSummary(entries, currentWeekStart, pointageSettings);
  }, [entries, currentWeekStart, pointageSettings]);

  const goToNextWeek = useCallback(() => setCurrentWeekStart(prev => addDays(prev, 7)), []);
  const goToPrevWeek = useCallback(() => setCurrentWeekStart(prev => addDays(prev, -7)), []);
  const goToCurrentWeek = useCallback(() => setCurrentWeekStart(getWeekSunday(format(new Date(), 'yyyy-MM-dd'))), []);

  const updatePointageSettings = useCallback((patch: Partial<PointageSettings>) => {
    setPointageSettings(prev => ({ ...prev, ...patch }));
  }, []);

  return {
    entries,
    currentWeekStart,
    weekSummary,
    pointageSettings,
    addEntry,
    updateEntry,
    deleteEntry,
    deleteWeekEntries,
    getEntriesForDate,
    goToNextWeek,
    goToPrevWeek,
    goToCurrentWeek,
    updatePointageSettings,
  };
}

```


// path: src/hooks/useSwipeNavigation.ts
```ts
import { useRef, useCallback } from 'react';

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

export function useSwipeNavigation(
  onLeft: () => void, 
  onRight: () => void,
  threshold: number = 60
): SwipeHandlers {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) return;
    
    // Determine swipe direction on first move
    if (isHorizontalSwipe.current === null) {
      const dx = Math.abs(e.touches[0].clientX - startX.current);
      const dy = Math.abs(e.touches[0].clientY - startY.current);
      
      // If horizontal movement is greater, it's a horizontal swipe
      if (dx > 10 || dy > 10) {
        isHorizontalSwipe.current = dx > dy;
      }
    }
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (startX.current === null) return;
    
    // Only trigger swipe if it was determined to be horizontal
    if (isHorizontalSwipe.current === true) {
      const dx = e.changedTouches[0].clientX - startX.current;
      if (Math.abs(dx) > threshold) {
        if (dx < 0) {
          onLeft(); // Swipe left = next
        } else {
          onRight(); // Swipe right = previous
        }
      }
    }
    
    startX.current = null;
    startY.current = null;
    isHorizontalSwipe.current = null;
  }, [onLeft, onRight, threshold]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

```


// path: src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Mini pattern classes for year view */
.pattern-stripes-mini {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.15) 2px,
    rgba(255, 255, 255, 0.15) 4px
  );
}

.pattern-dots-mini {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px);
  background-size: 4px 4px;
}

.pattern-crosshatch-mini {
  background-image:
    repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.15) 2px, rgba(255, 255, 255, 0.15) 4px),
    repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.15) 2px, rgba(255, 255, 255, 0.15) 4px);
}

.pattern-waves-mini {
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.1) 2px,
    rgba(255, 255, 255, 0.1) 4px
  );
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@layer base {
  :root {
    --background: 220 20% 97%;
    --foreground: 220 25% 10%;
    --card: 0 0% 100%;
    --card-foreground: 220 25% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 220 25% 10%;
    --primary: 220 70% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 15% 92%;
    --secondary-foreground: 220 25% 25%;
    --muted: 220 15% 94%;
    --muted-foreground: 220 10% 45%;
    --accent: 220 70% 95%;
    --accent-foreground: 220 70% 40%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --border: 220 15% 88%;
    --input: 220 15% 88%;
    --ring: 220 70% 50%;
    --radius: 0.625rem;

    /* Calendar specific */
    --calendar-header: 220 25% 15%;
    --calendar-weekend: 220 15% 94%;
    --calendar-today: 220 70% 95%;
    --calendar-grid: 220 15% 90%;

    /* Event colors */
    --astreinte: 35 92% 50%;
    --astreinte-cancelled: 220 10% 70%;
    --event-default: 200 80% 50%;
    --vacation: 280 60% 65%;
    --holiday: 0 72% 55%;
    --arret: 150 60% 45%;
    --arret-prepa: 150 40% 60%;
    --astreinte-ponctuelle: 25 95% 55%;
  }

  .dark {
    --background: 220 25% 8%;
    --foreground: 220 10% 95%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }
}

@layer utilities {
  /* Pattern utilities */
  .pattern-stripes {
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(0, 0, 0, 0.15) 4px,
      rgba(0, 0, 0, 0.15) 8px
    );
  }

  .pattern-stripes-light {
    background-image: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(255, 255, 255, 0.3) 4px,
      rgba(255, 255, 255, 0.3) 8px
    );
  }

  .pattern-dots {
    background-image: radial-gradient(
      circle,
      rgba(0, 0, 0, 0.2) 1px,
      transparent 1px
    );
    background-size: 6px 6px;
  }

  .pattern-crosshatch {
    background-image:
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.1) 3px,
        rgba(0, 0, 0, 0.1) 6px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.1) 3px,
        rgba(0, 0, 0, 0.1) 6px
      );
  }

  .pattern-waves {
    background-image: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 4px,
      rgba(0, 0, 0, 0.12) 4px,
      rgba(0, 0, 0, 0.12) 8px
    );
  }

  .pattern-diagonal {
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.15) 3px,
      rgba(0, 0, 0, 0.15) 6px
    );
  }

  .pattern-grid {
    background-image:
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 8px 8px;
  }

  .pattern-zigzag {
    background-image:
      repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(0, 0, 0, 0.12) 3px, rgba(0, 0, 0, 0.12) 6px),
      repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(0, 0, 0, 0.12) 3px, rgba(0, 0, 0, 0.12) 6px);
    background-position: 0 0, 6px 0;
    background-size: 12px 6px;
  }

  /* Conflict warning */
  .conflict-indicator::after {
    content: '⚠';
    position: absolute;
    top: -4px;
    right: -4px;
    font-size: 10px;
    color: red;
    font-weight: bold;
  }
}

/* ========================================================= */
/* ===================== PRINT OVERRIDES =================== */
/* ========================================================= */

@media print {
  @page {
    size: A4 landscape;
    margin: 10mm;
  }

  body {
    background: white !important;
    color: #111 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Force legend visibility */
  [data-calendar-legend] {
    display: block !important;
    visibility: visible !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }

  /* Neutralise collapsible behaviour */
  .collapsible-content,
  .collapsible-trigger {
    display: block !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
  }

  /* Remove shadows & animations */
  * {
    box-shadow: none !important;
    animation: none !important;
  }
}

```


// path: src/lib/communeService.ts
```ts
/**
 * Service commune trajet – CNPE Bugey
 * Lookup + valorisation temps trajet selon jour/nuit et semaine/dimanche.
 */

import { COMMUNES_BUGEY, CommuneTrajet } from '@/data/communes_bugey_dataset';

// Cache for fast lookup
const communeMap = new Map<string, CommuneTrajet>();
for (const c of COMMUNES_BUGEY) {
  communeMap.set(c.localite, c);
}

export function getCommuneByName(name: string): CommuneTrajet | undefined {
  return communeMap.get(name);
}

export function getAllCommuneNames(): string[] {
  return COMMUNES_BUGEY.map(c => c.localite);
}

/**
 * Determine which valorisation field to use based on day-of-week and time.
 * Night = any hour between 21:00 and 06:00.
 * Sunday = day index 0.
 */
export type ValorisationType = 'jour_semaine' | 'nuit_semaine' | 'jour_dimanche' | 'nuit_dimanche';

export function getValorisationType(dateStr: string, startTime: string): ValorisationType {
  const dow = new Date(dateStr + 'T00:00:00').getDay(); // 0=Sunday
  const isSunday = dow === 0;
  
  const [h] = startTime.split(':').map(Number);
  const isNight = h >= 21 || h < 6;
  
  if (isSunday && isNight) return 'nuit_dimanche';
  if (isSunday) return 'jour_dimanche';
  if (isNight) return 'nuit_semaine';
  return 'jour_semaine';
}

const FIELD_MAP: Record<ValorisationType, keyof CommuneTrajet> = {
  jour_semaine: 'valorise_jour_semaine_150',
  nuit_semaine: 'valorise_nuit_semaine_200',
  jour_dimanche: 'valorise_jour_dimanche_175',
  nuit_dimanche: 'valorise_nuit_dimanche_225',
};

const LABEL_MAP: Record<ValorisationType, string> = {
  jour_semaine: 'Jour semaine (×1.50)',
  nuit_semaine: 'Nuit semaine (×2.00)',
  jour_dimanche: 'Jour dimanche (×1.75)',
  nuit_dimanche: 'Nuit dimanche (×2.25)',
};

export interface TrajetResult {
  commune: CommuneTrajet;
  valorisationType: ValorisationType;
  valorisationLabel: string;
  valorisationHeures: number;
  isZoneImmediate: boolean;
}

/**
 * Compute travel valorisation for a given day entry.
 * Returns null if commune not found or astreinte sans intervention.
 */
export function computeTrajetValorisation(
  communeName: string,
  dateStr: string,
  startTime: string
): TrajetResult | null {
  const commune = getCommuneByName(communeName);
  if (!commune) return null;

  const isZoneImmediate = commune.trajetPlafonne_km !== null && commune.trajetPlafonne_km < 0;
  const type = getValorisationType(dateStr, startTime);
  const heures = (commune[FIELD_MAP[type]] as number | null) ?? 0;

  return {
    commune,
    valorisationType: type,
    valorisationLabel: LABEL_MAP[type],
    valorisationHeures: heures,
    isZoneImmediate,
  };
}

```


// path: src/lib/complianceEngine.ts
```ts
/**
 * Moteur de conformité EDF CNPE Bugey – Refonte Phase 2
 * Semaine : Dimanche 00h00 → Samedi 24h00
 * Habillage = optionnel manuel (plus automatique)
 * Heures supplémentaires avec majorations IEG
 */

import { TimeEntry, ComplianceAlert, DaySummary, WeekSummary, AlertLevel, PointageSettings, defaultPointageSettings, OvertimeDetail } from '@/types/pointage';
import { format, addDays, parseISO, startOfWeek } from 'date-fns';
import { computeTrajetValorisation } from '@/lib/communeService';

// ---- Helpers ----

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** Check if a time range covers 12:00-12:45 */
export function coversMidi(startTime: string, endTime: string): boolean {
  const start = timeToMinutes(startTime);
  let end = timeToMinutes(endTime);
  if (end <= start) end += 24 * 60;
  return start <= 12 * 60 && end >= 12 * 60 + 45;
}

function getEffectiveMinutes(entry: TimeEntry): number {
  if (entry.isAstreinteSansIntervention) return 0;
  const start = timeToMinutes(entry.startTime);
  let end = timeToMinutes(entry.endTime);
  if (end <= start) end += 24 * 60;
  let minutes = end - start;
  if (entry.suppressionMidi && coversMidi(entry.startTime, entry.endTime)) {
    minutes -= 45;
  }
  return Math.max(0, minutes);
}

/** Auto-comments for an entry */
export function computeAutoComments(entry: TimeEntry, primeRepasValeur: number, communeDepart?: string): string[] {
  const comments: string[] = [];
  if (entry.isAstreinteSansIntervention) return comments;

  if (!entry.suppressionMidi && coversMidi(entry.startTime, entry.endTime)) {
    comments.push(`Prime : repas sans dép (${primeRepasValeur.toFixed(2)} €)`);
  }

  const start = timeToMinutes(entry.startTime);
  const end = timeToMinutes(entry.endTime);
  if (start < 8 * 60 || end > 16 * 60 + 45) {
    comments.push('Prime IK à vérifier');
  }

  // Travel valorisation comment
  if (communeDepart) {
    const trajet = computeTrajetValorisation(communeDepart, entry.date, entry.startTime);
    if (trajet) {
      if (trajet.isZoneImmediate) {
        comments.push(`⚠️ Zone immédiate CNPE — Pas de plafond trajet`);
      } else {
        comments.push(`🚗 Trajet : ${trajet.commune.localite}`);
        comments.push(`Distance A/R : ${trajet.commune.distanceAR_km ?? '—'} km | Plaf : ${trajet.commune.trajetPlafonne_km ?? '—'} km`);
        comments.push(`Temps simple : ${trajet.commune.tempsSimple_min ?? '—'} min`);
        comments.push(`Valorisé (${trajet.valorisationLabel}) : ${trajet.valorisationHeures.toFixed(2)} h`);
      }
    }
  }

  return comments;
}

// ---- Overtime / Heures supplémentaires ----

/** Get the day of week index for a date (0=Sunday, 6=Saturday) */
function getDayOfWeek(dateStr: string): number {
  return parseISO(dateStr).getDay();
}

/** 
 * Compute overtime details for the week.
 * Rules:
 * - 36th-43rd hour: +25%
 * - 44th+ hour: +50%
 * - Saturday: +25%
 * - Sunday: +100%
 * - Holiday: +100%
 * - Night (21h-6h): +40%
 * - Apply the MOST FAVORABLE single rate (no cumul)
 */
export function computeOvertimeDetails(
  entries: TimeEntry[],
  weekDates: string[],
  holidays: string[] = []
): OvertimeDetail[] {
  const details: OvertimeDetail[] = [];
  
  // Calculate total effective hours to determine base overtime bracket
  let totalEffectiveMinutes = 0;
  const dailyMinutes: { date: string; minutes: number; entries: TimeEntry[] }[] = [];
  
  for (const dateStr of weekDates) {
    const dayEntries = entries.filter(e => e.date === dateStr && !e.isAstreinteSansIntervention);
    let dayMinutes = 0;
    for (const entry of dayEntries) {
      dayMinutes += getEffectiveMinutes(entry);
    }
    dailyMinutes.push({ date: dateStr, minutes: dayMinutes, entries: dayEntries });
    totalEffectiveMinutes += dayMinutes;
  }
  
  const totalEffectiveHours = totalEffectiveMinutes / 60;
  
  // Only compute if we have overtime (>35h base)
  if (totalEffectiveHours <= 35) return details;
  
  // Process each worked day
  let cumulHours = 0;
  for (const day of dailyMinutes) {
    if (day.minutes === 0) continue;
    
    const dayHours = day.minutes / 60;
    const dow = getDayOfWeek(day.date);
    const isSaturday = dow === 6;
    const isSunday = dow === 0;
    const isHoliday = holidays.includes(day.date);
    
    // Determine day-based rate
    let dayRate = 0;
    if (isSunday || isHoliday) dayRate = 100;
    else if (isSaturday) dayRate = 25;
    
    // Check night hours for this day's entries
    let nightMinutes = 0;
    for (const entry of day.entries) {
      nightMinutes += getNightMinutes(entry);
    }
    const nightRate = nightMinutes > 0 ? 40 : 0;
    
    // Bracket-based rate for hours in the 36-43 and 44+ ranges
    const prevCumul = cumulHours;
    cumulHours += dayHours;
    
    let bracketRate = 0;
    if (cumulHours > 43) {
      // Some hours at 25%, some at 50%
      const hoursAt50 = Math.min(dayHours, cumulHours - 43);
      const hoursAt25 = dayHours - hoursAt50;
      // Use weighted average for bracket rate or just report the highest
      bracketRate = hoursAt50 > 0 ? 50 : (prevCumul >= 35 ? 25 : 0);
    } else if (cumulHours > 35) {
      bracketRate = 25;
    }
    
    // Apply MOST FAVORABLE single rate (no cumul)
    const bestRate = Math.max(dayRate, nightRate, bracketRate);
    
    if (bestRate > 0 && prevCumul >= 35) {
      // Only the overtime portion
      const overtimeHours = Math.min(dayHours, cumulHours - 35);
      if (overtimeHours > 0) {
        let rateLabel = '';
        if (bestRate === dayRate) {
          rateLabel = isSunday ? 'Dimanche' : isHoliday ? 'Férié' : 'Samedi';
        } else if (bestRate === nightRate) {
          rateLabel = 'Nuit (21h-6h)';
        } else {
          rateLabel = cumulHours > 43 ? '44e heure+' : '36e-43e heure';
        }
        
        details.push({
          date: day.date,
          hours: parseFloat(overtimeHours.toFixed(2)),
          rate: bestRate,
          label: `HS +${bestRate}% (${rateLabel})`,
        });
      }
    } else if (prevCumul < 35 && cumulHours > 35) {
      // Partial overtime day
      const overtimeHours = cumulHours - 35;
      const bestOvertimeRate = Math.max(dayRate, nightRate, 25);
      let rateLabel = '';
      if (bestOvertimeRate === dayRate && dayRate > 0) {
        rateLabel = isSunday ? 'Dimanche' : isHoliday ? 'Férié' : 'Samedi';
      } else if (bestOvertimeRate === nightRate && nightRate > 0) {
        rateLabel = 'Nuit (21h-6h)';
      } else {
        rateLabel = '36e-43e heure';
      }
      
      details.push({
        date: day.date,
        hours: parseFloat(overtimeHours.toFixed(2)),
        rate: bestOvertimeRate,
        label: `HS +${bestOvertimeRate}% (${rateLabel})`,
      });
    }
  }
  
  return details;
}

/** Calculate night minutes (21h-6h) for an entry */
function getNightMinutes(entry: TimeEntry): number {
  if (entry.isAstreinteSansIntervention) return 0;
  const start = timeToMinutes(entry.startTime);
  let end = timeToMinutes(entry.endTime);
  if (end <= start) end += 24 * 60;
  
  let nightMin = 0;
  // Night = 21:00 (1260) to 30:00 (next day 6:00 = 1800)
  // Also 0:00 to 6:00 (0-360)
  for (let m = start; m < end; m++) {
    const normalizedM = m % (24 * 60);
    if (normalizedM >= 21 * 60 || normalizedM < 6 * 60) {
      nightMin++;
    }
  }
  return nightMin;
}

// ---- Day Summary ----

export function computeDaySummary(entries: TimeEntry[], date: string, communeDepart?: string): DaySummary {
  const dayEntries = entries.filter(e => e.date === date);
  let effectiveMinutes = 0;
  let primeRepas = false;
  let ikAlert = false;
  let trajetHeures = 0;
  let habillageMinutesTotal = 0;

  for (const entry of dayEntries) {
    effectiveMinutes += getEffectiveMinutes(entry);
    if (!entry.suppressionMidi && coversMidi(entry.startTime, entry.endTime) && !entry.isAstreinteSansIntervention) {
      primeRepas = true;
    }
    const start = timeToMinutes(entry.startTime);
    const end = timeToMinutes(entry.endTime);
    if (!entry.isAstreinteSansIntervention && (start < 8 * 60 || end > 16 * 60 + 45)) {
      ikAlert = true;
    }
    // Habillage manuel optionnel
    if (entry.habillageManuel && entry.habillageMinutes && entry.habillageMinutes > 0) {
      habillageMinutesTotal += entry.habillageMinutes;
    }
  }

  const hoursWorked = effectiveMinutes / 60;
  const habillageHours = habillageMinutesTotal / 60;

  // Travel valorisation: apply once per worked day
  if (hoursWorked > 0 && communeDepart) {
    const firstEntry = dayEntries.find(e => !e.isAstreinteSansIntervention);
    if (firstEntry) {
      const trajet = computeTrajetValorisation(communeDepart, date, firstEntry.startTime);
      if (trajet && !trajet.isZoneImmediate) {
        trajetHeures = trajet.valorisationHeures;
      }
    }
  }

  const totalHours = hoursWorked + habillageHours + trajetHeures;
  const hasNote = dayEntries.some(e => !!e.note);
  const alerts: ComplianceAlert[] = [];

  if (hoursWorked > 10) {
    alerts.push({
      rule: 'R_JOUR',
      level: 'rouge',
      message: `Dépassement journalier : ${hoursWorked.toFixed(2)}h effectives > 10h`,
      date,
    });
  }

  return { date, hoursWorked, habillageHours, totalHours, hasNote, alerts, primeRepas, ikAlert, trajetHeures };
}

// ---- Week calculations ----

export function getWeekSunday(dateStr: string): Date {
  return startOfWeek(parseISO(dateStr), { weekStartsOn: 0 });
}

export function getWeekDates(weekSunday: Date): string[] {
  return Array.from({ length: 7 }, (_, i) => format(addDays(weekSunday, i), 'yyyy-MM-dd'));
}

// ---- Compliance Rules ----

function checkReposQuotidien(
  entries: TimeEntry[],
  weekDates: string[]
): { alerts: ComplianceAlert[]; ok: boolean } {
  const alerts: ComplianceAlert[] = [];
  let ok = true;

  for (let i = 0; i < weekDates.length - 1; i++) {
    const dayEntries = entries.filter(e => e.date === weekDates[i] && !e.isAstreinteSansIntervention);
    const nextDayEntries = entries.filter(e => e.date === weekDates[i + 1] && !e.isAstreinteSansIntervention);
    if (dayEntries.length === 0 || nextDayEntries.length === 0) continue;

    let latestEnd = 0;
    for (const e of dayEntries) {
      let end = timeToMinutes(e.endTime);
      if (end <= timeToMinutes(e.startTime)) end += 24 * 60;
      if (end > latestEnd) latestEnd = end;
    }

    let earliestStart = 24 * 60;
    for (const e of nextDayEntries) {
      const start = timeToMinutes(e.startTime);
      if (start < earliestStart) earliestStart = start;
    }

    const restMinutes = (24 * 60 - latestEnd) + earliestStart;
    if (restMinutes < 11 * 60) {
      ok = false;
      alerts.push({
        rule: 'R2',
        level: 'orange',
        message: `Repos quotidien insuffisant entre ${weekDates[i]} et ${weekDates[i + 1]} : ${(restMinutes / 60).toFixed(2)}h < 11h`,
        date: weekDates[i],
      });
    }
  }
  return { alerts, ok };
}

function checkReposHebdo(
  entries: TimeEntry[],
  weekDates: string[],
  allEntries?: TimeEntry[]
): { alerts: ComplianceAlert[]; ok: boolean } {
  const alerts: ComplianceAlert[] = [];
  let ok = true;

  const workedSlots: Array<{ start: number; end: number }> = [];
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const dayEntries = entries.filter(e => e.date === weekDates[dayIndex] && !e.isAstreinteSansIntervention);
    for (const entry of dayEntries) {
      const dayOffset = dayIndex * 24 * 60;
      const start = dayOffset + timeToMinutes(entry.startTime);
      let end = dayOffset + timeToMinutes(entry.endTime);
      if (end <= start) end += 24 * 60;
      workedSlots.push({ start, end });
    }
  }

  workedSlots.sort((a, b) => a.start - b.start);
  const weekMinutes = 7 * 24 * 60;
  let maxGap = 0;

  if (workedSlots.length === 0) {
    maxGap = weekMinutes;
  } else {
    // Consider rest carried from prior week (Saturday/Sunday before this week's Sunday)
    // If no entries exist on the Saturday before this week, add that day's rest
    const priorSatDate = format(addDays(parseISO(weekDates[0]), -1), 'yyyy-MM-dd');
    const priorFriDate = format(addDays(parseISO(weekDates[0]), -2), 'yyyy-MM-dd');
    const source = allEntries || entries;
    const priorSatWorked = source.some(e => e.date === priorSatDate && !e.isAstreinteSansIntervention);
    const priorFriWorked = source.some(e => e.date === priorFriDate && !e.isAstreinteSansIntervention);

    // If prior Saturday was free, we get at least 24h rest leading into this week
    let leadingRest = workedSlots[0].start; // minutes from Sunday 00:00
    if (!priorSatWorked) leadingRest += 24 * 60; // Saturday free
    if (!priorFriWorked && !priorSatWorked) leadingRest += 24 * 60; // Friday also free

    maxGap = leadingRest;
    for (let i = 1; i < workedSlots.length; i++) {
      const gap = workedSlots[i].start - workedSlots[i - 1].end;
      if (gap > maxGap) maxGap = gap;
    }
    const gapEnd = weekMinutes - workedSlots[workedSlots.length - 1].end;
    if (gapEnd > maxGap) maxGap = gapEnd;
  }

  if (maxGap < 35 * 60) {
    ok = false;
    alerts.push({
      rule: 'R3',
      level: 'rouge',
      message: `Repos hebdomadaire insuffisant : ${(maxGap / 60).toFixed(2)}h < 35h`,
    });
  }

  let has24hCivilRest = false;
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const dayEntries = entries.filter(e => e.date === weekDates[dayIndex] && !e.isAstreinteSansIntervention);
    if (dayEntries.length === 0) {
      has24hCivilRest = true;
      break;
    }
  }

  if (!has24hCivilRest && workedSlots.length > 0) {
    ok = false;
    alerts.push({
      rule: 'R3b',
      level: 'rouge',
      message: 'Aucune période de repos civil de 24h (journée complète sans travail)',
    });
  }

  return { alerts, ok };
}

// ---- Main computation ----

export function computeWeekSummary(
  entries: TimeEntry[],
  weekSunday: Date,
  pointageSettings?: PointageSettings,
  holidays: string[] = []
): WeekSummary {
  const ps = pointageSettings || defaultPointageSettings;
  const weekDates = getWeekDates(weekSunday);
  const allAlerts: ComplianceAlert[] = [];

  const daySummaries = weekDates.map(d => computeDaySummary(entries, d, ps.communeDepart));

  const totalHours = daySummaries.reduce((sum, d) => sum + d.totalHours, 0);
  const daysWorked = daySummaries.filter(d => d.hoursWorked > 0).length;

  // 6 CONSECUTIVE worked days check (not just count)
  let has6Consecutive = false;
  let consecutiveCount = 0;
  for (let i = 0; i < 7; i++) {
    if (daySummaries[i].hoursWorked > 0) {
      consecutiveCount++;
      if (consecutiveCount >= 6) { has6Consecutive = true; break; }
    } else {
      consecutiveCount = 0;
    }
  }
  const plafond = has6Consecutive ? 54 : 53;
  const heuresRestantes = Math.max(0, plafond - totalHours);

  // Day-level alerts (10h)
  for (const ds of daySummaries) {
    allAlerts.push(...ds.alerts);
  }

  // Rule 1 – Plafond hebdo
  if (totalHours > plafond) {
    allAlerts.push({
      rule: 'R1',
      level: 'rouge',
      message: `Plafond hebdomadaire dépassé : ${totalHours.toFixed(2)}h > ${plafond}h`,
    });
  }

  // Progressive weekly alerts
  if (ps.alertesActives) {
    if (heuresRestantes <= ps.seuilRougeHeures && heuresRestantes > 0) {
      allAlerts.push({
        rule: 'R1_SEUIL',
        level: 'rouge',
        message: `Heures restantes avant seuil critique : ${heuresRestantes.toFixed(2)}h`,
      });
    } else if (heuresRestantes <= ps.seuilOrangeHeures && heuresRestantes > ps.seuilRougeHeures) {
      allAlerts.push({
        rule: 'R1_SEUIL',
        level: 'orange',
        message: `Heures restantes avant seuil critique : ${heuresRestantes.toFixed(2)}h`,
      });
    }
  }

  // Rule 2 – Repos quotidien
  const r2 = checkReposQuotidien(entries, weekDates);
  allAlerts.push(...r2.alerts);

  // Rule 3 – Repos hebdo (pass all entries for prior-week check)
  const weekEntries = entries.filter(e => weekDates.includes(e.date));
  const r3 = checkReposHebdo(weekEntries, weekDates, entries);
  allAlerts.push(...r3.alerts);

  // RE pot alert
  if (ps.alertesActives && ps.soldeRE <= ps.seuilAlerteRE) {
    allAlerts.push({
      rule: 'RE',
      level: 'rouge',
      message: `RE critique : ${ps.soldeRE.toFixed(2)}h restantes sur 312h (seuil : ${ps.seuilAlerteRE}h)`,
    });
  }

  // Overtime details
  const overtimeDetails = computeOvertimeDetails(entries, weekDates, holidays);

  // Overall status
  let overallStatus: AlertLevel = 'vert';
  if (allAlerts.some(a => a.level === 'orange')) overallStatus = 'orange';
  if (allAlerts.some(a => a.level === 'rouge')) overallStatus = 'rouge';

  // Inject alerts into day summaries
  for (const alert of allAlerts) {
    if (alert.date) {
      const ds = daySummaries.find(d => d.date === alert.date);
      if (ds) ds.alerts.push(alert);
    }
  }

  return {
    weekStart: weekDates[0],
    weekEnd: weekDates[6],
    totalHours,
    plafondAutorise: plafond,
    heuresRestantes,
    reposQuotidienOk: r2.ok,
    reposHebdoOk: r3.ok,
    overallStatus,
    days: daySummaries,
    alerts: allAlerts,
    daysWorkedCount: daysWorked,
    overtimeDetails,
  };
}

```


// path: src/lib/database.ts
```ts
/**
 * IndexedDB abstraction layer for W Planner.
 * All data is partitioned by userId for future multi-user support.
 */

import { openDB, DBSchema, IDBPDatabase } from 'idb';

const DB_NAME = 'wplanner';
const DB_VERSION = 1;
const DEFAULT_USER_ID = 'default';

interface WPlannerDB extends DBSchema {
  /** Generic key-value store, keyed by `${userId}::${storeKey}` */
  kvStore: {
    key: string;
    value: {
      compositeKey: string;
      userId: string;
      storeKey: string;
      data: unknown;
      updatedAt: number;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<WPlannerDB>> | null = null;

function getDB(): Promise<IDBPDatabase<WPlannerDB>> {
  if (!dbPromise) {
    dbPromise = openDB<WPlannerDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('kvStore')) {
          db.createObjectStore('kvStore', { keyPath: 'compositeKey' });
        }
      },
    });
  }
  return dbPromise;
}

function compositeKey(userId: string, storeKey: string): string {
  return `${userId}::${storeKey}`;
}

/**
 * Read a value from the database.
 * Falls back to `fallback` if not found or on error.
 */
export async function dbGet<T>(storeKey: string, fallback: T, userId = DEFAULT_USER_ID): Promise<T> {
  try {
    const db = await getDB();
    const record = await db.get('kvStore', compositeKey(userId, storeKey));
    if (record) return record.data as T;
    return fallback;
  } catch (err) {
    console.warn(`[database] dbGet("${storeKey}") failed:`, err);
    return fallback;
  }
}

/**
 * Write a value to the database.
 */
export async function dbSet<T>(storeKey: string, data: T, userId = DEFAULT_USER_ID): Promise<void> {
  try {
    const db = await getDB();
    await db.put('kvStore', {
      compositeKey: compositeKey(userId, storeKey),
      userId,
      storeKey,
      data,
      updatedAt: Date.now(),
    });
  } catch (err) {
    console.warn(`[database] dbSet("${storeKey}") failed:`, err);
  }
}

/**
 * Delete a key from the database.
 */
export async function dbDelete(storeKey: string, userId = DEFAULT_USER_ID): Promise<void> {
  try {
    const db = await getDB();
    await db.delete('kvStore', compositeKey(userId, storeKey));
  } catch (err) {
    console.warn(`[database] dbDelete("${storeKey}") failed:`, err);
  }
}

/**
 * List all keys for a given userId.
 */
export async function dbListKeys(userId = DEFAULT_USER_ID): Promise<string[]> {
  try {
    const db = await getDB();
    const allKeys = await db.getAllKeys('kvStore');
    const prefix = `${userId}::`;
    return allKeys
      .filter((k) => k.startsWith(prefix))
      .map((k) => k.slice(prefix.length));
  } catch (err) {
    console.warn(`[database] dbListKeys failed:`, err);
    return [];
  }
}

```


// path: src/lib/icsUtils.ts
```ts
/**
 * ICS (iCalendar) import/export utilities.
 * Handles parsing .ics files into CalendarEvents and generating .ics from internal events.
 */
import { CalendarEvent, EventSource } from '@/types/calendar';
import { format, parse } from 'date-fns';

// ============= ICS PARSING =============

interface ICSVEvent {
  uid: string;
  summary: string;
  dtstart: string;
  dtend: string;
  description?: string;
}

function parseICSDate(value: string): Date {
  // Handle YYYYMMDD format
  if (/^\d{8}$/.test(value)) {
    return new Date(
      parseInt(value.slice(0, 4)),
      parseInt(value.slice(4, 6)) - 1,
      parseInt(value.slice(6, 8))
    );
  }
  // Handle YYYYMMDDTHHMMSS or YYYYMMDDTHHMMSSZ
  const cleaned = value.replace(/Z$/, '');
  if (/^\d{8}T\d{6}$/.test(cleaned)) {
    return new Date(
      parseInt(cleaned.slice(0, 4)),
      parseInt(cleaned.slice(4, 6)) - 1,
      parseInt(cleaned.slice(6, 8)),
      parseInt(cleaned.slice(9, 11)),
      parseInt(cleaned.slice(11, 13)),
      parseInt(cleaned.slice(13, 15))
    );
  }
  return new Date(value);
}

function extractTimeFromICSDate(value: string): string | undefined {
  const cleaned = value.replace(/Z$/, '');
  if (/^\d{8}T\d{6}$/.test(cleaned)) {
    return `${cleaned.slice(9, 11)}:${cleaned.slice(11, 13)}`;
  }
  return undefined;
}

function parseVEvents(icsContent: string): ICSVEvent[] {
  const events: ICSVEvent[] = [];
  const lines = icsContent.replace(/\r\n /g, '').replace(/\r/g, '').split('\n');

  let inEvent = false;
  let current: Partial<ICSVEvent> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === 'BEGIN:VEVENT') {
      inEvent = true;
      current = {};
    } else if (trimmed === 'END:VEVENT') {
      inEvent = false;
      if (current.uid && current.summary && current.dtstart) {
        events.push(current as ICSVEvent);
      }
    } else if (inEvent) {
      // Handle properties with parameters like DTSTART;VALUE=DATE:20260101
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx === -1) continue;
      const key = trimmed.slice(0, colonIdx).split(';')[0].toUpperCase();
      const value = trimmed.slice(colonIdx + 1);

      switch (key) {
        case 'UID': current.uid = value; break;
        case 'SUMMARY': current.summary = value; break;
        case 'DTSTART': current.dtstart = value; break;
        case 'DTEND': current.dtend = value; break;
        case 'DESCRIPTION': current.description = value; break;
      }
    }
  }

  return events;
}

/**
 * Parse an ICS file content and return CalendarEvents.
 * Events are marked as external (readonly, source='ics').
 */
export function parseICSToEvents(icsContent: string, source: EventSource = 'ics'): CalendarEvent[] {
  const vevents = parseVEvents(icsContent);

  return vevents.map((ve) => {
    const startDate = parseICSDate(ve.dtstart);
    const endDate = ve.dtend ? parseICSDate(ve.dtend) : startDate;
    const startTime = extractTimeFromICSDate(ve.dtstart);
    const endTime = ve.dtend ? extractTimeFromICSDate(ve.dtend) : undefined;

    return {
      id: `ics-${ve.uid}-${Date.now()}`,
      type: 'event' as const,
      name: ve.summary,
      startDate,
      endDate: endDate < startDate ? startDate : endDate,
      startTime,
      endTime,
      color: '#6366f1', // Default indigo for external events
      source,
      externalId: ve.uid,
      readonly: true,
    };
  });
}

/**
 * Merge imported ICS events with existing events.
 * - New UIDs are added
 * - Existing UIDs are updated (name, dates)
 * - UIDs not in the new import can optionally be removed
 */
export function mergeICSEvents(
  existing: CalendarEvent[],
  incoming: CalendarEvent[],
  removeAbsent: boolean = false
): { toAdd: CalendarEvent[]; toUpdate: { id: string; updates: Partial<CalendarEvent> }[]; toRemove: string[] } {
  const existingByExternalId = new Map<string, CalendarEvent>();
  const internalEvents: CalendarEvent[] = [];

  for (const e of existing) {
    if (e.externalId && e.source === 'ics') {
      existingByExternalId.set(e.externalId, e);
    } else {
      internalEvents.push(e);
    }
  }

  const toAdd: CalendarEvent[] = [];
  const toUpdate: { id: string; updates: Partial<CalendarEvent> }[] = [];
  const incomingUIDs = new Set<string>();

  for (const inc of incoming) {
    if (!inc.externalId) { toAdd.push(inc); continue; }
    incomingUIDs.add(inc.externalId);

    const match = existingByExternalId.get(inc.externalId);
    if (match) {
      toUpdate.push({
        id: match.id,
        updates: {
          name: inc.name,
          startDate: inc.startDate,
          endDate: inc.endDate,
          startTime: inc.startTime,
          endTime: inc.endTime,
        },
      });
    } else {
      toAdd.push(inc);
    }
  }

  const toRemove: string[] = [];
  if (removeAbsent) {
    for (const [uid, evt] of existingByExternalId) {
      if (!incomingUIDs.has(uid)) {
        toRemove.push(evt.id);
      }
    }
  }

  return { toAdd, toUpdate, toRemove };
}

// ============= ICS EXPORT =============

function formatICSDate(date: Date, time?: string): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');

  if (time) {
    const [h, min] = time.split(':');
    return `${y}${m}${d}T${h.padStart(2, '0')}${min.padStart(2, '0')}00`;
  }
  return `${y}${m}${d}`;
}

function escapeICSText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

/**
 * Generate an ICS file content from a list of CalendarEvents.
 */
export function eventsToICS(events: CalendarEvent[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CalendrierTAF//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const event of events) {
    const uid = event.externalId || `${event.id}@calendriertaf`;
    const hasTime = !!event.startTime;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`SUMMARY:${escapeICSText(event.name)}`);

    if (hasTime) {
      lines.push(`DTSTART:${formatICSDate(event.startDate, event.startTime)}`);
      lines.push(`DTEND:${formatICSDate(event.endDate, event.endTime || event.startTime)}`);
    } else {
      lines.push(`DTSTART;VALUE=DATE:${formatICSDate(event.startDate)}`);
      lines.push(`DTEND;VALUE=DATE:${formatICSDate(event.endDate)}`);
    }

    lines.push(`DTSTAMP:${formatICSDate(new Date(), format(new Date(), 'HH:mm'))}Z`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Trigger download of an ICS file.
 */
export function downloadICS(events: CalendarEvent[], filename: string = 'calendrier.ics') {
  const content = eventsToICS(events);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

```


// path: src/lib/trancheColors.ts
```ts
import { CalendarSettings, Arret, TRANCHE_COLORS, modulePatterns, PatternType } from '@/types/calendar';

/**
 * Get the color for an arret based on its tranche.
 * Both AT and preparations use the same tranche color for visual consistency.
 */
export function getArretColor(arret: Arret, settings: CalendarSettings): string {
  // Use mandatory tranche colors
  switch (arret.tranche) {
    case 'Tr2':
      return settings.arretTr2Color;
    case 'Tr3':
      return settings.arretTr3Color;
    case 'Tr4':
      return settings.arretTr4Color;
    case 'Tr5':
      return settings.arretTr5Color;
    default:
      return TRANCHE_COLORS.Tr2;
  }
}

/**
 * Get the pattern for an arret/preparation based on its module type.
 * AT (arrêts) have no pattern, preparations use module-specific patterns.
 */
export function getArretPattern(arret: Arret): PatternType {
  if (arret.type === 'arret') {
    return 'none';
  }
  // For preparations, use module-specific pattern or default dots
  if (arret.module && modulePatterns[arret.module]) {
    return modulePatterns[arret.module];
  }
  return arret.pattern || 'dots';
}

/**
 * Get human-readable module label
 */
export function getModuleLabel(module?: string): string {
  const labels: Record<string, string> = {
    'M0': 'Module 0',
    'M1': 'Module 1',
    'M2A': 'Module 2A',
    'M2B': 'Module 2B',
    'M3': 'Module 3',
    'M4': 'Module 4',
  };
  return module ? labels[module] || module : '';
}

```


// path: src/lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```


// path: src/main.tsx
```ts
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

```


// path: src/pages/Index.tsx
```ts
import { useState, useCallback, useEffect } from 'react';
import { isWeekend, eachDayOfInterval } from 'date-fns';
import { useCalendar } from '@/hooks/useCalendar';
import { useSwipeNavigation } from '@/hooks/useSwipeNavigation';
import { UnifiedToolbar } from '@/components/Calendar/UnifiedToolbar';
import { UnifiedCalendarGrid } from '@/components/Calendar/UnifiedCalendarGrid';
import { UnifiedYearView } from '@/components/Calendar/UnifiedYearView';
import { UnifiedArretBar } from '@/components/Calendar/UnifiedArretBar';
import { UnifiedLegend } from '@/components/Calendar/UnifiedLegend';
import { DayDetails } from '@/components/Calendar/DayDetails';
import { WeekTimeline } from '@/components/Calendar/WeekTimeline';
import { SettingsPanel } from '@/components/Settings/SettingsPanel';
import { AddEventDialog } from '@/components/Dialogs/AddEventDialog';
import { EventsManager } from '@/components/Events/EventsManager';
import { ConflictsList } from '@/components/Conflicts/ConflictsList';
import { PointageModule } from '@/components/Pointage/PointageModule';
import { SoldesCounters } from '@/components/Dashboard/SoldesCounters';
import { usePointage } from '@/hooks/usePointage';
import { useRHStore } from '@/stores/rhStore';
import { exportPDF, exportAnnualPDF, exportMonthlyPDF } from '@/components/Export/ExportPDF';
import { ExcelImport } from '@/components/Import/ExcelImport';
import { ICSImportDialog } from '@/components/Import/ICSImportDialog';
import { ICSExportDialog } from '@/components/Export/ICSExportDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { startOfWeek, getWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

const Index = () => {
  const {
    currentDate,
    settings,
    events,
    vacations,
    holidays,
    arrets,
    currentAstreintes,
    ponctualAstreintes,
    cancelledAstreinteDates,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    goToDate,
    updateSettings,
    addEvent,
    updateEvent,
    removeEvent,
    cancelAstreinteDates,
    restoreCancelledDate,
    addPonctualAstreinte,
    updatePonctualAstreinte,
    removePonctualAstreinte,
    addArret,
    updateArret,
    deleteArret,
    addVacation,
    updateVacation,
    deleteVacation,
    addHoliday,
    updateHoliday,
    deleteHoliday,
    isAstreinteDay,
    isDateCancelled,
    hasConflict,
    getConflictDetails,
    isHoliday,
    isVacationDay,
    isArretDay,
    isREDay,
    isCPDay,
    getEventsForDate,
    getNonREEventsForDate,
    getArretsForPeriod,
    getAstreintesForYear,
    importEvents,
    importVacations,
    importArrets,
    importHolidays,
  } = useCalendar();

  const isMobile = useIsMobile();
  const { pointageSettings } = usePointage();
  const { rhState } = useRHStore();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addEventOpen, setAddEventOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [icsImportOpen, setIcsImportOpen] = useState(false);
  const [icsExportOpen, setIcsExportOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dayDetailsOpen, setDayDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'year' | 'month' | 'week'>('year');
  const [activeTab, setActiveTab] = useState('calendar');
  const [weekViewDate, setWeekViewDate] = useState<Date>(new Date());
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled rejection:", event.reason);
      toast.error("Une erreur inattendue s'est produite.");
      event.preventDefault();
    };
    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  const defaultSectionsExpanded = !isMobile;
  const yearAstreintes = getAstreintesForYear(currentDate.getFullYear());

  // Swipe navigation
  const handleSwipeNext = useCallback(() => {
    try {
      if (viewMode === 'year') {
        const nextYear = currentDate.getFullYear() + 1;
        if (isNaN(nextYear) || nextYear < 1900 || nextYear > 2100) return;
        goToDate(new Date(nextYear, 0, 1));
      } else {
        if (currentDate.getMonth() === 11) {
          const nextYear = currentDate.getFullYear() + 1;
          if (isNaN(nextYear) || nextYear < 1900 || nextYear > 2100) return;
          goToDate(new Date(nextYear, 0, 1));
        } else {
          goToNextMonth();
        }
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [viewMode, currentDate, goToDate, goToNextMonth]);

  const handleSwipePrev = useCallback(() => {
    try {
      if (viewMode === 'year') {
        const prevYear = currentDate.getFullYear() - 1;
        if (isNaN(prevYear) || prevYear < 1900 || prevYear > 2100) return;
        goToDate(new Date(prevYear, 0, 1));
      } else {
        if (currentDate.getMonth() === 0) {
          const prevYear = currentDate.getFullYear() - 1;
          if (isNaN(prevYear) || prevYear < 1900 || prevYear > 2100) return;
          goToDate(new Date(prevYear, 11, 1));
        } else {
          goToPrevMonth();
        }
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  }, [viewMode, currentDate, goToDate, goToPrevMonth]);

  const swipeHandlers = useSwipeNavigation(handleSwipeNext, handleSwipePrev);

  const selectedDayData = selectedDate ? {
    events: getEventsForDate(selectedDate),
    astreinte: isAstreinteDay(selectedDate, currentAstreintes),
    holiday: isHoliday(selectedDate),
    vacation: isVacationDay(selectedDate),
    arret: isArretDay(selectedDate),
    cancelled: isDateCancelled(selectedDate),
  } : null;

  const handleDayClick = useCallback((date: Date) => {
    setSelectedDate(date);
    setDayDetailsOpen(true);
  }, []);

  const handleMonthClick = useCallback((date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) return;
    goToDate(date);
    setViewMode('month');
  }, [goToDate]);

  const handleAddEvent = useCallback((eventData: {
    type: 'event' | 'astreinte-ponctuelle' | 'astreinte-cancelled' | 're' | 'cp';
    name: string;
    startDate: Date;
    endDate: Date;
    startTime?: string;
    endTime?: string;
    color: string;
    excludeWeekends?: boolean;
  }) => {
    const shouldExcludeWeekends = eventData.excludeWeekends;
    
    if (eventData.type === 'event' || eventData.type === 're' || eventData.type === 'cp') {
      const eventColor = eventData.type === 're' ? settings.reColor : eventData.type === 'cp' ? settings.cpColor : eventData.color;
      const eventType = eventData.type;
      const eventName = eventData.type === 're' ? (eventData.name || 'RE') : eventData.type === 'cp' ? (eventData.name || '21 (Congés annuels)') : eventData.name;
      
      if (shouldExcludeWeekends) {
        // Create individual events for each non-weekend day
        const days = eachDayOfInterval({ start: eventData.startDate, end: eventData.endDate });
        const weekdays = days.filter(d => !isWeekend(d));
        // Group consecutive weekdays into ranges
        let rangeStart: Date | null = null;
        let rangeEnd: Date | null = null;
        weekdays.forEach((day, i) => {
          if (!rangeStart) { rangeStart = day; rangeEnd = day; return; }
          const prevDay = weekdays[i - 1];
          const diff = (day.getTime() - prevDay.getTime()) / (1000 * 60 * 60 * 24);
          if (diff === 1) {
            rangeEnd = day;
          } else {
            addEvent({ type: eventType, name: eventName, startDate: rangeStart, endDate: rangeEnd!, startTime: eventData.startTime, endTime: eventData.endTime, color: eventColor });
            rangeStart = day;
            rangeEnd = day;
          }
        });
        if (rangeStart && rangeEnd) {
          addEvent({ type: eventType, name: eventName, startDate: rangeStart, endDate: rangeEnd, startTime: eventData.startTime, endTime: eventData.endTime, color: eventColor });
        }
      } else {
        addEvent({ type: eventType, name: eventName, startDate: eventData.startDate, endDate: eventData.endDate, startTime: eventData.startTime, endTime: eventData.endTime, color: eventColor });
      }
    } else if (eventData.type === 'astreinte-ponctuelle') {
      addPonctualAstreinte(eventData.startDate, eventData.endDate, eventData.name);
    } else if (eventData.type === 'astreinte-cancelled') {
      cancelAstreinteDates(eventData.startDate, eventData.endDate, eventData.name, eventData.startTime, eventData.endTime);
    }
  }, [addEvent, addPonctualAstreinte, cancelAstreinteDates, settings.reColor, settings.cpColor]);

  const handleYearChange = useCallback((year: number) => {
    const numericYear = typeof year === 'string' ? parseInt(year, 10) : year;
    if (isNaN(numericYear) || numericYear < 1900 || numericYear > 2100) return;
    const safeMonth = Math.min(Math.max(currentDate.getMonth(), 0), 11);
    const safeDate = new Date(numericYear, safeMonth, 1);
    if (!isNaN(safeDate.getTime())) goToDate(safeDate);
  }, [currentDate, goToDate]);

  const openAddEventFromDetails = useCallback(() => {
    setDayDetailsOpen(false);
    setAddEventOpen(true);
  }, []);

  if (!(currentDate instanceof Date) || isNaN(currentDate.getTime())) {
    return <div className="p-4 text-center text-muted-foreground">Chargement du calendrier…</div>;
  }

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-background relative">
      {/* Background watermark logo - full page at 15% opacity */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img src="/images/logo-wplanner.png" alt="" className="w-full h-full object-contain opacity-[0.15]" />
      </div>
      <div className="px-2 sm:px-4 lg:px-6 py-2 sm:py-4 max-w-7xl mx-auto relative z-10">
        <UnifiedToolbar
          currentDate={currentDate}
          currentYear={currentDate.getFullYear()}
          viewMode={viewMode}
          activeTab={activeTab}
          onPrevMonth={viewMode === 'year' 
            ? () => { const y = currentDate.getFullYear() - 1; if (y >= 1900 && y <= 2100) goToDate(new Date(y, 0, 1)); }
            : goToPrevMonth
          }
          onNextMonth={viewMode === 'year'
            ? () => { const y = currentDate.getFullYear() + 1; if (y >= 1900 && y <= 2100) goToDate(new Date(y, 0, 1)); }
            : goToNextMonth
          }
          onToday={goToToday}
          onAddEvent={() => { setSelectedDate(new Date()); setAddEventOpen(true); }}
          onOpenSettings={() => setSettingsOpen(true)}
          onViewModeChange={setViewMode}
          onYearChange={handleYearChange}
          onTabChange={setActiveTab}
          onExportPDF={() => {
            if (viewMode === 'year') {
              exportAnnualPDF({
                year: currentDate.getFullYear(),
                settings,
                events,
                astreintes: yearAstreintes,
                vacations,
                arrets,
                holidays,
                cancelledDates: cancelledAstreinteDates,
              });
            } else if (viewMode === 'month') {
              exportMonthlyPDF({
                year: currentDate.getFullYear(),
                month: currentDate.getMonth(),
                settings,
                events,
                astreintes: yearAstreintes,
                vacations,
                arrets,
                holidays,
                cancelledDates: cancelledAstreinteDates,
              });
            } else {
              exportPDF(viewMode);
            }
          }}
          onImport={() => setImportOpen(true)}
          onICSImport={() => setIcsImportOpen(true)}
          onICSExport={() => setIcsExportOpen(true)}
        />

        {/* Compteurs permanents */}
        <div className="mt-1.5 sm:mt-2">
          <SoldesCounters rhState={rhState} />
        </div>

        {activeTab === 'calendar' && (
          <div className="mt-2 sm:mt-3">
            <div className="mb-2 sm:mb-3" data-legend-print>
              <UnifiedLegend 
                settings={settings} 
                defaultExpanded={defaultSectionsExpanded}
                viewMode={viewMode}
                currentDate={currentDate}
                arrets={arrets}
                vacations={vacations}
                events={events}
                holidays={holidays}
                astreintes={yearAstreintes}
                ponctualAstreintes={ponctualAstreintes}
                cancelledAstreinteDates={cancelledAstreinteDates}
              />
            </div>

            {/* Calendar View with swipe */}
            <div className="mt-3 sm:mt-4" data-calendar-print {...swipeHandlers}>
              {viewMode === 'year' ? (
                <UnifiedYearView
                  year={currentDate.getFullYear()}
                  settings={settings}
                  astreintes={yearAstreintes}
                  vacations={vacations}
                  arrets={arrets}
                  isAstreinteDay={isAstreinteDay}
                  hasConflict={hasConflict}
                  isHoliday={isHoliday}
                  isVacationDay={isVacationDay}
                  isArretDay={isArretDay}
                  isREDay={isREDay}
                  isCPDay={isCPDay}
                  getEventsForDate={getEventsForDate}
                  getNonREEventsForDate={getNonREEventsForDate}
                  isDateCancelled={isDateCancelled}
                  onMonthClick={handleMonthClick}
                  onDayClick={handleDayClick}
                />
              ) : viewMode === 'week' ? (
                <WeekTimeline
                  weekStartDate={weekViewDate}
                  settings={settings}
                  astreintes={currentAstreintes}
                  isAstreinteDay={isAstreinteDay}
                  isHoliday={isHoliday}
                  getEventsForDate={getEventsForDate}
                  isDateCancelled={isDateCancelled}
                  onDayClick={handleDayClick}
                />
              ) : (
                <UnifiedCalendarGrid
                  currentDate={currentDate}
                  settings={settings}
                  astreintes={currentAstreintes}
                  vacations={vacations}
                  arrets={arrets}
                  isAstreinteDay={isAstreinteDay}
                  hasConflict={hasConflict}
                  getConflictDetails={getConflictDetails}
                  isHoliday={isHoliday}
                  isVacationDay={isVacationDay}
                  isArretDay={isArretDay}
                  isREDay={isREDay}
                  isCPDay={isCPDay}
                  getEventsForDate={getEventsForDate}
                  getNonREEventsForDate={getNonREEventsForDate}
                  isDateCancelled={isDateCancelled}
                  onDayClick={handleDayClick}
                  onWeekNumberClick={(weekDate: Date) => {
                    setWeekViewDate(weekDate);
                    setViewMode('week');
                  }}
                  showWeekNumbers={true}
                />
              )}
            </div>

            {/* Collapsible Arrêts - BELOW calendar */}
            <div className="mt-2 sm:mt-3" data-arret-print>
              <UnifiedArretBar
                arrets={arrets}
                currentDate={currentDate}
                settings={settings}
                viewMode={viewMode}
                defaultExpanded={defaultSectionsExpanded}
              />
            </div>



          </div>
        )}

        {activeTab === 'events' && (
          <div className="mt-3 sm:mt-4">
            <EventsManager
              events={events}
              vacations={vacations}
              arrets={arrets}
              holidays={holidays}
              ponctualAstreintes={ponctualAstreintes}
              cancelledAstreinteDates={cancelledAstreinteDates}
              onUpdateEvent={updateEvent}
              onDeleteEvent={removeEvent}
              onUpdateVacation={updateVacation}
              onDeleteVacation={deleteVacation}
              onUpdateArret={updateArret}
              onDeleteArret={deleteArret}
              onUpdateHoliday={updateHoliday}
              onDeleteHoliday={deleteHoliday}
              onRemovePonctualAstreinte={removePonctualAstreinte}
              onUpdatePonctualAstreinte={updatePonctualAstreinte}
              onRestoreCancelledDate={restoreCancelledDate}
              onAddVacation={addVacation}
              onAddArret={addArret}
              onAddHoliday={addHoliday}
              onAddPonctualAstreinte={addPonctualAstreinte}
              onCancelAstreinteDates={cancelAstreinteDates}
              onAddEvent={addEvent}
            />
          </div>
        )}

        {activeTab === 'conflicts' && (
          <div className="mt-3 sm:mt-4">
            <ConflictsList
              events={events}
              astreintes={yearAstreintes}
              settings={settings}
              year={currentDate.getFullYear()}
              cancelledDates={cancelledAstreinteDates}
            />
          </div>
        )}

        {activeTab === 'pointage' && (
          <div className="mt-3 sm:mt-4">
            <PointageModule />
          </div>
        )}
      </div>

      <DayDetails
        date={selectedDate || null}
        isOpen={dayDetailsOpen}
        onClose={() => setDayDetailsOpen(false)}
        onAddEvent={openAddEventFromDetails}
        events={selectedDayData?.events || []}
        astreinte={selectedDayData?.astreinte || null}
        holiday={selectedDayData?.holiday || null}
        vacation={selectedDayData?.vacation || null}
        arret={selectedDayData?.arret || null}
        arrets={arrets}
        cancelled={selectedDayData?.cancelled || null}
        settings={settings}
      />

      <SettingsPanel
        settings={settings}
        onUpdateSettings={updateSettings}
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <AddEventDialog
        isOpen={addEventOpen}
        onClose={() => setAddEventOpen(false)}
        onAdd={handleAddEvent}
        initialDate={selectedDate}
        existingEvents={events.map(e => ({ name: e.name, startDate: e.startDate, endDate: e.endDate }))}
      />

      <ExcelImport
        open={importOpen}
        onOpenChange={setImportOpen}
        onImportEvents={importEvents}
        onImportVacations={importVacations}
        onImportArrets={importArrets}
        onImportHolidays={importHolidays}
      />

      <ICSImportDialog
        open={icsImportOpen}
        onOpenChange={setIcsImportOpen}
        existingEvents={events}
        onImportEvents={importEvents}
        onUpdateEvent={updateEvent}
        onDeleteEvent={removeEvent}
      />

      <ICSExportDialog
        open={icsExportOpen}
        onOpenChange={setIcsExportOpen}
        events={events}
      />

      {settingsOpen && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setSettingsOpen(false)} />
      )}
    </div>
    </ErrorBoundary>
  );
};

export default Index;
```


// path: src/pages/NotFound.tsx
```ts
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

```


// path: src/stores/index.ts
```ts
/**
 * Central store barrel file.
 * Import stores from here for cleaner module boundaries.
 */

export { usePlanningStore } from './planningStore';
export { useTimeStore } from './timeStore';
export { useRHStore } from './rhStore';

```


// path: src/stores/planningStore.ts
```ts
/**
 * Planning store — thin wrapper that re-exports useCalendar.
 * This exists to formalise the module boundary and will be the
 * future migration point when planning data moves to IndexedDB.
 */

export { useCalendar as usePlanningStore } from '@/hooks/useCalendar';

```


// path: src/stores/rhStore.ts
```ts
/**
 * Store RH central unique — W Planner
 * Gère tous les soldes RH avec historique daté.
 * Source unique de vérité pour 21, RE, RC011, RC012.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';

const RH_KEY = 'wplanner-rh-state';

export type RHBalanceType = '21' | 'RE' | 'RC011' | 'RC012';

export interface RHAdjustment {
  id: string;
  type: RHBalanceType;
  delta: number; // positive = credit, negative = debit
  dateEffet: string; // ISO date YYYY-MM-DD
  motif: string;
  timestamp: string; // ISO datetime
}

export interface RHState {
  solde21: number;
  soldeRE: number;
  soldeRC011: number;
  soldeRC012: number;
  dateSolde21: string; // ISO date of last update
  dateSoldeRE: string;
  dateSoldeRC011: string;
  dateSoldeRC012: string;
  historiqueAjustements: RHAdjustment[];
}

const DEFAULT_RH_STATE: RHState = {
  solde21: 173,
  soldeRE: 312,
  soldeRC011: 0,
  soldeRC012: 0,
  dateSolde21: '2026-02-05',
  dateSoldeRE: '2026-02-05',
  dateSoldeRC011: '2026-02-05',
  dateSoldeRC012: '2026-02-05',
  historiqueAjustements: [],
};

function loadRHState(): RHState {
  try {
    const raw = localStorage.getItem(RH_KEY);
    if (raw) return { ...DEFAULT_RH_STATE, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_RH_STATE };
}

function saveRHState(state: RHState) {
  localStorage.setItem(RH_KEY, JSON.stringify(state));
}

let idCounter = Date.now();
function newId(): string {
  return (idCounter++).toString(36);
}

export function useRHStore() {
  const [state, setState] = useState<RHState>(loadRHState);

  useEffect(() => { saveRHState(state); }, [state]);

  /**
   * Update a balance with mandatory date.
   * delta < 0 = debit (pose), delta > 0 = credit (ajout/correction)
   */
  const updateRHBalance = useCallback((
    type: RHBalanceType,
    delta: number,
    dateEffet: string,
    motif: string
  ) => {
    if (!dateEffet) {
      console.error('updateRHBalance: dateEffet is required');
      return;
    }
    setState(prev => {
      const adjustment: RHAdjustment = {
        id: newId(),
        type,
        delta,
        dateEffet,
        motif,
        timestamp: new Date().toISOString(),
      };

      const next = { ...prev, historiqueAjustements: [...prev.historiqueAjustements, adjustment] };

      switch (type) {
        case '21':
          next.solde21 = Math.max(0, prev.solde21 + delta);
          next.dateSolde21 = dateEffet;
          break;
        case 'RE':
          next.soldeRE = Math.max(0, prev.soldeRE + delta);
          next.dateSoldeRE = dateEffet;
          break;
        case 'RC011':
          next.soldeRC011 = Math.max(0, prev.soldeRC011 + delta);
          next.dateSoldeRC011 = dateEffet;
          break;
        case 'RC012':
          next.soldeRC012 = Math.max(0, prev.soldeRC012 + delta);
          next.dateSoldeRC012 = dateEffet;
          break;
      }
      return next;
    });
  }, []);

  /** Set balance directly (for manual corrections in settings) */
  const setRHBalance = useCallback((
    type: RHBalanceType,
    valeur: number,
    dateEffet: string
  ) => {
    if (!dateEffet) {
      console.error('setRHBalance: dateEffet is required');
      return;
    }
    setState(prev => {
      const currentValue = type === '21' ? prev.solde21 : type === 'RE' ? prev.soldeRE : type === 'RC011' ? prev.soldeRC011 : prev.soldeRC012;
      const delta = valeur - currentValue;
      const adjustment: RHAdjustment = {
        id: newId(),
        type,
        delta,
        dateEffet,
        motif: 'Correction manuelle',
        timestamp: new Date().toISOString(),
      };
      const next = { ...prev, historiqueAjustements: [...prev.historiqueAjustements, adjustment] };
      switch (type) {
        case '21': next.solde21 = valeur; next.dateSolde21 = dateEffet; break;
        case 'RE': next.soldeRE = valeur; next.dateSoldeRE = dateEffet; break;
        case 'RC011': next.soldeRC011 = valeur; next.dateSoldeRC011 = dateEffet; break;
        case 'RC012': next.soldeRC012 = valeur; next.dateSoldeRC012 = dateEffet; break;
      }
      return next;
    });
  }, []);

  return {
    rhState: state,
    updateRHBalance,
    setRHBalance,
  };
}

```


// path: src/stores/timeStore.ts
```ts
/**
 * Time-tracking store — placeholder for the future timeTracking module.
 * Currently a no-op; will be implemented when the module is enabled.
 */

export interface TimeEntry {
  id: string;
  userId: string;
  date: string; // ISO date
  hoursWorked: number;
  category: string;
  note?: string;
}

export interface TimeStoreState {
  entries: TimeEntry[];
}

const INITIAL_STATE: TimeStoreState = {
  entries: [],
};

/**
 * Placeholder hook — returns an empty state.
 * Will be fully implemented when timeTracking module is activated.
 */
export function useTimeStore() {
  return {
    ...INITIAL_STATE,
    // Future: addEntry, updateEntry, deleteEntry, getWeekTotal, etc.
  };
}

```


// path: src/types/advancedSettings.ts
```ts
/**
 * Advanced work-regulation settings for W Planner.
 * These parameters govern RE/CP counters and legal working-time limits.
 */

export interface AdvancedSettings {
  /** Compteur RE en heures (solde disponible) */
  compteurREHeures: number;
  /** Compteur CP en jours (solde disponible) */
  compteurCPJours: number;
  /** Nombre de semaines hautes obligatoires par cycle */
  nombreSemainesHautesObligatoires: number;
  /** Limite hebdomadaire sur 5 jours (heures) */
  limiteHebdo5j: number;
  /** Limite hebdomadaire sur 6 jours (heures) */
  limiteHebdo6j: number;
  /** Limite journalière (heures) */
  limiteJour: number;
  /** Repos minimum entre deux postes (heures) */
  reposMinimumHeures: number;
}

export const defaultAdvancedSettings: AdvancedSettings = {
  compteurREHeures: 0,
  compteurCPJours: 25,
  nombreSemainesHautesObligatoires: 13,
  limiteHebdo5j: 40,
  limiteHebdo6j: 48,
  limiteJour: 10,
  reposMinimumHeures: 11,
};

```


// path: src/types/calendar.ts
```ts
export type EventType = 
  | 'astreinte'
  | 'astreinte-cancelled'
  | 'astreinte-ponctuelle'
  | 'event'
  | 'vacation'
  | 'holiday'
  | 'arret'
  | 'arret-prepa'
  | 're'  // Repos / Récupération
  | 'cp'; // 21 (Congés annuels)

// Source of an event (for future external calendar sync)
export type EventSource = 'internal' | 'outlook' | 'ios' | 'ics';

export type PatternType = 
  | 'none'
  | 'stripes'
  | 'dots'
  | 'crosshatch'
  | 'waves'
  | 'diagonal'
  | 'grid'
  | 'zigzag';

// Module types for AT preparation phases
export type PrepaModuleType = 'M0' | 'M1' | 'M2A' | 'M2B' | 'M3' | 'M4';

// Pattern mapping for each preparation module
export const modulePatterns: Record<PrepaModuleType, PatternType> = {
  'M0': 'dots',
  'M1': 'stripes',
  'M2A': 'diagonal',
  'M2B': 'crosshatch',
  'M3': 'waves',
  'M4': 'grid',
};
export interface CalendarEvent {
  id: string;
  type: EventType;
  name: string;
  startDate: Date;
  endDate: Date;
  startTime?: string; // HH:mm format, e.g. "05:00"
  endTime?: string;   // HH:mm format, e.g. "21:00"
  color: string;
  pattern?: PatternType;
  isRecurring?: boolean;
  recurringWeeks?: number;
  source?: EventSource; // Origin of the event (default: 'internal')
  externalId?: string;  // UID from external calendar (ICS VEVENT UID)
  readonly?: boolean;   // If true, event cannot be edited (external events)
}

export interface Astreinte {
  id: string;
  name?: string; // Name for display (for cancellation or ponctuelle)
  startDate: Date; // Thursday
  endDate: Date; // Following Thursday
  isCancelled: boolean;
  isPonctuelle: boolean;
}

// Cancelled dates for specific days (not entire astreinte periods)
export interface CancelledAstreinteDate {
  id: string;
  date: Date;
  name: string;
  astreinteId: string; // Reference to the parent astreinte
  startTime?: string; // HH:mm format, e.g. "00:00"
  endTime?: string;   // HH:mm format, e.g. "23:59"
}

export interface Vacation {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
}

export interface Holiday {
  date: Date;
  name: string;
}

export interface Arret {
  id: string;
  type: 'arret' | 'prepa';
  name: string;
  startDate: Date;
  endDate: Date;
  color?: string; // Optional - will use tranche color by default
  pattern?: PatternType;
  tranche: 'Tr2' | 'Tr3' | 'Tr4' | 'Tr5';
  module?: PrepaModuleType; // For prepa types: M0, M1, M2A, M2B, M3, M4
  parentArretId?: string; // Reference to the parent AT for preparations
}

export interface CalendarSettings {
  // Vue annuelle - Bandeau mois
  yearMonthBgColor: string;
  yearMonthTextColor: string;
  // Vue mensuelle - Bandeau supérieur (Lun-Dim)
  monthHeaderBgColor: string;
  monthHeaderTextColor: string;
  // Vue mensuelle - Bandeau gauche (n° semaine)
  weekNumberBgColor: string;
  weekNumberTextColor: string;
  // Vue mensuelle - Cases jours
  dayCellBgColor: string;
  dayCellTextColor: string;
  weekendDaysBgColor: string;
  weekendDaysTextColor: string;
  // Jours fériés
  holidayPattern: PatternType;
  // Astreintes
  astreinteColor: string;
  astreinteCancelledColor: string;
  astreinteCancelledPattern: PatternType;
  astreintePonctuelleColor: string;
  // Vacances scolaires
  vacationColor: string;
  vacationTextColor: string;
  // RE / 21 (Congés annuels)
  reColor: string;
  cpColor: string; // 21 (Congés annuels)
  // Couleurs par tranche - Arrêts
  arretTr2Color: string;
  arretTr3Color: string;
  arretTr4Color: string;
  arretTr5Color: string;
  // Couleurs par tranche - Préparations
  prepaTr2Color: string;
  prepaTr3Color: string;
  prepaTr4Color: string;
  prepaTr5Color: string;
  // Astreinte start date, cycle & PIN
  astreinteStartDate: string; // ISO string
  astreinteCycleWeeks: number; // Cycle length in weeks (default 6)
  settingsPin: string;
}

// Mandatory tranche colors as per specification
export const TRANCHE_COLORS = {
  Tr2: '#3C9453',
  Tr3: '#CC6600',
  Tr4: '#558ED5',
  Tr5: '#FF0000',
} as const;

export const defaultSettings: CalendarSettings = {
  // Vue annuelle
  yearMonthBgColor: '#003A8F',
  yearMonthTextColor: '#FFFFFF',
  // Vue mensuelle - header
  monthHeaderBgColor: '#003A8F',
  monthHeaderTextColor: '#FFFFFF',
  // Vue mensuelle - n° semaine
  weekNumberBgColor: '#E6E6E6',
  weekNumberTextColor: '#4A4A4A',
  // Vue mensuelle - cases jours
  dayCellBgColor: '#FFFFFF',
  dayCellTextColor: '#333333',
  weekendDaysBgColor: '#E6E6E6',
  weekendDaysTextColor: '#4A4A4A',
  // Jours fériés
  holidayPattern: 'stripes',
  // Astreintes
  astreinteColor: '#FFCC00',
  astreinteCancelledColor: '#4A4A4A',
  astreinteCancelledPattern: 'crosshatch',
  astreintePonctuelleColor: '#E30613',
  // Vacances
  vacationColor: '#4CAF50',
  vacationTextColor: '#2D2A00',
  // RE / 21 (Congés annuels)
  reColor: '#E6E6E6',
  cpColor: '#4A4A4A', // 21 (Congés annuels)
  // Tranches
  arretTr2Color: TRANCHE_COLORS.Tr2,
  arretTr3Color: TRANCHE_COLORS.Tr3,
  arretTr4Color: TRANCHE_COLORS.Tr4,
  arretTr5Color: TRANCHE_COLORS.Tr5,
  prepaTr2Color: TRANCHE_COLORS.Tr2,
  prepaTr3Color: TRANCHE_COLORS.Tr3,
  prepaTr4Color: TRANCHE_COLORS.Tr4,
  prepaTr5Color: TRANCHE_COLORS.Tr5,
  // Astreinte
  astreinteStartDate: new Date(2026, 1, 5).toISOString(),
  astreinteCycleWeeks: 6,
  settingsPin: '0000',
};

```


// path: src/types/modules.ts
```ts
/**
 * Module system types for W Planner.
 * Each module represents a self-contained functional unit of the application.
 */

export type ModuleId = 'planning' | 'timeTracking';

export interface ModuleDefinition {
  id: ModuleId;
  label: string;
  description: string;
  enabled: boolean;
  /** Future: version for migrations */
  version: number;
}

/** Registry of all available modules */
export const MODULE_REGISTRY: Record<ModuleId, ModuleDefinition> = {
  planning: {
    id: 'planning',
    label: 'Planning',
    description: 'Calendrier, astreintes, arrêts de tranche, événements',
    enabled: true,
    version: 1,
  },
  timeTracking: {
    id: 'timeTracking',
    label: 'Suivi du temps',
    description: 'Compteurs horaires, suivi RE/CP, limites réglementaires',
    enabled: false, // Future module
    version: 0,
  },
};

/** Returns all enabled modules */
export function getEnabledModules(): ModuleDefinition[] {
  return Object.values(MODULE_REGISTRY).filter((m) => m.enabled);
}

/** Check if a specific module is enabled */
export function isModuleEnabled(id: ModuleId): boolean {
  return MODULE_REGISTRY[id]?.enabled ?? false;
}

```


// path: src/types/pointage.ts
```ts
/**
 * Types for Module 2 – Conformité & Pointage (EDF CNPE Bugey)
 */

export type AstreinteType = 'PLANIFIEE_SANS' | 'INTERVENTION_PLANIFIEE' | 'INTERVENTION_APPEL' | 'HORS_TOUR' | null;

export type PosteType = 'AUCUN' | 'MATIN' | 'APRES_MIDI';

export interface TimeEntry {
  id: string;
  date: string; // ISO date YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  isFormation: boolean;
  isInterventionAstreinte: boolean;
  isAstreinteSansIntervention: boolean;
  suppressionMidi: boolean; // default true if covers 12:00-12:45
  note?: string;
  noteTags?: NoteTag[];
  autoComments?: string[]; // auto-generated comments (IK, prime repas, HS, etc.)
  // Astreinte differentiation
  estAstreinte?: boolean;
  typeAstreinte?: AstreinteType;
  isJourFerie?: boolean; // pour RCO automatique JF
  astreinteCompensee?: boolean; // RCA compensée → génère RCO
  // FPC (Formation Professionnelle Continue)
  isFPC?: boolean;
  fpcHeures?: 7 | 8; // 7h or 8h daily
  // Habillage manuel optionnel (en minutes)
  habillageManuel?: boolean;
  habillageMinutes?: number;
  // Poste (matin / après-midi)
  poste?: PosteType;
}

export type NoteTag = 'prime' | 'ecart' | 'observation' | 'validation-n1';

export const NOTE_TAG_LABELS: Record<NoteTag, string> = {
  prime: 'Prime',
  ecart: 'Écart',
  observation: 'Observation',
  'validation-n1': 'Validation N+1',
};

export type AlertLevel = 'vert' | 'orange' | 'rouge';

export interface ComplianceAlert {
  rule: string;
  level: AlertLevel;
  message: string;
  date?: string; // ISO date
}

export interface DaySummary {
  date: string;
  hoursWorked: number; // effective work hours (after midi deduction)
  habillageHours: number; // fixed 1h if worked, 0 otherwise
  trajetHeures: number; // travel valorisation hours
  totalHours: number; // worked + habillage + trajet
  hasNote: boolean;
  alerts: ComplianceAlert[];
  primeRepas: boolean;
  ikAlert: boolean;
}

export interface OvertimeDetail {
  date: string;
  hours: number;
  rate: number; // percentage (25, 40, 50, 100)
  label: string;
}

export interface WeekSummary {
  weekStart: string;
  weekEnd: string;
  totalHours: number;
  plafondAutorise: number;
  heuresRestantes: number;
  reposQuotidienOk: boolean;
  reposHebdoOk: boolean;
  overallStatus: AlertLevel;
  days: DaySummary[];
  alerts: ComplianceAlert[];
  daysWorkedCount: number;
  overtimeDetails: OvertimeDetail[];
}

export interface PointageSettings {
  seuilOrangeHeures: number;
  seuilRougeHeures: number;
  soldeRE: number;
  dateActivationRE: string;
  seuilAlerteRE: number;
  primeRepasValeur: number;
  alertesActives: boolean;
  communeDepart: string;
  soldeCongesAnnuels: number;
  regime: 'HABA' | 'NORMAL';
  soldeRC011: number;
  soldeRC012: number;
  montantPrimeHebdo: number;
  montantPrimeMensuelle: number;
  // Postes paramétrables
  posteMatinDebut: string;
  posteMatinFin: string;
  posteAMDebut: string;
  posteAMFin: string;
}

export const defaultPointageSettings: PointageSettings = {
  seuilOrangeHeures: 16,
  seuilRougeHeures: 8,
  soldeRE: 312,
  dateActivationRE: '2026-02-05',
  seuilAlerteRE: 14,
  primeRepasValeur: 9.26,
  alertesActives: true,
  communeDepart: 'DECINES CHARPIEU',
  soldeCongesAnnuels: 173,
  regime: 'HABA',
  soldeRC011: 0,
  soldeRC012: 0,
  montantPrimeHebdo: 0,
  montantPrimeMensuelle: 0,
  posteMatinDebut: '05:00',
  posteMatinFin: '13:00',
  posteAMDebut: '13:00',
  posteAMFin: '21:00',
};

```


// path: src/vite-env.d.ts
```ts
/// <reference types="vite/client" />

```


// path: tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        calendar: {
          header: "hsl(var(--calendar-header))",
          weekend: "hsl(var(--calendar-weekend))",
          today: "hsl(var(--calendar-today))",
          grid: "hsl(var(--calendar-grid))",
        },
        astreinte: {
          DEFAULT: "hsl(var(--astreinte))",
          cancelled: "hsl(var(--astreinte-cancelled))",
          ponctuelle: "hsl(var(--astreinte-ponctuelle))",
        },
        event: {
          DEFAULT: "hsl(var(--event-default))",
        },
        vacation: {
          DEFAULT: "hsl(var(--vacation))",
        },
        holiday: {
          DEFAULT: "hsl(var(--holiday))",
        },
        arret: {
          DEFAULT: "hsl(var(--arret))",
          prepa: "hsl(var(--arret-prepa))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
      boxShadow: {
        'calendar': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'calendar-hover': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'card-elevated': '0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

```


// path: tsconfig.json
```json
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "allowJs": true,
    "noUnusedLocals": false,
    "strictNullChecks": false
  }
}

```


// path: vite.config.ts
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

```
