import { Spin, Space } from "antd";

type SpinnerProps = {
  spaceSize: "small" | "middle" | "large";
  size: "small" | "default" | "large";
};

const Spinner = ({ 
  spaceSize = "large", 
  size = "large" 
}: SpinnerProps) => {
  return (
    <Space size={spaceSize}>
      <Spin size={size} />
    </Space>
  );
};

export default Spinner;
