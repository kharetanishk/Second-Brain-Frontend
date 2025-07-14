import { Plusicon } from "../icons/Plusicon";
import Button from "./ui/Button";

function App() {
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
          text="HELLO"
          startIcon={<Plusicon size="lg" />}
          onclick={() => alert("HEllo world")}
        />
      </div>
    </>
  );
}

export default App;
