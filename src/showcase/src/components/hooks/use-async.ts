import { useEffect, useState } from "react";

export function useAsync<T>(fn: () => Promise<T>): [T | undefined, boolean, Error | undefined] {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    setLoading(true);

    fn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, loading, error];
}
