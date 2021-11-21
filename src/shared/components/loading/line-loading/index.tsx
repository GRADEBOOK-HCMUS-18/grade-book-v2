import './index.css';

interface IProps {
  isLoading: boolean;
}

export const LineLoading = ({ isLoading }: IProps) => {
  return <>{isLoading ? <div className="line-loader-element"></div> : <></>}</>;
};
