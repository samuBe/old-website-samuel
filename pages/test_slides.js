import { Deck, Chapter, Slide } from "@/components/presentation/slideHelper";
import { DefaultTemplate } from "spectacle";
import { Deck as SlideDeck } from "spectacle";

function App() {
  return (
    <SlideDeck template={<DefaultTemplate />}>
      <Deck template={<DefaultTemplate />}>
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
    </SlideDeck>
  );
}

export default App;
