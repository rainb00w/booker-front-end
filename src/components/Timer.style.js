import styled from 'styled-components';

export const StyledTimerContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 654px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledTimerWrapper = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 290px;
  height: 60px;

  background: #ffffff;
  box-shadow: 4px 4px 8px rgba(36, 42, 55, 0.15);
`;

export const StyledContainer = styled.div`
  display: flex;
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
  font-size: 32px;
  font-weight: 500;
`;
