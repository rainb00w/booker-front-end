import { TrainingTitle } from 'components/TrainingTitle';
import TrainingForm from "components/TrainingForm";
import PeriodSelection from 'components/PeriodSelection';
import styled from 'styled-components';
// import Clock from 'components/Clock/Clock';

const TrainingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f6f7fb;
  padding-top: 40px;
`;

const TrainingMaine = styled.div`
  width: 70%;
`;

const TrainingSidebar = styled.div`
  width: 25%;
`;

const Training = () => {
  return (
    <TrainingContainer>
      <TrainingMaine>
        <TrainingForm />
      </TrainingMaine>

      <TrainingSidebar>
        <TrainingTitle text="Моя мета прочитати" />
      </TrainingSidebar>
    </TrainingContainer>
  );
};

export default Training;
