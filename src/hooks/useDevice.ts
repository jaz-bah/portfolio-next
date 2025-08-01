import { useEffect, useState } from "react";

export const useDevice = () => {
    const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");

    useEffect(() => {
        const mobile = window.matchMedia("(max-width: 767px)");
        const tablet = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");

        const check = () => {
            if (mobile.matches) setDevice("mobile");
            else if (tablet.matches) setDevice("tablet");
            else setDevice("desktop");
        };

        check(); // initial
        mobile.addEventListener("change", check);
        tablet.addEventListener("change", check);
        window.addEventListener("resize", check);

        return () => {
            mobile.removeEventListener("change", check);
            tablet.removeEventListener("change", check);
            window.removeEventListener("resize", check);
        };
    }, []);

    return device;
};
