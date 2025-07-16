import { Share2 } from "../../icons/Shareicon";
import { Trash2 } from "../../icons/Trashicon";

type ContentType = "article" | "image" | "video" | "pdf";

export interface CardProps {
  id: string;
  title: string;
  type: ContentType;
  link?: {
    url: string;
  };
  tags?: string[];
  onDelete: () => void;
  onShare: () => void;
}

export const Cards = (props: CardProps) => {
  const renderPreview = () => {
    const url = props.link?.url;
    if (!url) {
      return <div className="text-sm text-gray-500">No link provided</div>;
    }

    const previewWrapperClass = "w-full h-52 rounded-md overflow-hidden";

    if (props.type === "video" && url.includes("youtube.com")) {
      const videoId = new URL(url).searchParams.get("v");
      return (
        <div className={previewWrapperClass}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      );
    }

    if (props.type === "image") {
      return (
        <div className={previewWrapperClass}>
          <img src={url} alt="preview" className="w-full h-full object-cover" />
        </div>
      );
    }

    if (props.type === "pdf") {
      return (
        <div className={previewWrapperClass}>
          <iframe src={url} className="w-full h-full" title="PDF preview" />
        </div>
      );
    }

    if (props.type === "article") {
      return (
        <div className="text-sm text-gray-700 border p-3 rounded-md">
          <a href={url} target="_blank" className="underline">
            View Article
          </a>
        </div>
      );
    }

    return <div className="text-sm text-gray-500">Unsupported content</div>;
  };

  return (
    <div className="bg-white  shadow-md rounded-xl p-4 space-y-3 border w-full max-w-[300px] min-h-[370px] flex flex-col justify-between ">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-lg">{props.title}</h2>
          <div className="flex gap-2">
            <button
              onClick={props.onShare}
              className="text-black hover:text-green-800 cursor-pointer"
            >
              <Share2 size="size-5" />
            </button>
            <button
              onClick={props.onDelete}
              className="text-black-500 hover:text-red-700 cursor-pointer"
            >
              <Trash2 size="size-5" />
            </button>
          </div>
        </div>

        <div>{renderPreview()}</div>
      </div>

      {props.tags && props.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {props.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-sm text-gray-800 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
