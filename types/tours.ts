export type Tour = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  steps: TourSteps[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type TourSteps = {
  id: string;
  step_viewed: number;
  title: string;
  content: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  percentage: number;
};

export type TourStep = {
  id: string;
  tour_id: string;
  step_order: number;
  title: string;
  content: string;
  target_selector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  created_at: string;
};

export type TourAnalytics = {
  id: string;
  tour_id: string;
  step_id: string | null;
  event_type: 'started' | 'completed' | 'skipped' | 'step_viewed';
  session_id: string;
  created_at: string;
};
