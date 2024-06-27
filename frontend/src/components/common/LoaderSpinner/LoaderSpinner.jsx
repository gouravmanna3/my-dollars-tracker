import { TailSpin } from "react-loader-spinner";

import "./LoaderSpinner.scss";

const LoaderSpinner = () => {
  return (
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass="loader"
    />
  );
};

export default LoaderSpinner;
