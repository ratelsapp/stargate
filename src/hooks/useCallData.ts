import { useState, useMemo, useEffect } from "react";

export type Result<T> = T | undefined;

export type Call<T> = () => Promise<Result<T>>;

export function useCallData<T>(fn: Call<T>, valid?: undefined | boolean, reload?: number | string | boolean) {
  const [result, setResult] = useState<Result<T>>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fn && valid !== false) {
      setLoading(true);
      fn().then((result) => {
        setResult(result);
        setLoading(false);
      });
    }
  }, [fn, valid, reload]);

  return useMemo(
    () => ({
      result,
      loading,
    }),
    [result, loading]
  );
}
