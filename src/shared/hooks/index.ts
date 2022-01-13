import { count } from 'console';
import { useMemo, useState,useCallback, useReducer, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory, useLocation } from 'react-router-dom';
import { responsiveType } from 'shared/styles';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ query: responsiveType.mobile });
  const isTablet = useMediaQuery({ query: responsiveType.tablet });
  const isBigScreen = useMediaQuery({ query: responsiveType.bigScreen });
  return { isMobile, isTablet, isBigScreen };
};

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export function usePreviousPath() {
  const history: any = useHistory();

  let previousPath = null;
  if (!history.location.state) {
    return { previousPath };
  }

  const { pathname, search }: any = history.location.state.from;

  if (pathname) {
    previousPath = pathname;
  }
  if (search) {
    previousPath += search;
  }

  return { previousPath };
}



export function useFormFields(initialState:any) {
  const [fields, setValues] = useState<any>(initialState);

  return [
    fields,
    function(event:any) {
      setValues({
        ...fields,
        [event.target.id]: event.target.value
      });
    }
  ];
}

type countDownActions =
  | { type: 'START' }
  | { type: 'RESET'; payload: number }
  | { type: 'PAUSE' }
  | { type: 'RUNNING' }
  | { type: 'TICK'; payload: number }

type countDownState = {
  canStart: boolean
  countdown: number
  isRunning: boolean
}

function countDownReducer(state: countDownState, action: countDownActions) {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        canStart: state.countdown !== 0,
      }
    case 'RESET':
      return {
        ...state,
        countdown: action.payload,
        canStart: false,
        isRunning: false,
      }
    case 'PAUSE':
      return {
        ...state,
        canStart: false,
        isRunning: false,
      }
    case 'RUNNING':
      return {
        ...state,
        isRunning: true,
      }
    case 'TICK':
      return {
        ...state,
        countdown: state.countdown - action.payload,
      }
    default:
      return state
  }
}

export function useCountdownTimer(
  timer:number=0,
  interval:number = 1000,
  autostart:boolean = false,
  expireImmediate:boolean = false,
  resetOnExpire:boolean = true,
  onExpire?:()=>void,
  onReset?:()=>void,
): {
  countdown: number,
  isRunning: boolean,
  start: () => void,
  reset: () => void,
  pause: () => void} {
  const [state, dispatch] = useReducer(countDownReducer, {
    canStart: autostart,
    countdown: timer,
    isRunning: false,
  })

  function start() {
    dispatch({ type: 'START' })
  }

  function pause() {
    dispatch({ type: 'PAUSE' })
  }

  function initStopped(time: number) {
    dispatch({ type: 'RESET', payload: time })
  }

  const reset = useCallback(() => {
    initStopped(timer)
    if (onReset && typeof onReset === 'function') {
      onReset()
    }
  }, [timer, onReset])

  const expire = useCallback(() => {
    initStopped(resetOnExpire ? timer : 0)
    if (onExpire && typeof onExpire === 'function') {
      onExpire()
    }
  }, [timer, onExpire, resetOnExpire])

  useEffect(() => {
    function tick() {
      if (
        state.countdown / 1000 <= 0 ||
        (expireImmediate && (state.countdown - interval) / 1000 <= 0)
      ) {
        expire()
      } else {
        dispatch({ type: 'TICK', payload: interval })
      }
    }

    let id: NodeJS.Timeout
    if (state.canStart) {
      id = setInterval(tick, interval)
      if (!state.isRunning) {
        dispatch({ type: 'RUNNING' })
      }
    }
    return () => clearInterval(id)
  }, [
    expire,
    expireImmediate,
    interval,
    state.canStart,
    state.countdown,
    state.isRunning,
  ])

  return {
    countdown: state.countdown,
    isRunning: state.isRunning,
    start,
    reset,
    pause,
  }
}
