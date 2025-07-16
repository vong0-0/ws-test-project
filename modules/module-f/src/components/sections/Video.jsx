import { useEffect, useRef, useState } from "react";

export default function VideoPlayback() {
  const videoRef = useRef(null);
  const [isPageVisible, setIsPageVisible] = useState(true);

  // Check if the video is scrolled into the viewport by at least 50%
  useEffect(() => {
    if (videoRef.current) {
      // Intersection observer options
      const option = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // The element is considered visible when 50% or more is in the viewport
      };

      // Create observer
      const observer = new IntersectionObserver((entries) => {
        entries.map((entry) => {
          if (entry.isIntersecting && document.visibilityState === "visible") {
            console.log("intersected");
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        });
      }, option);

      // Strat observing the video element
      observer.observe(videoRef.current);

      // Clean up function: stop oserving when component unmount
      return () => {
        observer.unobserve(videoRef.current);
        observer.disconnect();
      };
    }
  }, []);

  // Check the page is visible or not
  useEffect(() => {
    function handleVisibleChange() {
      setIsPageVisible(!isPageVisible);
    }

    document.addEventListener("visibilitychange", handleVisibleChange);

    return () =>
      document.addEventListener("visibilitychange", handleVisibleChange);
  }, []);

  return (
    <section id="video-section" className="w-full h-screen">
      <video
        ref={videoRef}
        src="./video/lyon.mp4"
        className="w-full h-full object-fill"
        muted
      ></video>
    </section>
  );
}
