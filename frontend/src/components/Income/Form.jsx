import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { categoryList } from "../../utils/menuItems";

import "./Form.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";

const Form = ({ formSubmit }) => {
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    formSubmit(data);
    reset();
  };

  const { title, amount, date, category, description } = inputState;
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-control">
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Salary Title"
          />
          {errors.name && <span>This field is required</span>}
        </div>

        <div className="input-control">
          <input
            type="text"
            {...register("amount", { required: true })}
            placeholder="Salary Amount"
          />
          {errors.amount && <span>This field is required</span>}
        </div>

        <div className="input-control">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                wrapperClassName="date-picker"
                placeholderText="Enter A Date"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="MM/dd/yyyy"
              />
            )}
          />
          {errors.date && <div>Field is rquired</div>}
        </div>

        <div className="selects input-control">
          {/* <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select
                required
                value={categoryList.find((c) => c.value === field.value)}
                onChange={(category) => field.onChange(category.value)}
              >
                {categoryList.map((category) => (
                  <option value={category.value}>{category.title}</option>
                ))}
              </select>
            )}
            rules={{ required: true }}
          /> */}

          <select
            {...register("category", { required: "This field is required" })}
            className=""
            defaultValue="select-category"
          >
            <option value="select-category" disabled>
              Select Category
            </option>
            {categoryList.map((category) => (
              <option key={category.value} value={category.value}>
                {category.title}
              </option>
            ))}
          </select>

          {errors.category && <div>Field is rquired</div>}
        </div>

        <div className="input-control">
          <textarea
            {...register("description", { required: true })}
            placeholder="Add a reference"
            id="description"
            cols="30"
            rows="4"
          ></textarea>
          {errors.description && <span>This field is required</span>}
        </div>

        <input type="submit" className="submit-btn" />
      </form>
    </div>
  );
};

export default Form;
