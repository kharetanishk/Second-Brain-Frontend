import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: any;
  }
}

interface TwitterEmbedProps {
  tweetUrl: string;
}

export const TwitterEmbed = ({ tweetUrl }: TwitterEmbedProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Convert x.com to twitter.com if needed
    const transformedUrl = tweetUrl.replace("x.com", "twitter.com");

    const loadTweet = () => {
      if (!window.twttr) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          window.twttr?.widgets?.load(containerRef.current);
        };
        document.body.appendChild(script);
      } else {
        window.twttr?.widgets?.load(containerRef.current);
      }
    };

    loadTweet();
  }, [tweetUrl]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden flex justify-center items-center"
    >
      <blockquote className="twitter-tweet" data-dnt="true" data-theme="light">
        <a href={tweetUrl.replace("x.com", "twitter.com")} />
      </blockquote>
    </div>
  );
};
