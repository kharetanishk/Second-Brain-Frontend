import { Plusicon } from "../icons/Plusicon";
import Button from "./ui/Button";
import { Cards } from "./ui/Cards";

function App() {
  {
    /*testing*/
  }
  return (
    <>
      <div>
        <Button
          variant="primary"
          size="sm"
          text="HELLO"
          onclick={() => alert("HEllo world")}
        />
        <Button
          variant="secondary"
          size="md"
          text="HELLO"
          onclick={() => alert("HEllo world")}
        />
        <Button
          variant="primary"
          size="lg"
          text="Add Content"
          startIcon={<Plusicon size="lg" />}
          onclick={() => alert("HEllo world")}
        />
        <Cards
          id="1"
          title="My YouTube Video"
          type="video"
          link={{ url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }}
          tags={["video", "music", "fun"]}
          onDelete={() => alert("Delete clicked")}
          onShare={() => alert("Share clicked")}
        />
        <Cards
          id="2"
          title="Sample Image"
          type="image"
          link={{ url: "https://picsum.photos/300" }}
          tags={["random", "nature", "sample"]}
          onDelete={() => alert("Delete clicked")}
          onShare={() => alert("Share clicked")}
        />
      </div>
    </>
  );
}

export default App;
