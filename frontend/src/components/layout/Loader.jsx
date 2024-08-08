import { Triangle } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center -translate-y-9">
      <Triangle
        visible={true}
        height="180"
        width="180"
        color=""
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
