import { constants } from "./constants";
import { Container, Title, Explanation } from "./Main.styles";
import CSVUploaderObserver from "../CSVUploader/CSVUploader";
import RequestedDataObserver from "../RequestedByDateData/RequestedByDateData";

const { title, explanation } = constants;

const Main = () => {
  return (
    <Container>
      <Title>{title}</Title>
      <Explanation>{explanation}</Explanation>
      <CSVUploaderObserver />
      <RequestedDataObserver />
    </Container>
  );
};

export default Main;
