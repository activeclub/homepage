import YouTubePlayer from "react-player/youtube";
import type { PreviewProps } from "sanity";

export function YouTubePreview(props: PreviewProps) {
  const { title: url } = props;

  return (
    <div className="flex justify-center items-center">
      {typeof url === "string" ? (
        <YouTubePlayer url={url} />
      ) : (
        <p>Add a YouTube URL</p>
      )}
    </div>
  );
}
