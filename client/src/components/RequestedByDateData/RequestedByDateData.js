import { observer } from "mobx-react";
import { BasicButton } from "../Buttons/Buttons";
import { constants } from "./constants";
import { constants as commonConstants } from "../../common/constants";
import { getCalculatedCsvData } from "../../utils/reservationProxy";
import {
  Container,
  InputContainer,
  Label,
  DateInput,
  Text,
  Error,
} from "./RequestedByDateData.styles";
import { useStoreContext } from "../../hooks/useStoreContext";
import { action, runInAction } from "mobx";
import { useEffect, useState } from "react";

const {
  text,
  expectedRevenueText,
  totalCapacityOfUnreservedOfficesText,
  calculate,
} = constants;

const { serverError } = commonConstants;

const RequestedByDateData = () => {
  const [error, setError] = useState("");

  const store = useStoreContext();
  const { date, disabled, file, reservationCalculation, getMonthAndYear } =
    store;

  useEffect(() => {
    if (!file) setError("");
  }, [file]);

  let formattedExpectedRevenue;

  if (reservationCalculation) {
    const formatter = new Intl.NumberFormat("en-US");
    formattedExpectedRevenue = formatter.format(
      +reservationCalculation.totalPrice.toFixed(2)
    );
  }

  const handleOnChange = action((e) => {
    store.reservationCalculation = null;
    store.date = e.target.value;
    setError("");
  });

  const handleCalculationClick = async () => {
    const { year, month } = getMonthAndYear();
    await getCalculatedCsvData(year, month).then((data) =>
      runInAction(() => {
        if (data !== null) {
          setError("");
          store.reservationCalculation = data;
        } else {
          setError(serverError);
        }
      })
    );
  };

  return (
    <Container>
      <InputContainer $error={error}>
        <Label htmlFor="month">{text}</Label>
        <DateInput
          id="month"
          type="month"
          name="month"
          pattern="[0-9]{4}-[0-9]{2}"
          value={date}
          disabled={disabled}
          onChange={handleOnChange}
          min="2000-01"
          max="2025-12"
        />
        <BasicButton
          text={calculate}
          disabled={!date || error || reservationCalculation}
          onClick={handleCalculationClick}
        />
      </InputContainer>
      {reservationCalculation ? (
        <Text>
          <b>{date}</b>: {expectedRevenueText}{" "}
          <b>${formattedExpectedRevenue}</b>,{" "}
          {totalCapacityOfUnreservedOfficesText}{" "}
          <b>{reservationCalculation.totalCapacityOfUnreservedOffices}</b>
        </Text>
      ) : (
        error && <Error>{error}</Error>
      )}
    </Container>
  );
};

const RequestedByDateDataObserver = observer(RequestedByDateData);
export default RequestedByDateDataObserver;
