import { useQuery } from "@tanstack/react-query";
import { getProperties } from "api/api";

export const useProperties = () => {
  const query = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties,
  });

  return { ...query };
};
