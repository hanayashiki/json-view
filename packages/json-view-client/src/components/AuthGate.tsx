import { useEffect, useRef } from "react";

import { useAuth } from "../utils/auth";
import { trpc } from "@/json-view-client/src/utils/trpc";

export function AuthGate(props: React.PropsWithChildren) {
  const { children } = props;
  const { token, generateToken, setToken } = useAuth();

  const meQuery = trpc.me.useQuery(undefined, {
    enabled: !!token,
  });

  const createUserMutation = trpc.createUser.useMutation();

  const creatingUser = useRef(false);

  useEffect(() => {
    (async () => {
      if (!token && !creatingUser.current) {
        creatingUser.current = true;

        const newToken = generateToken();

        try {
          await createUserMutation.mutateAsync({
            token: newToken,
          });
        } finally {
          creatingUser.current = false;
        }

        setToken(newToken);
      }
    })();
  }, [token]);

  const renderLoading = () => {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <img src="/logo.svg" className="h-[7rem] w-[7rem]" />
      </div>
    );
  };

  return meQuery.isLoading ? renderLoading() : <>{children}</>;
}
