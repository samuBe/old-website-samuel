import { Deck, Chapter, Slide } from "@/components/presentation/slideHelper";
import { KulTemplate } from "@/components/presentation/template";
import theme from "@/components/presentation/theme";
import { DefaultTemplate } from "spectacle";
import { Deck as SlideDeck } from "spectacle";

function App() {
  return (
    <Deck template={KulTemplate} theme={theme}>
      <Chapter title="test">
        <Slide title="Introduction">
          <p>This is the introduction slide.</p>
        </Slide>
      </Chapter>
      <Chapter title="test2">
        <Slide title="New Ideas">
          <p>This is a new ideas slide.</p>
        </Slide>
      </Chapter>
    </Deck>
  );
}

export default App;
