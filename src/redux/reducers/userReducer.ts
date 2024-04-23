import {createSlice} from '@reduxjs/toolkit';
import {IWorkout} from '../../interfaces/IWorkout';

const initialState: {
  name: string;
  level: string;
  workoutDays: number[];
  myWorkouts: IWorkout[];
  lastWorkout: string;
  dailyProgress: string[];
} = {
  name: '',
  level: '', // beginner, intermediate, advanced
  workoutDays: [], // 1-6
  myWorkouts: [],
  lastWorkout: '', // ID
  dailyProgress: ['2024-04-11', '2024-04-10'],
};

const slice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setWorkoutDays: (state, action) => {
      state.workoutDays = action.payload;
    },
    setLevel: (state, action) => {
      state.level = action.payload;
    },
    setLastWorkout: (state, action) => {
      state.lastWorkout = action.payload;
    },
    addWorkout: (state, action) => {
      let myWorkouts = [...state.myWorkouts];
      if (myWorkouts.findIndex(i => i.id === action.payload.id) < 0) {
        myWorkouts.push(action.payload);
        state.myWorkouts = myWorkouts;
      }
    },
    updateWorkout: (state, action) => {
      let myWorkouts = [...state.myWorkouts];

      let index = myWorkouts.findIndex(i => i.id === action.payload.id);
      if (index > -1) {
        // myWorkouts[index].name = action.payload.name;
        // myWorkouts[index].exercises = action.payload.exercises;
        myWorkouts[index] = action.payload;
      }

      state.myWorkouts = myWorkouts;
    },
    delWorkout: (state, action) => {
      let myWorkouts = [...state.myWorkouts];
      myWorkouts = myWorkouts.filter(i => i.id !== action.payload.id);
      state.myWorkouts = myWorkouts;
    },
    addProgress: (state, action) => {
      let dailyProgress = [...state.dailyProgress];
      if (!dailyProgress.includes(action.payload)) {
        dailyProgress.push(action.payload);
        state.dailyProgress = dailyProgress;
      }
    },
    deleteProgress: (state, action) => {
      let dailyProgress = [...state.dailyProgress];
      dailyProgress = dailyProgress.filter(i => i !== action.payload);
      state.dailyProgress = dailyProgress;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const {
  setName,
  setWorkoutDays,
  setLevel,
  setLastWorkout,
  addWorkout,
  updateWorkout,
  delWorkout,
  addProgress,
  deleteProgress,
  reset,
} = slice.actions;
export default slice.reducer;
