import TrainingForm from '../../components/TrainingForm';
import MyGoal from '../../components/MyGoal';
import ChartModal from '../../components/Chart/ChartModal';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f6f7fb;
`;

const TrainingContainer = styled.div`
  display: flex;
  justify-content: space-between;

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
    <Container>
      <TrainingContainer>
        <TrainingMaine>
          <TrainingForm />
        </TrainingMaine>

        <TrainingSidebar>
          <MyGoal />
          {/* <TrainingTitle text="Моя мета прочитати" /> */}
        </TrainingSidebar>
        {/* <p>asd</p> */}
      </TrainingContainer>
      <ChartModal />
    </Container>
  );
};

export default Training;
