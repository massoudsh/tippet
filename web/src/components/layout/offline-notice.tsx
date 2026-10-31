"use client";

import { useEffect, useState } from "react";
import { Alert } from "@/components/ui/alert";

export function OfflineNotice() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const update = () => setOffline(!navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => { window.removeEventListener("online", update); window.removeEventListener("offline", update); };
  }, []);
  return offline ? <Alert variant="warning">اتصال اینترنت قطع است. اطلاعات فرم را نگه دار و پس از اتصال دوباره تلاش کن.</Alert> : null;
}
