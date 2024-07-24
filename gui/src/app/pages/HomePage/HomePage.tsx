import { Hyperlink } from "@fi-sci/misc";
import { FunctionComponent } from "react";
import { FaGithub } from "react-icons/fa";
import useRoute from "../../useRoute";

type Props = {
  width: number;
  height: number;
};

const HomePage: FunctionComponent<Props> = ({ width, height }) => {
  const { setRoute } = useRoute();
  return (
    <div style={{ padding: 20, maxWidth: 800 }}>
      <h2>Welcome to Neurosift</h2>
      <p>
        Neurosift is a browser-based tool designed for the visualization of NWB
        (Neurodata Without Borders) files, whether stored locally or hosted
        remotely, and enables interactive exploration of the DANDI Archive.
      </p>
      <p>
        <Hyperlink href="https://github.com/flatironinstitute/neurosift">
          Read more
        </Hyperlink>
      </p>
      <hr />
      <div>
        <Hyperlink onClick={() => setRoute({ page: "tests" })}>
          Component tests
        </Hyperlink>
      </div>
      <hr />
      <p>
        <Hyperlink href="https://github.com/flatironinstitute/neurosift/issues">
          Request a feature or report a bug
        </Hyperlink>
      </p>
      <p>
        <FaGithub /> If you find this project useful in your research, please{" "}
        <Hyperlink href="https://github.com/flatironinstitute/neurosift">
          give us a star on GitHub
        </Hyperlink>
        .
      </p>
    </div>
  );
};

export default HomePage;
