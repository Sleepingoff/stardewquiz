import Layout from "../components/templates/Layout";
import Img from "../components/atoms/Img";
import Box from "../components/atoms/Box";
import { useState } from "react";
import CustomSelect from "../components/molecules/Select";
import { Category, Option } from "../types";
import { useCategories } from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { categories } = useCategories();
  const [selected, setSelected] = useState("random");
  const navigate = useNavigate();

  const options: Option[] = [
    { value: "random", label: "All", defaultValue: true },
    ...Object.keys(categories).map((key) => ({
      value: key,
      label: categories[key as keyof Category],
    })),
  ];

  const handleClickStart = () => {
    navigate(`/quiz/${selected}`);
  };

  return (
    <Layout>
      <CustomSelect
        options={options}
        onChange={(e) => setSelected(e)}
        placeholder="Select Category"
        localKey="selectedCategory"
      />
      <Img src="/logo.png" alt="stardew valley" height={200} />
      <Box onClick={handleClickStart}>Start</Box>
    </Layout>
  );
};

export default Home;
