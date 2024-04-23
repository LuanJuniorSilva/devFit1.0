export type IWorkout = {
  id?: string;
  name: string;
  exercises: {
    id: string;
    name: string;
    muscle: string;
    sets: string;
    reps: string;
    load: string;
    done?: boolean;
  }[];
};

export type IMuscle = {
  id: string;
  name: string;
  muscle: string;
  sets: string;
  reps: string;
  load: string;
  done?: boolean;
};
