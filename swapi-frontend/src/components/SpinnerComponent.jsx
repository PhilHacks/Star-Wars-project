import { ImSpinner6 } from "react-icons/im";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const AnimatedSpinner = styled(ImSpinner6)`
  animation: ${spin} 2s linear infinite;
`;

function SpinnerComponent() {
  return (
    <div>
      <AnimatedSpinner />
    </div>
  );
}

export default SpinnerComponent;
