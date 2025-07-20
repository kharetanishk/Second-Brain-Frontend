import { Share2 } from "../../icons/Shareicon";
import { Trash2 } from "../../icons/Trashicon";
import { TwitterEmbed } from "../Tweetframe";

type ContentType =
  | "youtube"
  | "twitter"
  | "article"
  | "image"
  | "video"
  | "pdf";

export interface CardProps {
  _id: string;
  title: string;
  type: ContentType;
  link: {
    url: string;
  };
  tags?: string[];
  onDelete: () => void;
  onShare: () => void;
}

export const Cards = ({
  _id,
  title,
  type,
  link,
  tags = [],
  onDelete,
  onShare,
}: CardProps) => {
  const url = link?.url;
  const previewWrapperClass =
    "w-full aspect-video rounded-md overflow-hidden bg-gray-100";

  const renderPreview = () => {
    if (!url)
      return (
        <div className="text-sm text-gray-400 italic">No link provided</div>
      );

    // YouTube or Video
    if (
      (type === "youtube" || type === "video") &&
      (url.includes("youtube.com") || url.includes("youtu.be"))
    ) {
      let videoId = "";
      if (url.includes("youtu.be")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else {
        videoId = new URL(url).searchParams.get("v") || "";
      }
      return (
        <div className={previewWrapperClass}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full h-full"
            allowFullScreen
            title="YouTube Preview"
          />
        </div>
      );
    }

    // Twitter
    if (type === "twitter") {
      return (
        <div className={previewWrapperClass}>
          <TwitterEmbed tweetUrl={url} />
        </div>
      );
    }

    // Image
    if (type === "image") {
      return (
        <div className={previewWrapperClass}>
          <img
            src={url}
            alt="Image Preview"
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    // PDF
    if (type === "pdf") {
      return (
        <div className="text-sm border p-3 rounded-md text-center bg-gray-50">
          <p className="mb-2 text-gray-700">PDF Document</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            Open PDF
          </a>
        </div>
      );
    }

    // Article
    if (type === "article") {
      return (
        <div className="text-sm border p-3 rounded-md bg-gray-50 text-center">
          <p className="mb-2 text-gray-700">Article</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            View Article
          </a>
        </div>
      );
    }

    return (
      <div className="text-sm text-gray-400 italic">
        Unsupported content type
      </div>
    );
  };

  return (
    <div className="bg-white border shadow-md rounded-xl p-4 space-y-4 w-full max-w-sm min-h-[370px] flex flex-col justify-between sm:w-full">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg truncate">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={onShare}
              className="text-blue-500 hover:text-green-600"
              title="Share"
            >
              <Share2 size="size-5" />
            </button>
            <button
              onClick={onDelete}
              className="text-gray-600 hover:text-red-600"
              title="Delete"
            >
              <Trash2 size="size-5" />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="mt-3">{renderPreview()}</div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
