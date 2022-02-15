import React, { useState, useEffect } from "react";
import { useCategory } from "../../contextApi/CategoryContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Select,
  Form,
  Input,
  InputNumber,
  Button,
  Checkbox,
  Menu,
  Slider,
  Switch,
  Rate,
  Badge,
  Radio,
} from "antd";
import { useProduct } from "../../contextApi/ProductContext";

const { Option } = Select;
const { SubMenu } = Menu;

const ProductFilterForm = () => {
  const history = useHistory();
  const [reverse, setReverse] = useState(true);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(1000);
  const [size, setSize] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);
  const [rating, setRating] = useState(null);
  const { categoryList } = useCategory();
  const {productList } = useProduct();

  const handleClick = (e) => {
    console.log("click ", e);
  };
  const handleFilter = (event) => {
    history.push({
      search:
        "category=" +
        selectCategory +
        "&min=" +
        min +
        "&max=" +
        max +
        "&size=" +
        size +
        "&rating=" +
        rating,
    });
  };

  const onChangeCategory = (event) => {
    setSelectCategory(event.target.value);
  };
  const sliderOnChange = (values) => {
    setMin(values[0]);
    setMax(values[1]);
    handleFilter();
  };
  const handleChangeRate = (value) => {
    setRating(value);
  };

  const onChangeSize = (e) => {
    setSize(e.target.value);
  };
  const optionsWithDisabled = [
    { label: "XXS", value: "xxs" },
    { label: "XS", value: "xs" },
    { label: "S", value: "s" },
    { label: "M", value: "m" },
    { label: "L", value: "l" },
    { label: "XL", value: "xl" },
    { label: "XXL", value: "xxl" },
    { label: "XXXL", value: "xxxl" },
  ];
  const {productFilter } = useProduct();

  useEffect(() => {
    productFilter(selectCategory, min, max);
    handleFilter();
    console.log(productList)
  }, [selectCategory, rating, size,min, max]);

  return (
    <>
      <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1", "sub2", "sub3", "sub4"]}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title="Fiyat"
          style={{ padding: "0 20px", fontWeight: "700" }}
        >
          <Slider
            range
            defaultValue={[0, 1000]}
            onChange={sliderOnChange}
            style={{ fontWeight: "500" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "500",
            }}
          >
            <div>
              <div style={{ lineHeight: "25px" }}>Minimum</div>
              <InputNumber
                value={min}
                min={1}
                max={1000}
                defaultValue={3}
                style={{ width: 70 }}
              />
            </div>
            <div>
              <div style={{ lineHeight: "25px" }}>Maksimum</div>
              <InputNumber
                min={1}
                max={1000}
                value={max}
                defaultValue={3}
                style={{ width: 70 }}
              />
            </div>
          </div>
        </SubMenu>
        <SubMenu key="sub2" title="Beden" style={{ fontWeight: "700" }}>
          <Radio.Group
            style={{ padding: "10px 20px", fontWeight: "500" }}
            onChange={onChangeSize}
            optionType="button"
            buttonStyle="solid"
            size="small"
          >
            {optionsWithDisabled.map((size) => (
              <Radio.Button
                style={{ margin: "0 0 10px 10px" }}
                value={size.value}
              >
                {size.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </SubMenu>
        <SubMenu key="sub3" title="Kategori" style={{ fontWeight: "700" }}>
          <div style={{ paddingLeft: "20px", fontWeight: "500" }}>
            {categoryList &&
              categoryList.map((ctg) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 20px",
                  }}
                >
                  <Radio.Group
                    onChange={onChangeCategory}
                    value={selectCategory}
                  >
                    <Radio value={ctg.category_slug}>{ctg.category_name}</Radio>
                  </Radio.Group>

                  <Badge
                    count={5}
                    style={{ backgroundColor: "#1890ff", padding: "0 12px" }}
                  />
                </div>
              ))}
          </div>
        </SubMenu>
        <SubMenu key="sub4" title="Değerlendirme" style={{ fontWeight: "700" }}>
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <Rate onChange={handleChangeRate} />
          </div>
        </SubMenu>
      </Menu>
    </>
  );
};

export default ProductFilterForm;
