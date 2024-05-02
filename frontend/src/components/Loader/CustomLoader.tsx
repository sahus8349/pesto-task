import styled from "styled-components";

export const CustomLoaderStyle = styled.div`
  .loader-container {
    width: 100%;
    height: 100%;
  }

  .spinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color:#0080ff transparent #0080ff transparent;
    border-radius: 50%;
    animation: spin-anim 1.2s linear infinite;
  }

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const CustomLoader = () => {
  return (
    <CustomLoaderStyle>
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    </CustomLoaderStyle>
  );
};

export default CustomLoader;
