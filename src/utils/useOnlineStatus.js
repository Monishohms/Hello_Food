import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [internetStatus, setInternetStatus] = useState(true);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setInternetStatus(false);
    });

    window.addEventListener("online", () => {
      setInternetStatus(true);
    });
  }, []);
  return internetStatus;
};

export default useOnlineStatus;
