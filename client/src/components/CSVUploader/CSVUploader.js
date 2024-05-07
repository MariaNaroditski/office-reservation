import { useState } from "react";
import { observer } from "mobx-react";
import { action, runInAction } from "mobx";
import Papa from "papaparse";
import { constants } from "./constants";
import { constants as commonConstants } from "../../common/constants";
import { RemoveButton } from "../Buttons/Buttons";
import { postCsvFile } from "../../utils/reservationProxy";
import {
  Input,
  Label,
  Container,
  Text,
  FileDescription,
} from "./CSVUploader.styles";
import { useStoreContext } from "../../hooks/useStoreContext";

const allowedExtensions = ["csv"];

const { inputLabel, changeFile, invalidCSVFile, pleaseWait } = constants;
const { serverError, success } = commonConstants;

const CSVUploader = () => {
  const [error, setError] = useState("");

  const store = useStoreContext();

  const { file, disabled, resetStore } = store;

  const handleFileChange = action((e) => {
    setError("");
    resetStore();

    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      const fileExtension = inputFile?.type.split("/")[1];

      if (!allowedExtensions.includes(fileExtension)) {
        setError(invalidCSVFile);
        store.disabled = true;
        return;
      }

      store.file = inputFile;

      handleParse(inputFile);

      e.target.value = null;
    }
  });

  const handleParse = (file) => {
    const reader = new FileReader();

    // Event listener on reader when the file loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      Papa.parse(target.result, {
        header: true,
        skipEmptyLines: true,
        transformHeader: function (h) {
          return h.trim();
        },

        complete: function (results) {
          const isSuccess = postCsvFile(results.data);
          isSuccess.then((result) => {
            runInAction(() => {
              if (result === success) {
                store.disabled = false;
              } else {
                resetStore();
                store.disabled = true;
                setError(serverError);
              }
            });
          });
        },
      });
    };
    reader.readAsText(file);
  };

  const handleDeleteButton = () => {
    resetStore();
  };

  const isDisabledInput = disabled && file;

  return (
    <Container>
      <Label htmlFor="csvInput" disabled={isDisabledInput}>
        {isDisabledInput ? pleaseWait : file ? changeFile : inputLabel}
      </Label>
      <Input
        onChange={handleFileChange}
        id="csvInput"
        name="file"
        type="File"
        disabled={isDisabledInput}
      />
      {error ? (
        <Text $error={error}>{error}</Text>
      ) : (
        !isDisabledInput &&
        file && (
          <FileDescription>
            <Text>{file.name}</Text>
            <RemoveButton onClick={handleDeleteButton} />
          </FileDescription>
        )
      )}
    </Container>
  );
};

const CSVUploaderObserver = observer(CSVUploader);
export default CSVUploaderObserver;
