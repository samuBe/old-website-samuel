import { Visual } from "@/components/loadVisualByJson";
import { Deck, Chapter, Slide } from "@/components/presentation/slideHelper";
import { KulTemplate } from "@/components/presentation/template";
import theme from "@/components/presentation/theme";
import { Suspense } from "react";
import { DefaultTemplate, FlexBox } from "spectacle";
import { Deck as SlideDeck } from "spectacle";
import { Text } from "spectacle";
import { Box } from "spectacle";
import { InlineMath } from "react-katex";
import { Grid } from "@mui/material";

function App() {
  return (
    <Deck
      template={KulTemplate}
      theme={theme}
      title={{
        author: "Samuel Berton",
        subtitle: "2023.05.25",
        title: "Thesis Meeting 22",
      }}
    >
      <Chapter title="Visual Done">
        <Slide title="Created the visual in javascript">
          <FlexBox
            height={"60%"}
            alignItems={"top"}
            justifyContent={"space-between"}
          >
            <div>
              <Text>The visual now works in JS</Text>
              <Text>Except for convention and laser</Text>
            </div>
            <Suspense>
              <div
                style={{ height: "100%", width: "80%", alignSelf: "center" }}
              >
                <Visual json={"/json/checkpoints/coupled.json"} />
              </div>
            </Suspense>
          </FlexBox>
        </Slide>
        <Slide title="Side-effect: had to create template in JS">
          <Text>Results are visible here</Text>
          <Text>
            Will create backup slides in <InlineMath>\LaTeX</InlineMath>{" "}
          </Text>
        </Slide>
      </Chapter>
      <Chapter title="Two drones done">
        <Slide title="Two drones with 50% charging ratio">
          <FlexBox
            alignItems={"top"}
            justifyContent={"space-between"}
            height="70%"
          >
            <Text>The two drones works</Text>
            <Suspense>
              <div
                style={{ alignSelf: "center", width: "80%", height: "100%" }}
              >
                <Visual json={"/json/checkpoints/twoDrone.json"} />
              </div>
            </Suspense>
          </FlexBox>
        </Slide>
      </Chapter>
    </Deck>
  );
}

export default App;
