import { useWindowSize } from "../../utils/useWindowSize";

import "./OrbStyle.scss";

const Orb = () => {
  const { width, height } = useWindowSize();

  return (
    <>
      <style>
        {`
          @keyframes moveOrb {
            0% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(${width}px, ${height / 2}px);
            }
            100% {
              transform: translate(0, 0);
            }
          }
        `}
      </style>
      <div className="orb-container">orb</div>
    </>
  );
};

export default Orb;
