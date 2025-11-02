import { useQuery } from "@tanstack/react-query";

const checkSession = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/session`, {
      credentials: "include",
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.success;
  } catch {
    return false;
  }
};

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: checkSession,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
