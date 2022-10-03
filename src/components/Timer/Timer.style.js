import styled from 'styled-components';

export const StyledTimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TimerTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 1.21;
  color: #898f9f;

  margin-bottom: 8px;
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 290px;
  height: 60px;

  background: #ffffff;
  box-shadow: 4px 4px 8px rgba(36, 42, 55, 0.15);

  padding-bottom: 8px;
  margin-left: 40px;
  margin-right: 40px;
`;
export const StyledItem = styled.p`
  display: flex;
  flex-direction: column;
  margin: 0;
  text-align: center;
  :not(:last-child) {
    margin-right: 15px;
  }
`;

export const StyledValue = styled.span`
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 1.52;

  color: #091e3f;
`;
export const StyledSeparator = styled.span`
  margin-right: 10px;
`;

export const StyledSpan = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: center;

  color: #898f9f;
`;
