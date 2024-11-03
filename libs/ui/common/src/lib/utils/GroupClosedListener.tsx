import { useSSE } from 'react-hooks-sse';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface isFinishedSseDTO {
  isFinished: boolean;
}

export function GroupClosedListener() {
  const state = useSSE('payFinished', {isFinished:false} as isFinishedSseDTO);
  const navigate = useNavigate();

  console.log(state);

  useEffect(() => {
    if (state.isFinished) {
      navigate("/thanks");
    }
  }, [state]);

  return null;
}
